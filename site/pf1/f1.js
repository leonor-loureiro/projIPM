function f1_ofertas(que_oferta) {
	$("#loaded").load("f1_2.html", function()
	{
		$("#ofertas").load(que_oferta);
	});
	$("#prato_decor").load("f1_tipos_pratos.html");
}

function f1_bebidas() {
	f1_ofertas("f1_2_bebidas.html");
}

function f1_entradas() {
	f1_ofertas("f1_2_entradas.html");
}

function f1_sopas() {
	f1_ofertas("f1_2_sopas.html");
}

function f1_carne() {
	f1_ofertas("f1_2_carne.html");
}

function f1_peixe() {
	f1_ofertas("f1_2_peixe.html");
}

function f1_vegetariano() {
	f1_ofertas("f1_2_vegetariano.html");
}

function f1_sobremesas() {
	f1_ofertas("f1_2_sobremesas.html");
}

function ofertas_mover_esquerda() {
	document.getElementById("ofertas").scrollLeft -= 256;
}

function ofertas_mover_direita() {
	document.getElementById("ofertas").scrollLeft += 256;
}
