var funcionalidade = "";
function loadMain() {
	$("#loaded").load("main.html");
	var nome_restaurante = document.getElementById("nome_restaurante");
	nome_restaurante.style.fontSize = "11.5vw";
	var atalho_ajuda = document.getElementById('atalho_ajuda');
    atalho_ajuda.style.visibility = 'hidden';
    funcionalidade="";
}

function loadModals() {
	$("#modals").load("modals.html");
}

function chamar_empregado(){
	$("#modalOK-msg").text("O empregado chegará dentro de um instante.");
	$("#modalOK").modal();
}
function f1() {
	funcionalidade = "fazer_pedido";
	var nome_restaurante = document.getElementById("nome_restaurante");
	nome_restaurante.style.fontSize = "4.5vw";
	var atalho_ajuda = document.getElementById('atalho_ajuda');
    atalho_ajuda.style.visibility = 'visible';
	$("#loaded").load("f1_1.html");
	$("#prato_decor").load("f1_tipos_pratos.html");
	$("#area_direita").load("f1_pedido.html");
}

function f1_retroceder() {
	$("#modalNaoSim").modal('hide');
	loadMain();
	$("#prato_decor").html("");
	$("#area_direita").html("");
}

function loadAjuda(){
	if(funcionalidade === "fazer_pedido"){
		$("#modalAjuda-header").text("Fazer Pedido")
		$("#modalAjuda-body").load("ajuda_f1.html");
		$("#modalAjuda-ChamarEmpregado").attr("onclick", "chamar_empregado()");
		$("#modalAjuda").modal();
		return;
	}
	if(funcionalidade =="acompanhar_pedido"){
		$("#modalAjuda-header").text("Acompanhar Pedidos")
		$("#modalAjuda-body").load("ajuda_f2.html");
		$("#modalAjuda-ChamarEmpregado").attr("onclick", "chamar_empregado()");
		$("#modalAjuda").modal();
		return;
	}
}

function f2() {
	funcionalidade = "acompanhar_pedido";
	var nome_restaurante = document.getElementById("nome_restaurante");
	nome_restaurante.style.fontSize = "4.5vw";
	var atalho_ajuda = document.getElementById('atalho_ajuda');
    atalho_ajuda.style.visibility = 'visible';
    $("#loaded").html("");
	$("#area_direita").load("f2_1.html");
	set_f2_vendo_1(true);
}

function f3() {
}

// http://stackoverflow.com/a/9541579
function isOverflowed(element)
{
		return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
