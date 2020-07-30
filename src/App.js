import React, { useState } from 'react';
import './App.css';



function App() {

	function randomInteger(min, max) {
		// получить случайное число от (min-0.5) до (max+0.5)
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(rand);
	}

	const squares = []

	for (var i = 0; i < 6; i++) {
		squares.push(randomInteger(1, 5));
	}
	const bluesCount = randomInteger(1, 3);
	const validSquares = []

	squares.fill(6, 0, bluesCount)

	const coloredSqr = squares.map((square, i) => {
		if (square === 6) {
			validSquares.push(i)
		}
		switch (square) {
			case 6: return 'blue'
			case 5: return 'red'
			case 4: return 'green'
			case 3: return 'orange'
			case 2: return 'black'
			case 1: return 'pink'
		}
	})


	const [squaresState, setState] = useState(coloredSqr);


	let pickedSquares = [];


	const handleClick = (e, i) => {
		if (!pickedSquares.includes(i)) {
			pickedSquares.push(i)
			e.currentTarget.classList.add("selected");
		} else {
			pickedSquares = pickedSquares.filter(item => item !== i)
			e.currentTarget.classList.remove("selected");
		}
		pickedSquares.sort()

	};


	const handleOnValidate = () => {
		console.log(pickedSquares, validSquares)
		if (
			JSON.stringify(pickedSquares) === JSON.stringify(validSquares)
		) {
			setTimeout(() => window.location.reload(false)
				, 2000);
			alert('right squares selected!')
		} else {
			alert('choose right squares!')
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
