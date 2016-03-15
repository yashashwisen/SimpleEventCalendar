var today = new Date();

$(document).ready(function () {
    var left = $('#monthYearPicker')[0].offsetLeft;
    $('.simpleCalendarDatePicker').css('left', left + 'px');
    updateCalendarWithData();
});

$(window).resize(function () {
    var left = $('#monthYearPicker')[0].offsetLeft;
    $('.simpleCalendarDatePicker').css('left', left + 'px');
});

$('#monthYearPicker').click(function () {
    $('.simpleCalendarDatePicker').animate({
        height: 'toggle'
    }, 300);
});

$('.simpleCalendarTable tbody td:not(.notCurrMonth)').click(function () {
    //Move the selected date indicator to the one just clicked
    $('td.selected').toggleClass('selected');
    $(this).toggleClass('selected');
    if(!hasEventsCheck($(this).find('span').html())){
        console.log('false');
        return;
    }

    $('.simpleCalendarContainer > .row > div:nth-child(2) .panel-heading > span').html('');
    $('.simpleCalendarContainer > .row > div:nth-child(2) .panel-body').html('');
    if ($('.simpleCalendarContainer > .row > div:nth-child(2)').is(':hidden')) {
        $('.simpleCalendarContainer > .row > div:nth-child(2)').animate({
            width: 'toggle'
        }, 300, 'linear', function () {
            $('.simpleCalendarContainer > .row > div:nth-child(2) .panel-heading > span').html(today);
            $('.simpleCalendarContainer > .row > div:nth-child(2) .panel-body').html(getTheData());
        });
    } else {
        $('.simpleCalendarContainer > .row > div:nth-child(2)').toggle(50, 'linear', function () {
            $('.simpleCalendarContainer > .row > div:nth-child(2)').animate({
                width: 'toggle'
            }, 300, 'linear', function () {
                $('.simpleCalendarContainer > .row > div:nth-child(2) .panel-heading > span').html(today);
                $('.simpleCalendarContainer > .row > div:nth-child(2) .panel-body').html(getTheData());
            });
        });
    }
});

$('.simpleCalendarHeader .glyphicon-circle-arrow-left').click(function () {
    console.log('Previous Months.');
});

$('.simpleCalendarHeader .glyphicon-circle-arrow-right').click(function () {
    console.log('Next Months.');
});

function hasEventsCheck(day){
    var hasEvent = false;
    data.monthEvents.forEach(function(obj, index){
        console.log('Comparing ' + obj.day + ' & ' + day + ' is: ' + (obj.day == day));
        if(obj.day == day){
            hasEvent = true;
            return false;
        }
    });
    return hasEvent;
}

function updateCalendarWithData() {
    var tableDataElements = $('tbody td:not(.notCurrMonth)>span');
    data.monthEvents.forEach(function (obj, index) {
        addEventIndicator(tableDataElements[obj.day - 1]);
    });
}

function returnEmptyData() {

}

function addEventIndicator(ele) {
    var hasEventEle = $('<div class="hasEvent"></div>');
    $(ele).after(hasEventEle);
}

function getTheData() {
    var listOfEvent = '<ul class="list-group">';
    for (var x = 0; x < data.length; ++x) {
        listOfEvent += '<li class="list-group-item">';
        listOfEvent += '<span>' +
            data[x].time + '</span><p><b>' +
            data[x].name + '</b></p><p>Location: ' +
            data[x].location + '</p><p>' +
            data[x].description + '</p>';
        listOfEvent += '</li>';
    }
    listOfEvent += '</ul>';
    return listOfEvent;
}

var data = {
    'year': 2016,
    'month': 3,
    'monthEvents': [
        {
            'day': 1,
            'dayEvents': [
                {
                    'name': 'Day 1: Soccer Match',
                    'time': '9:00am',
                    'location': 'Randalls Island',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                },
                {
                    'name': 'Day 1: Boxing Match',
                    'time': '10:00am',
                    'location': 'MSG Garden',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                },
                {
                    'name': 'Day 1: Soccer Match',
                    'time': '11:00am',
                    'location': 'Tamghas, Nepal',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                }
                ]
        },
        {
            'day': 5,
            'dayEvents': [
                {
                    'name': 'Day 5: Soccer Match',
                    'time': '9:00am',
                    'location': 'Randalls Island',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                },
                {
                    'name': 'Day 5: Boxing Match',
                    'time': '10:00am',
                    'location': 'MSG Garden',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                },
                {
                    'name': 'Day 5: Soccer Match',
                    'time': '11:00am',
                    'location': 'Tamghas, Nepal',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                }
                ]
        },
        {
            'day': 10,
            'dayEvents': [
                {
                    'name': 'Day 10: Soccer Match',
                    'time': '9:00am',
                    'location': 'Randalls Island',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                },
                {
                    'name': 'Day 10: Boxing Match',
                    'time': '10:00am',
                    'location': 'MSG Garden',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                },
                {
                    'name': 'Day 10: Soccer Match',
                    'time': '11:00am',
                    'location': 'Tamghas, Nepal',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                }
                ]
        },
        {
            'day': 15,
            'dayEvents': [
                {
                    'name': 'Day 15: Soccer Match',
                    'time': '9:00am',
                    'location': 'Randalls Island',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                },
                {
                    'name': 'Day 15: Boxing Match',
                    'time': '10:00am',
                    'location': 'MSG Garden',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                },
                {
                    'name': 'Day 15: Soccer Match',
                    'time': '11:00am',
                    'location': 'Tamghas, Nepal',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                }
                ]
        },
        {
            'day': 20,
            'dayEvents': [
                {
                    'name': 'Day 20: Soccer Match',
                    'time': '9:00am',
                    'location': 'Randalls Island',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                },
                {
                    'name': 'Day 20: Boxing Match',
                    'time': '10:00am',
                    'location': 'MSG Garden',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                },
                {
                    'name': 'Day 20: Soccer Match',
                    'time': '11:00am',
                    'location': 'Tamghas, Nepal',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                }
                ]
        },
        {
            'day': 23,
            'dayEvents': [
                {
                    'name': 'Day 23: Soccer Match',
                    'time': '9:00am',
                    'location': 'Randalls Island',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                },
                {
                    'name': 'Day 23: Boxing Match',
                    'time': '10:00am',
                    'location': 'MSG Garden',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                },
                {
                    'name': 'Day 23: Soccer Match',
                    'time': '11:00am',
                    'location': 'Tamghas, Nepal',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
                }
                ]
        },
    ]
}