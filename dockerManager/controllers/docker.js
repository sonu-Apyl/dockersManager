/*
||docker.js
||Description:   Contain functions to operate image  using dockers remote api's
||				->index() : entery file
||				->list() : lsit all containers 
||				->progressStatus() : function to track file uploading progress status 
*/		


var appUtil = require("./app_util");


exports.index = function(req, res){

	res.render("docker/index", {title:"Dashboard", 
			dockerfile_name  : req.params.docfileName });

}


exports.inspect = function(req, res){

	//makeGetRequest("/containers/json?all=1" , function(data){
	  appUtil.makeGetRequest("/images/"+ req.params.docfileName +"/json", function(data,status){
		if( data){
			if( status ===404){
				//res.end("no such image: " + req.params.docfileName);
				jsonData = { "No such image" : req.params.docfileName};
				//return;
			}else{
				jsonData = JSON.parse( data);
			}
			res.render("docker/inspect", {
				title:"Inspect", 
				dockerfile_name  : req.params.docfileName, 
				"data":jsonData,
				statusCode : status
			 });

		}else{

			res.end("Unable to fetch json");

		}
	}); 
}



exports.list =function(req, res){

	res.send("list dockers");

}


exports.containers =function(req, res){

	res.send("list dockers containers");

}






