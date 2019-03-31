import React from 'react';

const Translation = React.lazy(() => import('./screens/Word'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/translation', name: 'Translation', component: Translation },
];

export default routes;
