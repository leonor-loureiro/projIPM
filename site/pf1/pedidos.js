var pedidos = [];
var id_counter = 0;

function adicionar_pedido(_nome, _preco, _imagem) {
	var pedido = { id: id_counter, nome: _nome, preco: _preco, imagem: _imagem };
	id_counter += 1;
	pedidos.push(pedido);
}

function remover_pedido(_id) {
	var index = pedidos.map(function(e) { return e.id; }).indexOf(_id);
	if (index > -1) {
		pedidos.splice(index, 1);
	}
}

function desenhar_pedidos() {
	var html_pedidos = "";
	var total = 0;
	for (var item of pedidos) {
		html_pedidos = html_pedidos.concat('<p><img src="' + item.imagem + '" class="imagem_pedido_lista" onclick="remover_pedido(' + item.id + '); desenhar_pedidos()"> ' + item.nome + " " + item.preco.toFixed(2) + "€");
		total += item.preco;
	}
	$("#lista_pedidos").html(html_pedidos);
	$("#lista_pedidos_preco_total").html("Total: " + total.toFixed(2) + "€");
}

function limpar_pedidos() {
	// http://stackoverflow.com/a/1232046
	pedidos.splice(0, pedidos.length);
}
