// program to find similar keywords for the given query
//prabhudas552@gmail.com, HMIT intern, 2015
var request = require('request');
var cheerio = require("cheerio");
var rl=require('readline');
var args=process.argv.slice(2);
var search_q=args.join(' ');
console.log("Searching for query :"+search_q);
var a1="https://www.google.com/search?gws_rd=ssl&site=&source=hp&q=";
var a2="&oq=";
var search=search_q;
var rep=search.replace(/ /g,"+");
var query=a1+rep+a2+rep;
search_fun(search_q);
function search_fun(param)
{
	var url=a1+param.replace(/ /g,"+")+a2+param.replace(/ /g,"+");
	//console.log(url);
	request(url, function (error, response, body) {
	if(body!=null)
	{       
		//console.log("Searching For :"+param);
		var $=cheerio.load(body);
		var c=0;
		$("p a").each(function(){
		var link=$(this);
		
		if(link.text()=="Advanced search" || link.text()=="Search Help" || link.text()=="Send feedback")
		{
			c=1;
		}
		if(c==0)
		{
			console.log(link.text());
			search_fun(link.text());
		}
		});
	}
    });
}
