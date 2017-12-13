// Copy this to config.js and customize to use

export default ({
  // useFakeWebServer: true, // see sample-config-fakeWebRequests.js

  // base url + each topLevelPath is used to generated web requests
  baseUrl: 'https://jsonplaceholder.typicode.com',
  topLevelPaths: [
    'users',
    'posts',
  ]
});