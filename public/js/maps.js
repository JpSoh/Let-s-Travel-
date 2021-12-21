var platform = new H.service.Platform({
    'apikey': 'nz6pO2fnw3k4fJu4OZPvFb2XYtSujhFh1FyLrSWk6aI'
  });

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();
// Get an instance of the geocoding service:
var service = platform.getSearchService();
//Take the title of the landmark
let landmark = document.querySelector(".main-heading").textContent;

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
service.geocode({
  q: landmark
}, (result) => {
  var map = new H.Map(
    document.querySelector('.map'),
    //Type of map
    defaultLayers.vector.normal.map,
    {
      zoom: 10, 
      center: result.items[0].position
    });
  map.addObject(new H.map.Marker(result.items[0].position));
  var ui = H.ui.UI.createDefault(map, defaultLayers);
}, alert);



