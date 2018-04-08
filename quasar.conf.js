// Configuration for your app

module.exports = (ctx) => {
    return {
        // app plugins (/src/plugins)
        plugins: [
            'main',
            'axios'
        ],
        css: [
            'app.styl'
        ],
        extras: [
            ctx.theme.mat ? 'roboto-font' : null,
            'material-icons',
            // 'ionicons',
            // 'mdi',
            'fontawesome'
        ],
        supportIE: false,
        vendor: {
            add: [],
            remove: []
        },
        build: {
            scopeHoisting: true,
            vueRouterMode: 'history',
            // gzip: true,
            // analyze: true,
            // extractCSS: false,
            // useNotifier: false,
            extendWebpack(cfg) {
                cfg.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules|quasar)/
                })
                cfg.resolve.alias.vue$ = 'vue/dist/vue.esm.js'
            }
        },
        devServer: {
            // https: true,
            // port: 8080,
            open: true // opens browser window automatically
        },
        // framework: 'all' --- includes everything; for dev only!
        framework: {
            components: [
                'QChipsInput',
                'QLayout',
                'QLayoutHeader',
                'QLayoutFooter',
                'QLayoutDrawer',
                'QPageContainer',
                'QPage',
                'QToolbar',
                'QToolbarTitle',
                'QFab',
                'QFabAction',
                'QBtn',
                'QIcon',
                'QList',
                'QListHeader',
                'QItem',
                'QItemSide',
                'QItemMain',
                'QItemTile',
                'QInput',
                'QCheckbox',
                'QSlider',
                'QDatetime',
                'QField',
                'QRating',
                'QCard',
                'QCardMain',
                'QCardSeparator',
                'QCardTitle',
                'QCardActions',
                'QCardMedia',
                'QPageSticky',
                'QTable',
                'QTh',
                'QTr',
                'QTd',
                'QTableColumns',
                'QTab',
                'QTabs',
                'QTabPane',
                'QRouteTab',
                'QCollapsible',
                'QChatMessage',
                'QProgress',
                'QBreadcrumbs',
                'QBreadcrumbsEl',
                'QItemSeparator',
                'QToggle',
                'QSelect',
                'QFab',
                'QFabAction',
                'QModal',
                'QUploader',
                'QBtnToggle',
                'QModalLayout',
            ],
            directives: [
                'Ripple',
                'CloseOverlay'
            ],
            // Quasar plugins
            plugins: [
                // 'Notify',
                'Loading',
                "Dialog"
            ],
            iconSet: 'fontawesome',
        },
        // animations: 'all' --- includes all animations
        animations: [
            'fadeIn',
            'fadeOut'
        ],
        pwa: {
            cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
            manifest: {
                name: 'Finding Warmth',
                short_name: 'Finding Warmth',
                description: 'Hack for a cause',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#ffffff',
                theme_color: '#027be3',
                icons: [
                    {
                        src: 'statics/icons/icon-128x128.png',
                        sizes: '128x128',
                        type: 'image/png'
                    },
                    {
                        src: 'statics/icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'statics/icons/icon-256x256.png',
                        sizes: '256x256',
                        type: 'image/png'
                    },
                    {
                        src: 'statics/icons/icon-384x384.png',
                        sizes: '384x384',
                        type: 'image/png'
                    },
                    {
                        src: 'statics/icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        },
        cordova: {
            id: 'com.zabaat.warm.app'
        },
        electron: {
            extendWebpack() {
                // do something with cfg
            },
            packager: {
                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',

                // Window only
                // win32metadata: { ... }
            }
        },

        // leave this here for Quasar CLI
        starterKit: '1.0.2'
    }
}
