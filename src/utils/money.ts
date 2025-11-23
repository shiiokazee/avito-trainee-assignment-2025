const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});

export const formatMoneyRU = (n: number) => formatter.format(n);
