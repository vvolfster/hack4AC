/* eslint-disable */
export default [
  {
    path: '/',
    component: () => System.import('layouts/default'),
    children: [
      { path: '', component: () => System.import('pages/index') },
    ],
  },

  { // Always leave this as last one
    path: '*',
    component: () => System.import('pages/404'),
  },
];
