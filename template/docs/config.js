var BASE_URL = docute.isDev ? location.origin : '{{ url }}/docs' || 'http://my-project.com/docs'
var LOCAL_DEMO = docute.isDev ? 'http://localhost:4000' : 'http://my-project.com/docs'


docute.init({
    title: 'Doc',
    debug: true,
    nav: {
        default: [
            {title: 'Home', path: '/'},
            {title: 'Components', path: `/components`},
            {title: 'Changelog', path: `/changelog`}
        ]
    },
    plugins: [
		docuteIframe({
			showSourceCode: true,
			prepend: '<script src="https://unpkg.com/vue@2.2.2/dist/vue.min.js"></script><script src="./http-vue-loader.js"></script><script src="https://unpkg.com/axios@0.15.3/dist/axios.js"></script>',
			parseContent: function defaultParseContent(lang, content) {
				if(lang.endsWith('.vue')){
					let component = lang.split('.vue')[0];

					return `
						<div id="sandbox">Loading...</div>

						<script>
							new Vue({
								el: '#sandbox',
								template: '<${component}/>',
								components: {
									'${component}': httpVueLoader('${LOCAL_DEMO}/src/components/${component}/index.vue')
								}
							})
						</script>`
				}
				return content
			}
		})
	]
})
