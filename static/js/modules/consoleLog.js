//CONSOLE LOG MODULE
//======================================================================
WHOAT.consoleLog = (function ($, w, undefined) {
    'use strict';
    
    function init() {
        traceThis();
    };
    
    var traceThis = function (thing) {

        // console.log(thing);

    };

    return {
        traceThis: traceThis,
        init : init
    };

}(jQuery, window));

$(document).ready(function () {
    WHOAT.consoleLog.init();
});