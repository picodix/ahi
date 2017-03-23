var BASE_URL = docute.isDev ? location.origin : '{{ url }}/docs' || 'http://my-project.com/docs'


docute.init({
    title: 'Doc',
    debug: true,
    nav: {
        default: [
            {title: 'Home', path: '/'},
            {title: 'Components', path: `/components`},
            {title: 'Changelog', path: `/changelog`}
        ]
    }
})
