module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: {
    full: './js/main.js',
    lite: './js/lite.js'
  },
  output: {
    filename: './[name].js',
  },
  watch: true
};
