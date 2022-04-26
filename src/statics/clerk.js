const customerList = document.getElementsByClassName('customerList');

for(var i=0; i<customers.length; i++){
	(
		(idx) => {
			customerList[idx].addEventListener('click', () => {
				window.location.href = `http://localhost:3002/clerk/${customers[idx].mobile}`;
			})
		}
	)(i);
};

