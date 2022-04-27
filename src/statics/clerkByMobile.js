console.log(data);
const sum = data.reduce((prev, cur) => {return prev + cur.price * cur.quantity}, 0);
document.getElementById("bodyTail").innerText = "총 " + sum + ' 원';

const productList = document.getElementsByClassName('productList');
const checker = document.getElementsByClassName('checker');

for(var i=0; i<data.length; i++){
	(
		(idx) => {
			productList[idx].addEventListener('click', () => {
				checker[idx].style.visibility = "visible";
				for(var m=0; m<productList.length; m++)
					productList[m].style.backgroundColor = "white";
				productList[idx].style.backgroundColor = "#B9CCED";

				document.getElementById("barcodeHello").style.display = "none";
				JsBarcode("#barcode", data[idx].barcode, {
					format: "CODE128",
					lineColor: "black",
					width: 5,
					height: 100,
					fontSize: 20,
				});

			})
		}
	)(i);
};

