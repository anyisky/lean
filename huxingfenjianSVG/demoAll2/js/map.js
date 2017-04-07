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
		areaPointsObj[prop].imgCount = arrToObj[prop].imgCount;
		areaPointsObj[prop].type = arrToObj[prop].type;
		areaPointsObj[prop].acreage = arrToObj[prop].acreage;
		areaPointsObj[prop].orientations = arrToObj[prop].orientations;
		areaPointsObj[prop].windowType = arrToObj[prop].windowType;
		areaPointsObj[prop].picList = arrToObj[prop].picList;
		
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
		var html2 = '<polygon title="点击查看图片" infoid="'+areaPointsObj[prop].id+'" class="hoverable" points="'+areaPointsObj[prop].newPoints.join(",")+'" />';
		//var html3 = '<li infoid="'+areaPointsObj[prop].id+'">'+areaPointsObj[prop].text+'<a href="javascirp:;"><img src="images/img.png" height="18" />'+areaPointsObj[prop].imgCount+'</a></li>';
		var html3 = '<tr infoid="'+areaPointsObj[prop].id+'">'+
						'<td>'+areaPointsObj[prop].type+'</td>'+
						'<td align="right" style="padding-right:15px">'+areaPointsObj[prop].acreage+'</td>'+
						'<td>'+areaPointsObj[prop].orientations+'</td>'+
						'<td>'+areaPointsObj[prop].windowType+'</td>'+
						'<td><a href="javascript:;" class="js_showImg" data-title="'+areaPointsObj[prop].type+'" data-info="'+encodeURIComponent(JSON.stringify(areaPointsObj[prop].picList))+'"><img src="images/img.png" height="18" />'+areaPointsObj[prop].imgCount+'</a></td>'+
					'</tr>'
		
		htmlArr2.push(html2);
		htmlArr3.push(html3);
	}
	

	
	var str = '<svg id="svgBox" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0">' + htmlArr2.join('') + '</svg>';
	$('#svgAppend').append(str);//必须用append  用html在ie下不支持
	$('.js_infolist').append(htmlArr3.join(''));
}

$('#svgAppend').on('mouseover','polygon',function(){
	var id = $(this).attr('infoid');
	$('.js_infolist tr').removeClass('hover');
	$('.js_infolist tr[infoid='+id+']').addClass('hover');
	
});
$('#svgAppend').on('mouseout','polygon',function(){
	
	$('.js_infolist tr').removeClass('hover');
});

//点击svg区域的
$('#svgAppend').on('click','polygon',function(){
	
	var id = $(this)[0].getAttribute('infoid');
	$('.js_infolist tr').removeClass('active');
	$('.js_infolist tr[infoid='+id+']').addClass('active');
	
	$('#svgAppend polygon').each(function(){
		var curClass = $(this)[0].getAttribute('class');
		curClass = $.trim(curClass.replace(/active/,''));
		
		$(this)[0].setAttribute('class',curClass);
	});
	var newClass = $('#svgAppend polygon[infoid='+id+']')[0].getAttribute('class');
	$('#svgAppend polygon[infoid='+id+']')[0].setAttribute('class',newClass + ' active');

	
	
});

$('.js_infolist').on('mouseover','tr',function(){
	var id = $(this).attr('infoid');

	//必须用原生的设置class属性才有效
	$('#svgAppend polygon').each(function(){
		var curClass = $(this)[0].getAttribute('class');
		curClass = $.trim(curClass.replace(/current/,''));
		
		$(this)[0].setAttribute('class',curClass);
	});
	var newClass = $('#svgAppend polygon[infoid='+id+']')[0].getAttribute('class');
	$('#svgAppend polygon[infoid='+id+']')[0].setAttribute('class',newClass + ' current');
	
});

$('.js_infolist').on('mouseout','tr',function(){
	$('#svgAppend polygon').each(function(){
		var curClass = $(this)[0].getAttribute('class');
		curClass = $.trim(curClass.replace(/current/,''));
		
		$(this)[0].setAttribute('class',curClass);
	});
});

var CurPicLists = [],
	CurPicIndex = 0,
	CurType = '';
$('.js_infolist').on('click','.js_showImg',function(){
	CurType = $(this).attr('data-title');
	CurPicIndex = 0;
	CurPicLists = JSON.parse(decodeURIComponent($(this).attr('data-info')));
	$('.js_infolist tr').removeClass('active');
	var id = $(this).parents('tr').attr('infoid');
	$('#svgAppend polygon[infoid='+id+']')[0].setAttribute('class','hoverable active');
	
	$(this).parents('tr').addClass('active');
	
	$('#album').show();
	$('#album img').attr('src',CurPicLists[0].src);
	$('.text').html('<span>'+CurType+'</span> <span>'+(CurPicIndex + 1)+'/'+CurPicLists.length+'</span>');
});

$('.js_infolist').on('click','tr',function(){
	$('.js_infolist tr').removeClass('active');
	var id = $(this).attr('infoid');
	
	/*
	$('#svgAppend polygon').each(function(){
		var curClass = $(this)[0].getAttribute('class');
		curClass = $.trim(curClass.replace(/active/,''));
		
		$(this)[0].setAttribute('class',curClass);
	});
	var newClass = $('#svgAppend polygon[infoid='+id+']')[0].getAttribute('class');
	$('#svgAppend polygon[infoid='+id+']')[0].setAttribute('class',newClass + ' active');
	*/
	$(this).addClass('active');
	
	if($('#album:visible').length > 0){
		CurType = $(this).find('.js_showImg').attr('data-title');
		CurPicIndex = 0;
		CurPicLists = JSON.parse(decodeURIComponent($(this).find('.js_showImg').attr('data-info')));
		$('#album').show();
		$('#album img').attr('src',CurPicLists[0].src);
		$('.text').html('<span>'+CurType+'</span> <span>'+(CurPicIndex + 1)+'/'+CurPicLists.length+'</span>');
	}
});

$('#imagebox').on('click','.js_back',function(){
	$('#album').hide();
	CurPicIndex = 0;
});

$('#imagebox').on('click','.js_prev',function(){
	if(CurPicIndex == 0){
		CurPicIndex = CurPicLists.length - 1;
	}else{
		CurPicIndex--;
	}
	$('#album img').attr('src',CurPicLists[CurPicIndex].src);
	$('.text').html('<span>'+CurType+'</span> <span>'+(CurPicIndex + 1)+'/'+CurPicLists.length+'</span>');
});

$('#imagebox').on('click','.js_next',function(){
	console.log(CurPicIndex);
	console.log(CurPicLists);
	if(CurPicIndex == CurPicLists.length - 1){
		CurPicIndex = 0;
	}else{
		CurPicIndex++;
	}
	$('#album img').attr('src',CurPicLists[CurPicIndex].src);
	$('.text').html('<span>'+CurType+'</span> <span>'+(CurPicIndex + 1)+'/'+CurPicLists.length+'</span>');
});

		
		
		
		
		
		
		