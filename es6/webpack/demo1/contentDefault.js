var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

function multiply(x,y){
	return x * y;
}


export default {firstName,lastName};//这样相当于把两个属性当成对象抛出去了，能正常取到 ，等价于：export default {firstName:firstName,lastName:lastName};

