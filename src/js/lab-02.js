/**
 * Creates and manages the dynamic input list within a specific section.
 * This is the component that handles Number inputs and their sum.
 *
 * @param {HTMLElement} sectionElem - The element containing the input list (app-cmp-section).
 */
function createInputListComponent(sectionElem) {
  const inputListContainer = sectionElem.querySelector('.app-cmp-number-list');
  const templateElem = inputListContainer.querySelector('.app-tmp-number-component');

  if (templateElem === null) {
    throw new Error('Template .app-tmp-number-component is not found');
  }

  const regenerateTitleNumbersAndStatus = () => {
    const numberInputs = [...inputListContainer.querySelectorAll('.app-cmp-number')];
    
    numberInputs.forEach((inputContainer, index, items) => {
      // Update Number title (Number 1, Number 2, ...)
      inputContainer.querySelector('.app-title-number').textContent = `${index + 1}`;

      // Disable 'X' button if only one input remains
      const removeButton = inputContainer.querySelector('.app-cmd-remove-number-input');
      if (removeButton) {
        removeButton.disabled = items.length === 1;
      }
    });
  };

  const recalculateResult = () => {
    const result = [...inputListContainer.querySelectorAll('.app-inp-number')].reduce(
      (currentSum, elem) =>
        currentSum + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
      0,
    );

    // Update the result output *within this specific section*
    sectionElem.querySelector('.app-out-number').textContent = result;
  };

  const createInputComponent = () => {
    // Clone content from the template
    const inputContainer = templateElem.content.cloneNode(true).firstElementChild;

    // Attach removal listener to the new component
    inputContainer.addEventListener('click', (ev) => {
      if (ev.target?.matches('.app-cmd-remove-number-input')) {
        inputContainer.remove();
        regenerateTitleNumbersAndStatus();
        recalculateResult();
      }
    });

    // Add to the list container
    inputListContainer.append(inputContainer);

    regenerateTitleNumbersAndStatus();
    recalculateResult();
  };
  
  // Event Delegation for Number Input changes *within this section*
  inputListContainer.addEventListener('change', (ev) => {
    if (ev.target?.matches('.app-inp-number')) {
      recalculateResult();
    }
  });
  
  // Event Delegation for Add Number Input button *within this section*
  sectionElem.addEventListener('click', (ev) => {
    if (ev.target?.matches('.app-cmd-add-number-input')) {
      createInputComponent();
    }
  });

  // Start with one number input
  createInputComponent();
  
  return sectionElem;
}

/**
 * Creates and manages the Section components (multiple independent input lists).
 *
 * @param {HTMLElement} componentElem - The main body element.
 */
function createSectionListComponent(componentElem) {
  const sectionListContainer = componentElem.querySelector('.app-cmp-section-list');
  const sectionTemplate = componentElem.querySelector('.app-tmp-section-component');

  if (sectionTemplate === null) {
    throw new Error('Template .app-tmp-section-component is not found');
  }

  const regenerateSectionTitlesAndStatus = () => {
    const sections = [...sectionListContainer.querySelectorAll('.app-cmp-section')];
    
    sections.forEach((sectionContainer, index, items) => {
      // Update Section title (Section 1, Section 2, ...)
      sectionContainer.querySelector('.app-title-section-number').textContent = `${index + 1}`;

      // Disable 'X' button if only one section remains
      const removeButton = sectionContainer.querySelector('.app-cmd-remove-section');
      if (removeButton) {
        removeButton.disabled = items.length === 1;
      }
    });
  };

  const createSectionComponent = () => {
    // Clone the section template
    const sectionContainer = sectionTemplate.content.cloneNode(true).firstElementChild;

    // Initialize the Input List Component *inside* the new section
    createInputListComponent(sectionContainer); 

    // Attach removal listener to the new section
    sectionContainer.addEventListener('click', (ev) => {
      if (ev.target?.matches('.app-cmd-remove-section')) {
        sectionContainer.remove();
        regenerateSectionTitlesAndStatus();
      }
    });

    // Add to the list container
    sectionListContainer.append(sectionContainer);

    regenerateSectionTitlesAndStatus();
  };

  // Event Delegation for Add Section button
  componentElem.addEventListener('click', (ev) => {
    if (ev.target?.matches('.app-cmd-add-section')) {
      createSectionComponent();
    }
  });
  
  // Start with one section
  createSectionComponent();
  
  return componentElem;
}


document.addEventListener('DOMContentLoaded', () => {
  createSectionListComponent(document.querySelector('body'));
});