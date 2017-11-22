// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBFpDCh17j6CFmB1Qjxm6970M7TERbw8Wo",
    authDomain: "hikingz-540f3.firebaseapp.com",
    databaseURL: "https://hikingz-540f3.firebaseio.com",
    projectId: "hikingz-540f3",
    storageBucket: "hikingz-540f3.appspot.com",
    messagingSenderId: "1020004507861"
  },
  mapbox: {
    accessToken: 'pk.eyJ1Ijoic3RhbmRieW1vZGUiLCJhIjoiY2o5NzZqMTdmMDQzMDJ3cnc5aW5ueXNmeSJ9.q_l4vASYPsSkfHrAxPGjbw'
  }
};
