export const setFetchResponse = (topLevelPath, response) => ({
    type: 'SET_FETCH_RESPONSE',
    topLevelPath,
    response
});

export const loadConfig = config => ({
    type: 'LOAD_CONFIG',
    config
});

export const fetchData = name => ({
    type: 'FETCH_DATA',
    name
});