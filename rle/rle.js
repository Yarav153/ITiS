let fs = require('fs')

let arguments = process.argv //записываем что нам подали в командную строку

if (arguments[2] == 'code'){ //если текст надо закодировать
	let inpText = fs.readFileSync(arguments[3].toString());  //текст который надо закодировать
	let whereToWrite = arguments[4]; //куда нужно будет записать закодированный текст
	code(inpText.toString(), whereToWrite.toString()); //вызываем функцию кодирования
}else if (arguments[2] == 'decode'){ //если текст нужно декодировать
	let inpTxt = fs.readFileSync(arguments[3].toString()); //текст который надо раскодировать
	let whereToWrite = arguments[4]; //куда нужно будет записать раскодированный текст
	decode(inpTxt.toString(), whereToWrite.toString()) //вызываем функцию декодирования
}else console.log("i don't know what you want") //если написали вместо code или decode какую-нибудь фигню

function code(inpText, whereToWrite){ //функция закодирования текста

	let indOfChar = 0, countCharReps = 1; //индекс буквы в изначальном тексте и количество повторов буквы в изначальном тексте
	let inpTxt = ""; //закодированный текст
	let countAsciiReps; //количество повторов буквы, которое не уместилось в доступный код ASCII

	while (indOfChar < inpText.length){ //просматриваем каждую букву пока буквы не закончатся
		while(inpText.charAt(indOfChar) == inpText.charAt(indOfChar+countCharReps)) //пока буква совпадет
			countCharReps++; //прибавляем к счетчику повторившихся букв
		if (countCharReps > 1 || inpText.charAt(indOfChar) == '#'){ //если буква повторилась или буква это #
			countAsciiReps = Math.floor(countCharReps/255); //считаем вместится ли у нас количество повторов в один символ
			while (countAsciiReps > 0){ //пока количество повторов не умещается в один символ
					inpTxt = inpTxt.concat('#', String.fromCharCode(255), inpText.charAt(indOfChar)); //кодируем последним символом
					countAsciiReps -= 1; //уменьшаем количество повторов
			}
			if (countCharReps % 255 != 0) //если остались невлезшие буквы
				inpTxt = inpTxt.concat('#', String.fromCharCode(countCharReps%255), inpText.charAt(indOfChar)); //добавляем последний символ
		}else
			inpTxt = inpTxt.concat(inpText.charAt(indOfChar)) //если буква не повторялась - добавляем ее в закодированный текст
		indOfChar += countCharReps; //пропускаем повторившиеся буквы
		countCharReps = 1; //возвращаем счетчик повторения букв на единичку
	}
	console.log('коэффициент сжатия:', inpText.length/inpTxt.length); //вычисляем коэффициент сжатия
	fs.writeFileSync(whereToWrite, inpTxt); //сохраняем закодированный текст
}

function decode(inpTxt, whereToWrite){ //функция декодирования текста
	let indOfChar = 0, countCharReps = 1; //индекс буквы в изначальном тексте и количество повторений буквы
	let inpText = ""; //декодированный текст
	
	while (indOfChar < inpTxt.length){ //просматриваем каждую букву пока буквы не закончатся
		if (inpTxt.charAt(indOfChar) == '#'){ //если буква это решетка
			countCharReps = inpTxt.charCodeAt(indOfChar+1); //записываем количество повторений закодированной буквы
			inpText = inpText.concat(inpTxt.charAt(indOfChar+2).repeat(countCharReps)); //добавляем все буквы в декодированный текст
			indOfChar += 2; //пропускаем закодированную букву
		}else
			inpText = inpText.concat(inpTxt.charAt(indOfChar)); //добавляем букву в в декодированный текст
			indOfChar += 1; //переходим к следующей букве
	}
	console.log('коэффициент сжатия:', inpText.length/inpTxt.length); //вычисляем коэффициент сжатия
	fs.writeFileSync(whereToWrite, inpText); //сохраняем декодированный текст
}