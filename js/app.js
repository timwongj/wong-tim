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
	$("#scramble").text(generateScramble(20));
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
				$("#scramble").text(generateScramble(20));
				$("#times").append("<p id=\"times\">" + timeElapsed + "</p>");
			}
		}
	});
});

function generateScramble(length)
{
	var previousMove = -1;
    var secondPreviousMove = -1;
    var scramble = "";
    for (i = 0; i < length; i++)
    {
        var move = Math.floor((Math.random() * 6));
        var direction = Math.floor((Math.random() * 3));
        if (((previousMove == 0) && (secondPreviousMove != 1)) || ((previousMove == 1) && (secondPreviousMove != 0)) || ((previousMove == 2) && (secondPreviousMove != 3)) || ((previousMove == 3) && (secondPreviousMove != 2)) || ((previousMove == 4) && (secondPreviousMove != 5)) || ((previousMove == 5) && (secondPreviousMove != 4)))
            secondPreviousMove = -1;
        while ((move == previousMove) || (move == secondPreviousMove))
            move = Math.floor((Math.random() * 6));
        switch (move)
        {
            case 0: scramble = scramble.concat("U"); break;
            case 1: scramble = scramble.concat("D"); break;
            case 2: scramble = scramble.concat("L"); break;
            case 3: scramble = scramble.concat("R"); break;
            case 4: scramble = scramble.concat("F"); break;
            case 5: scramble = scramble.concat("B"); break;
        }
        switch (direction)
        {
            case 1: scramble = scramble.concat("'"); break;
            case 2: scramble = scramble.concat("2"); break;
        }
        secondPreviousMove = previousMove;
        previousMove = move;
        if (i < length - 1)
            scramble = scramble.concat(" ");
    }
    return scramble;
}

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