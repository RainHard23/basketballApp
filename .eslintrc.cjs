module.exports = {
    extends: ['@it-incubator/eslint-config', 'prettier'],
    rules: {
        'no-console': ['warn', { allow: ['warn', 'error'] }]
    }
};