// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.json'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@constants': './src/constants',
            '@contexts': './src/contexts',
          },
        },
      ],
    ],
  };
};