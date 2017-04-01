var pedidos = [];
var id_counter = 0;

function adicionar_pedido(_nome, _preco, _imagem) {
	var pedido = { id: id_counter, nome: _nome, preco: _preco, imagem: _imagem };
	id_counter += 1;
	pedidos.push(pedido);
}

function remover_pedido(_id) {
	var index = pedidos.map(function(e) { return e.id; }).indexOf(_id);
	console.log(index);
	if (index > -1) {
		pedidos.splice(index, 1);
	}
}

function desenhar_pedidos() {
	var html_pedidos = "";
	var total = 0;
	for (var item of pedidos) {
		html_pedidos = html_pedidos.concat('<p><img src="' + item.imagem + '" class="imagem_pedido_lista" onclick="remover_pedido(' + item.id + '); desenhar_pedidos()"> ' + ' ' + item.id +' '+ item.nome + " " + item.preco + "€");
		total += item.preco;
	}
	html_pedidos = html_pedidos.concat("<p>Total: " + total.toFixed(2) + "€");
	$("#lista_pedidos").html(html_pedidos);
}
