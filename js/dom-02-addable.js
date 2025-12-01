function createInputComponent() {
  const numberInputs = [...document.querySelectorAll('.app-inp.number')];

  const lableElem = document.createElement('label');

  const bElem = document.createElement('b');
  bElem.textContent = `Number ${numberInputs.length + 1}:`;

  const inputElem = document.createElement('input');
  inputElem.setAttribute('type', 'number');
  inputElem.classList.add('app-inp-number');

  lableElem.append(bElem);
  lableElem.append(inputElem);

  inputElem.addEventListener('change', () => {
    const numberInput = [...document.querySelectorAll('.app-inp-number')];

    const result = numberInputs.reduce(
      (result, elem) =>
        result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
      0,
    );

    const numberOutputs = [...document.querySelectorAll('.app-out-number')];
    numberOutputs.forEach((elem) => (elem.textContent = result));
  });

  const container = document.querySelector('.app-cmp-number-list');
  if (container) {
    container.append(lableElem);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const addButtons = [
    ...document.querySelectorAll('.app-cmp-add-number-input'),
  ];

  addButtons.forEach((elem) =>
    elem.addEventListener('click', () => {
      createInputComponent();
    })
  );

  createInputComponent();
});
