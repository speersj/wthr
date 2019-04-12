//browserMocks.js
var coords = { latitude: 90, longitude: 90 };

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

Object.defineProperty(window, "navigator", {
  value: {
    geolocation: {
      getCurrentPosition,
      mockCurrentPosition,
    },
  },
});

function mockCurrentPosition(
  currentPosition = { latitude: 90, longitude: 90 },
) {
  coords = { ...currentPosition };
}

function getCurrentPosition(successFunc, errorFunc, options = {}) {
  successFunc({ coords });
}
