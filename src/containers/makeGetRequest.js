// TODO: move this to middleware
import odata from 'odata';
import config from '../config';

export default (name, onGetFinished) => {
  if (!config.topLevelPaths.has(name))
    return;

  odata(`${config.baseUrl}/${name}`).get()
    .then( (result) => {
			console.log(`succeeded request for ${name}`, result);
      const response = { content: result.data, statusCode: 'OK' };
      onGetFinished(response);
    })
    .fail(result => {
      console.log(`failed request for ${name}`, result);
      const response = { statusCode: result.status };
      onGetFinished(response);
    });
  }
