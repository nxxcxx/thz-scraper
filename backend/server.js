'use strict';

var express = require( 'express' );
var ASQ = require( 'asynquence' );
var chalk = require( 'chalk' );

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
	console.log( chalk.green( '► Server running on', host + ':' + port ) );
} );


var request = require( 'request' );
var cheerio = require( 'cheerio' );


app.get( '/', function ( req, res ) {
	res.status( 200 ).send( 'scraper v1.0.0' );
} );

app.get( '/api/thread', function ( req, res ) {

   ASQ()
      .then( function ( done ) {
         thzThread.request( done );
      } )
      .val( function ( threadList ) {
         res.status( 200 ).json( threadList );
      } );

} );

app.post( '/api/post', function ( req, res ) {

   var thread = req.body.thread;

   ASQ()
      .then( function ( done ) {
         thzPost.request( done, thread );
      } )
      .val( function ( imgUrlList ) {
         res.status( 200 ).json( imgUrlList );
      } )
      .or( function ( err ) {
         console.err( chalk.red( err ) );
         res.status( 500 ).end();
      } );

} );

app.get( '/api/test', function ( req, res ) {

   ASQ()
      .then( function ( done ) {
         thzThread.request( done );
      } )
      .then( function ( done, threadList ) {
         thzPost.request( done, threadList[ 2 ] );
      } )
      .val( function ( imgUrlList ) {
         res.status( 200 ).json( imgUrlList );
      } )
      .or( function ( err ) {
         console.err( chalk.red( err ) );
         res.status( 500 ).end();
      } );

} );
