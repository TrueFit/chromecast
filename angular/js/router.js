angular.module("app").config(($routeProvider, $locationProvider) => {
    $locationProvider
        .html5Mode(true)
        .hashPrefix("!");

    $routeProvider.when("/", {
      controller: "AdminController",
      templateUrl: "app/templates/controllers/display.html"
    });

    // AdminController
    $routeProvider.when("/admin", {
      controller: "AdminController",
      templateUrl: "app/templates/controllers/admin.html"
    });

    // 404
    $routeProvider.when("/error", {
      controller: "ErrorController",
      templateUrl: "app/templates/controllers/404.html"
    });

    $routeProvider.otherwise({ redirectTo: "error" });
});
