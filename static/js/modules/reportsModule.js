WHOAT.reports = (function($, w, undefined) {
    'use strict';

    function init() {
        loadReports()
    }

    //TRACK PAGE VIEWS
    var loadReports = function() {
        // alert("hi");
    };

    var Chart = function(settings) {

        this.settings = $.extend({}, { // defaults
            path: "assets/img/reports/images/",
            route_path: "",
            propNames: {},
            category_field: 'date',
            graphs: [],
            divId: "",
            periodType: "DD",
            graphType: "daily"
        }, settings);

        this.chart = new AmCharts.AmSerialChart();
        this.chart.categoryField = this.settings.category_field;
        this.load_data(this.settings);

    };

    Chart.prototype = {

        add_graph: function(graphSetting) {
            graphSetting = $.extend({}, {
                position: "left",
                offset: null,
                axisColor: "#000000",
                valueField: "Default",
                lineTitle: "My Graph"
            }, graphSetting);

            var valueAxis = new AmCharts.ValueAxis();
            valueAxis.position = graphSetting.position;
            if (graphSetting.offset == null) {

            } else {
                valueAxis.offset = graphSetting.offset;
            }
            valueAxis.gridAlpha = 0;
            valueAxis.axisColor = graphSetting.axisColor;
            valueAxis.axisThickness = 2;
            this.chart.addValueAxis(valueAxis);

            var graph = new AmCharts.AmGraph();
            graph.valueAxis = valueAxis;
            graph.valueField = graphSetting.valueField;
            graph.title = graphSetting.lineTitle;
            graph.bullet = "round";
            graph.hideBulletsCount = 30;
            graph.bulletBorderThickness = 1;
            this.chart.addGraph(graph);
        }, 
        load_data: function(settings) {
            var self = this;
            // var t = new WHOAT.networking.Network({
            //     url: settings.route_path,
            //     params: null,
            //     callback: function(response){
            //         var myJson = JSON.parse(response);
            //         self.format_data(myJson, settings);
            //     },
            //     postingType: 'POST',
            //     isTracked: false
            // })
            WHOAT.networking.getToServerWithAjax(settings.route_path, null, function(response) {
                var myJson = JSON.parse(response);
                self.format_data(myJson, settings);
            }); // end of WHOAT networking ajax call
        },
        format_data: function(obj, settings) {
            var dFirst = obj.f_date;
            var dLast = obj.l_date;
            var s_date = new Date(dFirst)
            var e_date = new Date(dLast)
            var propNames = settings.propNames;
            var place_holder = {};
            for(var n in propNames){ // put the property names inside placeholder and set to 0
                place_holder[n] = 0; // so that we can build cumulative data starting at 0
            }
            var chartData = [];
            s_date.setDate(s_date.getDate() - 10);
            while (s_date <= e_date) {
                var newDate = new Date(s_date);
                // new date is the key to lookup a value in a dictionary
                // First, make the key match the data
                var m = newDate.getMonth() + 1;
                var month = (m < 10) ? '0' + m : m;
                var d = newDate.getDate();
                var day = (d < 10) ? '0' + d : d;
                var key = month + '-' + day + '-' + newDate.getFullYear();

                //var propNames = settings.propNames;
                //     'intro_totals': 'intros', 
                //     'member_totals': 'members'
                // };

                var chartDay_total_Data = {
                    date: newDate
                };
                for (var name in propNames) {
                    var returnName = propNames[name],
                        val;
                    if (val = (obj[key] && obj[key][name])) { //if obj['a_record_date']['1/1/2001'] ( the key exists in dictionary)
                        chartDay_total_Data[returnName] = val;
                        place_holder[name] = val;
                    } else {
                        if(settings.graphType === "daily"){
                            chartDay_total_Data[returnName] = 0;
                        }
                        else if (settings.graphType === "cumulative"){
                            chartDay_total_Data[returnName] = place_holder[name];
                        }//end else if inside else
                        
                    }// end else
                } //end for
                chartData.push(chartDay_total_Data);

                newDate.setDate(newDate.getDate() + 1); // increment new date
                s_date = newDate; // increment start date with the new date for next loop through while
            } // end of while
            this.chart.dataProvider = chartData;
            this.initializeGraph();
        },
        initializeGraph: function(){
            this.chart.pathToImages = this.settings.path;
            this.chart.addListener("dataUpdated", $.proxy(this.zoom, this));

            var categoryAxis = this.chart.categoryAxis;
            categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
            categoryAxis.minorGridEnabled = true;
            categoryAxis.axisColor = "#DADADA";
            switch (this.settings.periodType) {
                case "DD":
                case "WW":
                case "MM":
                case "YYYY":
                    categoryAxis.minPeriod = this.settings.periodType;
                    break;
                default:
                    categoryAxis.minPeriod = "DD";
                    break;
            }

            // this.add_graph(this.settings.graphs[0]); // todo
            for (var i = 0; i < this.settings.graphs.length; i++) {
                this.add_graph(this.settings.graphs[i]);
            }
            this.add_chart_cursor();
            this.add_scrollbar();
            this.add_legend();
            this.chart.write(this.settings.divId);
        
        },
        add_chart_cursor: function() {
            var chartCursor = new AmCharts.ChartCursor();
            chartCursor.cursorPosition = "mouse";
            this.chart.addChartCursor(chartCursor);
        },
        add_scrollbar: function() {
            // SCROLLBAR
            var chartScrollbar = new AmCharts.ChartScrollbar();
            this.chart.addChartScrollbar(chartScrollbar);
        },
        add_legend: function() {
            // LEGEND
            var legend = new AmCharts.AmLegend();
            legend.marginLeft = 110;
            legend.useGraphSettings = true;
            this.chart.addLegend(legend);
        },
        zoom: function(x, y) {
            // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
            this.chart.zoomToIndexes(10, 20);
        }
    };

    return {
        Chart: Chart,
        init: init
    };
})(jQuery, window);

$(document).ready(function() {
    WHOAT.reports.init();
});