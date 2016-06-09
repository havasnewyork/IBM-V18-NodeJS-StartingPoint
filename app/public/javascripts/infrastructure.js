jQuery(function($) {
  // var firstDraw = false;

  var map;

  function drawMap() {
      // var animate = ;

       //basic map config with custom fills, mercator projection
      var container = $('#map-box'); //document.getElementById('map-box');
      container.html("");

      var parent = $('#ocean-infrastructure-map');
      var mapHeight = parent.height();
      var inlineMode = false;
      var inlineSelector = $("#map-selector-parent").html('<option selected>Select a location</option>');
      if (mapHeight < 600) {
        inlineMode = true;
      }
      // console.log('draw map is inline:', inlineMode);

      function trackDetailView(data) {
        // IBMCore.common.widget.ocean_tracking.fireMapEvent()
        setTimeout(function(){
          if (IBMCore.common.widget.ocean_tracking) IBMCore.common.widget.ocean_tracking.fireMapEvent(data);
        }, 100);
      }

      function renderTemplate(geography, data) {
        // console.log('renderTemplate', inlineMode);
        var classes = "ocean-infrastructure-detail";
        if (data.longitude > 0) classes += ' eastern'; // eastern hemisphere adjust popover to left
        if (inlineMode) classes += ' inline';
        var out = '<div class="' + classes + '"><h1 class="ibm-h3">';
        out += data.name + ' ' + (data.dataCenter ? "Data Center" : "Network POP") + "</h1>";

        // if (data.count) out += "<h3 class='ocean-h2'>Softlayer has " + data.count + " in " + data.name + "</h2>";
        if (data.cap) out += '<div class="ocean-infrastructure-figure">Server capacity<span>' + data.cap + '</span></div>';
        // if (data.net) out += '<div class="ocean-infrastructure-figure">Network Connectivity<span>' + data.net + '</span></div>';
        out += '</div>';
        trackDetailView(data);
        return out;
      }

      function renderInlineTemplate(geo, data) {
        var out = renderTemplate(geo, data);

        $("#map-detail").html(out);
        return "";
        
      }

       // console.log
      map = new Datamap({
        done: function(datamap) {
          // console.log('map done:', datamap);
          // preserveAspectRatio="xMidYMid meet"
          datamap.svg[0][0].setAttribute('preserveAspectRatio', 'xMidYMid meet'); 
          // datamap.svg[0][0].setAttribute('viewBox', '0 0 960 960'); 
          datamap.svg[0][0].setAttribute('width', '100%'); 
        }, 
        scope: 'world',
        element: container.get(0),
        // responsive: true,
        projection: 'mercator',
        height: mapHeight,
        fills: {
          defaultFill: '#fff',
          black: 'rgb(60,70,70)', // cool grey 70
          red: 'rgb(255,80,80)', // red 40
          paths: ''
        },
        geographyConfig: {
          hideAntarctica: true,
          popupOnHover: false, //disable the popup while hovering
          highlightOnHover: false,
        },
        arcConfig: {
          strokeColor: 'rgb(174, 174, 174)',  // grey 50
          strokeWidth: 1,
          arcSharpness: 0.4,
          animationSpeed: 600,
          greatArc: true
        },
        bubblesConfig: {
          borderWidth: 0,
          borderColor: '#FFFFFF',
          popupOnHover: true,
          popupTemplate: renderTemplate,
          fillOpacity: 1,
          highlightOnHover: true,
          highlightFillColor: 'rgba(60,70,70, 0.3)',
          highlightBorderColor: 'transparent',
          highlightBorderWidth: 0,
          highlightFillOpacity: 0.85
        }
      });
      
      


      function renderInlineSelector(cityData) {
        var output = Mustache.render("<option value='{{name}}'>{{name}}</option>", cityData);
        inlineSelector.append(output);
      }
      inlineSelector.on('change', function(evt){
        // console.log('selecting a city:', $(this).val());
        var city = $(this).val();
        
        renderInlineTemplate(cities[city].geoData, cities[city].geoData);
      })

      var cities = {
        // data centers & network POP
          "Amsterdam": {count: "2 data centers", latitude: 52.3667, longitude: 4.9000, dc: true, cap: "8,000+", net: "100Mbps"},
          "Dallas": {count: "6 data centers", latitude: 32.7767, longitude: -96.7970, dc: true, cap: "40,000+", net: "100Mbps"},
          "Frankfurt": {count: "1 data center", latitude: 50.1167, longitude: 8.6833, dc: true, cap: "7,000+", net: "100Mbps"},
          "Hong Kong": {count: "1 data center", latitude: 22.2783, longitude: 114.1747, dc: true, cap: "8,000+", net: "100Mbps"},
          "Houston": {count: "1 data center", latitude: 29.7604, longitude: -95.3698, dc: true, cap: "17,000+", net: "100Mbps"},
          "London": {count: "1 data center", latitude: 51.5072, longitude: 0.1275, dc: true, cap: "8,000+", net: "100Mbps"},
          "Melbourne": {count: "1 data center", latitude: -37.8136, longitude: 144.9631, dc: true, cap: "15,000+", net: "100Mbps"},
          "Milan": {count: "1 data center", latitude: 45.4667, longitude: 9.1833, dc: true, cap: "8,000+", net: "100Mbps"},
          "Montreal": {count: "1 data center", latitude: 45.5017, longitude: -73.5673, dc: true, cap: "10,000+", net: "100Mbps"},
          "Paris": {count: "1 data center", latitude: 48.8567, longitude: 2.3508, dc: true, cap: "10,000+", net: "100Mbps"},
          "Querétaro": {count: "1 data center", latitude: 20.5875, longitude: -100.3928, dc: true, cap: "10,000+", net: "100Mbps"},
          "San Jose": {count: "2 data centers", latitude: 37.3382, longitude: -121.8863, dc: true, cap: "12,000+", net: "100Mbps"},
          "Sao Paulo": {count: "1 data center", latitude: -23.5500, longitude: -46.6333, dc: true, cap: "9,000+", net: "100Mbps"},
          "Seattle": {count: "1 data center", latitude: 47.6097, longitude: -122.3331, dc: true, cap: "10,000+", net: "100Mbps"},
          "Singapore": {count: "1 data center", latitude: 1.3000, longitude: 103.8000, dc: true, cap: "16,000+", net: "100Mbps"},
          "Sydney": {count: "1 data center", latitude: -33.8650, longitude: 151.2094, dc: true, cap: "7,500+", net: "100Mbps"},
          "Tokyo": {count: "1 data center", latitude: 35.6833, longitude: 139.6833, dc: true, cap: "8,000+", net: "100Mbps"},
          "Toronto": {count: "1 data center", latitude: 43.7000, longitude: -79.4000, dc: true, cap: "12,000+", net: "100Mbps"},
          "Washington D.C.": {count: "2 data centers", latitude: 38.9047, longitude: -77.0164, dc: true, cap: "12,000+", net: "100Mbps"},
        // just network pops
          // denver ° N,  W
          "Denver": {latitude: 39.7392, longitude: -104.9903, net: "10GBPS"},
          // chicago ° N, ° W
          "Chicago": {latitude: 41.8369, longitude: -87.6847, net: "10GBPS"},
          // los angeles ° N, ° W
          "Los Angeles": {latitude: 34.0500, longitude: -118.2500, net: "10GBPS"},
          // atlanta ° N, ° W
          "Atlanta": {latitude: 33.7550, longitude: -84.3900, net: "10GBPS"},
          // miami ° N, ° W
          "Miami": {latitude: 25.7753, longitude: -80.2089, net: "10GBPS"},
          // new york city ° N, ° W
          "New York City": {count: "2 data centers", latitude: 40.7127, longitude: -74.0059, net: "10GBPS"},
          "Perth": {latitude: -31.9522, longitude: 115.8589, net: "10GBPS"},

      }
      var circles = [];// data for map.bubbles
      for (var city in cities) {
        var data = cities[city];
        var out = {
          name: city,
          latitude: data.latitude,
          longitude: data.longitude,
          radius: data.dc ? 5 : 4,
          dataCenter: data.dc,
          cap: data.cap,
          net: data.net,
          count: data.count,
          fillKey: data.dc ? 'red' : 'black'
        }
        cities[city].geoData = out;
        circles.push(out);
        // render into #map-selector
        renderInlineSelector(out);
      }

      var lines = [
        ["Seattle", "San Jose"],
        ["Seattle", "Denver"],
        ["Seattle", "Chicago"],
        ["San Jose", "Denver"],
        ["San Jose", "Los Angeles"],
        ["Los Angeles", "Querétaro"],
        ["Los Angeles", "Sao Paulo"],
        ["Denver", "Dallas"],
        ["Denver", "Chicago"],
        ["Chicago", "Dallas"],
        ["Chicago", "Washington D.C."],
        ["Chicago", "New York City"],
        ["Chicago", "Toronto"],
        ["Toronto", "Montreal"],
        ["Montreal", "New York City"],
        ["Houston", "Dallas"],
        ["New York City", "Washington D.C."],
        ["New York City", "Sao Paulo"],
        ["Washington D.C.", "Atlanta"],
        ["Atlanta", "Dallas"],
        ["Atlanta", "Miami"],
        ["Miami", "Houston"],
        ["Miami", "Sao Paulo"],
        ["London", "Amsterdam"],
        ["London", "Paris"],
        ["London", "Frankfurt"],
        ["Amsterdam", "Frankfurt"],
        ["Frankfurt", "Paris"],
        ["Frankfurt", "Milan"],
        ["Paris", "Milan"],
        ["Paris", "Singapore"],
        ["Singapore", "Hong Kong"],
        ["Singapore", "Tokyo", "2"],
        ["Singapore", "Perth"],
        ["Perth", "Sydney"],
        ["Perth", "Melbourne"],
        ["Sydney", "Melbourne"],
        ["Sydney", "Hong Kong"],
        ["Sydney", "Tokyo"],
        ["New York City", "London", "2"],
        ["Washington D.C.", "Amsterdam"],
      ];

      var cross_lines = [
        ["San Jose", "Tokyo"], // cross
        ["Los Angeles", "Singapore"], // cross
        ["Los Angeles", "Sydney"],// cross
        ["Los Angeles", "Melbourne"],// cross
      ];

      var arcs = [];
      for (var i in lines) {
        var data = lines[i];
        var origin = cities[data[0]];
        var dest = cities[data[1]];
        var arc = {origin: origin, destination: dest};
        if (data.length === 3) arc.arcSharpness = data[2];
        if (dest && origin) arcs.push(arc);
        if (!origin) console.log('wrong origin:', data);
        if (!dest) console.log('wrong dest:', data);
      }

      for (var j in cross_lines) {
        var data = cross_lines[j];
        var origin = cities[data[0]];
        var dest = cities[data[1]];
        // dest.longitude = (dest.longitude < 0) ? 0 : -360;
        var arc = {origin: origin, destination: dest};
        arcs.push(arc);
      }

      map.arc(arcs);
      map.bubbles(circles);

   }

   IBMCore.common.utils.browser.events.subscribe('update:size', 'browser', drawMap.bind(this, {}));

   

  $(window).load(drawMap);

});
