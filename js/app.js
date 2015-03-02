var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
	$routeProvider.
		when("/", {templateUrl: "home.html"}).
		when("/cornerComms", {templateUrl: "bldAlgorithms/cornerComms.html"}).
		when("/edgeComms", {templateUrl: "bldAlgorithms/edgeComms.html"}).
		when("/OPAlgs", {templateUrl: "bldAlgorithms/OPAlgs.html"}).
		when("/M2Algs", {templateUrl: "bldAlgorithms/M2Algs.html"}).
		when("/otherAlgs", {templateUrl: "bldAlgorithms/otherAlgs.html"}).
		when("/notation", {templateUrl: "bldAlgorithms/notation.html"}).
		otherwise({redirectTo: "/"});
});

app.run(function($rootScope, $location) {
	$rootScope.$on("$routeChangeSuccess", function(event, next, current) {
      update();
	});
});

function update()
{
	$.get("data/cornerComms.csv", function(data) {
   		$("#cornerCommsTableHead").html("<tr><th>1st Target</th><th>2nd Target</th><th>Primary Algorithm</th><th># Moves</th><th>Alternative Algorithm</th><th># Moves</th></tr>");
   		var lines = data.split("\n");
   		for (i = 1; i < lines.length; i++)
   		{
        	var line = lines[i].split(",");
        	$("#cornerCommsTableBody").append("<tr><td>" + line[1] + "</td><td>" + line[2] + "</td><td>" + line[3] + "</td><td>" + line[4] + "</td><td>" + line[5] + "</td><td>" + line[6] + "</td></tr>");
		}
	}, "text");
	$.get("data/edgeComms.csv", function(data) {
   		$("#edgeCommsTableHead").html("<tr><th>1st Target</th><th>2nd Target</th><th>Primary Algorithm</th><th># Moves</th><th>Alternative Algorithm</th><th># Moves</th></tr>");
   		var lines = data.split("\n");
   		for (i = 1; i < lines.length; i++)
   		{
        	var line = lines[i].split(",");
        	$("#edgeCommsTableBody").append("<tr><td>" + line[1] + "</td><td>" + line[2] + "</td><td>" + line[3] + "</td><td>" + line[4] + "</td><td>" + line[5] + "</td><td>" + line[6] + "</td></tr>");
		}
	}, "text");
	$.get("data/OPAlgs.csv", function(data) {
   		$("#OPAlgsTableHead").html("<tr><th>Target</th><th>Algorithm</th><th># Moves</th><th>Notes</th></tr>");
   		var lines = data.split("\n");
   		for (i = 1; i < lines.length; i++)
   		{
        	var line = lines[i].split(",");
        	$("#OPAlgsTableBody").append("<tr><td>" + line[0] + "</td><td>" + line[1] + "</td><td>" + line[2] + "</td><td>" + line[3] + "</td></tr>");
		}
	}, "text");
	$.get("data/M2Algs.csv", function(data) {
   		$("#M2AlgsTableHead").html("<tr><th>Target</th><th>Algorithm</th><th># Moves</th><th>Notes</th></tr>");
   		var lines = data.split("\n");
   		for (i = 1; i < lines.length; i++)
   		{
        	var line = lines[i].split(",");
        	$("#M2AlgsTableBody").append("<tr><td>" + line[0] + "</td><td>" + line[1] + "</td><td>" + line[2] + "</td><td>" + line[3] + "</td></tr>");
		}
	}, "text");
}
