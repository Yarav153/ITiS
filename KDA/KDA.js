let fs = require('fs')
let arguments = process.argv //записываем что нам подали в командную строку

let s = fs.readFileSync(arguments[2].toString()).toString(); //строка, в которой надо найти подстроку 
let t = arguments[3]; //подстрока, которую нужно найти в строке
let m = t.length; //количество строк в таблице переходов
let alph = new Array();
for(let i = 0; i<m; i++) alph[t.charAt(i)] = 0; //формируем алфавит строки t

let del = new Array(m+1); //del - двумерный массив состоящий из таблицы переходов
for(let j = 0; j <= m; j++) del[j] = new Array();

for(let i in alph) del[0][i] = 0;  //инициализация таблицы переходов

for(let j = 0; j < m; j++){ //формируем таблицу переходов
	prev = del[j][t.charAt(j)];
	del[j][t.charAt(j)] = j+1;
	for(i in alph) del[j+1][i] = del[prev][i];
}

for(let j = 0; j<=m; j++){ //вывод таблицы переходов
	let deltaTable = '';
	for(let i in alph) deltaTable += del[j][i] + ' ';
}

let state = 0;
let results = new Array();
for(let i = 0; i < s.length; i++){	
	if(s.charAt(i) in alph) state = del[state][s.charAt(i)]
	else state = 0;
	if (state == m) results.push(i-m+2);
}
console.log("подстрока встречается на данных позициях:", results);