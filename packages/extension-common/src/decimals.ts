export const AutoDecimal = (_num: number | string, decimal?: number) => {
  let num = Number(_num);
  let hasK = false;
  if (num >= 1000) {
    num = num / 1000;
    hasK = true;
  }
  if (decimal) {
    return num.toFixed(decimal) + (hasK ? 'K' : '');
  }
  if (num > 1) {
    return num.toFixed(2) + (hasK ? 'K' : '');
  } else {
    return num.toFixed(3) + (hasK ? 'K' : '');
  }
};

export const AutoDecimalForToken = (
  _num: number | string,
  decimal?: number,
) => {
  let num = Number(_num);
  let hasK = false;
  if (num >= 1000) {
    num = num / 1000;
    hasK = true;
  }
  if (decimal) {
    return num.toFixed(decimal) + (hasK ? 'K' : '');
  }
  if (num > 1) {
    return num.toFixed(3) + (hasK ? 'K' : '');
  } else {
    return num.toFixed(4) + (hasK ? 'K' : '');
  }
};
