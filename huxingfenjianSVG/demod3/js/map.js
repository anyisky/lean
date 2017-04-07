function clickPolygon(){
	alert('test');
	
}
function dealMap(){
	var pix = 2400/($('#img_huxing').width());
	
	var arrToObj = {};//二维数组转成对象 - 数组
	var areaPointsObj = {};//以对象格式存放每个热区的坐标值
	
	var svgObj = d3.select("svg");
		svgObj.selectAll("polygon").remove();
	

	var dataArr = data[pageNo];//当前图片的数据坐标点集合
	//二维数组转成对象 - 数组
	for(var i = 0;i < dataArr.length;i++){
		var item = dataArr[i];
		arrToObj[i] = item;
	}

	//遍历对象
	for(var prop in arrToObj){
		var itemArr = arrToObj[prop];
		
		areaPointsObj[prop] = [];
		var firstx = (itemArr[0].x)/pix;
		var firsty = (itemArr[0].y)/pix;
		
		for(var i = 0;i < itemArr.length;i++){
			areaPointsObj[prop].push((itemArr[i].x)/pix);
			areaPointsObj[prop].push((itemArr[i].y)/pix);
		}
		
		//为了保证路径闭合，将第一个坐标点作为最后一组坐标点
		areaPointsObj[prop].push(firstx);
		areaPointsObj[prop].push(firsty);
	}

	var htmlArr = [],htmlArr2 = [];
	var testArr = [];
	for(var prop in areaPointsObj){
		testArr.push(areaPointsObj[prop]);
	}

	svgObj.selectAll("polygon")
	  .data(testArr)
	  .enter()
	  .append("polygon")
	  .attr("points",function(d){
			return d;
	  })
	  .attr("fill","transparent")
	  .attr("stroke","#00ae66")
	  .attr("stroke-width","4");

}

		
		
		
		
		
		
		