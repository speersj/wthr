export function clearGeoAPIMock() {
  Object.defineProperty(window, "navigator", {});
}

export function setGeoAPIMock(returnValue = { latitude: 90, longitude: 90 }) {
  function getCurrentPosition(successFunc: any, errorFunc: any, options = {}) {
    successFunc({ coords: returnValue });
  }

  Object.defineProperty(window, "navigator", {
    value: {
      geolocation: {
        getCurrentPosition,
      },
    },
  });
}
