angular.module("app").config(($routeProvider, $locationProvider) => {
    $locationProvider
        .html5Mode(true)
        .hashPrefix("!");

    // Home
    $routeProvider.when("/", {
      controller: "HomeController",
      templateUrl: "app/templates/controllers/home.html"
    });
    // 404
    $routeProvider.when("/error", {
      controller: "ErrorController",
      templateUrl: "app/templates/controllers/404.html"
    });

    $routeProvider.otherwise({ redirectTo: "error" });
});
