let token = location.search.slice(1).replace(/%22/g,'"');


google.load("visualization", "1", {packages:["corechart"]});
google.load('current', {'packages':['line']});
google.setOnLoadCallback(buscaDadosBrowser(token));
google.setOnLoadCallback(buscaDadosClima(token));

function buscaDadosBrowser(token) {
	let xhr = new XMLHttpRequest();		
	xhr.open('POST', 'http://www.improving.com.br/api/test/hits-by-browser', true);	
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(token);
	xhr.onreadystatechange = () => {		
		if (xhr.readyState == 4 && xhr.status == 200) {
			drawChartBrowsers(JSON.parse(xhr.response));
		}
	}
}


function buscaDadosClima(token) {
	let temp = [{"name":"Tokyo","data":[["01-01",7],["02-01",6.9],["03-01",9.5],["04-01",14.5],["05-01",18.4],["06-01",21.5],["07-01",25.2],["08-01",26.5],["09-01",23.3],["10-01",18.3],["11-01",13.9],["12-01",9.6]]},{"name":"London","data":[["01-01",3.9],["02-01",4.2],["03-01",5.7],["04-01",8.5],["05-01",11.9],["06-01",15.2],["07-01",17],["08-01",16.6],["09-01",14.2],["10-01",10.3],["11-01",6.6],["12-01",4.8]]}];

	let temperaturas = temp.sort(function(pais1, pais2) {
		return pais1.name < pais2.name ? -1 : pais1.name > pais2.name ? 1 : 0;
	});

	let data = new google.visualization.DataTable();

	data.addColumn('number', 'Day');
	//drawChartTemperatura(temp);

	/*
	let xhr = new XMLHttpRequest();		
	xhr.open('POST',  'http://www.improving.com.br/api/test/city-temperatures', true);	
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(token);
	xhr.onreadystatechange = () => {		
		if (xhr.readyState == 4 && xhr.status == 200) {
			drawChartBrowsers(JSON.parse(xhr.response));
		}
	}
	*/
}


function drawChartBrowsers(browsers) {	
	browsers.unshift(['Browser', 'Acessos']);
	var data = google.visualization.arrayToDataTable(browsers);
	var options = {
  		title: 'Browsers',
		is3D: false 
	};	
	let chart = new google.visualization.PieChart(document.getElementById('chart_div'));	
	chart.draw(data, options);
}

		
function drawChartTemperatura(temperatura) {	
	browsers.unshift(['Browser', 'Acessos']);
	var data = google.visualization.arrayToDataTable(browsers);
	var options = {
  		title: 'Temperatura Média',
		is3D: false 
	};	
	let chart = new google.visualization.PieChart(document.getElementById('chart_div'));	
	chart.draw(data, options);
}





/*

		//importando o pacote table
		google.load('visualization', '1', {packages:['table']});
		//metodo que será chamado após 
		google.setOnLoadCallback(drawTable);
		function drawTable() {
			//instanciando array do formado de tabela
			var data = new google.visualization.DataTable();
			//adicionando colunas, tipo e nome
			data.addColumn('string', 'Aluno');
			data.addColumn('number', 'Nota');
			data.addColumn('boolean', 'Aprovado');
			//adicionando linhas
			data.addRows([
			['Allan',  {v: 10, f: '10'}, true],
			['Douglas',   {v:8,   f: '8'},  true],
			['Larissa', {v: 5.5, f: '5,5'}, false],
			['Eliane',   {v: 7,  f: '7'},  true]
			]);
			//instanciando e desenhando tabela
			var table = new google.visualization.Table(document.getElementById('table_div'));

			//adicionando um listner que ouvirá o evento select para o objeto table 
			google.visualization.events.addListener(table,"select",function(e){
				//pega oa array de itens selecionados
				var selection = table.getSelection();
				
				//varre o array de para montar a string que será exibida
				var tam = selection.length;
				var str = "";
				for(var i = 0; i < tam; i++){
					//data.getFormattedValue(linha,coluna), para podermos obter o valor da célula
					str += "Aluno: " + data.getFormattedValue(selection[i].row,0) + "; ";
				
				}
				
				alert(str);
			});
			
			table.draw(data, {showRowNumber: true});
		}

		*/