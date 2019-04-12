/** cache location state to localStorage */
import { ILocationState } from "../LocationContainer";

export default {
  isCached,
  clear,
  load,
  save,
};

function isValid(cache: any) {
  return (
    "name" in cache &&
    "coords" in cache &&
    "lat" in cache.coords &&
    "lng" in cache.coords
  );
}

function clear() {
  try {
    window.localStorage.removeItem("location");
  } catch {}
}

function isCached() {
  try {
    const location = window.localStorage.getItem("location");
    return !!location && isValid(JSON.parse(location));
  } catch {
    return false;
  }
}

function load(): ILocationState | undefined {
  if (!isCached()) return undefined;
  const cache = window.localStorage.getItem("location");
  return JSON.parse(cache!);
}

function save(location: ILocationState) {
  try {
    if (isValid(location)) {
      window.localStorage.setItem("location", JSON.stringify(location));
    }
  } catch {}
}
