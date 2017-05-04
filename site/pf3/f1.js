function f1_ofertas(tipo) {
	$("#loaded").load("f1_2.html", function()
	{
		f1_carregar_ofertas(tipo);
		f1_anterior = tipo;
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
	adicionar_pedido(f1_anterior_tipo, f1_anterior_id, null, 1);
	f1_desenhar_pedidos();
}

function f1_adicionar_pedido_personalizado()
{
	adicionar_pedido(f1_anterior_tipo, f1_anterior_id, f1_get_personalizacoes(), qtd);
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
		f1_personalizacoes_carregar(oferta, null);
	});
	$("#prato_decor").html("");
	$("#area_direita").load("f1_pedido.html");
}

var ignorar_desligar_qtd = false;
var orig_qtd = -1;
var mais_menos_desligar = true;
function f1_add_dose(){
	qtd++;
	document.getElementById("qtd").innerHTML = ""+qtd;
	if (qtd >= 2) {
		document.getElementById("f1_personalizar_menos").style.filter = null;
	}
	
	if (orig_qtd > -1)
	{
		if (qtd != orig_qtd)
		{
			mais_menos_desligar = false;
			f1_desligar_botao_guardar();
		}
		else
		{
			mais_menos_desligar = true;
			f1_desligar_botao_guardar();
		}
	}
};

function f1_sub_dose(){
	if(qtd > 1){
		qtd--;
		document.getElementById("qtd").innerHTML = ""+qtd;
	}
	if (qtd <= 1) {
		document.getElementById("f1_personalizar_menos").style.filter = "grayscale(100%)";
	}
	
	if (orig_qtd > -1)
	{
		if (qtd != orig_qtd)
		{
			mais_menos_desligar = false;
			f1_desligar_botao_guardar();
		}
		else
		{
			mais_menos_desligar = true;
			f1_desligar_botao_guardar();
		}
	}
}

function set_orig_qtd(qtd)
{
	orig_qtd = qtd;
}

function set_ignorar_desligar_qtd(val=false)
{
	ignorar_desligar_qtd = false;
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

function f1_abrir_cancelar_fazer_pedido()
{
	if (!pedidos_estao_vazios())
	{
		$("#modalNaoSim-msg").text("Tem a certeza que deseja cancelar todos os pedidos?");
		$("#modalNaoSim-Sim").attr("onclick", "f1_limpar_pedidos(); f1_retroceder()");
		$("#modalNaoSim").modal();
	}
	else
	{
		f1_retroceder();
	}
}

function f1_pedido_bem_sucedido() {
	$("#modalSucesso-msg").text("O seu pedido foi concluído com sucesso!");
	$("#modalSucesso").modal();

	// http://stackoverflow.com/a/22944616
	setTimeout(function(){
		$("#modalSucesso").modal('hide');
	}, 1500);
}

function f1_abrir_concluir_fazer_pedido() {
	if(pedidos_estao_vazios()){
		$("#modalOk-msg").text("O seu pedido está vazio!");
		$("#modalOk").modal();
		return;
	}
	else{
		$("#modalNaoSim-msg").text("Tem a certeza que deseja concluir o seu pedido?");
		$("#modalNaoSim-Sim").attr("onclick", "f1_concluir_fazer_pedido(); f1_pedido_bem_sucedido();");
		$("#modalNaoSim").modal();
	}
}

function f1_concluir_fazer_pedido() {
	concluir_pedido();
	f1_retroceder();
}

function f1_desenhar_pedidos() {
	var template = `
<p class="lista_pedidos_tres_pontos"><img src="images/remover.svg" class="imagem_pedido_lista" onclick="f1_remover_pedido(%d); f1_desenhar_pedidos()">%s%s %s%s</p>
<div class="row" style="margin: 0; padding: 0;">
	<div class="col-xs-4" style="padding: 0;">
	</div>
	<div class="col-xs-8" style="padding: 0;">
		<p class="lista_pedidos_preco_item">%d×%s€: %s€</p>
	</div>
</div>
`;
	var template_1 = `
<p class="lista_pedidos_tres_pontos"><img src="images/remover.svg" class="imagem_pedido_lista" onclick="f1_remover_pedido(%d); f1_desenhar_pedidos()">%s%s %s%s</p>
<div class="row" style="margin: 0; padding: 0;">
	<div class="col-xs-4" style="padding: 0;">
	</div>
	<div class="col-xs-8" style="padding: 0;">
		<p class="lista_pedidos_preco_item">%s€</p>
	</div>
</div>
`;


	var html_pedidos = "";
	var total = get_total_pedidos_efetuados();
	for (var item of get_pedidos().slice().reverse())
	{

		var a1 = '';
		if (item.oferta.tipo == "carne" || item.oferta.tipo == "peixe"
			|| item.oferta.tipo == "vegetariano")
		{
			a1 = sprintf('<a onclick="f1_editar_pedido(%d)"> ', item.id);
		}
		var a2 = '</a>';

		if (item.quantidade == 1)
		{
			if (item.personalizado === false)
			{
				html = sprintf(template_1,
					item.id, a1, String(item.quantidade) + "×", item.oferta.nome, a2,
					item.oferta.preco.toFixed(2)
				);
			}
			else
			{
				html = sprintf(template_1,
					item.id, a1, String(item.quantidade) + "× <b>[P]</b>", item.oferta.nome, a2,
					item.oferta.preco.toFixed(2)
				);
			}
		}
		else
		{
			if (item.personalizado === false)
			{
				html = sprintf(template,
					item.id, a1, String(item.quantidade) + "×", item.oferta.nome, a2,
					item.quantidade, item.oferta.preco.toFixed(2),
					(item.quantidade * item.oferta.preco).toFixed(2)
				);
			}
			else
			{
				html = sprintf(template,
					item.id, a1, String(item.quantidade) + "× <b>[P]</b>", item.oferta.nome, a2,
					item.quantidade, item.oferta.preco.toFixed(2),
					(item.quantidade * item.oferta.preco).toFixed(2)
				);
			}
		}
		html_pedidos = html_pedidos.concat(html);
		total += item.oferta.preco * item.quantidade;
	}

	$("#lista_pedidos").html(html_pedidos);
	var total_texto = "<b>Total:</b> ";
	if (total > 10)
	{
		total_texto = "<b>Tot:</b> ";
	}
	$("#lista_pedidos_preco_total").html(total_texto + total.toFixed(2) + "€");
	
	// Atualizar estado dos botões
	if (pedidos_estao_vazios())
	{
		document.getElementById("concluir").disabled = true;
		document.getElementById("botao_limpar").disabled = true;
	}
	else
	{
		document.getElementById("concluir").disabled = false;
		document.getElementById("botao_limpar").disabled = false;
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
		$("#modalNaoSim-msg").text("Tem a certeza deseja remover todos os pedidos?");
		$("#modalNaoSim-Sim").attr("onclick", "f1_limpar_pedidos()");
		$("#modalNaoSim").modal();
	}
}

function f1_remover_pedido(_id){
	remover_pedido(_id);
}

var numero_checkboxes_personalizacoes = 0;
var checkboxes_desligar = true;
function f1_registar_personalizacao(id, id_pedido = -1, em_espera = false) {
	if (document.getElementById(id).checked == true)
	{
		numero_checkboxes_personalizacoes++;
		f1_adicionar_personalizacao(id);
	}
	else if (document.getElementById(id).checked == false)
	{
		numero_checkboxes_personalizacoes--;
		f1_remover_personalizacao(id);
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
	
	if (id_pedido != -1)
	{
		var pedido = null;
		if (em_espera == false)
		{
			pedido = get_pedido(id_pedido);
		}
		else
		{
			pedido = get_pedido_em_espera(id_pedido);
		}
		
		for (i = 0; i < 12; i++)
		{
			if ((document.getElementById('f1_checkbox_personalizacao_' + i).checked
				&& !pedido.personalizacoes.includes('f1_checkbox_personalizacao_' + i))
				|| (pedido.personalizacoes.includes('f1_checkbox_personalizacao_' + i)
				&& !document.getElementById('f1_checkbox_personalizacao_' + i).checked))
			{
				checkboxes_desligar = false;
				f1_desligar_botao_guardar();
				return;
			}
		}
		checkboxes_desligar = true;
		f1_desligar_botao_guardar();
		return;
	}
}

function f1_desligar_botao_guardar()
{
	if (checkboxes_desligar && mais_menos_desligar)
	{
		document.getElementById('botao_guardar_alteracao_personalizar').disabled = true;
	}
	else
	{
		document.getElementById('botao_guardar_alteracao_personalizar').disabled = false;
	}
}

function f1_limpar_personalizacoes()
{
	numero_checkboxes_personalizacoes = 0;
	personalizacoes = [];
}

var personalizacoes = [];
function f1_adicionar_personalizacao(id_checkbox)
{
	personalizacoes.push(id_checkbox);
}

function f1_remover_personalizacao(id_checkbox)
{
	var index = personalizacoes.map(function(e) { return e; }).indexOf(id_checkbox);
	personalizacoes.splice(index, 1);
}

function f1_get_personalizacoes()
{
	return personalizacoes;
}

function f1_editar_pedido(id)
{
	var oferta = get_oferta_pedido(id);
	personalizar_from = 1;
	// +1 para compensar pela chamada a f1_sub_dose() ao carregar as personalizações
	qtd = get_pedido(id).quantidade + 1;
	var html = `
<button type="button" id="botao_guardar_alteracao_personalizar" class="btn btn-primary btn-lg" onclick="f1_editar_pedido2(%d); f1_4_retroceder()">Guardar Alteração</button>
`;
	html = sprintf(html, id);
	$("#loaded").load("f1_4.html", function()
	{
		$("#f1_div_botao_pedido_personalizado").html(html);
		f1_personalizacoes_carregar(oferta, get_personalizacoes_pedido(id), id, false);
		document.getElementById('botao_guardar_alteracao_personalizar').disabled = true;
		set_ignorar_desligar_qtd();
	});
	$("#prato_decor").html("");
	$("#area_direita").load("f1_pedido.html");
}

function f1_editar_pedido2(id)
{
	editar_pedido(id, personalizacoes, qtd);
}
