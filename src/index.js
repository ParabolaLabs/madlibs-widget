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

      const dropdown = dropdowns[dropdownIndex];
      dropdown.init();
      dropdown.bindMenuItems();
    },
  }

  function Dropdown(el) {
    this.id = el.id;
    this.$wrapper = el;
    this.$select = this.$wrapper.querySelector('select');
    this.$button = this.$wrapper.querySelector('a');
    this.$contents = document.createElement('menu');
    this.$contents.setAttribute('class', 'clause-menu');

    this.menuOpen = false;

    this.settings = {
      align: this.$wrapper.dataset.align,
      onChange: this.$wrapper.dataset.onchange,
    };

    this.init();
    this.bindEvents();
  }

  Dropdown.prototype = {
    init: function() {
      this.setButtonText(this.getOptionTextByValue(this.$select.value));
      this.$button.hidden = false;
      this.$select.hidden = true;
      this.$contents.innerHTML = '';

      const $options = this.$select.querySelectorAll('option');
      $options.forEach(($option) => {
        const $menuItem = document.createElement('menuitem');
        $menuItem.setAttribute('class', 'clause-menu-item');
        $menuItem.textContent = $option.textContent;
        $menuItem.value = $option.value;
        this.$contents.appendChild($menuItem);
      });

      this.toggle = this.toggle.bind(this);
    },

    bindEvents: function() {
      this.$button.addEventListener('click', this.toggle);
      // prevent double-click selection
      this.$button.addEventListener('mousedown', (e) => e.preventDefault());
      this.bindMenuItems();
    },

    bindMenuItems: function() {
      this.$contents.querySelectorAll('menuitem').forEach(menuItem => {
        menuItem.addEventListener('click', this.selectOption.bind(this));
      });
    },

    toggle: function(e) {
      e.preventDefault();

      dropdowns.forEach((dropdown) => {
        if (dropdown !== this && dropdown.menuOpen) {
          dropdown.close();
        }
      });

      if (this.menuOpen) {
        this.close();
      } else {
        this.menuOpen = true;
        this.positionContents();
        this.$button.after(this.$contents);
      }
    },

    positionContents: function() {
      const top = this.$button.offsetHeight + this.$button.offsetTop;
      this.$contents.style.top = top + 'px';

      if (this.settings.align === 'right') {
        const $words = this.getWordsByPosition()
        const $rightmostWord = $words[$words.length - 1];
        const left = $rightmostWord.offsetLeft = $rightmostWord.offsetWidth;
        this.$contents.style.left = left + 'px';
      } else {
        const left = this.getWordsByPosition()[0].offsetLeft;
        this.$contents.style.left = left + 'px';
      }
    },

    close: function() {
      this.menuOpen = false;
      const removeContents = () => {
        this.$contents.classList.remove('closing');
        this.$contents.removeEventListener('animationend', removeContents);
        this.$contents.remove();
      };
      this.$contents.addEventListener('animationend', removeContents)
      this.$contents.classList.add('closing');
    },

    setButtonText: function(text) {
      this.$button.innerHTML = '';
      const words = text.split(' ');
      words.map((word, i) => {
        const $word = document.createElement('span');
        $word.textContent = i < (words.length - 1) ? word + ' ' : word;
        this.$button.appendChild($word);
      });
    },

    getWordsByPosition: function() {
      const $words = Array.from(this.$button.querySelectorAll('span'));
      return $words.sort(($a, $b) => $a.offsetLeft - $b.offsetLeft);
    },

    selectOption: function(e) {
      const value = e.target.value
      this.$select.value = value;
      this.setButtonText(this.getOptionTextByValue(value));

      const onChange = this.settings.onChange;
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
