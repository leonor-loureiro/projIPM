function f1_ofertas(tipo) {
	$("#loaded").load("f1_2.html", function()
	{
		f1_carregar_ofertas(tipo);
	});
	$("#prato_decor").load("f1_tipos_pratos.html");
	$("#area_direita").load("f1_pedido.html");
}

function adicionar_oferta(nome, preco, imagem, anterior, informacoes)
{
	$(ofertas).append('<div class = "oferta">\
	<div class="imagem_oferta imagem_teste" onclick=" \
	adicionar_pedido(\'' + nome + '\', 12.98, \'images/' + imagem +'\'); \
	desenhar_pedidos();" ></div>' + nome + '<p>Preço: ' + preco.toFixed(2) + '€\
	<p><button type="button" onclick="\
	f1_info_nutricional(\'' + informacoes + '\', \'' + anterior + '\') \
	" class="btn btn-primary btn-xs">Informações</button></div>');
}

function ofertas_mover_esquerda() {
	document.getElementById("ofertas").scrollLeft -= 256;
}

function ofertas_mover_direita() {
	document.getElementById("ofertas").scrollLeft += 256;
}

var f1_info_nutricional_anterior = "";

function f1_info_nutricional(info_produto, anterior) {
	f1_info_nutricional_anterior = anterior;
	$("#loaded").load("f1_3.html", function()
	{
		$("#info_produto").load(info_produto);
	});
	$("#prato_decor").html("");
	$("#area_direita").load("f1_pedido.html");
}

function def1_info_nutricional()
{
	f1_ofertas(f1_info_nutricional_anterior);
}
