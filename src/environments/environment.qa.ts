// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    baseApiURL: 'https://qa-api.myeventbox.com',
    s3BaseUrl: 'https://eventbox-qa.s3.amazonaws.com/',
    baseUrl: '',
    social: {
      FacebookAppId: '204623054075048',
      GoogleClientId : '726719960128-0mua3jkceqgvts0r0jq3t1or4il25lrr',
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
    secure: true,
    appUrl: 'https://qa.myeventbox.com'
};
