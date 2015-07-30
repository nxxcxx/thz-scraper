'use strict';

var request = require( 'request' );
var cheerio = require( 'cheerio' );
var thzHost = 'http://thz.la/';

function requestThread( done ) {

   request( thzHost + 'forum-220-1.html', function( err, res, body ) {

      var threadUrl = [];
      var $ = cheerio.load( body );

      var threadList = $( '#threadlisttableid' ).children( 'tbody' );
      threadList.each( function ( idx, thread ) {

          var turl = $( 'tr th', thread ).children()
            .filter( function ( idx, el ) {

               var href = $( el ).attr( 'href' );
               if ( href ) {
                  return href.indexOf( 'thread' ) !== -1;
               } else {
                  return false;
               }

            } )
            .attr( 'href' );

         if ( turl ) threadUrl.push( thzHost + turl );

      } );

      done( threadUrl );

   } );

}

module.exports = {

   request: requestThread

};
