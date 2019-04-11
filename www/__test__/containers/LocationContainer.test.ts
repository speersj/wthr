import mockedAxios from "axios";
import LocationContainer, {
  getDefaults,
} from "../../containers/LocationContainer";
import { setGeoAPIMock, clearGeoAPIMock } from "../lib/geoAPIMock";

describe("LocationContainer", () => {
  it("is defined", () => {
    expect(LocationContainer).toBeDefined();
    expect(new LocationContainer()).toBeDefined();
  });

  describe("init", () => {
    it("sets the host name", async () => {
      const container = new LocationContainer();
      await container.init("test.com");
      expect(container.state.hostName).toEqual("test.com");
    });
  });

  describe("coords", () => {
    it("returns coordinates", () => {
      const container = new LocationContainer();
      container.state.coords = { lat: 45, lng: -122 };
      expect(container.coords).toEqual({ lat: 45, lng: -122 });
    });
  });

  describe("locationName", () => {
    it("returns human-readable name of location", () => {
      const container = new LocationContainer();
      container.state.name = "Eugene, Oregon";
      expect(container.locationName).toEqual("Eugene, Oregon");
    });
  });

  describe("loadCurrentLocation", () => {
    beforeEach(() => {
      window.localStorage.clear();
      clearGeoAPIMock();
    });

    it("loads defaults if localStorage/browser are not available", async () => {
      const container = new LocationContainer();
      await container.loadCurrentLocation();
      await container.init("test.com");
      expect(container.state).toEqual({
        ...getDefaults(),
        hostName: "test.com",
      });
    });

    it("loads from local storage if available", async () => {
      const container = new LocationContainer();
      const coords = { lat: 90, lng: 120 };
      const cached = JSON.stringify({ name: "Somewhere", coords });

      window.localStorage.setItem("location", cached);
      container.init("hostname");
      await container.loadCurrentLocation();

      expect(container.coords).toEqual(coords);
      expect(container.state.name).toEqual("Somewhere");
    });

    it("loads browser GPS and reverse geocodes results to get location name", async () => {
      setGeoAPIMock({ latitude: 30, longitude: 60 });
      const data = mockReverseGeocodeData();
      (mockedAxios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ data }),
      );
      const container = new LocationContainer();
      container.init("hostname");
      await container.loadCurrentLocation();

      expect(container.coords).toEqual({ lat: 30, lng: 60 });
      expect(container.locationName).toEqual("Corvallis, Oregon");
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://hostname/api/reverse-geocode?lat=30&lng=60",
      );
    });
  });

  describe("loadCoords", () => {
    it("sets coordinates", async () => {
      const container = new LocationContainer();
      await container.loadCoords({ lat: 45, lng: 90 });
      expect(container.coords).toEqual({ lat: 45, lng: 90 });
    });

    it("sets the location name as ??? if reverse geocoding fails", async () => {
      const container = new LocationContainer();
      await container.loadCoords({ lat: 45, lng: 90 });
      expect(container.locationName).toEqual("???");
    });

    it("sets the location name using reverse-geocode api", async () => {
      const data = mockReverseGeocodeData();
      (mockedAxios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ data }),
      );
      const container = new LocationContainer();
      await container.init("hostname");
      await container.loadCoords({ lat: 45, lng: 99 });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://hostname/api/reverse-geocode?lat=45&lng=99",
      );
      expect(container.locationName).toEqual("Corvallis, Oregon");
    });

    it("uses the county name if city is not returned from api", async () => {
      const data = mockReverseGeocodeData();
      delete data.address.city;
      (mockedAxios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ data }),
      );
      const container = new LocationContainer();
      await container.init("hostname");
      await container.loadCoords({ lat: 45, lng: 99 });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://hostname/api/reverse-geocode?lat=45&lng=99",
      );
      expect(container.locationName).toEqual("Benton County, Oregon");
    });
  });
});

// // sample response data from LocationIQ
function mockReverseGeocodeData() {
  return {
    place_id: "331243605871",
    osm_type: "way",
    osm_id: "20360349",
    licence:
      "© LocationIQ.com CC BY 4.0, Data © OpenStreetMap contributors, ODbL 1.0",
    lat: "44.564656",
    lon: "-123.262042",
    display_name:
      "Monroe Avenue, Corvallis, Benton County, Oregon, United States",
    boundingbox: ["44.563835", "44.565998", "-123.267281", "-123.258805"],
    importance: 0.225,
    address: {
      road: "Monroe Avenue",
      city: "Corvallis",
      county: "Benton County",
      state: "Oregon",
      country: "United States",
      country_code: "us",
      postcode: "97330",
    },
  };
}
