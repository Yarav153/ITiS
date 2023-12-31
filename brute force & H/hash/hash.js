let fs = require('fs')
let arguments = process.argv //записываем что нам подали в командную строку

let s = fs.readFileSync(arguments[2].toString()).toString(); //строка, в которой надо найти подстроку 
let t = arguments[3]; //подстрока, которую нужно найти в строке
let results = new Array();
let hashT = 0;
let testHash = 0;

for (let i = 0; i <= t.length-1; i++){
	hashT += t.charCodeAt(i);
	testHash += s.charCodeAt(i);
};

for (let i = 1; i <= s.length-t.length+1; i++){
	if (testHash == hashT & t == s.slice(i-1, i+t.length-1)){
		results.push(i);
	}
	testHash = testHash - s.charCodeAt(i-1) + s.charCodeAt(i+t.length-1);
};
 
 console.log("подстрока встречается на данных позициях:", results);
