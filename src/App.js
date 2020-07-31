import React, { useState } from 'react';
import './App.css';



function App() {
//функция рандомизации с диапазоном
	function randomInteger(min, max) {
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(rand);
	}

	const squares = []
	//заполняем массив шестью элементами со значением от 1 до 5 (в будущем - цвета)
	for (var i = 0; i < 6; i++) {
		squares.push(randomInteger(1, 5));
	}
	//определяем кол-во синих квадратов
	const bluesCount = randomInteger(1, 3);
	const validSquares = []
	//заполняем массив (1-3) 6-ками (в будущем - синие квадраты)
	squares.fill(6, 0, bluesCount)

	const coloredSqr = squares.map((square, i) => {

		//добавление в массив валлидных квадратов все синие
		if (square === 6) {
			validSquares.push(i)
		}

		//назначение цветов (для передачи в класс из состояния)
		switch (square) {
			case 6: return 'blue'
			case 5: return 'red'
			case 4: return 'green'
			case 3: return 'orange'
			case 2: return 'black'
			case 1: return 'pink'
			default: return 'black'
		}
	})

 	//инициализируем состояние с квадратами
	const [squaresState] = useState(coloredSqr);


	let pickedSquares = [];


	const handleClick = (e, i) => {
		//добавление в массив с выбранными квадратами нужных && добавление класса selected
		if (!pickedSquares.includes(i)) {
			pickedSquares.push(i)
			e.currentTarget.classList.add("selected");
		} else {
			pickedSquares = pickedSquares.filter(item => item !== i)
			e.currentTarget.classList.remove("selected");
		}
		pickedSquares.sort()

	};

//сравниваем приведённые к строке массивы с выбранными квадратами и валидными
	const handleOnValidate = () => {
		if (
			JSON.stringify(pickedSquares) === JSON.stringify(validSquares)
		) {
			setTimeout(() => window.location.reload(false)
				, 2000);
			alert('right squares selected!')
		} else {
			alert('choose right squares! (blue ones)')
		}

	}

	return (
		<div className="App">
			<div className="wrapper">
				{coloredSqr.map((square, i) => {
					return <p key={i} className={`square ${squaresState[i]}`} onClick={e => handleClick(e, i)}></p>
				}
				)}
			</div>
			<div className='submit' onClick={() => handleOnValidate(i)}>submit</div>
		</div>
	);
}

export default App;
