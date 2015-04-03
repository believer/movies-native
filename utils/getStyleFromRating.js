var MAX_VALUE = 200;

function getStyleFromRating (rating: number, type: string): { color: string } {
  var standard = {
    color: '#333333',
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
  };

  if (!type) {
    standard.position = 'absolute';
    standard.top = 10;
    standard.right = 20;
    standard.fontSize = 20;
  }

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