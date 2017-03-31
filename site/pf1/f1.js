function f1_bebidas() {
	$("#loaded").load("f1_2.html");
	$("#prato_decor").load("f1_tipos_pratos.html");
}

function ofertas_mover_esquerda() {
	document.getElementById("ofertas").scrollLeft -= 256;
}

function ofertas_mover_direita() {
	document.getElementById("ofertas").scrollLeft += 256;
}
