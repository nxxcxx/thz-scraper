(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

angular.module('app', []).constant('ENDPOINT_URI', 'http://localhost:8001/api/').controller('MainCtrl', ['$scope', '$http', 'ENDPOINT_URI', function ($scope, $http, ENDPOINT_URI) {

   var vm = this;

   $http.get(ENDPOINT_URI + 'thread').success(function (threadList) {
      console.log(threadList);
      vm.threadList = threadList;
   }).error(function (err) {
      console.warn(err);
   });
}]).directive('imgPost', ['$http', 'ENDPOINT_URI', function ($http, ENDPOINT_URI) {

   function link($scope, $elem) {

      $http.post(ENDPOINT_URI + 'post', { thread: $scope.thread }).success(function (data) {
         console.log(data);
         $scope.imgUrlList = data.imgUrlList;
      }).error(function (err) {
         console.warn(err);
      });
   }

   return {

      restrict: 'E',
      replace: true,
      scope: true,
      link: link,
      template: '<div><img ng-repeat="url in imgUrlList" ng-src="{{ url }}" width="250px">{{thread}}<br><br></div>'

   };
}]);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvTklYL0RvY3VtZW50cy9uaXgvdGh6X3NjcmFwZXIvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxPQUFPLENBQUMsTUFBTSxDQUFFLEtBQUssRUFBRSxFQUFFLENBQUUsQ0FDMUIsUUFBUSxDQUFFLGNBQWMsRUFBRSw0QkFBNEIsQ0FBRSxDQUN4RCxVQUFVLENBQUUsVUFBVSxFQUFFLENBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVyxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBSTs7QUFFckcsT0FBSSxFQUFFLEdBQUcsSUFBSSxDQUFDOztBQUVkLFFBQUssQ0FBQyxHQUFHLENBQUUsWUFBWSxHQUFHLFFBQVEsQ0FBRSxDQUNoQyxPQUFPLENBQUUsVUFBVSxVQUFVLEVBQUc7QUFDOUIsYUFBTyxDQUFDLEdBQUcsQ0FBRSxVQUFVLENBQUUsQ0FBQztBQUMxQixRQUFFLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUM3QixDQUFFLENBQ0YsS0FBSyxDQUFFLFVBQVUsR0FBRyxFQUFHO0FBQ3JCLGFBQU8sQ0FBQyxJQUFJLENBQUUsR0FBRyxDQUFFLENBQUM7SUFDdEIsQ0FBRSxDQUFDO0NBRVQsQ0FBRSxDQUFFLENBQ0osU0FBUyxDQUFFLFNBQVMsRUFBRSxDQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVyxLQUFLLEVBQUUsWUFBWSxFQUFHOztBQUVoRixZQUFTLElBQUksQ0FBRSxNQUFNLEVBQUUsS0FBSyxFQUFHOztBQUU1QixXQUFLLENBQUMsSUFBSSxDQUFFLFlBQVksR0FBRyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFFLENBQzFELE9BQU8sQ0FBRSxVQUFVLElBQUksRUFBRztBQUN4QixnQkFBTyxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUUsQ0FBQztBQUNwQixlQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7T0FDdEMsQ0FBRSxDQUNGLEtBQUssQ0FBRSxVQUFVLEdBQUcsRUFBRztBQUNyQixnQkFBTyxDQUFDLElBQUksQ0FBRSxHQUFHLENBQUUsQ0FBQztPQUN0QixDQUFFLENBQUM7SUFFVDs7QUFFRCxVQUFPOztBQUVKLGNBQVEsRUFBRSxHQUFHO0FBQ2IsYUFBTyxFQUFFLElBQUk7QUFDYixXQUFLLEVBQUUsSUFBSTtBQUNYLFVBQUksRUFBRSxJQUFJO0FBQ1YsY0FBUSxFQUFFLG1HQUFtRzs7SUFFL0csQ0FBQztDQUVKLENBQUUsQ0FBRSxDQUVKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImFuZ3VsYXIubW9kdWxlKCAnYXBwJywgW10gKVxuLmNvbnN0YW50KCAnRU5EUE9JTlRfVVJJJywgJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMS9hcGkvJyApXG4uY29udHJvbGxlciggJ01haW5DdHJsJywgWyAnJHNjb3BlJywgJyRodHRwJywgJ0VORFBPSU5UX1VSSScsIGZ1bmN0aW9uICggJHNjb3BlLCAkaHR0cCwgRU5EUE9JTlRfVVJJICkgIHtcblxuICAgdmFyIHZtID0gdGhpcztcblxuICAgJGh0dHAuZ2V0KCBFTkRQT0lOVF9VUkkgKyAndGhyZWFkJyApXG4gICAgICAuc3VjY2VzcyggZnVuY3Rpb24oIHRocmVhZExpc3QgKSB7XG4gICAgICAgICBjb25zb2xlLmxvZyggdGhyZWFkTGlzdCApO1xuICAgICAgICAgdm0udGhyZWFkTGlzdCA9IHRocmVhZExpc3Q7XG4gICAgICB9IClcbiAgICAgIC5lcnJvciggZnVuY3Rpb24oIGVyciApIHtcbiAgICAgICAgIGNvbnNvbGUud2FybiggZXJyICk7XG4gICAgICB9ICk7XG5cbn0gXSApXG4uZGlyZWN0aXZlKCAnaW1nUG9zdCcsIFsgJyRodHRwJywgJ0VORFBPSU5UX1VSSScsIGZ1bmN0aW9uICggJGh0dHAsIEVORFBPSU5UX1VSSSApIHtcblxuICAgZnVuY3Rpb24gbGluayggJHNjb3BlLCAkZWxlbSApIHtcblxuICAgICAgJGh0dHAucG9zdCggRU5EUE9JTlRfVVJJICsgJ3Bvc3QnLCB7IHRocmVhZDogJHNjb3BlLnRocmVhZCB9IClcbiAgICAgICAgIC5zdWNjZXNzKCBmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCBkYXRhICk7XG4gICAgICAgICAgICAkc2NvcGUuaW1nVXJsTGlzdCA9IGRhdGEuaW1nVXJsTGlzdDtcbiAgICAgICAgIH0gKVxuICAgICAgICAgLmVycm9yKCBmdW5jdGlvbiggZXJyICkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCBlcnIgKTtcbiAgICAgICAgIH0gKTtcblxuICAgfVxuXG4gICByZXR1cm4ge1xuXG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgbGluazogbGluayxcbiAgICAgIHRlbXBsYXRlOiAnPGRpdj48aW1nIG5nLXJlcGVhdD1cInVybCBpbiBpbWdVcmxMaXN0XCIgbmctc3JjPVwie3sgdXJsIH19XCIgd2lkdGg9XCIyNTBweFwiPnt7dGhyZWFkfX08YnI+PGJyPjwvZGl2PidcblxuICAgfTtcblxufSBdIClcblxuO1xuIl19
