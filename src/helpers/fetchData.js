import odata from 'odata';

export default (config, name, onFinished) => {
  if (!config.topLevelPaths.has(name))
    return;

  odata(`${config.baseUrl}/${name}`).get()
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
