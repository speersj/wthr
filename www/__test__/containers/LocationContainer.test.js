// import mockedAxios from 'axios'
import LocationContainer from '../../containers/LocationContainer'

describe('init', () => {
  it('sets the host', async () => {
    const lc = new LocationContainer()
    await lc.init('host')
    expect(lc.state.host).toEqual('host')
  })
})

/* sample response data from LocationIQ
function mockReverseGeocodeData() {
  return {
    place_id: '331243605871',
    osm_type: 'way',
    osm_id: '20360349',
    licence:
      '© LocationIQ.com CC BY 4.0, Data © OpenStreetMap contributors, ODbL 1.0',
    lat: '44.564656',
    lon: '-123.262042',
    display_name:
      'Monroe Avenue, Corvallis, Benton County, Oregon, United States',
    boundingbox: ['44.563835', '44.565998', '-123.267281', '-123.258805'],
    importance: 0.225,
    address: {
      road: 'Monroe Avenue',
      city: 'Corvallis',
      county: 'Benton County',
      state: 'Oregon',
      country: 'United States',
      country_code: 'us',
      postcode: '97330',
    },
  }
}
*/
