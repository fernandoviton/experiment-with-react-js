import odata from 'odata';

const getResponseFromFakeRequest = (url, fakeData)  => {
  const matches = fakeData.filter(x => x.url === url);

  if (matches.length > 1) {
    // eslint-disable-next-line
    throw `config-fakeWebRequests contains duplicate ${url}`;
  }
  const match = matches && matches[0];
  const response = match && match.response;
  return { content: response,  statusCode: response ? 'OK' : 'Not Found in Test Data' };
};

export default (config, name, onFinished) => {
  const url = `${config.baseUrl}/${name}`;

  if (config.useFakeWebServer) {
    const fakeWebReqest = require('../config-fakeWebRequests');
    onFinished(getResponseFromFakeRequest(url, fakeWebReqest.default));
    return;
  }

  if (!config.topLevelPaths.find(item => item === name))
    return;

  odata(url).get()
    .then( (result) => {
      console.log(`succeeded request for ${name}`, result);
      const response = { content: result.data, statusCode: 'OK' };
      onFinished(response);
    })
    .fail(result => {
      console.log(`failed request for ${name}`, result);
      const response = { statusCode: result.status };
      onFinished(response);
    });
  }
