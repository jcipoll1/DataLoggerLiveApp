var intervalID;
$.ajaxSetup({ cache: false });

function getDataFromDataLogger() {

    var datalogger = $('#data-logger-input').val();
    var datalistname = 'time';
    var timeinterval = 1000;

    var queryString =
        'http://'
        + datalogger
//        + ':443'
        + '/' + datalistname + '.json';

    

    intervalID = setInterval(function (results) {

        $.getJSON(queryString, function (results) {

            showData(results);

        }).fail(function (jqXHR) {
            $('#error-msg').show();
            $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
        });

    }, timeinterval);

    //Hide Button for Unnecessary Option
    $('#get-data-btn').hide();
    //Show Button for Necessary Option
    $('#stop-data-btn').show();

    return false;
}

function showData(results) {

    if (results.hasOwnProperty.length) {

        $('#error-msg').hide();
        $('#data-logger-data').show();

        $('#title').text(results.name);
 //       $('#temperature').text(results.main.temp);
        $('#hours').text(results.hours);
        $('#minutes').text(results.minutes);
        $('#seconds').text(results.seconds);

//        var sunriseDate = new Date(results.sys.sunrise * 1000);
//        $('#sunrise').text(sunriseDate.toLocaleTimeString());

//        var sunsetDate = new Date(results.sys.sunset * 1000);
//        $('#sunset').text(sunsetDate.toLocaleTimeString());

    } else {
        $('#data-logger-data').hide();
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. ");
    }
}

function stopDataFromDataLogger() {
    //Stop Data Request
    clearInterval(intervalID);
    //Hide Stale Data
    $('#data-logger-data').hide();
    //Hide Button for Unnecessary Option
    $('#stop-data-btn').hide();
    //Show Button for Necessary Option
    $('#get-data-btn').show();
    
}