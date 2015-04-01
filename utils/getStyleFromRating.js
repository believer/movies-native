var MAX_VALUE = 200;

function getStyleFromRating (rating: number): { color: string } {
  var standard = {
    color: '#333333',
    fontSize: 20,
    position: 'absolute',
    top: 20,
    right: 30,
  };

  if (!rating && rating < 0) { return standard; }

  var normalizedScore = Math.round((rating / 10) * MAX_VALUE);

  if (isNaN(normalizedScore)) { return standard; } 

  standard.color = 'rgb(' +
      (MAX_VALUE - normalizedScore) + ', ' +
      normalizedScore + ', ' +
      0 +
    ')'

  return standard;
}

module.exports = getStyleFromRating;