angular.module( 'app', [
   'infinite-scroll'
] )
.constant( 'ENDPOINT_URI', 'http://localhost:8001/api/' )
.controller( 'MainCtrl', [ '$scope', '$http', 'ENDPOINT_URI', function ( $scope, $http, ENDPOINT_URI )  {

   var vm = this;
   var fullThreadList = [];
   vm.threadList = [];

   vm.addMore = throttle( function() {
      if ( fullThreadList.length > 0 ) {
         var thread = fullThreadList.shift();
         vm.threadList.push( thread );
         console.log( 'moar.' );
      } else {
         console.log( 'no moar.' );
      }
   }, 1000 );

   global.MORE = function () {
      vm.addMore();
      $scope.$apply();
   };

   $http.get( ENDPOINT_URI + 'thread' )
      .success( function( fullThreadList_ ) {
         console.log( fullThreadList_.length );
         console.log( fullThreadList_ );
         fullThreadList = fullThreadList_;
         vm.addMore();
      } )
      .error( function( err ) {
         console.warn( err );
      } );

   function throttle( fn, threshhold, scope ) {
   	if ( !threshhold ) threshhold = 250;
   	var last,
   		deferTimer;
   	return function () {
   		var context = scope || this;

   		var now = +new Date,
   			args = arguments;
   		if ( last && now < last + threshhold ) {
   			clearTimeout( deferTimer );
   			deferTimer = setTimeout( function () {
   				last = now;
   				fn.apply( context, args );
   			}, threshhold );
   		} else {
   			last = now;
   			fn.apply( context, args );
   		}
   	};
   }

} ] )
.directive( 'imgPost', [ '$http', 'ENDPOINT_URI', function ( $http, ENDPOINT_URI ) {

   function link( $scope, $elem ) {

      $http.post( ENDPOINT_URI + 'post', { thread: $scope.thread } )
         .success( function( data ) {
            console.log( data );
            $scope.imgUrlList = data.imgUrlList;
         } )
         .error( function( err ) {
            console.warn( err );
         } );

   }

   return {

      restrict: 'E',
      replace: true,
      scope: true,
      link: link,
      template: '<div><img ng-repeat="url in imgUrlList" ng-src="{{url}}" width="250px"><br><a href="{{thread}}">{{thread}}</a><br><br></div>'

   };

} ] )

;
