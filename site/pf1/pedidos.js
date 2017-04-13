var pedidos = [];
var id_counter = 0;

function adicionar_pedido(_tipo, _id, _personalizado, _quantidade) {
	var index = pedidos.map(function(e) { return String(e.oferta.tipo) + String(e.oferta.id) + String(e.personalizado) }).indexOf(String(_tipo) + String(_id) + String(false));

	if (_personalizado == true || index < 0)
	{
		var oferta = obter_oferta(_tipo, _id);
		var pedido = { id: id_counter, oferta: oferta,
			personalizado: _personalizado, quantidade: _quantidade };
		id_counter += 1;
		pedidos.push(pedido);
	}
	else
	{
		pedidos[index].quantidade += _quantidade;
	}
}

function remover_pedido(_id) {
	var index = pedidos.map(function(e) { return e.id; }).indexOf(_id);

	if (index > -1)
	{
		pedidos.splice(index, 1);
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
