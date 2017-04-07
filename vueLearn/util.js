import * as Constants from './Constants.js';



//根据value排序选中项数组
function sortBy(selectedList){
	return selectedList.sort((item1,item2) => item1.value > item2.value ? 1 : -1);
}

export {
	sortBy
}
