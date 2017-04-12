// JavaScript Document

function randomArr(iAll,iNow){
		
	var arr = [];
	var result = [];
	
	for(var i=0;i<iAll;i++){
		arr.push( i );
	}
	
	for(var i=0;i<iNow;i++){
		result = result.concat( arr.splice( Math.floor(Math.random()*arr.length) ,1) );
	}
	
	return result;
	
}