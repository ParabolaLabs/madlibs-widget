(function(window, document) {
  const PROCESS_CLAUSES = {
    shopify: {
      prefix: "Show me all the orders that ",
      options: ["have", "have not"],
      suffix: " been fulfilled",
    },
    returns: {
      prefix: "Show me all the returns that ",
      options: ["have", "have not"],
      suffix: " been processed",
    },
    adSpend: {
      prefix: "Show me all the ad campaigns where CPC is",
      options: ["above average", "below average"],
    },
  }

  const callbacks = {
    onImportChange: function(e) {
      document.getElementById('madlibs-clause-process');
    },
  }

  const dropdowns = [];

  function Dropdown(el) {
    this.$wrapper = el;
    this.$select = el.querySelector('select');
    this.$button = el.querySelector('button');
    this.$contents = el.querySelector('ul');

    console.log(this);

    this.init();
    this.bindEvents();
  }

  Dropdown.prototype = {
    init: function() {
      this.$button.textContent = this.getOptionTextByValue(this.$select.value);

      this.$button.hidden = false;
      this.$select.hidden = true;
      this.$contents.innerHTML = '';

      const options = this.$select.querySelectorAll('option');
      options.forEach((option) => {
        const menuItem = option.cloneNode(true);
        menuItem.nodeName = 'menuitem';
        menuItem.addEventListener('click', this.selectOption.bind(this));
        this.$contents.appendChild(menuItem);
      });
    },

    bindEvents: function() {
      this.$button.addEventListener('click', this.toggle.bind(this));

      const onChange = this.$select.dataset.onChange;
      if (onChange) {
        this.$select.addEventListener('change', callbacks[onChange]);
      }
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
      const left = this.$button.offsetLeft;
      const top = this.$button.offsetHeight;

      this.$contents.style.left = left + 'px';
      this.$contents.style.top = top + 'px';
    },

    close: function() {
      this.$contents.hidden = true;
    },

    selectOption: function(e) {
      e.preventDefault();
      this.$select.value = e.target.value;
      this.$button.textContent = this.getOptionTextByValue(e.target.value);
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
