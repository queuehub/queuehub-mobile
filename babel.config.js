module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          Components: './src/components',
          Screens: './src/screens',
          Hooks: './src/hooks',
        },
      },
    ],
  ],
};
