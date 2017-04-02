function f1_ofertas(que_oferta) {
	$("#loaded").load("f1_2.html", function()
	{
		$("#ofertas").load(que_oferta);
	});
	$("#prato_decor").load("f1_tipos_pratos.html");
	$("#area_direita").load("f1_pedido.html");
}

function ofertas_mover_esquerda() {
	document.getElementById("ofertas").scrollLeft -= 256;
}

function ofertas_mover_direita() {
	document.getElementById("ofertas").scrollLeft += 256;
}

function f1_info_nutricional(info_produto) {
	$("#loaded").load("f1_3.html", function()
	{
		$("#info_produto").load(info_produto);
	});
	("#prato_decor").load("");
	("#seta_direita").load("");
	("#seta_esquerda").load("");

}

