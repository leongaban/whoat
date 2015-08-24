<!DOCTYPE html>
<html>
<head>
    <style>
    #map-canvas { position:relative; top:0; bottom:0; width:100%; min-height: 400px; }

    .heatmap {
        image-filters:colorize-alpha(blue, cyan, green, yellow , orange, red);
        comp-op:multiply;
        marker-allow-overlap:true;
        marker-file:url(/assets/img/marker.png);
    }
 </style>
</head>


<body id="body-home">
<div id="map"></div>

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
    var map = L.mapbox.map('map', map_key, {
        scrollWheelZoom: false,
        doubleClickZoom: false
    }).setView([38, -96.7985], 5);

    //console.log(features);
    var markers = {
        type: "FeatureCollection",
        features: features
    };

    // var featureLayer = map.featureLayer(markers).addTo(map);
    // map.markerLayer.setGeoJSON(markers);
    var jsonGEO = L.geoJson(markers, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: feature.properties.count
            })
        }
    }).addTo(map);

    $(jsonGEO).toggle(function(e) {
        var markerTooltip = e.originalEvent.layer,
            markerFeature = markerTooltip.feature;

        var popupContent = markerFeature.properties.title;

        markerTooltip.bindPopup(popupContent, {
            closeButton: true,
            minWidth: 100
        }).openPopup();;
    }, function(e) {
        e.originalEvent.layer.closePopup();
        e.originalEvent.layer.unbindPopup();
        window.open(e.originalEvent.layer.feature.properties.url);
    });

// map.markerLayer.on('click', function(e) {
//     e.layer.unbindPopup();
//       window.open(e.layer.feature.properties.url);
// });
</script>
</body>
</html>