window.commonService = {
	buildSug : function(data,options,sugCtrlEl) {
		
	},
	buildSugListHtml : function(resultData,options,sugCtrlEl) {
		options.buildSugCallback ? options.buildSugCallback(resultData,options,sugCtrlEl) 
								: this.buildSug(resultData,options,sugCtrlEl);
		
		//没有数据 那就直接返回，不往下执行了
		if(resultData.length === 0){
			return ;
		}
		
		sugCtrlEl.style.display = 'block';
	}
};
