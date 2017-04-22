var pedidos = [];
var id_counter = 0;

function adicionar_pedido(_tipo, _id, _personalizacoes, _quantidade) {
	_personalizacoes = _personalizacoes.sort();
	if (_personalizacoes == null)
	{
		_personalizacoes = ["f1_checkbox_personalizacao_0", "f1_checkbox_personalizacao_1"];
	}
	
	var index = pedidos.map(function(e) { return String(e.oferta.tipo) + String(e.oferta.id) + String(e.personalizacoes) }).indexOf(String(_tipo) + String(_id) + String(_personalizacoes));
	
	console.log(String(_tipo) + String(_id) + String(_personalizacoes));
	// Novo pedido
	if (index < 0)
	{
		var personalizado = true;
		if (_personalizacoes.length == 2
			&& _personalizacoes[0] == "f1_checkbox_personalizacao_0"
			&& _personalizacoes[1] == "f1_checkbox_personalizacao_1")
		{
			personalizado = false;
		}
		
		var oferta = obter_oferta(_tipo, _id);
		var pedido = { id: id_counter, oferta: oferta,
			personalizado: personalizado, quantidade: _quantidade,
			personalizacoes: _personalizacoes
		};
		id_counter += 1;
		pedidos.push(pedido);
	}
	// Adicionar a pedido existente
	else
	{
		pedidos[index].quantidade += _quantidade;
	}
}

function remover_pedido(_id) {

	var index = pedidos.map(function(e) { return e.id; }).indexOf(_id);

	if (index > -1 && pedidos[index].quantidade > 1){
		pedidos[index].quantidade-=1;
	}
	else if(index > -1){
		pedidos.splice(index, 1);
	}

	if (pedidos.length == 0){
		id_counter = 0;
	}
}

// Usar f1_limpar_pedidos() se a trabalhar na f1
function limpar_pedidos() {
	// http://stackoverflow.com/a/1232046
	pedidos.splice(0, pedidos.length);
	id_counter = 0;
}

function pedidos_estao_vazios() {
	return id_counter == 0;
}

function get_pedidos() {
	return pedidos;
}

function get_pedido(_id) {
	var index = pedidos.map(function(e) { return e.id; }).indexOf(_id);
	return pedidos[index];
}

function get_oferta_pedido(_id) {
	var index = pedidos.map(function(e) { return e.id; }).indexOf(_id);
	return pedidos[index].oferta;
}

function get_personalizacoes_pedido(_id) {
	var index = pedidos.map(function(e) { return e.id; }).indexOf(_id);
	return pedidos[index].personalizacoes;
}

function editar_personalizacoes_pedido(_id, _personalizacoes)
{
	var index = pedidos.map(function(e) { return e.id; }).indexOf(_id);
	if (index >= 0)
	{
		pedidos[index].personalizacoes = _personalizacoes;
	}
}
