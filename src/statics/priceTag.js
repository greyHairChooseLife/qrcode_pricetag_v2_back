const dots = document.getElementsByClassName('dots');

window.addEventListener('load', () => {
	setTimeout(() => {
		dots[0].style.backgroundColor = 'white';
	}, 1200);
	setTimeout(() => {
		dots[1].style.backgroundColor = 'white';
	}, 2200);
	setTimeout(() => {
		dots[0].style.display = 'none';
		dots[1].style.display = 'none';
		document.getElementById('tag').style.top = '60%';
		document.getElementById('productName').style.color = '#495371';
		document.getElementById('productName').style.fontWeight = 'bold';
		document.getElementById('productName').style.top = '15%';
		document.getElementById('upperPortion').style.display = 'block';
	}, 3200);
});

const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const number = document.getElementById('number');

let numberValue = 0;

plus.addEventListener('click', () => {
	numberValue++;
	number.innerText = numberValue;
});
minus.addEventListener('click', () => {
	if(numberValue > 0){
		numberValue--
		number.innerText = numberValue;
	}
});

const cartImg = document.getElementById('cartImg');

