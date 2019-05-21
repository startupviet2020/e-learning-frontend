import devConfigs from './dev';
import prodConfigs from './prod';

let configs;

if (process.env.REACT_APP_BUILD === 'production') {
    configs = prodConfigs;
} else {
    configs = devConfigs;
}

export default Object.freeze(Object.assign({}, configs));