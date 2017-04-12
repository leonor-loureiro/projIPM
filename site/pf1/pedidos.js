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

function abrir_cancelar_fazer_pedido(){

	if(id_counter == 0){
		$("#modalOk-msg").text("O seu pedido está vazio!");
		$("#modalOk").modal();
		return;
	}
	else{
		$("#modalNaoSim-msg").text("Tem a certeza que deseja cancelar?");
		$("#modalNaoSim-Sim").attr("onclick", "limpar_pedidos()");
		$("#modalNaoSim").modal();
	}
}

function abrir_concluir_fazer_pedido(){
	if(id_counter==0){
		$("#modalOk-msg").text("O seu pedido está vazio!");
		$("#modalOk").modal();
		return;
	}
	else{
		$("#modalNaoSim-msg").text("Tem a certeza que deseja concluir?");
		$("#modalNaoSim-Sim").attr("onclick", "concluir_fazer_pedido()");
		$("#modalNaoSim").modal();
	}
}

function concluir_fazer_pedido(){
	limpar_pedidos();
	f1_retroceder();
}

function desenhar_pedidos() {
	var template = `
<p><img src="images/remover.svg" class="imagem_pedido_lista" onclick="remover_pedido(%d); desenhar_pedidos()"> %s %s %s €
`;
	var html_pedidos = "";
	var total = 0;
	for (var item of pedidos)
	{
		if (item.personalizado === false)
		{
			html = sprintf(template,
				item.id, String(item.quantidade) + "×", item.oferta.nome,
				item.oferta.preco.toFixed(2)
			);
		}
		else
		{
			html = sprintf(template,
				item.id, String(item.quantidade) + "×", item.oferta.nome,
				item.oferta.preco.toFixed(2)
			);
		}
		html_pedidos = html_pedidos.concat(html);
		total += item.oferta.preco * item.quantidade;
	}
	$("#lista_pedidos").html(html_pedidos);
	$("#lista_pedidos_preco_total").html("Total: " + total.toFixed(2) + "€");
}

// Usar f1_limpar_pedidos() se a trabalhar na f1
function limpar_pedidos() {
	// http://stackoverflow.com/a/1232046
	pedidos.splice(0, pedidos.length);
	id_counter = 0;
	desenhar_pedidos();
}
