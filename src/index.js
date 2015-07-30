angular.module( 'app', [] )
.constant( 'ENDPOINT_URI', 'http://localhost:8001/api/' )
.controller( 'MainCtrl', [ '$scope', '$http', 'ENDPOINT_URI', function ( $scope, $http, ENDPOINT_URI )  {

   var vm = this;

   $http.get( ENDPOINT_URI + 'thread' )
      .success( function( threadList ) {
         console.log( threadList );
         vm.threadList = threadList;
      } )
      .error( function( err ) {
         console.warn( err );
      } );

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
      template: '<div><img ng-repeat="url in imgUrlList" ng-src="{{ url }}" width="250px">{{thread}}<br><br></div>'

   };

} ] )

;
