let fs = require('fs');
let file = process.argv[2].toString();
let inpText = fs.readFileSync(file);
inpText = inpText.toString();

let memory = new Array();
memory = inpText.split(/ |\r\n/);
fileLength = memory.length
console.log(memory);
let ip = 0;
let numberOfArgument = 3;

while (ip < fileLength){
	switch(memory[ip]){
		case 'input': //ввод аргументов с командной строки в ячейку памяти
			memory[memory[ip + 1]] = process.argv[numberOfArgument].toString();
			numberOfArgument += 1;
			ip += 2;
			break;
		case 'output': //вывод значения из ячейки памяти
			console.log(memory[memory[ip+1]]);
			ip += 2;
			break;
		case 'set': //занесение значения в ячейку памяти
			memory[memory[ip+1]] = parseFloat(memory[ip+2])
			ip += 3;
			break;
		case 'add': //сложение
			memory[memory[ip+1]] = memory[memory[ip+2]] + memory[memory[ip+3]];
			ip += 4;
			break;
		case 'sqrt': //квадратный корень
			memory[memory[ip+1]] = Math.sqrt(memory[memory[ip+2]]);
			ip += 3;
			break;
		case 'div': //деление
			memory[memory[ip+1]] = memory[memory[ip+2]] / memory[memory[ip+3]];
			ip += 4;
			break;
		case 'pow': //возведение в степень
			memory[memory[ip+1]] = Math.pow(memory[memory[ip+2]], memory[memory[ip+3]]);
			ip += 4;
			break;
		case 'int': //преобразование в integer
			memory[memory[ip+1]] = parseInt(memory[memory[ip+1]]);
			ip += 2;
			break;
		case 'mul': //умножение
			memory[memory[ip+1]] = memory[memory[ip+2]] * memory[memory[ip+3]];
			ip += 4;
			break;
		case 'nod': //наибольший общий делитель
			let num1 = memory[memory[ip+2]];
			let num2 = memory[memory[ip+3]];
			let actualNod = 1;
			if (num1 < num2){
				let temp = num1;
				num1 = num2;
				num2 = temp;
			}
			if (num2 == 0) memory[memory[ip+1]] = num1;
			else {
				for (let currentD = 2; currentD <= num1; currentD++)
					if (num1 % currentD == 0 && num2 % currentD == 0) actualNod = currentD;
				memory[memory[ip+1]] = actualNod;
			}
			ip += 4;
			break;
	}
}
