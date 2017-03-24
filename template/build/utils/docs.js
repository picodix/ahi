var fs = require('fs')
var path = require('path')

// create a new markdown file with all component documentation
// this will be called on first bundle and on watch
// on @/components/**/README.md changes
// TODO: move docs path to a config file
var writeDocFile = function (content) {
    fs.writeFile('./docs/components.md', content, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

// list all file in folder an return only the directories
// used to read every folder in the components directory
function getDirectories (url) {
    return fs.readdirSync(url).filter(file => fs.statSync(path.join(url, file)).isDirectory())
}

// read a file at a specific url
// used to get the content of every README.md file for every components
function readFile (url) {
    return fs.readFileSync(url, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        return data
    });
}

// display component name with the first letter in capital
function capitalize (s) {
    return s[0].toUpperCase() + s.slice(1)
}

// parse the components folder and get every components
// who used a README.md file
var readAvailableComponents = function () {
    let base = './src/components'

    var directories = getDirectories(base)

    let template = ''

    for (var i = 0; i < directories.length; i++) {
        var component = `${base}/${directories[i]}`

        if(fs.existsSync(`${component}/README.md`)) {
            template += `## ${capitalize(directories[i])} \n\n`
            template += readFile(`${component}/README.md`)
            template += '\n\n'
            template += `\`\`\`\`${directories[i]}.vue\n`
            template += readFile(`${component}/index.vue`)
            template += '````'
            template += '\n\n'
        }
    }

    writeDocFile(template)
}

// export a generate method
exports.generate = function () {
    readAvailableComponents()
}
