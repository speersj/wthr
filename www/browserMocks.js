//browserMocks.js
Object.defineProperty(window, "localStorage", {
  value: (() => {
    let store = {};

    return {
      getItem: function(key) {
        return store[key] || null;
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      },
      clear: function() {
        store = {};
      },
    };
  })(),
});
