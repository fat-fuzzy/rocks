const { Console } = require('console');

const cinzelFont = new FontFace(
  'Cinzel',
  "url('https://fonts.googleapis.com/css?family=Cinzel&display=swap')",
);

cinzelFont
  .load()
  .then((loadedFontFace) => {
    document.fonts.add(loadedFontFace);
    document.body.style.fontFamily = '"Cinzel" -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
  })
  .catch((error) => {
    Console.error(error.msg);
  });
