let str = 'abrakadabra'
let tree = new Array(); //дерево узлов
let alph = new Object(); //алфавит частот
let rarestFreq = str.length; //самая редкая частота
let rarestFreqLet = 0; //номер самого редкого символа
let secRarestFreq = str.length; //вторая по редкости частота
let secRarestFreqLet = 0; //номер второго по редкости символа

for(let i = 0; i < str.length; i++){ //для каждой буквы в строке
	if (alph[str.charAt(i)]) //если буква уже есть в алфавите
		alph[str.charAt(i)]++; //добавляем частоту
	else alph[str.charAt(i)] = 1; //если буквы нет в алфавите - добавляем ее в алфавит
}

function Node (freq, letter, used, father, code){ //делаем свойства для узлов дерева
	this.freq = freq; //частота появления буквы в строке
	this.letter = letter; //сама буква
	this.used = used; //проходили ли мы этот узел
	this.father = father; //узел из которого произростает данный узел
	this.code = code; //код данного узла
}

for(let i in alph){ //для каждой буквы алфавита
	let n = new Node(alph[i], i, 0, undefined, ''); //создаем узел данной буквы
	tree.push(n); //добавляем узел на дерево
}
let length = tree.length; //сохраним длину окончательного дерева
for(i = 0; i < length-1; i++){
	for (j = 0; j < tree.length; j++){ //находим два самых редких элемента среди имеющихся на дереве
		if ((tree[j].freq <= rarestFreq) && (tree[j].used == 0)){ //если данный элемент реже того что у нас записан и еще не использован
			secRarestFreqLet = rarestFreqLet; //записываем старый номер самого редкого вместо старого номера второго самого редкого
			secRarestFreq = rarestFreq; //записываем частоту старого самого редкого вместо частоты старого второго самого редкого
			rarestFreqLet = j; //заменяем номер самого редкого на новый
			rarestFreq = tree[j].freq; //заменяем частоту самого редкого на новую
		}else if ((tree[j].freq <= secRarestFreq) && (tree[j].used == 0)){ //если данный элемент реже чем второй самый редкий у нас записан и еще не использован
			secRarestFreqLet = j; //заменяем номер самого редкого на новый
			secRarestFreq = tree[j].freq; //заменяем частоту самого редкого на новую
		}
	}
	let n = new Node(rarestFreq+secRarestFreq, tree[secRarestFreqLet].letter + tree[rarestFreqLet].letter, 0, undefined, ''); //создаем новый узел комбинации самых редких букв
	tree.push(n); //добавляем данный узел на дерево
	tree[rarestFreqLet].used = 1; //пишем что самый редкий символ использовали
	tree[secRarestFreqLet].used = 1; //пишем что второй по редкости символ использовали
	tree[rarestFreqLet].father = tree.length-1; //добавляем самому редкому узлу номер места произростания
	tree[secRarestFreqLet].father = tree.length-1; //добавляем второму по редкости узлу номер места произростания
	if (rarestFreqLet < secRarestFreqLet){ //если самый редкий левее второго по редкости
		tree[rarestFreqLet].code = '0' + tree[rarestFreqLet].code; //добавляем новое значение в его код
		tree[secRarestFreqLet].code = '1' + tree[secRarestFreqLet].code; //добавляем новое значение в его код
	}else{ //если самый редкий правее второго по редкости
		tree[rarestFreqLet].code = '0' + tree[rarestFreqLet].code; //добавляем новое значение в его код
		tree[secRarestFreqLet].code = '1' + tree[secRarestFreqLet].code; //добавляем новое значение в его код
	}
	//tree.findIndex()
	rarestFreq = str.length 
	rarestFreqLet = 0 
	secRarestFreq = str.length 
	secRarestFreqLet = 0
}
console.log(tree);
