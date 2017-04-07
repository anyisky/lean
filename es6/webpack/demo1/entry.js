/*import {firstName, lastName, year, multiply} from './content.js';

console.log(firstName); //Michael
setTimeout(() => console.log(firstName),500); // Winchester

document.getElementById('firstname').value = firstName;
document.getElementById('lastname').value = lastName;
document.getElementById('year').value = year;

document.getElementById('multiply').innerHTML = multiply(6,7);

//用来体现500毫秒的动态取值
$('#btnAgain').click(function(){
	$('#again').text(firstName);
});*/

import customName from './contentDefault.js';
document.getElementById('firstname').value = customName.firstName;