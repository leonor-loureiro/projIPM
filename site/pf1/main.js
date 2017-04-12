function loadMain() {
	$("#loaded").load("main.html");
}

function loadModals() {
	$("#modals").load("modals.html");
}

function f1() {
	$("#loaded").load("f1_1.html");
	$("#prato_decor").load("f1_tipos_pratos.html");
	$("#area_direita").load("f1_pedido.html");
}

function f1_retroceder() {
	$("#modalNaoSim").modal('hide');
	$("#loaded").load("main.html");
	$("#prato_decor").html("");
	$("#area_direita").html("");
}

function f2() {
}

function f3() {
}

// http://stackoverflow.com/a/9541579
function isOverflowed(element)
{
		return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
