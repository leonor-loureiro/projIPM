var funcionalidade = "";
function loadMain() {
	$("#loaded").load("main.html");
	var nome_restaurante = document.getElementById("nome_restaurante");
	nome_restaurante.style.visibility = 'hidden';
	var nome_restaurante_menu_principal = document.getElementById("nome_restaurante_menu_principal");
	nome_restaurante_menu_principal.style.visibility = 'visible';
    funcionalidade="main";
}

function loadModals() {
	$("#modals").load("modals.html");
}

function chamar_empregado(){
	$("#modalOk-msg").text("Um empregado chegará dentro de instantes.");
	$("#modalOk").modal();

	setTimeout(function(){
		$("#modalOk").modal('hide');
	}, 1500);
}
function f1() {
	funcionalidade = "fazer_pedido";
	var nome_restaurante = document.getElementById("nome_restaurante");
	nome_restaurante.style.visibility='visible';
	var nome_restaurante_menu_principal = document.getElementById("nome_restaurante_menu_principal");
	nome_restaurante_menu_principal.style.visibility = 'hidden';
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
	if(funcionalidade === "main"){
		$("#modalAjuda-header").text("Menu Principal")
		$("#modalAjuda-body").load("ajuda_menu_principal.html");
	}
	if(funcionalidade === "fazer_pedido"){
		$("#modalAjuda-header").text("Fazer Pedido")
		$("#modalAjuda-body").load("ajuda_f1.html");
	}
	if(funcionalidade =="acompanhar_pedido"){
		$("#modalAjuda-header").text("Acompanhar Pedidos")
		$("#modalAjuda-body").load("ajuda_f2.html");
	}
	$("#modalAjuda-ChamarEmpregado").attr("onclick", "chamar_empregado()");
	$("#modalAjuda").modal();
}

function f2() {
	funcionalidade = "acompanhar_pedido";
	var nome_restaurante = document.getElementById("nome_restaurante");
	nome_restaurante.style.visibility='visible';
	var nome_restaurante_menu_principal = document.getElementById("nome_restaurante_menu_principal");
	nome_restaurante_menu_principal.style.visibility = 'hidden';
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
