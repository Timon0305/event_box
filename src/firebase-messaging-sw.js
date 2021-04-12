// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.2/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: 'AIzaSyAgYaHaPQvsFnSY70V5fQ-tmfOKSS2Q15s',
  authDomain: 'prefab-backbone-264019.firebaseapp.com',
  databaseURL: 'https://prefab-backbone-264019.firebaseio.com',
  projectId: 'prefab-backbone-264019',
  storageBucket: 'prefab-backbone-264019.appspot.com',
  messagingSenderId: '726719960128',
  appId: '1:726719960128:web:78e81a7e2646dfd9bebba5'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
