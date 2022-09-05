function reverseStr(str){
    var listOfChars=str.split('');//['h','e','l','l','o']
    var reverseListOfChars=listOfChars.reverse();

    var reversedStr=reverseListOfChars.join('');

    return reversedStr;
}
function checkPalindrome(str){
    return reverseStr(str)===str;
}
function convertDateToStr(d){
    var dateStr={day:'',month:'',year:''};
    if(d.day<10) dateStr.day='0'+d.day;
    else dateStr.day=d.day.toString();
    if(d.month<10) dateStr.month='0'+d.month;
    else dateStr.month=d.month.toString();
    dateStr.year=d.year.toString();
    return dateStr;
}
function getAllDateFormats(d){
    var dateStr=convertDateToStr(d);

    var ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
    var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
    var yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
    var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
    var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;
    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}
function checkPalindromeForAllDateFormats(d){
    var arrOfFormats=getAllDateFormats(d);
    for(var i=0;i<arrOfFormats.length;i++){
        if(checkPalindrome(arrOfFormats[i])) return true;
    }
    return false;
}
function isLeapYear(year){
    if(year%400==0) return true;
    if(year%100==0) return false;
    if(year%4==0) return true;
    return false;
}
function getNextDate(d){
    var day=d.day+1;
    var month=d.month;
    var year=d.year;
    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(month===2){//check for feb
        if(isLeapYear(year)){
            if(day>29){
                day=1;
                month++;
            }
        }else{
            if(day>28){
                day=1;
                month++;
            }
        }
    }
    else{//check for others
        if(day>daysInMonth[month-1]){
            day=1;
            month++;
        }
    }
    if(month>12) {
        month=1;
        year++;
    }
    return {
        day:day,
        month:month,
        year:year
    }
}
function getNextPalindromeDate(d){
    var ctr=0;
    var nextDate=getNextDate(d);
    while(1){
        ctr++;
        var isPalindrome=checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome) break;
        nextDate=getNextDate(nextDate);
    }
    return [ctr,nextDate];
}
function getPreviousDate(d){
    var day=d.day-1;
    var month=d.month;
    var year=d.year;
    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(month===3){//check for feb
        if(isLeapYear(year)){
            if(day<1){
                day=29;
                month--;
            }
        }else{
            if(day<1){
                day=28;
                month--;
            }
        }
    }
    else{//check for others
        if(day<1){
            
            month--;
            if(month<1) {
                month=12;
                year--;
            }
            day=daysInMonth[month-1];
        }
    }
    return {
        day:day,
        month:month,
        year:year
    }
}


function getPreviousPalindromeDate(d){
    var ctr=0;
    var previousDate=getPreviousDate(d);
    while(1){
        // console.log(previousDate);
        ctr++;
        var isPalindrome=checkPalindromeForAllDateFormats(previousDate);
        if(isPalindrome) break;
        previousDate=getPreviousDate(previousDate);
    }
    return [ctr,previousDate];
}

var dateInputRef=document.querySelector("#bday-input");
var showButton=document.querySelector("#show-btn");
var outputEl=document.querySelector("#output");

function clickHandler(){
    var bDay=dateInputRef.value;
    var message="";
    if(bDay!==''){
        var listOfDate=bDay.split('-');
        var date={
            day:Number(listOfDate[2]),
            month:Number(listOfDate[1]),
            year:Number(listOfDate[0])
        };
        var isPalindrome=checkPalindromeForAllDateFormats(date);
        if(isPalindrome){
            message="Hurray!Your birthday is a Palindrome!!!";
        }else{
            var previourDate=getPreviousPalindromeDate(date);
            // console.log(previourDate[0]);
            var nextDate=getNextPalindromeDate(date);
            if(Number(previourDate[0])<Number(nextDate[0])){
                message="You just missed "+previourDate[0]+" days and the day was "+previourDate[1].day+"-"+previourDate[1].month+"-"+previourDate[1].year;
            }else{
                message="You just missed "+nextDate[0]+" days and the day is "+nextDate[1].day+"-"+nextDate[1].month+"-"+nextDate[1].year;
            }
        }
    }
    else message="Pls enter the date!";
    outputEl.innerText=message;
}
showButton.addEventListener("click",clickHandler);

