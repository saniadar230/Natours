/* eslint-disable */

console.log('hello from the client side :D');
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2FuaWFkYXIyMzAiLCJhIjoiY205bHZkeXQ2MDhnNjJrcXVlNXM5bzI0YyJ9.E7wOSh6btIC3ZwCX68sH7g';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/saniadar230/cm9lvu21i005h01qsc6asf5jp',
  scrollZoom: false
  //   center: [-118.113491, 34.111745],
  //   zoom: 10,
  //   interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // Create Marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description} </p> `)
    .addTo(map);

  // Extend mpp bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
});
