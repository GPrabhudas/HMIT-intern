// program to find the rank of websites for the given query
// prabhudas552@gmail.com,HMIT intern, 2015
var request=require("request"); 		// module to download web page
var cheerio=require("cheerio"); 		// module to get DOM of web page
var rl=require("readline");     		// module to read input from user
var args=process.argv.slice(2); 		// shift array index to 2 because 
										// first to arguments are node and filename
var a1="https://www.google.com/search?gws_rd=ssl&site=&source=hp&q=";
var a2="&oq=";	 						// a1 and a2 are string format of google query;
var a3="https://www.google.co.in"; 		// a3 is used during navigation of web page
var search_q=args.join(' '); 			// join the array elements with space as delimeter
										// args is the array which stores input provided
 										// throgh command line interface
get_rank(search_q);						// function which is called recurssively to get rank of websites for the given query
var flag=1; 							// make  actual search uri here by replacing ' ' with '+'
										// suppose our query is: nitk surathkal ,then
										// uri=https://www.google.com/search?gws_rd=ssl&site=&source=hp&q=nitk+surathkal&oq=nitk+surathkal
search_q=a1+search_q.replace(/ /g,'+')+a2+search_q.replace(/ /g,'+');
get_rank(search_q,1);
function get_rank(uri,page){

	request(uri,function(err,resp,body){// now request for query using request method
										// start of scraping of data recived from here
		if(body!=null) 					// check if body is not null, if you dont include this you will get error while scraping if body is 
										//null(i.e no data has been sent)
		{
			console.log("______________Searching Page : "+page+"___________________");
			var $=cheerio.load(body);	// make jquery variable and load structute(DOM) of the recieved body
			var page_c=1;
			$(".r a").each(function(){
			var page_r=(page-1)*10+page_c++;
			//console.log("rank :"+page_r+"--> "+$(this).attr('href'));       // to print the url uncomment it
			console.log("rank :"+page_r+"--> "+$(this).text());
			});
			if(flag==1)    				 // this condition is because I don't want to navigate through more than 10 pages ,and if you 
										 //want to navigate more we can modify it.
			{
				flag=0;
				$("#nav td a").each(function(){ // navigation throgh the google result page occurs here
				if($(this).text()!="Next")
				{
					var temp=a3+$(this).attr('href');
					get_rank(temp,$(this).text());
				}
				});
			}
 
		}
	});
}
