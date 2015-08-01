'use strict';

var chalk = require( 'chalk' );
var ASQ = require( 'asynquence' );

var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var cors = require( 'cors' );

var thzThread = require( './thz-thread.js' );
var thzPost = require( './thz-post.js' );

var app = express();
app.use( bodyParser.json() );
app.use( cors() );


var host = 'localhost';
var port = 8001;
app.listen( port, host, function () {
	console.log( chalk.green( '► Listening on', host + ':' + port ) );
} );


app.get( '/', function ( req, res ) {
	res.status( 200 ).send( 'scraper v1.0.0' );
} );

app.get( '/api/thread/:page', function ( req, res ) {

	var page = req.params.page;
	console.log( chalk.gray( '<', req.method, 'Page:', page ) );

   ASQ()
      .then( function ( done ) {
         thzThread.request( done, page );
      } )
      .val( function ( threadList ) {
         res.status( 200 ).json( threadList );
      } )
		.or( function ( err ) {
         console.log( chalk.red( err ) );
         res.status( 500 ).end();
      } );

} );

app.post( '/api/post', function ( req, res ) {

   var thread = req.body.thread;
	console.log( chalk.gray( '<', req.method, thread ) );

   ASQ()
      .then( function ( done ) {
         thzPost.request( done, thread );
      } )
      .val( function ( imgUrlList ) {
         res.status( 200 ).json( imgUrlList );
      } )
      .or( function ( err ) {
         console.log( chalk.red( err ) );
         res.status( 500 ).end();
      } );

} );

app.get( '/api/test', function ( req, res ) {

   ASQ()
      .then( function ( done ) {
         thzThread.request( done, 1 );
      } )
      .then( function ( done, threadList ) {
         thzPost.request( done, threadList[ 2 ] );
      } )
      .val( function ( imgUrlList ) {
         res.status( 200 ).json( imgUrlList );
      } )
      .or( function ( err ) {
         console.log( chalk.red( err ) );
         res.status( 500 ).end();
      } );

} );
