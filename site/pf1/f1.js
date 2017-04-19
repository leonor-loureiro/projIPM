function f1_ofertas(tipo) {
	$("#loaded").load("f1_2.html", function()
	{
		f1_carregar_ofertas(tipo);
	});
	$("#prato_decor").load("f1_tipos_pratos.html");
	$("#area_direita").load("f1_pedido.html");
}

function f1_ofertas_mover_esquerda() {
	document.getElementById("ofertas").scrollLeft -= 256;
}

function f1_ofertas_mover_direita() {
	document.getElementById("ofertas").scrollLeft += 256;
}

var f1_anterior = "";
var f1_anterior_tipo = "";
var f1_anterior_id = 0;

function f1_info_nutricional(tipo, id) {
	var oferta = obter_oferta(tipo, id);
	f1_anterior = oferta.anterior;
	f1_anterior_tipo = tipo;
	f1_anterior_id = id;
	$("#loaded").load("f1_3.html", function()
	{
		f1_info_nutricional_carregar(oferta);
		if (tipo == "carne" || tipo == "peixe" || tipo == "vegetariano")
		{
			 document.getElementById("botao_personalizar").disabled = false;
		}
		else
		{
			 document.getElementById("botao_personalizar").disabled = true;
		}
	});
	$("#prato_decor").html("");
	$("#area_direita").load("f1_pedido.html");
}

function f1_3_retroceder()
{
	f1_ofertas(f1_anterior);
}

function f1_adicionar_pedido_detalhes()
{
	adicionar_pedido(f1_anterior_tipo, f1_anterior_id, false, 1);
	f1_desenhar_pedidos();
}

function f1_adicionar_pedido_personalizado()
{
	adicionar_pedido(f1_anterior_tipo, f1_anterior_id, true, qtd);
	f1_desenhar_pedidos();
}

var qtd = 1;
var personalizar_from = 0; // 0 - info nutricional , 1 - ofertas
function f1_personalizar_oferta(tipo,id){
	var oferta = obter_oferta(tipo, id);
	f1_anterior = oferta.anterior;
	f1_anterior_tipo = tipo;
	f1_anterior_id = id;
	personalizar_from = 1;
	f1_personalizar();
}
function f1_personalizar() {
	qtd = 1;
	var oferta = obter_oferta(f1_anterior_tipo, f1_anterior_id);
	$("#loaded").load("f1_4.html", function()
	{
		f1_personalizacoes_carregar(oferta);
	});
	$("#prato_decor").html("");
	$("#area_direita").load("f1_pedido.html");
}

function f1_add_dose(){
	qtd++;
	document.getElementById("qtd").innerHTML = ""+qtd;
};

function f1_sub_dose(){
	if(qtd > 1){
		qtd--;
		document.getElementById("qtd").innerHTML = ""+qtd;
	}
}

function f1_4_retroceder()
{	if(personalizar_from==1){
		f1_3_retroceder();
		personalizar_from = 0;
	}
	else{
		f1_info_nutricional(f1_anterior_tipo, f1_anterior_id);
	}

}

function f1_abrir_cancelar_fazer_pedido() {

	$("#modalNaoSim-msg").text("Tem a certeza que deseja cancelar?");
	$("#modalNaoSim-Sim").attr("onclick", "f1_limpar_pedidos(); f1_retroceder()");
	$("#modalNaoSim").modal();

}

function f1_pedido_bem_sucedido() {
	$("#modalOk-msg").text("O seu pedido foi concluído com sucesso!");
	$("#modalOk").modal();

	// http://stackoverflow.com/a/22944616
	setTimeout(function(){
		$("#modalOk").modal('hide');
	}, 2000);
}

function f1_abrir_concluir_fazer_pedido() {
	if(pedidos_estao_vazios()){
		$("#modalOk-msg").text("O seu pedido está vazio!");
		$("#modalOk").modal();
		return;
	}
	else{
		$("#modalNaoSim-msg").text("Tem a certeza que deseja concluir?");
		$("#modalNaoSim-Sim").attr("onclick", "f1_concluir_fazer_pedido(); f1_pedido_bem_sucedido();");
		$("#modalNaoSim").modal();
	}
}

function f1_concluir_fazer_pedido() {
	f1_limpar_pedidos();
	f1_retroceder();
}

function f1_desenhar_pedidos() {
	var template = `
<p class="lista_pedidos_tres_pontos"><img src="images/remover.svg" class="imagem_pedido_lista" onclick="f1_remover_pedido(%d); f1_desenhar_pedidos()"> %s %s</p>
<p class="lista_pedidos_preco_item">%d×%s€: %s€</p>
`;
	var template_1 = `
<p class="lista_pedidos_tres_pontos"><img src="images/remover.svg" class="imagem_pedido_lista" onclick="f1_remover_pedido(%d); f1_desenhar_pedidos()"> %s %s</p>
<p class="lista_pedidos_preco_item">%s€</p>
`;
	var html_pedidos = "";
	var total = 0;
	for (var item of pedidos)
	{
		if (item.quantidade == 1)
		{
			if (item.personalizado === false)
			{
				html = sprintf(template_1,
					item.id, String(item.quantidade) + "×", item.oferta.nome,
					item.oferta.preco.toFixed(2)
				);
			}
			else
			{
				html = sprintf(template_1,
					item.id, String(item.quantidade) + "× <b>[P]</b>", item.oferta.nome,
					item.oferta.preco.toFixed(2)
				);
			}
		}
		else
		{
			if (item.personalizado === false)
			{
				html = sprintf(template,
					item.id, String(item.quantidade) + "×", item.oferta.nome,
					item.quantidade, item.oferta.preco.toFixed(2),
					(item.quantidade * item.oferta.preco).toFixed(2)
				);
			}
			else
			{
				html = sprintf(template,
					item.id, String(item.quantidade) + "× <b>[P]</b>", item.oferta.nome,
					item.quantidade, item.oferta.preco.toFixed(2),
					(item.quantidade * item.oferta.preco).toFixed(2)
				);
			}
		}
		html_pedidos = html_pedidos.concat(html);
		total += item.oferta.preco * item.quantidade;
	}
	$("#lista_pedidos").html(html_pedidos);
	$("#lista_pedidos_preco_total").html("Total: " + total.toFixed(2) + "€");

	// Atualizar estado dos botões
	if (pedidos_estao_vazios())
	{
		document.getElementById("concluir").disabled = true;
	}
	else
	{
		document.getElementById("concluir").disabled = false;
	}
}

function f1_limpar_pedidos() {
	limpar_pedidos();
	f1_desenhar_pedidos();
}

function f1_botao_limpar(){
	if(pedidos_estao_vazios()){
		$("#modalOk-msg").text("O seu pedido está vazio!");
		$("#modalOk").modal();
		return;
	}
	else{
		$("#modalNaoSim-msg").text("Tem a certeza deseja limpar a lista de pedidos?");
		$("#modalNaoSim-Sim").attr("onclick", "f1_limpar_pedidos()");
		$("#modalNaoSim").modal();
	}
}

function f1_remover_pedido(_id){
	var remover_pedido = sprintf("remover_pedido(%d); f1_desenhar_pedidos();", _id);
	$("#modalNaoSim-msg").text("Tem a certeza deseja remover o pedido?");
	$("#modalNaoSim-Sim").attr("onclick", remover_pedido);
	$("#modalNaoSim").modal();
}

var numero_checkboxes_personalizacoes = 0;
function set_numero_checkboxes_personalizacoes(n) { numero_checkboxes_personalizacoes = n; }

function f1_registar_personalizacao(id) {
	if (document.getElementById(id).checked == true)
	{
		numero_checkboxes_personalizacoes++;
	}
	else if (document.getElementById(id).checked == false)
	{
		numero_checkboxes_personalizacoes--;
	}
	
	// No máximo só se podem escolher 4 acompanhamentos
	if (numero_checkboxes_personalizacoes >= 4)
	{
		for (i = 0; i < 12; i++)
		{
			if (document.getElementById('f1_checkbox_personalizacao_' + i).checked == false)
			{
				document.getElementById('f1_checkbox_personalizacao_' + i).disabled = true;
			}
		}
		$("#info_acompanhamentos_selecao").show();
	}
	else
	{
		for (i = 0; i < 12; i++)
		{
			document.getElementById('f1_checkbox_personalizacao_' + i).disabled = false;
		}
		$("#info_acompanhamentos_selecao").hide();
	}
}

/*var time = 60; /* how long the timer runs for
var initialOffset = '440';
var i = 1
var interval = setInterval(function() {
    $('.circle_animation').css('stroke-dashoffset', initialOffset-(i*(initialOffset/time)));
    $('h2').text(i);
    if (i == time) {
        clearInterval(interval);
    }
    i++;
}, 1000);
*/
