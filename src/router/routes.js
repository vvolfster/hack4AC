/* eslint-disable */

function load(component) {
    return () => {
        return new Promise((resolve, reject) => {
            console.log('load path', `pages/${component}`)
            System.import(`pages/${component}`)
                .then(resolve)
                .catch(() => {
                    System.import(`pages/${component}/index`)
                        .then(resolve)
                        .catch(reject)
                })
        })
    }
}

export default [
  {
    path: '/',
    component: () => System.import("layouts/default"),
    children: [
        { 
            path: '', 
            component: load('index'),
        },
        {
            path: "fbadmin",
            component: load("fbadmin")
        },
        {
            path: "admin/",
            component: load("admin"),
            children: [
                {
                    path: "site",
                    component: load("admin/site")
                },
                {
                    path: "user",
                    component: load("admin/user")
                },
                {
                    path: "report",
                    component: load("admin/report")
                }
            ]
        },
        {
            path: "supplies",
            component: load("supplies"),
            children: [
                {
                    path: "detail", 
                    component: load("supplies/supplydetail")
                }
            ]
        },
        {
            path: "supplydetail", 
            component: load("supplies/supplydetail")
        },
        {
            path: "dispatch",
            component: load("dispatch")
        },
        { 
            path: 'sites', 
            component: load('sites'),
        },
        {
            path: "detail/:siteId",
            component: load("sites/detail"),
        },
        {
            path: 'welcomeUser',
            component: load("welcomeUser"), // use authId from user
        },

    ],
  },
  { // Always leave this as last one
    path: '*',
    component: load('404'),
  },
];
