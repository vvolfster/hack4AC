/* eslint-disable */

function load(component) {
    return () => {
        return new Promise((resolve, reject) => {
            console.log('load path', `pages/${component}`);
            System.import(`pages/${component}`)
                .then(resolve)
                .catch(() => {
                    System.import(`pages/${component}/index`)
                        .then(resolve)
                        .catch(reject);
                });
        });
    };
}

export default [
    {
        path: '/admin/',
        component: load('admin'),
        children: [
            {
                path: 'site',
                component: load('admin/site')
            },
            {
                path: 'user',
                component: load('admin/user')
            },
            {
                path: 'invite',
                component: load('admin/invite')
            },
            {
                path: 'report',
                component: load('admin/report')
            }
        ]
    },
    {
        path: '/',
        component: () => System.import('layouts/default'),
        children: [
            {
                path: '',
                component: load('sites')
            },
            {
                path: 'fbadmin',
                component: load('fbadmin')
            },
            {
                // TODO for Jason: nest the supply detail under this path
                path: 'supplies',
                component: load('supplies')
            },
            {
                path: 'supplydetail/:siteID',
                component: load('supplies/supplydetail')
            },
            {
                path: 'dispatch',
                component: load('dispatch')
            },
            {
                path: 'driver',
                component: load('driver')
            },
            {
                path: 'sites',
                component: load('sites')
            },
            {
                path: 'detail/:siteId',
                component: load('sites/detail')
            },
            {
                path: 'welcomeUser',
                component: load('welcomeUser') // use authId from user
            }
        ]
    },
    {
        // Always leave this as last one
        path: '*',
        component: load('404')
    }
];
