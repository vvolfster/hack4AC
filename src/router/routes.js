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
        { path: '', component: load('index') },
    ],
  },
  { // Always leave this as last one
    path: '*',
    component: load('404'),
  },
];
