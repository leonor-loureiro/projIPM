function f2_fechar() {
	$("#area_direita").html("");
	loadMain();
}

function f2_editar_pedidos() {
	$("#area_direita").load("f2_2.html");
}

function f2_dummy_data() {
	// Temporário, para debugging
	adicionar_pedido('entradas', 0, null, 1);
	adicionar_pedido('carne', 1, null, 1);
	adicionar_pedido('sobremesas', 2, null, 1);
	TESTING_dup_espera();
	adicionar_pedido('entradas', 0, null, 1);
	adicionar_pedido('carne', 1, null, 1);
	adicionar_pedido('sobremesas', 2, null, 1);
	TESTING_dup_preparacao();
	adicionar_pedido('entradas', 0, null, 1);
	adicionar_pedido('carne', 1, null, 1);
	adicionar_pedido('sobremesas', 2, null, 1);
	TESTING_dup_entregues();
}

function f2_desenhar_pedidos() {
	var template_em_espera = `
<p><img src="images/remover.svg" class="img_remover_pedido" onclick="remover_pedido_em_espera(%d); f2_desenhar_pedidos()">
<b>%s</b> <span class="preco_listagem">%s €</span></p>
<p class="tempo_listagem">xxx <b>min</b></p>
`;
	var template_em_preparacao = `
<p><b>%s</b> <span class="preco_listagem">%s €</span></p>
<p class="tempo_listagem">xxx <b>min</b></p>
`;
	var template_entregues = `
<p><b>%s</b> <span class="preco_listagem">%s €</span></p>
`;
	var em_espera = "";
	var em_preparacao = "";
	var entregues = "";
	
	for (var item of get_pedidos_em_espera().slice().reverse())
	{
		em_espera = em_espera.concat(sprintf(template_em_espera,
			item.id, item.oferta.nome, item.oferta.preco.toFixed(2)
		));
	}
	
	for (var item of get_pedidos_em_preparacao().slice().reverse())
	{
		em_preparacao = em_preparacao.concat(sprintf(template_em_preparacao,
			item.oferta.nome, item.oferta.preco.toFixed(2)
		));
	}
	
	for (var item of get_pedidos_entregues().slice().reverse())
	{
		entregues = entregues.concat(sprintf(template_entregues,
			item.oferta.nome, item.oferta.preco.toFixed(2)
		));
	}
	
	$("#lista_em_espera").html(em_espera);
	$("#lista_em_preparacao").html(em_preparacao);
	$("#lista_entregues").html(entregues);
}

function f2_desenhar_pedidos_editar() {
	var template_e = `
<p><img class="add_sub_sign" id="f2_sub_%d" src="images/minus_sign.svg" onclick="f2_subtrair_dose(%d)">
<span id="qtd_2">%d</span>
<img class="add_sub_sign" src="images/plus_sign.svg" onclick="f2_adicionar_dose(%d)">
<a onclick="f2_editar_pedido(%d)"><b>%s</b></a>
<span class="preco_listagem">%s €</span></p>
`;
	var template_ne = `
<p><img class="add_sub_sign" id="f2_sub_%d" src="images/minus_sign.svg" onclick="f2_subtrair_dose(%d)">
<span id="qtd_2">%d</span>
<img class="add_sub_sign" src="images/plus_sign.svg" onclick="f2_adicionar_dose(%d)">
<b>%s</b>
<span class="preco_listagem">%s €</span></p>
`;
	
	var html = "";
	for (var item of get_pedidos_em_espera().slice().reverse())
	{
		if (item.oferta.tipo == "carne" || item.oferta.tipo == "peixe"
			|| item.oferta.tipo == "vegetariano")
		{
			html = html.concat(sprintf(template_e,
				item.id, item.id, item.quantidade, item.id, item.id,
				item.oferta.nome, item.oferta.preco.toFixed(2)
			));
		}
		else
		{
			html = html.concat(sprintf(template_ne,
				item.id, item.id, item.quantidade, item.id, item.oferta.nome,
				item.oferta.preco.toFixed(2)
			));
		}
	}
	
	$("#listagem_f2_2").html(html);
	
	for (var item of get_pedidos_em_espera().slice().reverse())
	{
		if (item.quantidade <= 1)
		{
			document.getElementById("f2_sub_" + item.id).style.filter = "grayscale(100%)";
		}
	}
}

function f2_editar_pedido(id) {
	var oferta = get_oferta_pedido_em_espera(id);
	// +1 para compensar pela chamada a f1_sub_dose() ao carregar as personalizações
	qtd = get_pedido_em_espera(id).quantidade + 1;
	var html = `
<button type="button" class="btn btn-primary btn-lg" onclick="f2_editar_pedido2(%d); f1_2_retroceder()">Guardar Alteração</button>
`;
	html = sprintf(html, id);
	var html_retroceder = `
<button type="button" class="btn btn-primary btn-lg" onclick="f1_2_retroceder()">Retroceder</button>
`;
	$("#loaded").load("f1_4.html", function()
	{
		$("#f1_div_botao_pedido_personalizado").html(html);
		$("#f1_div_botao_pedido_personalizado_retroceder").html(html_retroceder);
		f1_personalizacoes_carregar(oferta, get_personalizacoes_pedido_em_espera(id));
	});
	$("#area_direita").html("");
}

function f2_editar_pedido2(id)
{
	editar_pedido_em_espera(id, personalizacoes, qtd);
}

function f1_2_retroceder()
{
	$("#loaded").html("");
	f2_editar_pedidos();
}

function f2_adicionar_dose(id)
{
	var pedido = get_pedido_em_espera(id);
	pedido.quantidade++;
	f2_desenhar_pedidos_editar();
}

function f2_subtrair_dose(id)
{
	var pedido = get_pedido_em_espera(id);
	if (pedido.quantidade >= 2)
	{
		pedido.quantidade--;
	}
	f2_desenhar_pedidos_editar();
}
