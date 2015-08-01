angular.module( 'app', [
   'infinite-scroll'
] )
.constant( 'ENDPOINT_URI', 'http://localhost:8001/api/' )
.controller( 'MainCtrl', [ '$scope', '$http', 'ENDPOINT_URI', function ( $scope, $http, ENDPOINT_URI )  {

   var vm = this;
   var loadedThreadList = [];
   var currPage = 13;
   var nextPage = false;
   var canAdd = true;
   vm.threadList = [];

   vm.enableAddMore = () => canAdd = true;
   vm.disableAddMore = () => canAdd = false;

   vm.addMore = function( force ) {

      if ( !canAdd && !force) {
         return;
      }

      if ( loadedThreadList.length > 0 ) {

         vm.threadList.push( loadedThreadList.shift() );
         console.log( 'loading thread:', vm.threadList.length );

      } else {

         console.log( 'end of page.' );

         if ( nextPage ) {
            loadThread();
            nextPage = false;
         }

      }

   };

   global.MORE = function () {
      vm.addMore();
      $scope.$apply();
   };

   function loadThread() {

      console.log( 'loading page:', currPage );
      $http.get( ENDPOINT_URI + 'thread/' + currPage )
      .success( function( loadedThreadList_ ) {

         console.log( loadedThreadList_.length );
         console.log( loadedThreadList_ );
         loadedThreadList = loadedThreadList_;

         currPage ++;
         nextPage = true;

         vm.addMore();
         vm.addMore();

      } )
      .error( function( err ) {
         console.warn( err );
      } );

   }

   loadThread();

} ] )
.directive( 'threadList', [ function () {

   return {

      restrict: 'E',
      scope: true,
      template: '<thread-item ng-repeat="thread in main.threadList"></thread-item>'

   };

} ] )
.directive( 'threadItem', [ '$http', 'ENDPOINT_URI', function ( $http, ENDPOINT_URI ) {

   function controller( $scope ) {

      $scope.main.disableAddMore();

      $scope.loadComplete = false;
      var totalImgs = 0;
      var loaded = 0;

      $scope.itemEnd = function () {
         loaded ++;
         if ( loaded >= totalImgs ) {

            $scope.loadComplete = true;
            $scope.main.enableAddMore();

            $scope.$apply();
            console.log( 'complete', $scope );
            console.log( '----------------------------' );
         }
      };

      $http.post( ENDPOINT_URI + 'post', { thread: $scope.thread } )
      .success( function( res ) {

         $scope.imgUrlList = res.imgUrlList;
         totalImgs = res.imgUrlList.length;

         console.log( 'loading', totalImgs, 'imgs' );

         if ( totalImgs === 0 ) {
            $scope.loadComplete = true;
            $scope.main.enableAddMore();
            console.log( 'complete', $scope );
         }

      } )
      .error( function( err ) {

         console.warn( 'threadItem directive POST ERR:', err );
         $scope.loadComplete = true;
         $scope.main.enableAddMore();

      } );

   }

   return {

      restrict: 'E',
      replace: true,
      scope: true,
      controller,
      controllerAs: 'tItem',
      template: [
         '<div>',
            '<div ng-hide="loadComplete" style="height: 50px; background: #c3c3c3">',
               'LOADING...',
            '</div>',
            '<div ng-show="loadComplete">',
               '<thread-img ng-repeat="url in imgUrlList"></thread-img>',
               '<br>',
               '<a href="{{thread}}">{{thread}}</a>',
               '<br><br>',
            '</div>',
         '</div>'
      ].join('')
   };

} ] )
.directive( 'threadImg', [ function () {

   function controller( $scope, $element ) {

      $element
      .on( 'load', function () {
         console.log( ' img done.' );
         $scope.itemEnd();
      } )
      .on( 'error', function () {
         console.warn( 'img load err.' );
         $scope.itemEnd();
      } );

   }

   return {

      restrict: 'E',
      replace: true,
      scope: true,
      controller,
      controllerAs: 'tImg',
      template: '<img ng-src="{{url}}" width="500px">'

   };

} ] )

;
