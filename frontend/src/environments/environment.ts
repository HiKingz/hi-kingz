// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA8iOUUnJ_Nd7l2_DI4wCR2pUxpH0l3RP8',
    authDomain: 'hikingz-185410.firebaseapp.com',
    databaseURL: 'https://hikingz-185410.firebaseio.com',
    projectId: 'hikingz-185410',
    storageBucket: 'hikingz-185410.appspot.com',
    messagingSenderId: '1069159165360'
  },
  mapbox: {
    accessToken: 'pk.eyJ1Ijoic3RhbmRieW1vZGUiLCJhIjoiY2o5NzZqMTdmMDQzMDJ3cnc5aW5ueXNmeSJ9.q_l4vASYPsSkfHrAxPGjbw'
  },
  algolia: {
    appId: 'FN552M4GBM',
    publicApiKey: '6d3baf4c1604a87d3a8d245f7040cd0e',
    indexNamePrefix: 'hi-kingz.'
  }
};
