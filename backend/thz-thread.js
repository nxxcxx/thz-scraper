'use strict';

var request = require( 'request' );
var cheerio = require( 'cheerio' );

var thzHost = 'http://thz.la/';
var forumid = 220; // cen: 220, uncen: 181

function requestThread( done, page ) {

   request( {

      method: 'GET',
      uri: thzHost + 'forum-' + forumid + '-' + page + '.html'

   }, function ( err, res, body ) {

      if ( err ) {
         return done.fail( err );
      }

      if ( res.statusCode !== 200 ) {
         return done.fail( res.statusCode );
      }

      var threadUrlList = [];
      var $ = cheerio.load( body );

      var threadList = $( '#threadlisttableid' ).children();

      threadList.each( function ( idx, thread ) {

          var threadUrl = $( 'tr th', thread )
            .children()
            .filter( function ( idx, el ) {

               var href = $( el ).attr( 'href' );
               if ( href ) {
                  return href.indexOf( 'thread' ) !== -1;
               } else {
                  return false;
               }

            } )
            .attr( 'href' );

         if ( threadUrl ) threadUrlList.push( thzHost + threadUrl );

      } );

      done( threadUrlList );

   } );

}

module.exports = {

   request: requestThread

};
