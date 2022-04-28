const dots = document.getElementsByClassName('dots');

//********************************************************************
//		animation
//********************************************************************
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

//********************************************************************
//		shopping cart function
//********************************************************************
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
const addToCart = document.getElementById('addToCart');

//********************************************************************
//		read, create cookie
//********************************************************************
const cookies = document.cookie;
let clientId;
if(cookies !== undefined){
	const cookiesParsed = cookies.split('; ').map(ele => {
		return ele.split('=');
	});
	clientId = cookiesParsed.find(ele => {
		if(ele[0] === 'JEIL') return true;
	});
	if(clientId !== undefined) clientId = clientId[1];
}
// yes, we can hide the clientId. But that never be used in this kind of service, isn't it?


const mobileInputBox = document.getElementById('mobileInputBox');
const mobileInputButton = document.getElementById('mobileInputButton');
const cartForm = document.getElementById('cartForm');
const productCount = document.getElementById('productCount');
const clientIdInput = document.getElementById('clientIdInput');

cartImg.addEventListener('click', () => {
	if(clientId === undefined || clientId === ''){
		//	css design
		document.getElementById('mobileInputGuide').innerHTML = `장바구니를 위해,<br>전화번호를 입력 해 주세요.`;
		mobileInputBox.style.display = 'block';
		for(var i=0; i<document.getElementsByTagName('div').length; i++){
			document.getElementsByTagName('div')[i].style.opacity = '0.5';
		}
		for(var i=0; i<document.getElementsByClassName('mobileFamily').length; i++){
			document.getElementsByClassName('mobileFamily')[i].style.opacity = '1.0';
		}
		for(var i=0; i<tag.getElementsByTagName('div').length; i++){
			tag.getElementsByTagName('div')[i].style.opacity = '1.0';
		}
		//	now mobileFamily modal activated
		mobileInputButton.addEventListener('click', () => {
			if(document.getElementById('mobileInput').value === ''){
				alert('뭐라도 쓰세요!');
			}else{
				clientId = document.getElementById('mobileInput').value;
				mobileInputBox.style.display = 'none';
				for(var i=0; i<document.getElementsByTagName('div').length; i++){
					document.getElementsByTagName('div')[i].style.opacity = '1.0';
				}
			}
		})
	} else {
		//	redirect to client personal shopping cart
		//	if there is no cookie, connected router will make it. Else, it will read cookie.
		cartForm.method = 'get';
		cartForm.action = `http://localhost:3002/customerCart/${clientId}`;
		cartForm.submit();
	}
})
addToCart.addEventListener('click', () => {
	if(clientId === undefined || clientId === ''){
		//	css design
		document.getElementById('mobileInputGuide').innerHTML = `첫 상품입니다!<br>전화번호를 입력 해 주세요.`;
		mobileInputBox.style.display = 'block';
		for(var i=0; i<document.getElementsByTagName('div').length; i++){
			document.getElementsByTagName('div')[i].style.opacity = '0.5';
		}
		for(var i=0; i<document.getElementsByClassName('mobileFamily').length; i++){
			document.getElementsByClassName('mobileFamily')[i].style.opacity = '1.0';
		}
		for(var i=0; i<tag.getElementsByTagName('div').length; i++){
			tag.getElementsByTagName('div')[i].style.opacity = '1.0';
		}
		//	now mobileFamily modal activated
		mobileInputButton.addEventListener('click', () => {
			if(document.getElementById('mobileInput').value === ''){
				alert('뭐라도 쓰세요!');
			}else{
				clientId = document.getElementById('mobileInput').value;
				mobileInputBox.style.display = 'none';
				for(var i=0; i<document.getElementsByTagName('div').length; i++){
					document.getElementsByTagName('div')[i].style.opacity = '1.0';
				}
			}
		})
	} else {
		//	post form to save items into shopping cart
		//	if there is no cookie, connected router will make it. Else, it will read cookie.
		if(numberValue !== 0){
			productCount.value = numberValue;
			clientIdInput.value = clientId;
			cartForm.method = 'post';
			cartForm.action = `http://localhost:3002/customerCart`;
			cartForm.submit();
		}else{
			alert('1개 이상 선택하세요.');
		}
	}
})


const mobileInputCancle = document.getElementById('mobileInputCancle');

mobileInputCancle.addEventListener('click', () => {
		mobileInputBox.style.display = 'none';
		for(var i=0; i<document.getElementsByTagName('div').length; i++){
			document.getElementsByTagName('div')[i].style.opacity = '1.0';
		}
})
