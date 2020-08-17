function priceFormater(number: number): string {
  const stringfiedNumber = number.toString();

  let formatedNumberArray = [];

  for (let i = stringfiedNumber.length - 1, c = 1; i >= 0; i--, c++) {
    if (c === 2) {
      formatedNumberArray.unshift(",", stringfiedNumber[i]);
    } else if (c % 3 === 0 && c !== 0 && c !== 3) {
      formatedNumberArray.unshift(stringfiedNumber[i], ".");
    } else {
      formatedNumberArray.unshift(stringfiedNumber[i]);
    }
  }
  
  return "R$" + formatedNumberArray.join("");
}

export { priceFormater };
