let fs = require('fs')
let arguments = process.argv //записываем что нам подали в командную строку

let s = fs.readFileSync(arguments[2].toString()).toString(); //строка, в которой надо найти подстроку 
let t = arguments[3]; //подстрока, которую нужно найти в строке
let results = new Array();
let j = 0;

for(let i = 0; i <= s.length - t.length; i++){
	while(s[i+j] == t[j]){
		if (j+1 == t.length){
			results.push(i+1);
		};
		j += 1;
	};
	j = 0;
};
 
 console.log("подстрока встречается на данных позициях:", results);
