var start, stop, isTiming = 0, updateTimer = 0, allowedToUpdate = 0;
var solveNumber = localStorage.length, scrambleType = 3, scrambleLength = 20, sessionNumber = 1;

$(document).ready(function()
{
	$("#timer").text("0.000");
	$("#sessionDropdownButton").html("Session 1 <span class=\"caret\"></span>");
	$("#sessionDropdownMenu li a").click(function(){
    	$("#sessionDropdownButton").html($(this).text() + " <span class=\"caret\"></span>");
    	$("#sessionDropdownButton").val($(this).text());
    	switch ($(this).text())
    	{
			case "Session 1": sessionNumber = 1; break;
			case "Session 2": sessionNumber = 2; break;
			case "Session 3": sessionNumber = 3; break;
			case "Session 4": sessionNumber = 4; break;
			case "Session 5": sessionNumber = 5; break;
			case "Session 6": sessionNumber = 6; break;
			case "Session 7": sessionNumber = 7; break;
			case "Session 8": sessionNumber = 8; break;
			case "Session 9": sessionNumber = 9; break;
			case "Session 10": sessionNumber = 10; break;
    	}
	});
	$("#resetButton").click(function () {
		if(confirm("Reset?"))
		{
			localStorage.clear();
			location.reload();
		}
	});
	$("#scramble2x2").click(function () {
		scrambleType = 2;
		scrambleLength = 10;
		$("#scrambleLength").val(scrambleLength);
		$("#scramble").text(generate2x2Scramble(scrambleLength));
		$("#scramble").css('font-size','18pt');
	});
	$("#scramble3x3").click(function () {
		scrambleType = 3;
		scrambleLength = 20;
		$("#scrambleLength").val(scrambleLength);
		$("#scramble").text(generate3x3Scramble(scrambleLength));
		$("#scramble").css('font-size','18pt');
	});
	$("#scramble4x4").click(function () {
		scrambleType = 4;
		scrambleLength = 40;
		$("#scrambleLength").val(scrambleLength);
		$("#scramble").text(generate4x4Scramble(scrambleLength));
		$("#scramble").css('font-size','18pt');
	});
	$("#scramble5x5").click(function () {
		scrambleType = 5;
		scrambleLength = 60;
		$("#scrambleLength").val(scrambleLength);
		$("#scramble").text(generate5x5Scramble(scrambleLength));
		$("#scramble").css('font-size','18pt');
	});
	$("#scramble6x6").click(function () {
		scrambleType = 6;
		scrambleLength = 80;
		$("#scrambleLength").val(scrambleLength);
		$("#scramble").text(generate6x6Scramble(scrambleLength));
		$("#scramble").css('font-size','16pt');
	});
	$("#scramble7x7").click(function () {
		scrambleType = 7;
		scrambleLength = 100;
		$("#scrambleLength").val(scrambleLength);
		$("#scramble").text(generate7x7Scramble(scrambleLength));
		$("#scramble").css('font-size','14pt');
	});
    for(var i = 0; i < localStorage.length; i++)
	{
    	var key = localStorage.key(i);
    	var value = localStorage[key];
    	if (key != 'length')
    		$("#times").prepend("<tr>\n<td>" + key + "</td>\n<td>" + value + "</td>\n<td>" + "</td>\n<td>" + "</tr>");
	}
	var dt, timeElapsed, minutes, seconds, milliseconds, dtElapsed;
	$("#scramble").text(generate3x3Scramble(20));
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
				if (scrambleType == 2)
					$("#scramble").text(generate2x2Scramble(scrambleLength));
				if (scrambleType == 3)
					$("#scramble").text(generate3x3Scramble(scrambleLength));
				if (scrambleType == 4)
					$("#scramble").text(generate4x4Scramble(scrambleLength));
				if (scrambleType == 5)
					$("#scramble").text(generate5x5Scramble(scrambleLength));
				if (scrambleType == 6)
					$("#scramble").text(generate6x6Scramble(scrambleLength));
				if (scrambleType == 7)
					$("#scramble").text(generate7x7Scramble(scrambleLength));
				else
					$("#scramble").text(generate3x3Scramble(scrambleLength));
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
	$(document).on('keydown', function (e)
	{
		if (e.keyCode === 13) 
		{
			scrambleLength = $("#scrambleLength").val();
			if (scrambleType == 2)
					$("#scramble").text(generate2x2Scramble(scrambleLength));
				if (scrambleType == 3)
					$("#scramble").text(generate3x3Scramble(scrambleLength));
				if (scrambleType == 4)
					$("#scramble").text(generate4x4Scramble(scrambleLength));
				if (scrambleType == 5)
					$("#scramble").text(generate5x5Scramble(scrambleLength));
				if (scrambleType == 6)
					$("#scramble").text(generate6x6Scramble(scrambleLength));
				if (scrambleType == 7)
					$("#scramble").text(generate7x7Scramble(scrambleLength));
				else
					$("#scramble").text(generate3x3Scramble(scrambleLength));
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

function generate2x2Scramble(length)
{
    var scramble = "";
    var previousOrientation = -1;
    for (i = 0; i < length; i++)
    {
        var turningOrientation = Math.floor((Math.random() * 3));
        var innerTurningLayer = Math.floor((Math.random() * 2));
        var turningDirection = Math.floor((Math.random() * 3));
        while (turningOrientation == previousOrientation)
        {
            turningOrientation = Math.floor((Math.random() * 3));
            innerTurningLayer = Math.floor((Math.random() * 2));
            turningDirection = Math.floor((Math.random() * 3));
        }
        if (turningOrientation == 0)
        {
            if (innerTurningLayer == 0)
                scramble = scramble.concat("U");
            else
                scramble = scramble.concat("D");
        }
        else if (turningOrientation == 1)
        {
            if (innerTurningLayer == 0)
                scramble = scramble.concat("F");
            else
                scramble = scramble.concat("B");
        }
        else if (turningOrientation == 2)
        {
            if (innerTurningLayer == 0)
                scramble = scramble.concat("L");
            else
                scramble = scramble.concat("R");
        }
        switch (turningDirection)
        {
            case 1: scramble = scramble.concat("'"); break;
            case 2: scramble = scramble.concat("2"); break;
        }
        previousOrientation = turningOrientation;
        if (i < length - 1)
            scramble = scramble.concat(" ");
    }
    return scramble;
}

function generate3x3Scramble(length)
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

function generate4x4Scramble(length)
{
    var scramble = "";
    var layersTurned = 0;
    var previousOrientation = -1;
    var temp = -1;
    for (i = 0; i < length; i++)
    {
        var turningOrientation = Math.floor((Math.random() * 3));
        var turningLayer = Math.floor((Math.random() * 3));
        var innerTurningLayer = Math.floor((Math.random() * 2));
        var turningDirection = Math.floor((Math.random() * 3));
        if (turningOrientation != previousOrientation)
            layersTurned = 0;
        switch (turningLayer)
        {
            case 0: temp = 1; break;
            case 1: temp = 2; break;
            case 2: temp = 4; break;
        }
        while ((previousOrientation == turningOrientation) && ((temp & layersTurned) > 0))
        {
            turningOrientation = Math.floor((Math.random() * 3));
            turningLayer = Math.floor((Math.random() * 3));
            innerTurningLayer = Math.floor((Math.random() * 2));
            turningDirection = Math.floor((Math.random() * 3));
            if (turningOrientation != previousOrientation)
                layersTurned = 0;
        }
        if (turningOrientation == 0)
        {
            if (turningLayer == 0)
                scramble = scramble.concat("U");
            else if (turningLayer == 2)
                scramble = scramble.concat("D");
            else if (innerTurningLayer == 0)
                scramble = scramble.concat("Uw");
            else
                scramble = scramble.concat("Dw");
        }
        else if (turningOrientation == 1)
        {
            if (turningLayer == 0)
                scramble = scramble.concat("F");
            else if (turningLayer == 2)
                scramble = scramble.concat("B");
            else if (innerTurningLayer == 0)
                scramble = scramble.concat("Fw");
            else
                scramble = scramble.concat("Bw");
        }
        else if (turningOrientation == 2)
        {
            if (turningLayer == 0)
                scramble = scramble.concat("L");
            else if (turningLayer == 2)
                scramble = scramble.concat("R");
            else if (innerTurningLayer == 0)
                scramble = scramble.concat("Lw");
            else
                scramble = scramble.concat("Rw");
        }
        switch (turningLayer)
        {
            case 0: layersTurned += 1; break;
            case 1: layersTurned += 2; break;
            case 2: layersTurned += 4; break;
        }
        switch (turningDirection)
        {
            case 1: scramble = scramble.concat("'"); break;
            case 2: scramble = scramble.concat("2"); break;
        }
        previousOrientation = turningOrientation;
        if (i < length - 1)
            scramble = scramble.concat(" ");
    }
    return scramble;
}

function generate5x5Scramble(length)
{
    var scramble = "";
	var layersTurned = 0;
    var previousOrientation = -1;
    var temp = -1;
    for (i = 0; i < length; i++)
    {
        var turningOrientation = Math.floor((Math.random() * 3));
        var turningLayer = Math.floor((Math.random() * 4));
        var turningDirection = Math.floor((Math.random() * 3));
        if (turningOrientation != previousOrientation)
            layersTurned = 0;
        switch (turningLayer)
        {
            case 0: temp = 1; break;
            case 1: temp = 2; break;
            case 2: temp = 4; break;
            case 3: temp = 8; break;
        }
        while ((previousOrientation == turningOrientation) && ((temp & layersTurned) > 0))
        {
            turningOrientation = Math.floor((Math.random() * 3));
            turningLayer = Math.floor((Math.random() * 4));
            turningDirection = Math.floor((Math.random() * 3));
            if (turningOrientation != previousOrientation)
                layersTurned = 0;
        }
        if (turningOrientation == 0)
        {
            if (turningLayer == 0)
                scramble = scramble.concat("U");
            else if (turningLayer == 1)
                scramble = scramble.concat("Uw");
            else if (turningLayer == 2)
                scramble = scramble.concat("Dw");
            else
                scramble = scramble.concat("D");
        }
        else if (turningOrientation == 1)
        {
            if (turningLayer == 0)
                scramble = scramble.concat("F");
            else if (turningLayer == 1)
                scramble = scramble.concat("Fw");
            else if (turningLayer == 2)
                scramble = scramble.concat("Bw");
            else
                scramble = scramble.concat("B");
        }
        else if (turningOrientation == 2)
        {
            if (turningLayer == 0)
                scramble = scramble.concat("L");
            else if (turningLayer == 1)
                scramble = scramble.concat("Lw");
            else if (turningLayer == 2)
                scramble = scramble.concat("Rw");
            else
                scramble = scramble.concat("R");
        }
        switch (turningLayer)
        {
            case 0: layersTurned += 1; break;
            case 1: layersTurned += 2; break;
            case 2: layersTurned += 4; break;
            case 3: layersTurned += 8; break;
        }
        switch (turningDirection)
        {
            case 1: scramble = scramble.concat("'"); break;
            case 2: scramble = scramble.concat("2"); break;
        }
        previousOrientation = turningOrientation;
        if (i < length - 1)
            scramble = scramble.concat(" ");
    }
    return scramble;
}

function generate6x6Scramble(length)
{
    var scramble = "";
    var layersTurned = 0;
    var previousOrientation = -1;
    var temp = -1;
    for (i = 0; i < length; i++)
    {
        var turningOrientation = Math.floor((Math.random() * 3));
        var turningLayer = Math.floor((Math.random() * 5));
        var innerTurningLayer = Math.floor((Math.random() * 2));
        var turningDirection = Math.floor((Math.random() * 3));
        if (turningOrientation != previousOrientation)
            layersTurned = 0;
        switch (turningLayer)
        {
            case 0: temp = 1; break;
            case 1: temp = 2; break;
            case 2: temp = 4; break;
            case 3: temp = 8; break;
            case 4: temp = 16; break;
        }
        while ((previousOrientation == turningOrientation) && ((temp & layersTurned) > 0))
        {
            turningOrientation = Math.floor((Math.random() * 3));
            turningLayer = Math.floor((Math.random() * 5));
            innerTurningLayer = Math.floor((Math.random() * 2));
            turningDirection = Math.floor((Math.random() * 3));
            if (turningOrientation != previousOrientation)
                layersTurned = 0;
        }
        if (turningOrientation == 0)
        {
            if (turningLayer == 0)
                scramble = scramble.concat("U");
            else if (turningLayer == 1)
                scramble = scramble.concat("D");
            else if (turningLayer == 2)
                scramble = scramble.concat("Uw");
            else if (turningLayer == 3)
                scramble = scramble.concat("Dw");
            else if (innerTurningLayer == 0)
                scramble = scramble.concat("3Uw");
            else
                scramble = scramble.concat("3Dw");
        }
        else if (turningOrientation == 1)
        {
            if (turningLayer == 0)
                scramble = scramble.concat("F");
            else if (turningLayer == 1)
                scramble = scramble.concat("B");
            else if (turningLayer == 2)
                scramble = scramble.concat("Fw");
            else if (turningLayer == 3)
                scramble = scramble.concat("Bw");
            else if (innerTurningLayer == 0)
                scramble = scramble.concat("3Fw");
            else
                scramble = scramble.concat("3Bw");
        }
        else if (turningOrientation == 2)
        {
            if (turningLayer == 0)
                scramble = scramble.concat("L");
            else if (turningLayer == 1)
                scramble = scramble.concat("R");
            else if (turningLayer == 2)
                scramble = scramble.concat("Lw");
            else if (turningLayer == 3)
                scramble = scramble.concat("Rw");
            else if (innerTurningLayer == 0)
                scramble = scramble.concat("3Lw");
            else
                scramble = scramble.concat("3Rw");
        }
        switch (turningLayer)
        {
            case 0: layersTurned += 1; break;
            case 1: layersTurned += 2; break;
            case 2: layersTurned += 4; break;
            case 3: layersTurned += 8; break;
            case 4: layersTurned += 16; break;
        }
        switch (turningDirection)
        {
            case 1: scramble = scramble.concat("'"); break;
            case 2: scramble = scramble.concat("2"); break;
        }
        previousOrientation = turningOrientation;
        if (i < length - 1)
            scramble = scramble.concat(" ");
    }
    return scramble;
}

function generate7x7Scramble(length)
{
    var scramble = "";
    var layersTurned = 0;
    var previousOrientation = -1;
    var temp = -1;
    for (i = 0; i < length; i++)
    {
        var turningOrientation = Math.floor((Math.random() * 3));
        var turningLayer = Math.floor((Math.random() * 6));
        var turningDirection = Math.floor((Math.random() * 3));
        if (turningOrientation != previousOrientation)
            layersTurned = 0;
        switch (turningLayer)
        {
            case 0: temp = 1; break;
            case 1: temp = 2; break;
            case 2: temp = 4; break;
            case 3: temp = 8; break;
            case 4: temp = 16; break;
            case 5: temp = 32; break;
        }
        while ((previousOrientation == turningOrientation) && ((temp & layersTurned) > 0))
        {
            turningOrientation = Math.floor((Math.random() * 3));
            turningLayer = Math.floor((Math.random() * 6));
            turningDirection = Math.floor((Math.random() * 3));
            if (turningOrientation != previousOrientation)
                layersTurned = 0;
        }
        if (turningOrientation == 0)
        {
            if (turningLayer == 0)
                scramble = scramble.concat("U");
            else if (turningLayer == 1)
                scramble = scramble.concat("D");
            else if (turningLayer == 2)
                scramble = scramble.concat("Uw");
            else if (turningLayer == 3)
                scramble = scramble.concat("Dw");
            else if (turningLayer == 4)
                scramble = scramble.concat("3Uw");
            else
                scramble = scramble.concat("3Dw");
            
        }
        else if (turningOrientation == 1)
        {
            if (turningLayer == 0)
                scramble = scramble.concat("F");
            else if (turningLayer == 1)
                scramble = scramble.concat("B");
            else if (turningLayer == 2)
                scramble = scramble.concat("Fw");
            else if (turningLayer == 3)
                scramble = scramble.concat("Bw");
            else if (turningLayer == 4)
                scramble = scramble.concat("3Fw");
            else
                scramble = scramble.concat("3Bw");
        }
        else if (turningOrientation == 2)
        {
            if (turningLayer == 0)
                scramble = scramble.concat("L");
            else if (turningLayer == 1)
                scramble = scramble.concat("R");
            else if (turningLayer == 2)
                scramble = scramble.concat("Lw");
            else if (turningLayer == 3)
                scramble = scramble.concat("Rw");
            else if (turningLayer == 4)
                scramble = scramble.concat("3Lw");
            else
                scramble = scramble.concat("3Rw");
        }
        switch (turningLayer)
        {
            case 0: layersTurned += 1; break;
            case 1: layersTurned += 2; break;
            case 2: layersTurned += 4; break;
            case 3: layersTurned += 8; break;
            case 4: layersTurned += 16; break;
            case 5: layersTurned += 32; break;
        }
        switch (turningDirection)
        {
            case 1: scramble = scramble.concat("'"); break;
            case 2: scramble = scramble.concat("2"); break;
        }
        previousOrientation = turningOrientation;
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