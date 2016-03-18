var simpleCalendar = {
    getData: function (id, year, month, success, error) {
        console.log('Getting data for simple calendar with id: ' + id)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function(){
            if(xmlHttp.readyState === 4){
                if(xmlHttp.status === 200){
                    success(JSON.parse(xmlHttp.responseText));
                }else{
                    error(xmlHttp.status);
                }
            }
        }
        var url = 'https://demo8562377.mockable.io/getEvents/' + selectedFullDate.year + '/' + selectedFullDate.month;
        xmlHttp.open('GET', url, true);
        xmlHttp.send();
    }
};