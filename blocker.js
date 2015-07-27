//js that runs on every page and blocks some of them
var block = function(){
	document.head.innerHTML = '';
	document.body.innerHTML = '<h1>Your Productivity Filter Has Blocked This Page. Get Back on Track!';
}

console.log(document.URL);
chrome.storage.sync.get('options',function(result){
	for (var i = 0; i < result.options.length; i++){
		var row = result.options[i];
		console.log(row);
		var pattern = new RegExp(row.patternz,'i');
		if(pattern.test(document.URL)){
			var d = new Date();
			var index = d.getDay();
			console.log(row.repeat,index)
			if((row.repeat == "Weekdays" && index > 0 && index < 5) || (row.repeat == "Weekends" && (index == 0 || index > 4)))
			{
				if(row.repeat != "Customize")
					index = 0;
				var start = new Date();
				console.log("here");
				var end = new Date();
				var sstr = row.start[index].split(":");
				start.setHours(sstr[0]);
				start.setMinutes(sstr[1]);
				var estr = row.end[index].split(":");
				end.setHours(estr[0]);
				end.setMinutes(estr[1]);
				if(start < d && d < end){
					block();
				}
			}
		}
	}
});