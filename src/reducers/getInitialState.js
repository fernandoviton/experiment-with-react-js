import immutable from 'immutable'

export default new immutable.Record({
    error: undefined,
    responseData: immutable.fromJS({}),
    webRequestInfo: undefined,
});