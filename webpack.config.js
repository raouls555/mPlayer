module.exports = {
  mode: 'development',
  entry: {
    main: './js/main.js',
    lite: './js/lite.js'
  },
  output: {
    filename: './[name].js',
  },
  watch: true
};
