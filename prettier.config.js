const plugins = ['@trivago/prettier-plugin-sort-imports'];

const importConfigs = {
    importOrder: ['^@nietoga/(.*)$', '^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};

const config = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    plugins,
    ...importConfigs,
};

module.exports = config;
