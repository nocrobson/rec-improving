$('form').on('submit',(event) => {
	event.preventDefault();
	validaDados();
});

$('#teste').on('click',(event) => {
	event.preventDefault();
	let dados = {
		"email": "vagas.tl@improving.com.br",
		"password": "minhaSenha",
		"fullName": "Fulano de Tal",
		"birthDate": "05/11/1982",
		"zipCode": "12345678",
		"streetName": "Rua Ipiranga",
		"number": "1000",
		"complement": "conjunto 23",
		"neighbourhood": "Centro",
		"country": "BR",
		"state": "São Paulo",
		"city": "São Paulo"
	};
	sendData(dados, 'http://www.improving.com.br/api/test/users');
});


let validaDados = () => {	
	 if ($('#password').val() != $('#passwordConfirmation').val()) {
	 	$('#passConfirmation').addClass('has-error');
	 	$('#helpBlockPass').show();
	 } else {
	 	let dataNasc = new Date($('#birthDate').val()),
	 		dataNascFormatada = `${dataNasc.getDate()+1}/${dataNasc.getMonth()+1}/${dataNasc.getFullYear()}`,
		 	dados = {
			"email": $('#email').val(),
			"password": $('#password').val(),
			"fullName": $('#fullName').val(),
			"birthDate": dataNascFormatada,
			"zipCode": $('#zipCode').val(),
			"streetName": $('#streetName').val(),
			"number": $('#number').val(),
			"complement": $('#complement').val(),
			"neighbourhood": $('#neighbourhood').val(),
			"country": $('#country option:selected').val(),
			"state": $('#state').val(),
			"city": $('#city').val()
		};
		sendData(dados, 'http://www.improving.com.br/api/test/users');
	}
}

let sendData = (dados, url) => {
	let xhr = new XMLHttpRequest();		
	xhr.open('POST', url, true);	
	xhr.setRequestHeader('Content-type', 'application/json');
	let data = JSON.stringify(dados);
	xhr.send(data);
	xhr.onreadystatechange = () => {
		if (xhr.readyState == 4 && xhr.status == 200) {
			//console.log(xhr.response);

			window.location = './graficos.html?' + xhr.response;
		} else if(xhr.status == 409) {
			exibeErros('O email informado já existe.');
		} else {
			exibeErros('Houve um erro de comunicação e o usuário deve tentar novamente mais tarde.');
		}
	}
}

let exibeErros = (erroDescricao) => {
	$('#erro').show();
	$('#error-view').text(erroDescricao);
}