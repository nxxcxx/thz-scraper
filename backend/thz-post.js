'use strict';

var request = require( 'request' );
var cheerio = require( 'cheerio' );

function requestPost( done, threadUrl ) {

   request( threadUrl, function ( err, res, body ) {

      var $ = cheerio.load( body );

      var postList = $( '#postlist' )
      .children()
      .filter( 'div' )
      .eq( 0 );


      // todo fix
      if ( !postList.attr( 'id' ) ) return done( { threadUrl: threadUrl, imgUrlList: [] } );

      var post_id = postList.attr( 'id' ).replace( 'post_', '' );
      post_id = 'postmessage_' + post_id;


      var imgs = postList.children()
         .find( 'td#' + post_id )
         .find( 'img' )
      ;

      var imgUrlList = [];
      imgs.each( function ( idx, img ) {
         var imgUrl = $( img ).attr( 'file' );
         if ( imgUrl ) imgUrlList.push( imgUrl );
      } );

      done( { threadUrl: threadUrl, imgUrlList: imgUrlList } );

   } );

}

module.exports = {
   request: requestPost
};
