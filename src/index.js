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
    ads: {
      prefix: "Show me all the ad campaigns where CPC is",
      options: ["above average", "below average"],
    },
  }

  const Callbacks = {
    onImportChange: function(e) {

    },
  }

  function Select(el) {
    this.el = el;
    console.log(el);
    // DOM transformation for fancy dropdowns
    // onclick for toggle button
    // if onchange is present, match to a function in Callbacks
  }

  Select.prototype = {
    toggleDropdown: function(e) {
      // e.preventDefault();
      // show/hide sibling dropdown
    },
    selectOption: function(e) {
      this.el.value = e.target.value;
    }
  }

  window.onload = function() {
    const selects = document.querySelectorAll('[data-component="select"]');
    selects.forEach(Select);
  };
})(window, document);
