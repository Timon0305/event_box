// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseApiURL: 'https://dev-api.myeventbox.com',
  s3BaseUrl: 'https://eventbox-dev.s3.amazonaws.com/',
  baseUrl: '',
  social: {
    FacebookAppId: '204623054075048',
    GoogleClientId: '726719960128-0mua3jkceqgvts0r0jq3t1or4il25lrr',
    stripePublishableKey: 'pk_test_NSbwxmU8BzA2Z2NZpoLsWXdT00lSjB2GsR'
  },
  firebase: {
    apiKey: 'AIzaSyAgYaHaPQvsFnSY70V5fQ-tmfOKSS2Q15s',
    authDomain: 'prefab-backbone-264019.firebaseapp.com',
    databaseURL: 'https://prefab-backbone-264019.firebaseio.com',
    projectId: 'prefab-backbone-264019',
    storageBucket: 'prefab-backbone-264019.appspot.com',
    messagingSenderId: '726719960128',
    appId: '1:726719960128:web:78e81a7e2646dfd9bebba5'
  },
  secure: false,
  appUrl: 'https://dev.myeventbox.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
