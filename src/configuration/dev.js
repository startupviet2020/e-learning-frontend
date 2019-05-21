import baseConfigs from './base';

const configs = {
    apiUrl: 'http://127.0.0.1:8080',
    //apiUrl: 'http://547a3ef0.ngrok.io',
    facebookAppID: '173151610278160',
    accountkitVersion: 'v1.1'
};

export default Object.freeze(Object.assign({}, baseConfigs, configs));