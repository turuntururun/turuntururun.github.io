module.exports = {
    outputDir: 'docs',
    pwa: {
        name: 'TurunTururun',
        themeColor: '#521C61',
        msTileColor: '#521C61',
        appleMobileWebAppCapable: 'yes',
        // appleMobileWebAppStatusBarStyle: 'black',
        manifestOptions: {
            short_name: 'turuntururun',
            background_color: "#521C61",
            description: "KD webpage",
            start_url: "/",
            scope: "/",
        },
        iconPaths: {
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
            maskIcon: 'img/icons/safari-pinned-tab.svg',
            msTileImage: 'img/icons/msapplication-icon-144x144.png'
        },

        // workboxPluginMode: 'InjectManifest',
        // workboxOptions: {
        //     swSrc: 'service-worker.js',
        //     // ...other Workbox options. See
        //     // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.InjectManifest#InjectManifest
        // }
    }
}