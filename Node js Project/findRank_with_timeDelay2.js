//prabhudas552@gmail.com, 12/06/2015, HMIT-intern project work
//program to get rank of websites when searched for the given query.

//Get the required modules for the program here
var request=require('request');
var cheerio=require('cheerio');
//delcare variables used in the program here
var a1;	// It is used to store the part one of search query url.
var a2; // It is used to store the part two of search query url.
var a3;	// It is used to get the user query from command line
var a4; // It is the url of google which is used to navigate from current page to next page.
var url;// It is url made by using above three variables.
var node;// It is used to get current node in the DOM tree
var flag;//It is used to skip the unrelated content
var temp=[];//It is used to store the node value temporarily.
var pageCounter=1; // variable which keeps track of page
var rank=1;//variable which is used to give rank to each url.
var close=0; // used to close connection
// Initialise a1 and a2,a4
a1="https://www.google.com/search?gws_rd=ssl&site=&source=hp&q=";
a2="&oq=";
a4="https://www.google.co.in";
// Get the command line arguments from user i.e search query that user searching for
a3=process.argv.slice(2).join(' ').replace(/ /g,'+');
// Function call to google_search()
//console.log("searching for ..."+a3);
url=a1+a3+a2+a3;
google_search(url);
//define function google_search() here
function google_search(url){
	//console.log("_________________________Page :"+pageCounter+"______________________________");
	// make url here by cancatenating the variables a1,a2 and a3;
	//Now make request to server using above url
	request(url,function(err,resp,body){
		//check if error occured
		if(err){
			//console.log("Unable to load page...!");
			close=1;
		}else if(body!=null){
			// Get The DOM tree of recieved data
			var $=cheerio.load(body);
			//find the rank here
			$(".s cite").each(function(){
				console.log($(this).text());//Use this line to direct output to some file i.e file.csv else comment it
				//console.log(rank+":"+$(this).text()); //uncomment this line when your not  directing output to another file i.e file.csv
				//rank++; //uncomment this line when you are not directing output another file i.e file.csv
			});
			// now if temp is null, we have reached the end of naviagation tab, so now get all the links of navigation in the current page.
			if(temp.length==0){
				//console.log("Getting Navigation links from the current page...!");
				$("#nav td a").each(function(){
					if($(this).text()!="Next"){
						if(($(this).text())>pageCounter){
							temp.push($(this).attr('href'));
							//console.log($(this).text());
						}
					}
				});
				//console.log("All navigation links are retrived");
			}
		}
		// add some time dealy to search for next page.
		if(close==0){
			setTimeout(function(){ // a time delay of 4 seconds between subsequent queries.
			// make url of the next page
				pageCounter++;
				url=a4+temp.shift();
				google_search(url);
			},4000);
		}
	});
}
