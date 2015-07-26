//DOM Manipulations
var createRow,updateRows;
createRow = function(){
	var tr =  $("<tr></tr>");
	tr.append($("<td></td>").append($("<input type='text'></input>").change(updateRows)));
	tr.append($("<td></td>").append($("<select>"
		+ "<option value='Weekdays'>Weekdays</option>"
		+ "<option value='Weekends'>Weekends</option>"
		+ "<option value='Everyday'>Everyday</option>"
		+ "<option value='Customize'>Customize</option>"
		+ "</select>").change(repeatSelectScript)));
	tr.append($("<td></td>").append($("<select>"
		+ "<option value='0'>Sunday</option>"
		+ "<option value='1'>Monday</option>"
		+ "<option value='2'>Tuesday</option>"
		+ "<option value='3'>Wednesday</option>"
		+ "<option value='4'>Thursday</option>"
		+ "<option value='5'>Friday</option>"
		+ "<option value='6'>Saturday</option>"
		+ "</select>").attr("disabled",true).change(daySelect)));
	var  inputs = $("<td></td>");
	for(var i=0; i < 7; i++){
		if(i==0)
			inputs.append($("<input type='time' class='time"+i.toString()+"'></input>").css("display","inline"));
		else
			inputs.append($("<input type='time' class='time"+i.toString()+"'></input>").css("display","none"));
	}
	tr.append(inputs);
	return tr;
};
var repeatSelectScript = function(){
	if($(this).val()==="Customize"){
		$(this).parent().next().children().attr("disabled", false);
		$(this).parent().next().next().children().attr("disabled", false);
	}
	else
		$(this).parent().next().children().attr("disabled", true);
	$(this).parent().next().next().children().attr("disabled", true);
};
var daySelect = function(){
	$(this).parent().next().children().css("display","none");
	$(this).parent().next().children().eq($(this).val()).css("display","inline");
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
updateRows();

//End DOM Manip
