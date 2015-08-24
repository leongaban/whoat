<%inherit file="../master.mak"/>

<%block name="title">Your Who@ Heatmap</%block>

<%block name="head">
    <style>
        body { margin:0; padding:0; }
        #map-canvas { position:absolute; top:0; bottom:0; width:100%; }
     </style>

    ## mapbox.js
    <script type="text/javascript" src="https://api.tiles.mapbox.com/mapbox.js/v1.6.4/mapbox.js"></script>
    <%include file="../dashboard/includes.mak"/>
</%block>

<%block name="body">
    <div id="map-canvas"></div>

    <script>
        var features = [];
        % for point in points:
            features.push({
                type: "Feature",
                properties: {
                    title: '${point["title"]}',
                    'marker-color': '${point["color"]}',
                    'marker-size': '${point["size"]}',
                    url: '${point["url"]}',
                    count: '${point["count"]}'
                },
                geometry: {
                    type: "Point",
                    coordinates: [${point["lon"]}, ${point["lat"]}]
                }
            });
        % endfor
    </script>

    <script type='text/javascript'>
        var map_key = "whodat.g7c3lff7";
        var map = L.mapbox.map('map-canvas', map_key, {
            scrollWheelZoom: false,
            doubleClickZoom: false
        }).setView([38, -96.7985], 5);
        var previousZoom = map.getZoom();

        var markers = {
            type: "FeatureCollection",
            features: features
        };
        var circleArr = []
        
        map.on('zoomend', function() {
            $.each(circleArr, function(m, i) {
                if (previousZoom > map.getZoom()){
                    i._radius = parseInt(i._radius) - 10
                }else{
                    i._radius = parseInt(i._radius) + 10
                }
            });
            previousZoom = map.getZoom();
        });
        map.markerLayer = L.geoJson(markers, {
            pointToLayer: function(feature, latlng) {
                var circles = L.circleMarker(latlng, {
                    color: "#f58733",
                    radius: feature.properties.count
                })
                circleArr.push(circles);
                return circles;
            }
        }).addTo(map);
        map.markerLayer.eachLayer(function(m) {
            var markerFeature = m.feature;

            var popupContent = L.DomUtil.create('a', 'map_layer_popup');
            popupContent.href = markerFeature.properties.url;
            popupContent.target = '_blank';
            popupContent.innerHTML = markerFeature.properties.title;

            m.bindPopup(popupContent, {
                closeButton: true,
                minWidth: 100
            });
        });
    </script>
</%block>