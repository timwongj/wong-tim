$(function() {
    $(".jumbotron" ).draggable({grid:[10, 10]});
    $(".panel" ).draggable({grid:[10, 10]});
    $(".navbar-button" ).draggable({grid:[10, 10]});
    
	//updateTime(new Date());
    
});

var start, stop, isTiming = 0;

function updateTime()
{
	var dtElapsed = new Date() - start;
	
	milliseconds = (dtElapsed % 1000);
	seconds = Math.floor(dtElapsed / 1000) % 60;
	minutes = Math.floor(((dtElapsed / 1000) / 60) % 60);
				
	seconds = pad2(seconds);
	minutes = pad2(minutes);
	milliseconds = pad3(milliseconds);
				
	timeElapsed = minutes + ":" + seconds + "." + milliseconds;
    if (isTiming == 1)
    {
    	$("#timer").text(timeElapsed);
    }
    setTimeout(updateTime, 10);
}

$(document).ready(function(){
	var dt, timeElapsed, minutes, seconds, milliseconds, dtElapsed;
	$(document).on('keydown', function (e)
	{
		if (e.keyCode === 32)
		{
			dt = new Date();
			if (isTiming == 0)
			{
				start = dt;
				isTiming = 1;
				updateTime(start);
			}
			else
			{
				stop = dt;
				isTiming = 0;
				
				dtElapsed = stop - start;
				milliseconds = (dtElapsed % 1000);
				seconds = Math.floor(dtElapsed / 1000) % 60;
				minutes = Math.floor(((dtElapsed / 1000) / 60) % 60);
				
				seconds = pad2(seconds);
				minutes = pad2(minutes);
				milliseconds = pad3(milliseconds);
				
				timeElapsed = minutes + ":" + seconds + "." + milliseconds;
				$("#timer").text(timeElapsed);
				$("#times").append("<p id=\"times\">" + timeElapsed + "</p>");
			}
		}
	});
});

function pad2(n)
{
    return n > 9 ? "" + n: "0" + n;
}

function pad3(n){
    if (n > 99)
    	return n;
    else if (n > 9)
    	return "0" + n;
    else
    	return "00" + n;
}