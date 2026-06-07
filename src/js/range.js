(() => {
  function updateRange(element) {
    const min = parseFloat(element.min || '0');
    const max = parseFloat(element.max || '100');
    const value = parseFloat(element.value || '0');
    const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;
    element.style.setProperty('--slider-value', `${percent}%`);
  }

  function initRange(element) {
    if (element.dataset.ui5h3llRangeInitialized) return;

    updateRange(element);
    element.addEventListener('input', () => updateRange(element));
    element.dataset.ui5h3llRangeInitialized = 'true';
  }

  if (window.ui5h3ll) {
    window.ui5h3ll.register('range', 'input[type="range"]:not([data-ui5h3ll-range-initialized])', initRange);
  }
})();
