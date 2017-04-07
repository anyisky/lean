var trueW = $('#trueimg').width();
var trueH = $('#trueimg').height();//4
var smallArr = [];
var areaArr = [];

var itemObj = {};
var itemObj1 = {};

var html = '<area shape="poly" coords="76,101,170,103,171,165,75,169" href="#" />';

for(var i = 0;i < data.floors.length;i++){
	var item = data.floors[i];
	itemObj[i] = item;
}

for(var prop in itemObj){
	var itemArr = itemObj[prop];
	itemObj1[prop] = [];
	var firstx = (itemArr[0].x)/4;
	var firsty = (itemArr[0].y)/4;
	
	for(var i = 0;i < itemArr.length;i++){
		itemObj1[prop].push((itemArr[i].x)/4);
		itemObj1[prop].push((itemArr[i].y)/4);
	}
	itemObj1[prop].push(firstx);
	itemObj1[prop].push(firsty);
}

var htmlArr = [];
for(var prop in itemObj1){
	//obj2[prop] = itemObj1[prop].join(',');
	var html = '<area shape="poly" coords="'+itemObj1[prop].join(",")+'" href="#" alt="'+prop+'" />';
	htmlArr.push(html);
}
//console.log(obj2);
$('#Map').html(htmlArr.join(''));
		
		
		
		
		
		
		