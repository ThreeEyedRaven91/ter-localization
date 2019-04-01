import React from 'react';

const Translation = React.lazy(() => import('./screens/Word'));
const Setting = React.lazy(() => import('./screens/Setting'));
const Sync = React.lazy(() => import('./screens/Sync'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/translation', name: 'Translation', component: Translation },
  { path: '/setting', name: 'Setting', component: Setting },
  { path: '/sync', name: 'Sync', component: Sync },
];

export default routes;
