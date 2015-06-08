// program to find what adds are appearing
// prabhudas552@gmail.com, HMIT intern, 2015

var request=require("request"); // module to download web page
var cheerio=require("cheerio"); // module to get DOM of web page
var rl=require("readline");     // module to read input from user

var args=process.argv.slice(2); // shift array index to 2 because 
				// first to arguments are node and filename
	
var a1="https://www.google.com/search?gws_rd=ssl&site=&source=hp&q=";
var a2="&oq=";
var a3="https://www.google.co.in"; // a3 is used during navigation of web page
 // a1 and a2 are string format of google query;
 
var search_q=args.join(' '); // join the array elements with space as delimeter
			     // args is the array which stores input provided
			     // throgh command line interface

			     // make  actual search uri here by replacing ' ' with '+'
search_q=a1+search_q.replace(/ /g,'+')+a2+search_q.replace(/ /g,'+');
get_ads(search_q);

 // suppose our query is: nitk surathkal ,then
 // uri=https://www.google.com/search?gws_rd=ssl&site=&source=hp&q=nitk+surathkal&oq=nitk+surathkal
function get_ads(uri)
{
 
 
 // now request for query using request method
 
 request(uri,function(err,resp,body){
 					// when the request is completed a call back function is called
					// err-->stores if any errors occured during the request
					// resp--> stores status code of the response ex. 200 for ok
					// body--> which is actually data sent by server
	
 // start of scraping of data recived from here
 if(body!=null) // check if body is not null, if you dont include this you will get error while scraping if body is null(i.e no data has been sent)
 {
 	 var $=cheerio.load(body);
	 console.log($("body").html());
	 console.log("_________Ads on the page are_____");
	 $('.ads-visurl').each(function(){
	 	console.log($(this).find('cite').text());
	 });
 }
 });
}
