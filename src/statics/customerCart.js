const { API_SERVER_HOST, PORT } = process.env;

	//********************************************************************
	//		 exposure selection : Compact vs Detail
	//********************************************************************
const productRowCompact = document.getElementsByClassName('productRowCompact');
const productNameCompact = document.getElementsByClassName('productNameCompact');
const productRowDetail = document.getElementsByClassName('productRowDetail');
const productDetailCancel = document.getElementsByClassName('productDetailCancel');

for(var i=0; i<productRowCompact.length; i++){
	(
		(idx) => {
			productNameCompact[idx].addEventListener('click', () => {
				productRowCompact[idx].style.display = 'none';
				productRowDetail[idx].style.display = 'block';
			})
		}
	)(i);
};

for(var i=0; i<productRowDetail.length; i++){
	(
		(idx) => {
			productDetailCancel[idx].addEventListener('click', () => {
				productRowDetail[idx].style.display = 'none';
				productRowCompact[idx].style.display = 'block';
			})
		}
	)(i);
};


	//********************************************************************
	//		 function for each buttons in Detail
	//********************************************************************


const actionDelete = document.getElementsByClassName('actionDelete');
const actionMinus = document.getElementsByClassName('actionMinus');
const actionMinusPower = document.getElementsByClassName('actionMinusPower');
const actionPlusPower = document.getElementsByClassName('actionPlusPower');
const actionPlus = document.getElementsByClassName('actionPlus');
const actionApply = document.getElementsByClassName('actionApply');

const actionForm = document.getElementById('actionForm');

const productCountCompact = document.getElementsByClassName('productCountCompact');
const productQuantity = document.getElementsByClassName('productQuantity');


for(var i=0; i<products.length; i++){
	(
		(idx) => {
			actionDelete[idx].addEventListener('click', () => {
				if(window.confirm('정말로 삭제하시겠습니까?')){
					actionForm.barcode.value = products[idx].barcode;
					actionForm.quantity.value = products[idx].quantity;
					actionForm.action = `http://${API_SERVER_HOST}:${PORT}/customerCart?_method=DELETE`;
					actionForm.submit();
				}
			})
			actionMinus[idx].addEventListener('click', () => {
				if(products[idx].quantity >= 1){
					products[idx].quantity--;
					productCountCompact[idx].innerText = products[idx].quantity;
					productQuantity[idx].innerText = products[idx].quantity;
				}
			})
			actionMinusPower[idx].addEventListener('click', () => {
				if(products[idx].quantity >= 5){
					products[idx].quantity = products[idx].quantity -5;
					productCountCompact[idx].innerText = products[idx].quantity;
					productQuantity[idx].innerText = products[idx].quantity;
				}
			})
			actionPlus[idx].addEventListener('click', () => {
				products[idx].quantity++;
				productCountCompact[idx].innerText = products[idx].quantity;
				productQuantity[idx].innerText = products[idx].quantity;
			})
			actionPlusPower[idx].addEventListener('click', () => {
				products[idx].quantity = products[idx].quantity +5;
				productCountCompact[idx].innerText = products[idx].quantity;
				productQuantity[idx].innerText = products[idx].quantity;
			})
			actionApply[idx].addEventListener('click', () => {
				actionForm.barcode.value = products[idx].barcode;
				actionForm.quantity.value = products[idx].quantity;
				actionForm.action = `http://${API_SERVER_HOST}:${PORT}/customerCart?_method=PUT`;
				actionForm.submit();
			})
		}
	)(i);
};
