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
		otherwise({redirectTo: "/home"});
});