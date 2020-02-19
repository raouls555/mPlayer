module.exports = {
  mode: 'development',
  entry: {
    full: './js/main.js',
    lite: './js/lite.js'
  },
  output: {
    filename: './[name].js',
  },
  watch: true
};
