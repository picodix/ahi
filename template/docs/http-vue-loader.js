'use strict';


httpVueLoader.parseComponentURL = function(url) {

	var comp = url.match(/(.*?)([^/]+?)\/?(\.vue)?(?:\?|#|$)/);
	return {
		name: comp[2],
		url: comp[1] + comp[2] + (comp[3] === undefined ? '/index.vue' : comp[3])
	}
}


httpVueLoader.scopeStyles = function(styleElt, scopeName) {

	function process() {

		var sheet = styleElt.sheet;
		var rules = sheet.cssRules;

		for ( var i = 0; i < rules.length ; ++i ) {

			var rule = rules[i];
			if ( rule.type !== 1 )
				continue;

			var scopedSelectors = [];

			rule.selectorText.split(/\s*,\s*/).forEach(function(sel) {

				scopedSelectors.push(scopeName+' '+sel);
				var segments = sel.match(/([^ :]+)(.+)?/);
				scopedSelectors.push(segments[1] + scopeName + (segments[2]||''));
			});

			var scopedRule = scopedSelectors.join(',') + rule.cssText.substr(rule.selectorText.length);
			sheet.deleteRule(i);
			sheet.insertRule(scopedRule, i);
		}
	}

	try {
		// firefox may fail sheet.cssRules with InvalidAccessError
		process();
	} catch (ex) {

		styleElt.sheet.disabled = true;
		styleElt.addEventListener('load', function onStyleLoaded() {

			styleElt.removeEventListener('load', onStyleLoaded);

			// firefox need this timeout otherwise we have to use document.importNode(style, true)
			setTimeout(function() {

				process();
				styleElt.sheet.disabled = false;
			})
		});
	}
}


httpVueLoader.scopeIndex = 0;

httpVueLoader.load = function(url, name) {

	function getRelativeBase(url) {

		var pos = url.lastIndexOf('/');
		return url.substr(0, pos+1);
	}

	return function(resolve, reject) {

		axios.get(url)
		.then(function(res) {

			function require(moduleName) {

				return window[moduleName];
			}

			var module = { exports:{} };
			var templateElt = null;
			var scriptElt = null;
			var styleElts = [];
			var baseURI = getRelativeBase(url);
			var doc = document.implementation.createHTMLDocument('');

			// IE requires the <base> to come with <style>
			doc.body.innerHTML = (baseURI ? '<base href="'+baseURI+'">' : '') + res.data;

			for ( var it = doc.body.firstChild; it; it = it.nextSibling ) {

				switch ( it.nodeName ) {
					case 'TEMPLATE':
						templateElt = it;
						break;
					case 'SCRIPT':
						scriptElt = it;
						break;
					case 'STYLE':
						styleElts.push(it);
						break;
				}
			}

			if ( scriptElt !== null ) {

				try {
					Function('module', 'require', scriptElt.textContent)(module, require);
				} catch(ex) {

					if ( !('lineNumber' in ex) ) {

						reject(ex);
						return
					}
					var vueFileData = res.data.replace(/\r?\n/g, '\n');
					var lineNumber = vueFileData.substr(0, vueFileData.indexOf(scriptElt.textContent)).split('\n').length + ex.lineNumber - 1;
					throw new (ex.constructor)(ex.message, res.request.responseURL, lineNumber);
				}
			}

			return Promise.resolve(module.exports)
			.then(function(exports) {

				var headElt = document.head || document.getElementsByTagName('head')[0];

				if ( baseURI ) {

					// firefox and chrome need the <base> to be set while inserting the <style> in the document
					var tmpBaseElt = document.createElement('base');
					tmpBaseElt.href = baseURI;
					headElt.insertBefore(tmpBaseElt, headElt.firstChild);
				}

				var scopeId = '';
				function getScopeId(templateRootElement) {

					if ( scopeId === '' ) {

						scopeId = 'data-s-' + (httpVueLoader.scopeIndex++).toString(36);
						(templateElt.content || templateElt).firstElementChild.setAttribute(scopeId, '');
					}
					return scopeId;
				}

				for ( var i = 0; i < styleElts.length; ++i ) {

					var style = styleElts[i];
					var scoped = style.hasAttribute('scoped');

					if ( scoped ) {

						// no template, no scopable style
						if ( templateElt === null )
							continue;

						// firefox does not tolerate this attribute
						style.removeAttribute('scoped');
					}

					headElt.appendChild(style);

					if ( scoped )
						httpVueLoader.scopeStyles(style, '['+getScopeId()+']');
				}

				if ( baseURI )
					headElt.removeChild(tmpBaseElt);

				if ( templateElt !== null )
					exports.template = templateElt.innerHTML;

				if ( exports.name === undefined )
					if ( name !== undefined )
						exports.name = name;

				return exports;
			});

		})
		.then(resolve, reject);
	}
}


function httpVueLoader(url, name) {

	var comp = httpVueLoader.parseComponentURL(url);
	return httpVueLoader.load(comp.url, name);
}


function httpVueLoaderRegister(Vue, url) {

	var comp = httpVueLoader.parseComponentURL(url);
	Vue.component(comp.name, httpVueLoader.load(comp.url));
}


httpVueLoader.install = function(Vue) {

	Vue.mixin({

		beforeCreate: function () {

			var components = this.$options.components;

			for ( var componentName in components ) {

				if ( typeof(components[componentName]) === 'string' && components[componentName].substr(0, 4) === 'url:' ) {

					var comp = httpVueLoader.parseComponentURL(components[componentName].substr(4));

					if ( isNaN(componentName) )
						components[componentName] = httpVueLoader.load(comp.url, componentName);
					else
						components[componentName] = Vue.component(comp.name, httpVueLoader.load(comp.url, comp.name));
				}
			}
		}
	});
}
