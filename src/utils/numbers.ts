export const currencyFormatter = (val: number) => {
  const formattedValue = new Intl.NumberFormat("en-NO", {
    style: "currency",
    currency: "NOK",
  }).format(val);

  return formattedValue;
};
