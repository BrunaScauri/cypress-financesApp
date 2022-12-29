// importado do repo gist: https://gist.github.com/samlucax/a3b0b1fb258e7e3f7f6d38daea6ca7c5

export const format = (value) => {
  let formattedValue;

  formattedValue = value.replace(',', '.');
  formattedValue = Number(formattedValue.split('$')[1].trim());

  formattedValue = String(value).includes('-') ? -formattedValue : formattedValue;

  return formattedValue;
};

export const randomNumber = () => Math.floor(Math.random() * 101);

export const prepareLocalStorage = (win) => {
  win.localStorage.setItem('dev.finances:transactions', JSON.stringify([
    {
      description: 'Mesada',
      amount: randomNumber() * 100,
      date: '11/03/2021',
    },
    {
      description: 'Suco Kapo',
      amount: -(randomNumber() * 100),
      date: '12/03/2021',
    },
  ]));
};
