var pedidos = [];
var id_counter = 0;

function adicionar_pedido(_tipo, _id, _quantidade) {
	var oferta = obter_oferta(_tipo, _id);
	var pedido = { id: id_counter, oferta: oferta, quantidade: _quantidade };
	id_counter += 1;
	pedidos.push(pedido);
}

function remover_pedido(_id) {
	var index = pedidos.map(function(e) { return e.id; }).indexOf(_id);
	var result = confirm("Tem a certeza que deseja remover o produto?");
	if (index > -1 && result) {
		pedidos.splice(index, 1);
	}
}

function desenhar_pedidos() {
	var template = `
<p><img src="images/remover.svg" class="imagem_pedido_lista" onclick="remover_pedido(%d); desenhar_pedidos()"> %s %s €
`;
	var html_pedidos = "";
	var total = 0;
	for (var item of pedidos) {
		html = sprintf(template,
			item.id, item.oferta.nome, item.oferta.preco.toFixed(2)
		);
		html_pedidos = html_pedidos.concat(html);
		total += item.preco;
	}
	$("#lista_pedidos").html(html_pedidos);
	$("#lista_pedidos_preco_total").html("Total: " + total.toFixed(2) + "€");
}

function limpar_pedidos() {
	// http://stackoverflow.com/a/1232046
	pedidos.splice(0, pedidos.length);
}
