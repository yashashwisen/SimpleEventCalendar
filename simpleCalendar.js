'use strict';

var data = {};
var today = new Date();
var selectedFullDate = {
    actualDate: today,
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
    months: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'Aug', 'September', 'October', 'November', 'December'],
    day: today.getDay(),
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
    header: function () {
        return this.months[this.month] + ' ' + this.year;
    },
    toString: function () {
        return this.days[this.day] + ' ' + this.months[this.month] + ' ' + this.date + ', ' + this.year;
    },
    setDate: function (date) {
        this.actualDate = date;
        this.day = this.actualDate.getDay();
        this.date = this.actualDate.getDate();
        this.month = this.actualDate.getMonth();
        this.year = this.actualDate.getFullYear();
    }
};

$(document).ready(function () {
    $('simpleCalendar').html(mainContainerHtml);
    var left = $('#monthYearPicker')[0].offsetLeft;
    $('.simpleCalendarDatePicker').css('left', left + 'px');
    setTable();
    $('.simpleCalendarTable tbody td:not(.notCurrMonth)')[selectedFullDate.date - 1].classList.toggle('selected');
    document.querySelector('.simpleCalendarContainer .simpleCalendarHeader .calendarMonthYear').innerHTML = selectedFullDate.header();

    $('.simpleCalendarHeader .glyphicon-circle-arrow-left').click(prevMonth);
    $('.simpleCalendarHeader .glyphicon-circle-arrow-right').click(nextMonth);
    updateDatePickerBtn(selectedFullDate.year);

    $('#monthYearPicker').click(toggleSimpleCalendarDatePicker);
    $('.simpleCalendarContainer .datePickerLeftBtn').click(prevYear);
    $('.simpleCalendarContainer .datePickerRightBtn').click(nextYear);
    $('.simpleCalendarTable').click(function () {
        if (!$('.simpleCalendarDatePicker').is(':hidden')) {
            toggleSimpleCalendarDatePicker();
        }
    });
});

$(window).resize(function () {
    var left = $('#monthYearPicker')[0].offsetLeft;
    $('.simpleCalendarDatePicker').css('left', left + 'px');
});

function toggleSimpleCalendarDatePicker() {
    $('.simpleCalendarDatePicker').animate({
        height: 'toggle'
    }, 300);
}

function showEvents(hasEvents) {
    var eventsData;
    if (!hasEvents) {
        eventsData = '<ul class="list-group">' + '<li class="noEventDiv">No Events Today :)</li>' + '</ul>';
    } else {
        eventsData = getEventDivHtml(selectedFullDate.date);
    }

    //start the div with empty fields.
    $('.simpleCalendarContainer > .row > div:nth-child(2) .panel-heading > span').html('');
    $('.simpleCalendarContainer > .row > div:nth-child(2) .panel-body').html('');

    //animate the events
    if ($('.simpleCalendarContainer > .row > div:nth-child(2)').is(':hidden')) {
        $('.simpleCalendarContainer > .row > div:nth-child(2)').animate({
            width: 'toggle'
        }, 300, 'linear', function () {
            $('.simpleCalendarContainer > .row > div:nth-child(2) .panel-heading > span').html(selectedFullDate.toString());
            $('.simpleCalendarContainer > .row > div:nth-child(2) .panel-body').html(eventsData);
        });
    } else {
        $('.simpleCalendarContainer > .row > div:nth-child(2)').toggle(50, 'linear', function () {
            $('.simpleCalendarContainer > .row > div:nth-child(2)').animate({
                width: 'toggle'
            }, 300, 'linear', function () {
                $('.simpleCalendarContainer > .row > div:nth-child(2) .panel-heading > span').html(selectedFullDate.toString());
                $('.simpleCalendarContainer > .row > div:nth-child(2) .panel-body').html(eventsData);
            });
        });
    }

}

function prevMonth() {
    selectedFullDate.actualDate.setMonth(selectedFullDate.month - 1);
    selectedFullDate.setDate(selectedFullDate.actualDate);
    document.querySelector('.simpleCalendarContainer .simpleCalendarHeader .calendarMonthYear').innerHTML = selectedFullDate.header();
    setTable();
}

function nextMonth() {
    selectedFullDate.actualDate.setMonth(selectedFullDate.month + 1);
    selectedFullDate.setDate(selectedFullDate.actualDate);
    document.querySelector('.simpleCalendarContainer .simpleCalendarHeader .calendarMonthYear').innerHTML = selectedFullDate.header();
    setTable();
}

function setClickHandler() {
    $('.simpleCalendarTable tbody td:not(.notCurrMonth)').click(function () {
        $('td.selected').toggleClass('selected');
        $(this).toggleClass('selected');
        var date = $(this).find('span').html();
        selectedFullDate.actualDate.setDate(date);
        selectedFullDate.setDate(selectedFullDate.actualDate);
        if (Object.keys(data).length === 0 && (JSON.stringify(data) === JSON.stringify({}))) {
            showEvents(false);
        } else if (!hasEventsCheck(date)) {
            showEvents(false);
        } else {
            showEvents(true);
        }
    });
}

function hasEventsCheck(day) {
    var hasEvent = false;
    data.monthEvents.forEach(function (obj, index) {
        if (obj.day == day) {
            hasEvent = true;
            return false;
        }
    });
    return hasEvent;
}

function setTable() {
    var table = '';
    var start = new Date(selectedFullDate.year, selectedFullDate.month, 1);
    start.setDate(start.getDate() - start.getDay());

    for (var i = 0; i < 6; ++i) {
        table += '<tr>';
        do {
            if (start.getMonth() != selectedFullDate.month) {
                table += '<td class="notCurrMonth"><span>' + start.getDate() + '</span></td>';
            } else {
                table += '<td><span>' + start.getDate() + '</span></td>';
            }
            start.setDate(start.getDate() + 1);
        } while (start.getDay() !== 0);
        table += '</tr>';
    }
    $('.simpleCalendarTable tbody').html(table);
    setClickHandler();
    getMonthData();
}

function updateCalendarWithData() {
    var tableDataElements = $('tbody td:not(.notCurrMonth)>span');
    data.monthEvents.forEach(function (obj, index) {
        addEventIndicator(tableDataElements[obj.day - 1]);
    });
}

function addEventIndicator(ele) {
    var hasEventEle = $('<div class="hasEvent"></div>');
    $(ele).after(hasEventEle);
}

function getEventDivHtml(day) {
    var listOfEvent = '<ul class="list-group">';

    data.monthEvents.forEach(function (obj, index) {
        if (obj.day == day) {
            for (var x = 0; x < obj.dayEvents.length; ++x) {
                listOfEvent += '<li class="list-group-item">';
                if (obj.dayEvents[x].time)
                    listOfEvent += '<span>' + obj.dayEvents[x].time + '</span>';
                if (obj.dayEvents[x].name)
                    listOfEvent += '<p><b>' + obj.dayEvents[x].name + '</b></p>';
                if (obj.dayEvents[x].location)
                    listOfEvent += '<p>Location: ' + obj.dayEvents[x].location + '<p>';
                if (obj.dayEvents[x].description)
                    listOfEvent += '<p>' + obj.dayEvents[x].description + '<p>';
                listOfEvent += '</li>';
            }
        }
    });

    listOfEvent += '</ul>';
    return listOfEvent;
}

function getMonthData() {
    var success = function (_data) {
        data = _data;
        updateCalendarWithData();
    };
    var error = function (errorCode) {
        data = {};
        console.log('Server responded with the error code: ' + errorCode);
    };
    simpleCalendar.getData($('simpleCalendar')[0].id, selectedFullDate.year, selectedFullDate.month, success, error);
}

function updateDatePickerBtn(centerYear) {
    var toReturn = '';
    var yearCount = Number(centerYear) - 4;
    for (var i = 0; i < 12; ++i) {
        toReturn += '<button class="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xss-4 btn btn-default">' + yearCount + '</button>';
        yearCount++;
    }
    $('.simpleCalendarDatePicker .datePickerYearsButton').html(toReturn);
    $('.simpleCalendarContainer .datePickerYearsButton > button').click(newYearClicked);
    $('.simpleCalendarDatePicker .datePickerYearRange').html((Number(centerYear) - 4) + '-' + (Number(centerYear) + 7));
}

function newYearClicked() {
    selectedFullDate.actualDate.setFullYear($(this).html());
    selectedFullDate.setDate(selectedFullDate.actualDate);
    document.querySelector('.simpleCalendarContainer .simpleCalendarHeader .calendarMonthYear').innerHTML = selectedFullDate.header();
    setTable();
    if (!$('.simpleCalendarDatePicker').is(':hidden')) {
        toggleSimpleCalendarDatePicker();
    }
}

function prevYear() {
    var centerYear = $('.simpleCalendarDatePicker .datePickerYearsButton > button')[4].innerHTML;
    updateDatePickerBtn(Number(centerYear) - 12);
}

function nextYear() {
    var centerYear = $('.simpleCalendarDatePicker .datePickerYearsButton > button')[4].innerHTML;
    updateDatePickerBtn(Number(centerYear) + 12);
}

var mainContainerHtml = '<div class="container-fluid simpleCalendarContainer"><div class="row"><div class="col-lg-8 col-md-8 col-sm-8 col-xs-12"><div class="panel panel-primary"><div class="row simpleCalendarHeader"><div><span class="glyphicon glyphicon-circle-arrow-left"></span></div><div><span class="calendarMonthYear"></span><span id="monthYearPicker" class="glyphicon glyphicon-triangle-bottom"></span><div class="customPopover"><div><div> Year & Month </div><div> Date: <input type="text" placeholder="YEAR"></div></div></div></div><div><span class="glyphicon glyphicon-circle-arrow-right"></span></div></div><table class="table simpleCalendarTable"><thead><td>SUN</td><td>MON</td><td>TUE</td><td>WED</td><td>THU</td><td>FRI</td><td>SAT</td></thead><tbody></tbody><div class="simpleCalendarDatePicker"><div class="row"><button class="datePickerLeftBtn btn btn-default col-lg-2 col-md-2 col-sm-2 col-xs-2 col-xss-2">&lt;</button><span class="datePickerYearRange btn btn-default col-lg-8 col-md-8 col-sm-8 col-xs-8 col-xss-10">2005-2020</span><button class="datePickerRightBtn btn btn-default col-lg-2 col-md-2 col-sm-2 col-xs-2 col-xss-2">&gt;</button></div><div class="row datePickerYearsButton"></div></div></table></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="panel panel-primary"><div class="panel-heading"><span>Events</span></div><div class="panel-body"></div></div></div></div></div>';