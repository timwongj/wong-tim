var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
	$routeProvider.
		when("/", {templateUrl: "home.html"}).
		when("/cornerComms", {templateUrl: "bldAlgorithms/cornerComms.html"}).
		when("/edgeComms", {templateUrl: "bldAlgorithms/edgeComms.html"}).
		when("/OPAlgs", {templateUrl: "bldAlgorithms/OPAlgs.html"}).
		when("/M2Algs", {templateUrl: "bldAlgorithms/M2Algs.html"}).
		when("/otherAlgs", {templateUrl: "bldAlgorithms/otherAlgs.html"}).
		when("/scheme", {templateUrl: "bldAlgorithms/scheme.html"}).
		when("/notation", {templateUrl: "bldAlgorithms/notation.html"}).
		otherwise({redirectTo: "/"});
});

app.run(function($rootScope, $location) {
	$rootScope.$on("$routeChangeSuccess", function() { update(); });
	$rootScope.$on("$viewContentLoaded", function() { displayScheme(); });
});

function update()
{
	$.get("data/cornerComms.csv", function(data) {
   		$("#cornerCommsTableHead").html("<tr><th>1st Target</th><th>2nd Target</th><th>Primary Algorithm</th><th># Moves</th><th>Alternative Algorithm</th><th># Moves</th></tr>");
   		var lines = data.split("\n");
   		for (i = 1; i < lines.length; i++)
   		{
        	var line = lines[i].split(",");
        	$("#cornerCommsTableBody").append("<tr><td class=\"centerCol\">" + getSymbol(line[1]) + "</td><td class=\"centerCol\">" + getSymbol(line[2]) + "</td><td>" + line[3] + "</td><td class=\"centerCol\">" + line[4] + "</td><td>" + line[5] + "</td><td class=\"centerCol\">" + line[6] + "</td></tr>");
		}
	}, "text");
	$.get("data/edgeComms.csv", function(data) {
   		$("#edgeCommsTableHead").html("<tr><th>1st Target</th><th>2nd Target</th><th>Primary Algorithm</th><th># Moves</th><th>Alternative Algorithm</th><th># Moves</th></tr>");
   		var lines = data.split("\n");
   		for (i = 1; i < lines.length; i++)
   		{
        	var line = lines[i].split(",");
        	$("#edgeCommsTableBody").append("<tr><td class=\"centerCol\">" + getSymbol(line[1]) + "</td><td class=\"centerCol\">" + getSymbol(line[2]) + "</td><td>" + line[3] + "</td><td class=\"centerCol\">" + line[4] + "</td><td>" + line[5] + "</td><td class=\"centerCol\">" + line[6] + "</td></tr>");
		}
	}, "text");
	$.get("data/OPAlgs.csv", function(data) {
   		$("#OPAlgsTableHead").html("<tr><th>Target</th><th>Primary Algorithm</th><th># Moves</th><th>Notes</th><th>Alternative Algorithm</th><th># Moves</th><th>Notes</th></tr>");
   		var lines = data.split("\n");
   		for (i = 1; i < lines.length; i++)
   		{
        	var line = lines[i].split(",");
        	$("#OPAlgsTableBody").append("<tr><td class=\"centerCol\">" + getSymbol(line[0]) + "</td><td>" + line[1] + "</td><td class=\"centerCol\">" + line[2] + "</td><td class=\"centerCol\">" + line[3] + "</td><td>" + line[4] + "</td><td class=\"centerCol\">" + line[5] + "</td><td class=\"centerCol\">" + line[6] + "</td></tr>");
		}
	}, "text");
	$.get("data/M2Algs.csv", function(data) {
   		$("#M2AlgsTableHead").html("<tr><th>Target</th><th>Primary Algorithm</th><th># Moves</th><th>Notes</th><th>Alternative Algorithm</th><th># Moves</th><th>Notes</th></tr>");
   		var lines = data.split("\n");
   		for (i = 1; i < lines.length; i++)
   		{
        	var line = lines[i].split(",");
        	$("#M2AlgsTableBody").append("<tr><td class=\"centerCol\">" + getSymbol(line[0]) + "</td><td>" + line[1] + "</td><td class=\"centerCol\">" + line[2] + "</td><td class=\"centerCol\">" + line[3] + "</td><td>" + line[4] + "</td><td class=\"centerCol\">" + line[5] + "</td><td class=\"centerCol\">" + line[6] + "</td></tr>");
		}
	}, "text");	
	$(document).on("click", "#resetButton", function() {
		localStorage.setItem("edges", JSON.stringify({UR:"UR", RU:"RU", UF:"UF", FU:"FU", UL:"UL", LU:"LU", UB:"UB", BU:"BU", DR:"DR", RD:"RD", DL:"DL", LD:"LD", DB:"DB", BD:"BD", FL:"FL", LF:"LF", FR:"FR", RF:"RF", BL:"BL", LB:"LB", BR:"BR", RB:"RB"}));
		localStorage.setItem("corners", JSON.stringify({UFR:"UFR", RUF:"RUF", FRU:"FRU", UFL:"UFL", FLU:"FLU", LUF:"LUF", UBR:"UBR", RUB:"RUB", BRU:"BRU", DFR:"DFR", FRD:"FRD", RDF:"RDF", DFL:"DFL", LDF:"LDF", FLD:"FLD", DBL:"DBL", BLD:"BLD", LDB:"LDB", DBR:"DBR", RDB:"RDB", BRD:"BRD"}));
		displayScheme();
	});
	$(document).on("click", "#updateButton", function() {
		var edges = JSON.parse(localStorage.getItem("edges"));
		var corners = JSON.parse(localStorage.getItem("corners"));
		edges.UR = $("#inputUR").val(); edges.RU = $("#inputRU").val();
		edges.UF = $("#inputUF").val(); edges.FU = $("#inputFU").val();
		edges.UL = $("#inputUL").val(); edges.LU = $("#inputLU").val();
		edges.UB = $("#inputUB").val(); edges.BU = $("#inputBU").val();
		edges.DR = $("#inputDR").val(); edges.RD = $("#inputRD").val();
		edges.DL = $("#inputDL").val(); edges.LD = $("#inputLD").val();
		edges.DB = $("#inputDB").val(); edges.BD = $("#inputBD").val();
		edges.FL = $("#inputFL").val(); edges.LF = $("#inputLF").val();
		edges.FR = $("#inputFR").val(); edges.RF = $("#inputRF").val();
		edges.BL = $("#inputBL").val(); edges.LB = $("#inputLB").val();
		edges.BR = $("#inputBR").val(); edges.RB = $("#inputRB").val();
		corners.UFR = $("#inputUFR").val(); corners.RUF = $("#inputRUF").val(); corners.FRU = $("#inputFRU").val();
		corners.UFL = $("#inputUFL").val(); corners.FLU = $("#inputFLU").val(); corners.LUF = $("#inputLUF").val();
		corners.UBR = $("#inputUBR").val(); corners.RUB = $("#inputRUB").val(); corners.BRU = $("#inputBRU").val();
		corners.DFR = $("#inputDFR").val(); corners.FRD = $("#inputFRD").val(); corners.RDF = $("#inputRDF").val();
		corners.DFL = $("#inputDFL").val(); corners.LDF = $("#inputLDF").val(); corners.FLD = $("#inputFLD").val();
		corners.DBL = $("#inputDBL").val(); corners.BLD = $("#inputBLD").val(); corners.LDB = $("#inputLDB").val();
		corners.DBR = $("#inputDBR").val(); corners.RDB = $("#inputRDB").val(); corners.BRD = $("#inputBRD").val();
		localStorage.setItem("edges", JSON.stringify(edges));
		localStorage.setItem("corners", JSON.stringify(corners));
	});
}

function displayScheme() {
	var edges = JSON.parse(localStorage.getItem("edges"));
	var corners = JSON.parse(localStorage.getItem("corners"));
	$("#inputUR").val(edges.UR); $("#inputRU").val(edges.RU);
	$("#inputUF").val(edges.UF); $("#inputFU").val(edges.FU);
	$("#inputUL").val(edges.UL); $("#inputLU").val(edges.LU);
	$("#inputUB").val(edges.UB); $("#inputBU").val(edges.BU);
	$("#inputDR").val(edges.DR); $("#inputRD").val(edges.RD);
	$("#inputDL").val(edges.DL); $("#inputLD").val(edges.LD);
	$("#inputDB").val(edges.DB); $("#inputBD").val(edges.BD);
	$("#inputFL").val(edges.FL); $("#inputLF").val(edges.LF);
	$("#inputFR").val(edges.FR); $("#inputRF").val(edges.RF);
	$("#inputBL").val(edges.BL); $("#inputLB").val(edges.LB);
	$("#inputBR").val(edges.BR); $("#inputRB").val(edges.RB);
	$("#inputUFR").val(corners.UFR); $("#inputRUF").val(corners.RUF); $("#inputFRU").val(corners.FRU);
	$("#inputUFL").val(corners.UFL); $("#inputFLU").val(corners.FLU); $("#inputLUF").val(corners.LUF);
	$("#inputUBR").val(corners.UBR); $("#inputRUB").val(corners.RUB); $("#inputBRU").val(corners.BRU);
	$("#inputDFR").val(corners.DFR); $("#inputFRD").val(corners.FRD); $("#inputRDF").val(corners.RDF);
	$("#inputDFL").val(corners.DFL); $("#inputLDF").val(corners.LDF); $("#inputFLD").val(corners.FLD);
	$("#inputDBL").val(corners.DBL); $("#inputBLD").val(corners.BLD); $("#inputLDB").val(corners.LDB);
	$("#inputDBR").val(corners.DBR); $("#inputRDB").val(corners.RDB); $("#inputBRD").val(corners.BRD);
}

function getSymbol(target) {
	var edges = JSON.parse(localStorage.getItem("edges"));
	var corners = JSON.parse(localStorage.getItem("corners"));
	switch (target) {
		case "UR": return edges.UR;
		case "RU": return edges.RU;
		case "UF": return edges.UF;
		case "FU": return edges.FU;
		case "UL": return edges.UL;
		case "LU": return edges.LU;
		case "UB": return edges.UB;
		case "BU": return edges.BU;
		case "DR": return edges.DR;
		case "RD": return edges.RD;
		case "DL": return edges.DL;
		case "LD": return edges.LD;
		case "DB": return edges.DB;
		case "BD": return edges.BD;
		case "FL": return edges.FL;
		case "LF": return edges.LF;
		case "FR": return edges.FR;
		case "RF": return edges.RF;
		case "BL": return edges.BL;
		case "LB": return edges.LB;
		case "BR": return edges.BR;
		case "RB": return edges.RB;
		case "UFR" : return corners.UFR;
		case "RUF" : return corners.RUF;
		case "FRU" : return corners.FRU;
		case "UFL" : return corners.UFL;
		case "FLU" : return corners.FLU;
		case "LUF" : return corners.LUF;
		case "UBR" : return corners.UBR;
		case "RUB" : return corners.RUB;
		case "BRU" : return corners.BRU;
		case "DFR" : return corners.DFR;
		case "FRD" : return corners.FRD;
		case "RDF" : return corners.RDF;
		case "DFL" : return corners.DFL;
		case "LDF" : return corners.LDF;
		case "FLD" : return corners.FLD;
		case "DBL" : return corners.DBL;
		case "BLD" : return corners.BLD;
		case "LDB" : return corners.LDB;
		case "DBR" : return corners.DBR;
		case "RDB" : return corners.RDB;
		case "BRD" : return corners.BRD;
		default: return target;
	}
}
