function dealMap(){
	$('#svgAppend').empty();
	var pix = 2400/($('#img_huxing').width());
	
	var arrToObj = {};//二维数组转成对象 - 数组
	var areaPointsObj = {};//以对象格式存放每个热区的坐标值

	
	var dataArr = data.floors;
	//二维数组转成对象 - 数组
	for(var i = 0;i < dataArr.length;i++){
		var item = dataArr[i];
		arrToObj[i] = item;
	}
	
	//遍历对象
	for(var prop in arrToObj){
		var itemArr = arrToObj[prop].points;
		
		areaPointsObj[prop] = {};
		areaPointsObj[prop].newPoints = [];
		areaPointsObj[prop].id = arrToObj[prop].id;
		areaPointsObj[prop].text = arrToObj[prop].text;
		
		var firstx = (itemArr[0].x)/pix;
		var firsty = (itemArr[0].y)/pix;
		
		for(var i = 0;i < itemArr.length;i++){
			areaPointsObj[prop].newPoints.push((itemArr[i].x)/pix);
			areaPointsObj[prop].newPoints.push((itemArr[i].y)/pix);
		}
		
		//为了保证路径闭合，将第一个坐标点作为最后一组坐标点
		areaPointsObj[prop].newPoints.push(firstx);
		areaPointsObj[prop].newPoints.push(firsty);
	}
	
	var htmlArr = [],htmlArr2 = [],htmlArr3 = [];
	for(var prop in areaPointsObj){
		//svg的用这快，可以有样式展现 fill="transparent" stroke="#00ae66" stroke-width="4"
		var html2 = '<polygon infoid="'+areaPointsObj[prop].id+'" class="hoverable" points="'+areaPointsObj[prop].newPoints.join(",")+'" />';
		var html3 = '<li infoid="'+areaPointsObj[prop].id+'">'+areaPointsObj[prop].text+'</li>';
		htmlArr2.push(html2);
		htmlArr3.push(html3);
	}
	

	
	var str = '<svg id="svgBox" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0">' + htmlArr2.join('') + '</svg>';
	$('#svgAppend').append(str);//必须用append  用html在ie下不支持
	$('.js_infolist').append(htmlArr3.join(''));
}

$('#svgAppend').on('mouseover','polygon',function(){
	var id = $(this).attr('infoid');
	$('.js_infolist li').css({'color':'#333','background':'none'});
	$('.js_infolist li[infoid='+id+']').css({'color':'#fff','background':'#00ae66'});
});
$('#svgAppend').on('mouseout','polygon',function(){
	$('.js_infolist li').css({'color':'#333','background':'none'});

});

$('.js_infolist').on('mouseover','li',function(){
	var id = $(this).attr('infoid');

	//必须用原生的设置class属性才有效
	$('#svgAppend polygon').each(function(){
		$(this)[0].setAttribute('class','hoverable');
	});
	$('#svgAppend polygon[infoid='+id+']')[0].setAttribute('class','hoverable current');


	$('.js_infolist li').css({'color':'#333','background':'none'});
	$(this).css({'color':'#fff','background':'#00ae66'});
});

$('.js_infolist').on('mouseout','li',function(){

	$('#svgAppend polygon').each(function(){
		$(this)[0].setAttribute('class','hoverable');
	});
	$('.js_infolist li').css({'color':'#333','background':'none'});
});

		
		
		
		
		
		
		