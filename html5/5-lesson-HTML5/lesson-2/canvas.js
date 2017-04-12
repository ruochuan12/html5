// JavaScript Document

importScripts('randomArr.js');

self.onmessage = function(ev){
	
	var arr = randomArr(ev.data , ev.data/10);
	
	self.postMessage(arr);
	
};