var start, stop, isTiming = 0, updateTimer = 0, allowedToUpdate = 0, solveNumber = localStorage.length;

$(document).ready(function()
{
	$(".panel").draggable({grid:[10, 10]});
	$("#resetButton").click(function () {
		localStorage.clear();
		location.reload();
	});
    for(var i = 0; i < localStorage.length; i++)
	{
    	var key = localStorage.key(i);
    	var value = localStorage[key];
    	if (key != 'length')
    		$("#times").prepend("<tr>\n<td>" + key + "</td>\n<td>" + value + "</td>\n<td>" + "</td>\n<td>" + "</tr>");
	}
	var dt, timeElapsed, minutes, seconds, milliseconds, dtElapsed;
	$("#scramble").text(generateScramble(20));
	$(document).on('keydown', function (e)
	{
		if (e.keyCode === 32)
		{
			if (isTiming == 0)
				$("#timer").css('color', 'green');
			else if (allowedToUpdate == 1)
			{
				updateTimer = 0;
				allowedToUpdate = 0;
				stop = new Date();
				dtElapsed = stop - start;
				milliseconds = (dtElapsed % 1000);
				seconds = Math.floor(dtElapsed / 1000) % 60;
				minutes = Math.floor(((dtElapsed / 1000) / 60) % 60);
				milliseconds = pad3(milliseconds);
				if (minutes == 0)
					timeElapsed = seconds + "." + milliseconds;
				else
				{
					seconds = pad2(seconds);
					timeElapsed = minutes + ":" + seconds + "." + milliseconds;
				}
				$("#timer").text(timeElapsed);
				solveNumber += 1;
				localStorage.setItem(pad2(localStorage.length + 1), timeElapsed);
				$("#times").text("");
				for(var i = 0; i < localStorage.length; i++)
				{
    				var key = localStorage.key(i);
    				var value = localStorage[key];
    				if (key != 'length')
    					$("#times").prepend("<tr>\n<td>" + key + "</td>\n<td>" + value + "</td>\n<td>" + "</td>\n<td>" + "</tr>");
				}
				$("#scramble").text(generateScramble(20));
			}
		}
	});
	$(document).on('keyup', function (e)
	{
		if (e.keyCode === 32) 
		{
			if (isTiming == 0)
			{
				$("#timer").css('color', 'black');
				isTiming = 1;
				updateTimer = 1;
				allowedToUpdate = 1;
				start = new Date();
				updateTime();
			}
			else
				isTiming = 0;
		}
	});
});

function updateTime()
{
	var elapsed = new Date() - start;
	milliseconds = (elapsed % 1000);
	seconds = Math.floor(elapsed / 1000) % 60;
	minutes = Math.floor(((elapsed / 1000) / 60) % 60);
	milliseconds = pad3(milliseconds);			
	if (minutes == 0)
		timeElapsed = seconds + "." + milliseconds;
	else
	{
		seconds = pad2(seconds);
		timeElapsed = minutes + ":" + seconds + "." + milliseconds;
	}
    if (updateTimer == 1)
    	$("#timer").text(timeElapsed);
    setTimeout(updateTime, 10);
}

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
    if (n > 9)
    	return n;
    else
    	return "0" + n;
}

function pad3(n){
    if (n > 99)
    	return n;
    else if (n > 9)
    	return "0" + n;
    else 
    	return "00" + n;
}