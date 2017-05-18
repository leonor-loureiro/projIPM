var funcionalidade = "";
var empregado = false;

function loadMain() {
	$("#loaded").load("main.html", function()
	{
		if (!pode_acompanhar())
		{
			document.getElementById("img_f2").style.filter = "grayscale(1)";
		}

		if(!pode_pagar())
		{
			document.getElementById("img_f3").style.filter = "grayscale(1)";
		}
	});
	var nome_restaurante = document.getElementById("nome_restaurante");
	nome_restaurante.style.visibility = 'hidden';
	var nome_restaurante_menu_principal = document.getElementById("nome_restaurante_menu_principal");
	nome_restaurante_menu_principal.style.visibility = 'visible';
	funcionalidade="main";
	if(empregado === false){
		var imagem_empregado_main = document.getElementById("imagem_empregado_main");
		imagem_empregado_main.style.visibility = 'hidden';
	}
	else{
		var imagem_empregado_main = document.getElementById("imagem_empregado_main");
		imagem_empregado_main.style.visibility = 'visible';
	}
}

function loadModals() {
	$("#modals").load("modals.html");
}



function chamar_empregado(){
	$("#modalEmpregado").modal();

	setTimeout(function(){
		$("#modalEmpregado").modal('hide');
		empregado = true;
		var imagem_empregado_main = document.getElementById("imagem_empregado_main");
		imagem_empregado_main.style.visibility = 'visible';
		$(document).ready(function() {
		    blink();
		});
	}, 1600);

	setTimeout(function(){
		var imagem_empregado_main = document.getElementById("imagem_empregado_main");
		imagem_empregado_main.style.visibility = 'hidden'
		empregado = false;
	}, 20000);
}

function f1() {
	set_f2_vendo_1(false);
	set_f2_vendo_2(false);
	var nome_restaurante = document.getElementById("nome_restaurante");
	nome_restaurante.style.visibility='visible';
	var nome_restaurante_menu_principal = document.getElementById("nome_restaurante_menu_principal");
	nome_restaurante_menu_principal.style.visibility = 'hidden';
	$("#loaded").load("f1_1.html");
	$("#prato_decor").load("f1_tipos_pratos.html");
	$("#area_direita").load("f1_pedido.html", function()
	{
		if(funcionalidade === "acompanhar_pedido"){
			$("#cancelar").attr("onclick", "f1_abrir_cancelar_fazer_pedido()");
		}
	});
	funcionalidade = "fazer_pedido";
}

var f1e3_retroceder_para_f2 = false;
function f1_retroceder() {
	$("#modalNaoSim").modal('hide');
	$("#prato_decor").html("");
	$("#area_direita").html("");
	if (f1e3_retroceder_para_f2)
	{
		$("#loaded").load("main.html", function()
		{
			f2();
		});
	}
	else
	{
		loadMain();
	}
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
	if(funcionalidade =="fazer_pagamento"){
		$("#modalAjuda-header").text("Fazer Pagamento")
		$("#modalAjuda-body").load("ajuda_f3.html");
	}
	$("#modalAjuda-ChamarEmpregado").attr("onclick", "chamar_empregado()");
	$("#modalAjuda").modal();
}

function f2(editar_pedidos) {
	if (!pode_acompanhar())
	{
		return;
	}
	f1e3_retroceder_para_f2 = true;
	funcionalidade = "acompanhar_pedido";
	nome_restaurante_grande();
	document.getElementById("imagem_f2").style.visibility = "hidden";
	document.getElementById("imagem_f2_fundo").style.visibility = "hidden";
	$("#imagem_f1").attr("onclick", "f2_fechar(true); f1();");
	$("#imagem_f1_fundo").attr("onclick", "f2_fechar(true); f1();");
	$("#area_direita").load("f2_1.html", function()
	{
		if(editar_pedidos)
		{
			f2_editar_pedidos();
		}
		else
		{
			set_f2_vendo_2(false);
			set_f2_vendo_1(true);
		}
	});
}

function nome_restaurante_grande()
{
	var nome_restaurante = document.getElementById("nome_restaurante");
	nome_restaurante.style.visibility='hidden';
	var nome_restaurante_menu_principal = document.getElementById("nome_restaurante_menu_principal");
	nome_restaurante_menu_principal.style.visibility = 'visible';
}

function nome_restaurante_pequeno()
{
	var nome_restaurante = document.getElementById("nome_restaurante");
	nome_restaurante.style.visibility='visible';
	var nome_restaurante_menu_principal = document.getElementById("nome_restaurante_menu_principal");
	nome_restaurante_menu_principal.style.visibility = 'hidden';
}

function f2_fechar(retroceder_para_f2 = false) {
	f1e3_retroceder_para_f2 = retroceder_para_f2;
	$("#area_direita").html("");
	set_f2_vendo_1(false);
	loadMain();
}

function f3() {
	funcionalidade ="fazer_pagamento";
	if (!pode_pagar())
	{
		return;
	}
	nome_restaurante_pequeno();
	set_f2_vendo_1(false);
	set_f2_vendo_2(false);
	$("#loaded").load("f3_1.html",function(){
		$("#barra_progresso_f3").load("f3_barra_progresso.html", function(){
			$("#divisao").attr("disabled","false");
			$("#divisao").attr("active","true");
		});
	});
	$("#area_direita").html("");
}

function f3_fechar() {
	if (f1e3_retroceder_para_f2)
	{
		$("#loaded").load("main.html", function()
		{
			f2();
		});
	}
	else
	{
		loadMain();
	}
}

// http://stackoverflow.com/a/9541579
function isOverflowed(element)
{
		return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}


function blink(){
    $('#imagem_empregado_main').delay(2000).fadeTo(100,0.1).delay(1000).fadeTo(100,1, blink);
}

function marcar_img_f2()
{
	var element = document.getElementById("img_f2");
	if (element != null && !pode_acompanhar())
	{
		element.style.filter = "grayscale(1)";
	}
	else if (element != null && pode_acompanhar())
	{
		element.style.filter = "";
	}
}

function marcar_img_f3()
{
	var element = document.getElementById("img_f3");
	if (element != null && !pode_pagar())
	{
		element.style.filter = "grayscale(1)";
	}
	else if (element != null && pode_pagar())
	{
		element.style.filter = "";
	}
}

// H4x0r1ng m0d3
$(document).keypress(function(e) {
	// Space
// 	console.log(e.which);
	if(e.which == 32 && get_f3_vendo_5()){
		f3_3();
		modalInsucesso();

	}
	else if(e.which == 32) {
		decrementar_tempo_espera();
		if (get_f2_vendo_1())
		{
			modalInsucesso();
			f2_desenhar_pedidos();
		}
	}
	// Enter
	else if(e.which == 13 && get_f3_vendo_5()) {
		f3_6();
	}


	// S
// 	else if(e.which == 115) {
// 		f3_surprise();
// 	}
});

function modalInsucesso(){
	$("#modalInsucesso").modal();

	// http://stackoverflow.com/a/22944616
	setTimeout(function(){
		$("#modalInsucesso").modal('hide');
	}, 1000);
}
