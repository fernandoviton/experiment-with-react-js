// This file is an example of a config file to fake out web requests
// To enable using this in place of actual http calls:
// 1. Set useFakeWebServer to true in config.js
// 2. Copy this file to config-fakeWebRequests.js and customize the responses

export default [
  {
    // 'url' is what url to fake with the response below
    url: 'https://jsonplaceholder.typicode.com/users',
    response: {
      name: 'Fred',
      status: 'online',
    }
  },

  {
    url: 'https://jsonplaceholder.typicode.com/posts',
    response: [
      {
        author: 'Fred',
        message: 'Hi there',
      },
      {
        author: 'Fred',
        message: 'bye',
      },
    ]
  }
];