'use strict';

var request = require( 'request' );
var cheerio = require( 'cheerio' );

var imgFilePattern = /\.(gif|jpg|jpeg|tiff|png|bmp)\/?$/ig;

function requestPost( done, threadUrl ) {

   request( {

      method: 'GET',
      uri: threadUrl

   }, function ( err, res, body ) {

      if ( err || res.statusCode !== 200 ) {
         return done.fail( res.statusCode );
      }

      var $ = cheerio.load( body );

      // select first post
      var postList = $( '#postlist' ).children().filter( 'div' ).eq( 0 );

      // parse post id
      var post_id;
      try {
         post_id = 'postmessage_' + postList.attr( 'id' ).replace( 'post_', '' );
      } catch ( err ) {
         return done.fail( err );
      }

      // get all img tags
      var imgs = postList.children().find( 'td#' + post_id ).find( 'img' );

      // store valid img url in arr
      var imgUrlList = [];
      imgs.each( function ( idx, img ) {
         var imgUrl = $( img ).attr( 'file' );
         if ( imgUrl ) {
            if ( imgUrl.match( imgFilePattern ) ) {
               imgUrlList.push( imgUrl );
            }
         }
      } );

      done( { threadUrl: threadUrl, imgUrlList: imgUrlList } );

   } );

}

module.exports = {
   request: requestPost
};
