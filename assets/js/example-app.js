var ExampleApp = angular.module('ExampleApp', [
'ngRoute',
'Controllers',
'ngYTInsights'
]);

ExampleApp.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  when('/home', {
    templateUrl: 'ng-views/start.html',
    controller: 'HomeCtrl'
  }).
  when('/youtube', {
    templateUrl: 'ng-views/youtube.html',
    controller: 'YoutubeInternalCtrl'
  }).
  when('/youtubecompetitors', {
    templateUrl: 'ng-views/youtube.html',
    controller: 'YoutubeExternalCtrl'
  }).
  otherwise({
    redirectTo: '/home'
  });
}]);

ExampleApp.factory('myGoogleAnalytics', [
  '$rootScope', '$window', '$location',
  function ($rootScope, $window, $location) {

    var myGoogleAnalytics = {};
    var repoLocation = 'angular-youtube-insights/#';

    myGoogleAnalytics.sendPageview = function() {
      if ($window.ga) {
        $window.ga('set', 'page', repoLocation + $location.path());
        $window.ga('send', 'pageview');
      }
    }

    // subscribe to events
    $rootScope.$on('$viewContentLoaded', myGoogleAnalytics.sendPageview);

    return myGoogleAnalytics;
  }
])
ExampleApp.run([
  'myGoogleAnalytics',
  function(myGoogleAnalytics) {
      // inject self
  }
]);
