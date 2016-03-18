# SimpleEventCalendar
Hello Everyone.

Welcome to the GitHub repository of Simple Event Calendar a responsive open source calendar. 

The idea of this is to create a jQuery module with Bootstrap so that anybody who wants to simply implement a calendar that can show dates as well as corresponding events without writing a lot of codes.

There are three simple steps to the process:

1. Include things needed:
    - Bootstrap CSS file whether using a CDN or downloading actual file (in my example I am using version #3.3.6).
    - simpleCalendar.css from this repository.
    - jQuery library whether using a CDN or downloading actual file (in my example I am using version #2.2.1).
    - simpleCalendar.js from this repository.

2. Copy paste this tag where exactly you want to show the calendar (make sure to give a distinct Id):
    - <simpleCalendar id="calendarId"></simpleCalendar>
    
3. Create a javascript file with a global object 'simpleCalendar' that has a function 'getData: function (id, year, month, success, error)'
    - Include the JavaScript file before simpleCalendar.js in your html.
    - Id is the id of the calendar so that you can differentiate on which calendar is asking for data and get data accordingly.
    - Year and month are incoming data that you can use to get list of all the events for that year.
    - Once you get the data call success with data object make sure to parse it with JSON and send the object. 
    - If there is an error call the error callback with error status code.
    - Data that comes must come for whole month of that year and has the format of below:
    {
        "year": #Four digit number for year,
        "month": #Number For Month (0-11),
        "monthEvents": [
            {
                "day": #Number of day,
                "dayEvents": [
                    {
                        "name": "Event Name",
                        "time": "Event Time",
                        "location": "Event Location",
                        "description": "Event Description short and simple"
                    }
                ]
            }

        ]
    }
    - You can also see the actual data I am using for this demo page in the file sampleEventsData.json

If you want to see how I am using it I have included an index.html. Also you can see how to use the simpleCalendar.getData function in the temporary.js file that I wrote for the demo.

I am putting this code hoping it will help other people this is my first code I am putting it out here for public. I am sure there are good amount of errors that I haven't gotten to test yet. There might be some best practice that I am not following here. If you find any of those fault the please be kind enough to let me know this way I shall learn as well and will fix the issue.

The code is free to use but I would like it if you are sharing with other give credit where its due.

Thanks for giving this a shot cheers and happy coding :)









'Free HTML calendar events calendars open source responsive dates JavaScript CSS simple'