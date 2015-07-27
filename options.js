//TODO -- Validate Form

//DOM Manipulations
var createRow,updateRows;
createRow = function(prev){
	if (prev === undefined){
		prev = {patternz: "",
			repeat: "Weekdays",
			start: "",
			end: ""
		};
	}
	console.log(prev);
	var tr =  $("<tr></tr>");
	tr.append($("<td></td>").append($("<input type='text'></input>").change(updateRows).val(prev.patternz)));
	tr.append($("<td></td>").append($("<select>"
		+ "<option value='Weekdays'>Weekdays</option>"
		+ "<option value='Weekends'>Weekends</option>"
		+ "<option value='Everyday'>Everyday</option>"
		+ "<option value='Customize'>Customize</option>"
		+ "</select>").change(repeatSelectScript).val(prev.repeat)));
	tr.append($("<td></td>").append($("<select>"
		+ "<option value='0'>Sunday</option>"
		+ "<option value='1'>Monday</option>"
		+ "<option value='2'>Tuesday</option>"
		+ "<option value='3'>Wednesday</option>"
		+ "<option value='4'>Thursday</option>"
		+ "<option value='5'>Friday</option>"
		+ "<option value='6'>Saturday</option>"
		+ "</select>").attr("disabled",true).change(daySelect)));
	var  stime = $("<td></td>");
	var  etime = $("<td></td>");
	for(var i=0; i < 7; i++){
		if(i==0){
			stime.append($("<input type='time' class='time"+i.toString()+"'></input>").css("display","inline").val(prev.start[i]));
			etime.append($("<input type='time' class='time"+i.toString()+"'></input>").css("display","inline").val(prev.end[i]));
		}
		else
		{
			stime.append($("<input type='time' class='time"+i.toString()+"'></input>").css("display","none").val(prev.start[i]));
			etime.append($("<input type='time' class='time"+i.toString()+"'></input>").css("display","none").val(prev.end[i]));
		}
	}
	tr.append(stime,etime);
	return tr;
};
var repeatSelectScript = function(){
	if($(this).val()==="Customize"){
		$(this).parent().next().children().attr("disabled", false);
		//$(this).parent().next().next().children().attr("disabled", false);
		//$(this).parent().next().next().next().children().attr("disabled", false);
	}
	else{
		$(this).parent().next().children().attr("disabled", true);
		$(this).parent().next().children().val("0").trigger("change");
		//$(this).parent().next().next().children().attr("disabled", true);
		//$(this).parent().next().next().next().children().attr("disabled", true);
	}
};
var daySelect = function(){
	$(this).parent().next().children().css("display","none");
	$(this).parent().next().next().children().css("display","none");
	$(this).parent().next().children().eq($(this).val()).css("display","inline");
	$(this).parent().next().next().children().eq($(this).val()).css("display","inline");
}
updateRows = function(){
	var enputs = 0; //Counts empty inputs
	$($("input[type='text']").get().reverse()).each(function(){
		if($(this).val().trim()=="")
			enputs++;
		if(enputs>1){
			$(this).parent().parent().remove();
			enputs--;
		}
	});
	if(enputs==0)
		$("#setting_table").append(createRow());
};

//End DOM Manip


var saveOptions = function(){
	var data = [];
	var record;
	$("#setting_table").children().each(function(){
		record = {};
		record.patternz = $(this).children().eq(0).children().first().val();
		if(record.patternz != ""){
			record.repeat = $(this).children().eq(1).children().eq(0).val();
			record.start = [];
			record.end = [];
			for(var i = 0; i < 7; i++){
				record.start.push($(this).children().eq(3).children().eq(i).val());
				record.end.push($(this).children().eq(4).children().eq(i).val());
			}
			data.push(record);
		}
	})
	console.log(data);
	chrome.storage.sync.set({'options': data},function(){
		console.log('Settings Saved');
	});
}

$("input[type='submit'").click(saveOptions);

var initialize = function(){
	chrome.storage.sync.get('options',function(result){
		nrows = result.options.length;
		for(var i = 0; i < nrows; i++){
			$("#setting_table").append(createRow(result.options[i]));
		}
		$("#setting_table").append(createRow());
		$("select").trigger("change");
	});
	//console.log(data);
	
};
initialize();
