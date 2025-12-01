document.addEventListener('DOMContentLoaded', () => {
  const numberInput = [...document.querySelectorAll('.app-inp-number')];
  console.debug(numberInput);

  numberInput.forEach((elem) =>
    elem.addEventListener('change', () => {
      const result = numberInput.reduce(
        (result, elem) =>
          result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
        0,
      );

      const numberOutputs = [...document.querySelectorAll('.app-out-number')];
      numberOutputs.forEach((elem) => (elem.textContent = result));
    }),
  );
});
