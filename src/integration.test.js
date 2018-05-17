// tdd-jest-node/src/integration.test.js

// We will use this very handy library to make requests
const requestPromise = require('request-promise')

// In case we need to change the URL for tests 
const api = process.env.API_URL || 'http://localhost:3001'


// Here we are going to check the result of previous snapshots
const testIntegration = (requestOptions, options = {}) =>
  () =>
    requestPromise(requestOptions).then(res =>
// The name of the snapshot named is the same as the URI
      expect(res).toMatchSnapshot(requestOptions.method + ' ' +         requestOptions.uri)
    );
  
// Finally our integration test
describe('/products', () => {
  test('should returns a list of products in json format', testIntegration({method:'GET',uri: api + '/products/'}));
})