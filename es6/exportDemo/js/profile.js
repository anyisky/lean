let firstName = 'Michael';
let lastName = 'Jackson';
let year = '1958';
let testAis = '测试改名';

function multply(x,y){
	return x * y;
}

export {
	firstName,
	lastName,
	year,
	multply,
	testAis as newname
};
