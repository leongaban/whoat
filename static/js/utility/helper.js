//=========================================================================
//  HELPER FUNCTIONS
//=========================================================================
WHOAT.helper = (function ($, w, undefined) {
    'use strict';
    
    function init() {

    };

 	function optionSort(opt){
 		opt.sort(function(a,b) {
            if (a.text.toLowerCase() > b.text.toLowerCase()) return 1;
            else if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
            else return 0
        });
 	};
 	
 	function selectOptionByValue(elem, value) {
	    var opt, i = 0;
	    while (opt = elem.options[i++]) {
	        if (opt.text == value) {
	            opt.selected = true;
	            return;
	        }
	    }
	};

	var loadHeatMap = function(routePath) {
		WHOAT.networking.postToServerWithAjax(routePath, null, function(data){
			
		    var features = [],
			point = {},
			points = data['points'];
		    for (var p in points){
		    	point = points[p];
		        features.push({
		            type: "Feature",
		            properties: {
		                title: point["title"],
		                'marker-color': point["color"],
		                'marker-size': point["size"],
		                url: point["url"],
		                count: point["count"]
		            },
		            geometry: {
		                type: "Point",
		                coordinates: [point["lon"], point["lat"]]
		            }
		        });
		    };

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
		    			i._radius = i._radius - 10
		    		}else{
	                	i._radius = i._radius + 10
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
		});
	};

	var wireMinimize = function(widget) {
		var mini = false,
		    wig  = (widget+' .widget_content'),
		    btn  = (widget+' .minimize');

		// $(+widget+' .minimize').unbind('click').bind('click', function () {
		$(btn).unbind('click').bind('click', function () {
			if (mini) {
				$(wig).show();
				$(this).css('background-position', '-160px -320px');
				mini = false;
			} else {
				$(wig).hide();
				$(this).css('background-position', '-186px -320px');
				mini = true;
			}
		});
	};

 	var htmlEscape = function(str) {

 		var cleaned = str;
		var htmlElements = [
			'<html>', '<head>', '<title>', '<base>', '<link>', '<meta>', '<style>', '<script>', '<noscript>', '<template>', '<body>', '<section>', '<nav>', '<article>', '<aside>', '<h1>', '<h2>', '<h3>', '<h4>', '<h5>', '<h6>', '<header>', '<footer>', '<address>', '<main>', '<p>', '<hr>', '<pre>', '<blockquote>', '<ol>', '<ul>', '<li>', '<dl>', '<dt>', '<dd>', '<figure>', '<figcaption>', '<div>', '<a>', '<em>', '<strong>', '<small>', '<s>', '<cite>', '<q>', '<dfn>', '<abbr>', '<data>', '<time>', '<code>', '<var>', '<samp>', '<kbd>', '<sub>', '<sup>', '<i>', '<b>', '<u>', '<mark>', '<ruby>', '<rt>', '<rp>', '<bdi>', '<bdo>', '<span>', '<br>', '<wbr>', '<ins>', '<del>', '<img>', '<iframe>', '<embed>', '<object>', '<param>', '<source>', '<video>', '<audio>', '<track>', '<canvas>', '<area>', '<map>', '<svg>', '<math>', '<table>', '<caption>', '<colgroup>', '<col>', '<tbody>', '<thead>', '<tfoot>', '<tr>', '<td>', '<th>', '<form>', '<fieldset>', '<legend>', '<label>', '<input>', '<button>', '<select>', '<optgroup>', '<option>', '<datalist>', '<textarea>', '<keygen>', '<output>', '<progress>', '<meter>', '<summary>', '<details>', '<menuitem>', '<menu>', '</html>', '</head>', '</title>', '</base>', '</link>', '</meta>', '</style>', '</script>', '</noscript>', '</template>', '</body>', '</section>', '</nav>', '</article>', '</aside>', '</h1>', '</h2>', '</h3>', '</h4>', '</h5>', '</h6>', '</header>', '</footer>', '</address>', '</main>', '</p>', '</hr>', '</pre>', '</blockquote>', '</ol>', '</ul>', '</li>', '</dl>', '</dt>', '</dd>', '</figure>', '</figcaption>', '</div>', '</a>', '</em>', '</strong>', '</small>', '</s>', '</cite>', '</q>', '</dfn>', '</abbr>', '</data>', '</time>', '</code>', '</var>', '</samp>', '</kbd>', '</sub>', '</sup>', '</i>', '</b>', '</u>', '</mark>', '</ruby>', '</rt>', '</rp>', '</bdi>', '</bdo>', '</span>', '</br>', '</wbr>', '</ins>', '</del>', '</img>', '</iframe>', '</embed>', '</object>', '</param>', '</source>', '</video>', '</audio>', '</track>', '</canvas>', '</area>', '</map>', '</svg>', '</math>', '</table>', '</caption>', '</colgroup>', '</col>', '</tbody>', '</thead>', '</tfoot>', '</tr>', '</td>', '</th>', '</form>', '</fieldset>', '</legend>', '</label>', '</input>', '</button>', '</select>', '</optgroup>', '</option>', '</datalist>', '</textarea>', '</keygen>', '</output>', '</progress>', '</meter>', '</summary>', '</details>', '</menuitem>', '</menu>'
		]

		for (var i in htmlElements){
			var j = new RegExp(htmlElements[i], 'g');
			if(str.indexOf(j.source) > -1){
				cleaned = cleaned.replace(j, '');
			}
		}

		return cleaned;
		// return String(str)
		// .replace(/&/g, '&amp;')
		// .replace(/"/g, '&quot;')
		// .replace(/</g, '&lt;')
		// .replace(/>/g, '&gt;');
	};

    return {
        optionSort : optionSort,
        selectOptionByValue : selectOptionByValue,
 		loadHeatMap : loadHeatMap,
 		wireMinimize : wireMinimize,
 		htmlEscape : htmlEscape,
        init : init
    };

}(jQuery, window));

$(document).ready(function () {
    WHOAT.helper.init();
});