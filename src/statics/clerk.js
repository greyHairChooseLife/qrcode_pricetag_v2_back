const { API_SERVER_HOST, PORT } = env;
const customerList = document.getElementsByClassName('customerList');

for(var i=0; i<customers.length; i++){
	(
		(idx) => {
			customerList[idx].addEventListener('click', () => {
				window.location.href = `http://${API_SERVER_HOST}:${PORT}/clerk/${customers[idx].mobile}`;
			})
		}
	)(i);
};

