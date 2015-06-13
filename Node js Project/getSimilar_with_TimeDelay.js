//prabhudas552@gmail.com, 12/06/2015, HMIT-intern project work
//program to get all similar keywords for the given query.

//Get the required modules for the program here
var request=require('request');
var cheerio=require('cheerio');
//delcare variables used in the program here
var a1;	// It is used to store the part one of search query url.
var a2; // It is used to store the part two of search query url.
var a3;	// It is used to get the user query from command line
var url;// It is url made by using above three variables.
var node;// It is used to get current node in the DOM tree
var flag;//It is used to skip the unrelated content
var temp=[];//It is used to store the node value temporarily.
// Initialise a1 and a2
a1="https://www.google.com/search?gws_rd=ssl&site=&source=hp&q=";
a2="&oq=";
// Get the command line arguments from user i.e search query that user searching for
a3=process.argv.slice(2).join(' ');
// Function call to google_search()
google_search(a3);
//define function google_search() here
function google_search(parameter){
	console.log("_______"+parameter+"________");
	// make url here by cancatenating the variables a1,a2 and a3;
	url=a1+parameter.replace(/ /g,'+')+a2+parameter.replace(/ /g,'+');
	//Now make request to server using above url
	request(url,function(err,resp,body){
		// check if error occurs
		if(err){
			console.log("Unable to load the page..!");
		}else if(body!=null){
			// build DOM tree of the recieved web page
			var $=cheerio.load(body);
			//Now travel through the DOM to get important information
			$("p a").each(function(){
				flag=0; // make it one when you encounter unrelated content
				node=$(this);
				if(node.text()=="Advanced search" || node.text()=="Search Help" || node.text()=="Send feedback"){
					flag=1;
				}
				if(flag==0){ // this means we have related data
					console.log(node.text());
					// store the node value in temp[], so that we can reccursively search in temp[];
					temp.push(node.text());
				}
			});
		}
		setTimeout(function(){	// a time delay of 3 seconds between each subequent queries.
			google_search(temp.shift());
		},3000);
	});
}
