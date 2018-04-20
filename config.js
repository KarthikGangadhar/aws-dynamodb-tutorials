'use strict';

return module.exports = () => {
    switch (process.env.ENV) {
        case 'dev':
            return {};//require('./devConfig');
        case "qa":
            return {};//require('./qaConfig');
        case 'prod':
            return {};//require('./prodConfig');
        default:
            return {};//require('./devConfig');
    };
};
