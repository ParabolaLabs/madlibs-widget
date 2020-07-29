(function(window, document) {
  const PROCESS_CLAUSES = {
    shopify: {
      prefix: "Show me all the orders that ",
      options: { have: "have", haveNot: "have not" },
      suffix: " been fulfilled",
    },
    returns: {
      prefix: "Show me all the returns that ",
      options: { have: "have", haveNot: "have not" },
      suffix: " been processed",
    },
    adSpend: {
      prefix: "Show me all the ad campaigns where CPC is",
      options: { above: "above average", below: "below average" },
    },
  }

  const dropdowns = [];

  const callbacks = {
    onImportChange: function(value) {
      const newClause = PROCESS_CLAUSES[value];

      const $clause = document.getElementById('madlibs-clause-process');
      const dropdownIndex = dropdowns.findIndex((dropdown) => dropdown.id === 'process-dropdown');
      const $prefix = $clause.querySelector('.prefix');
      const $select = $clause.querySelector('select');
      const $suffix = $clause.querySelector('.suffix');

      $prefix.textContent = newClause.prefix;
      $suffix.textContent = newClause.suffix;
      $select.innerHTML = '';

      for (const [key, value] of Object.entries(newClause.options)) {
        const $newOption = document.createElement('option');
        $newOption.value = key;
        $newOption.textContent = value;
        $select.appendChild($newOption);
      }

      dropdowns[dropdownIndex] = new Dropdown(dropdowns[dropdownIndex].$wrapper);
    },
  }

  function Dropdown(el) {
    this.id = el.id;
    this.$wrapper = el;
    this.$select = this.$wrapper.querySelector('select');
    this.$button = this.$wrapper.querySelector('a');
    this.$contents = this.$wrapper.querySelector('menu');

    this.init();
  }

  Dropdown.prototype = {
    init: function() {
      this.$button.textContent = this.getOptionTextByValue(this.$select.value);

      this.$button.hidden = false;
      this.$select.hidden = true;
      this.$contents.innerHTML = '';

      const $options = this.$select.querySelectorAll('option');
      $options.forEach(($option) => {
        const $menuItem = document.createElement('menuitem');
        $menuItem.setAttribute('class', 'clause-dropdown-item');
        $menuItem.textContent = $option.textContent;
        $menuItem.value = $option.value;
        this.$contents.appendChild($menuItem);
      });

      this.bindEvents();
    },

    bindEvents: function() {
      this.$button.addEventListener('click', this.toggle.bind(this));
      this.$contents.querySelectorAll('menuitem').forEach(menuItem => {
        menuItem.addEventListener('click', this.selectOption.bind(this));
      });
    },

    toggle: function(e) {
      e.preventDefault();
      dropdowns.forEach((dropdown) => {
        if (dropdown === this) {
          this.positionContents();
          this.$contents.hidden = !this.$contents.hidden;
        } else {
          dropdown.close();
        }
      });
    },

    positionContents: function() {
      const top = this.$button.offsetHeight;
      this.$contents.style.top = top + 'px';

      if (this.$contents.dataset.align === 'right') {
        const right = 15;
        this.$contents.style.right = right + 'px';
      } else {
        const left = this.$button.offsetLeft;
        this.$contents.style.left = left + 'px';
      }
    },

    close: function() {
      this.$contents.hidden = true;
    },

    selectOption: function(e) {
      const value = e.target.value
      this.$select.value = value;
      this.$button.textContent = this.getOptionTextByValue(value);

      const onChange = this.$select.dataset.onchange;
      onChange && callbacks[onChange].call(this, value);

      this.close();
    },

    getOptionTextByValue(value) {
      const options = Array.from(this.$select.querySelectorAll('option'));

      return options.find(function(option) {
        return option.value === value
      }).text;
    },
  }

  window.onload = function() {
    const selects = document.querySelectorAll('[data-component="select"]');
    selects.forEach(function(select) {
      dropdowns.push(new Dropdown(select));
    });
  };
})(window, document);
