function f1_ofertas(que_oferta) {
	$("#loaded").load("f1_2.html", function()
	{
		$("#ofertas").load(que_oferta);
	});
	$("#prato_decor").load("f1_tipos_pratos.html");
}

function ofertas_mover_esquerda() {
	document.getElementById("ofertas").scrollLeft -= 256;
}

function ofertas_mover_direita() {
	document.getElementById("ofertas").scrollLeft += 256;
}
