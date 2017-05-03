function f2_fechar() {
	$("#area_direita").html("");
	set_f2_vendo_1(false)
	loadMain();
}

function f2_editar_pedidos() {
	$("#area_direita").load("f2_2.html");
	set_f2_vendo_1(false)
}

function f2_dummy_data() {
	// Temporário, para debugging
	adicionar_pedido('entradas', 0, null, 1);
	adicionar_pedido('carne', 1, null, 1);
	adicionar_pedido('sobremesas', 2, null, 1);
	TESTING_dup_espera();
}

function f2_desenhar_pedidos() {
	var template_em_espera = `
<p class = "f2_p_style"><img src="images/remover.svg" class="img_remover_pedido" onclick="remover_pedido_em_espera(%d); f2_desenhar_pedidos()">
%s%s%s<span class="tempo_listagem">%d <b>min</b></span></p>
<p class="preco_listagem" id="preco_listagem_%d">%s €</p>
`;
	var template_em_preparacao = `
<p id = "em_preparacao">%s%s%s <span class="tempo_listagem">%d <b>min</b></span></p>
<p class="preco_listagem" id="preco_listagem_%d">%s €</p>
`;
	var template_entregues = `
<p class = "f2_p_style">%s%s%s <p class="preco_listagem" id="preco_listagem_%d">%s €</p></p>
`;
	var em_espera = "";
	var em_preparacao = "";
	var entregues = "";
	var total = 0;
	var id_preco_counter = 0;
	var ultimo_preco_espera = -1;
	var ultimo_preco_preparacao = -1;
	var ultimo_preco_entregues = -1;

	for (var item of get_pedidos_em_espera().slice().reverse())
	{
		var quantidade = "";
		var preco = item.oferta.preco.toFixed(2);
		if (item.quantidade >= 2)
		{
			quantidade = item.quantidade + "× ";
			preco = item.quantidade + "×" + item.oferta.preco.toFixed(2)
				+ ": " + (item.quantidade * item.oferta.preco).toFixed(2);
		}

		var personalizado = "";
		if (item.personalizado)
		{
			personalizado = "<b>[P]</b> ";
		}

		em_espera = em_espera.concat(sprintf(template_em_espera, item.id,
			quantidade, personalizado, item.oferta.nome,
			item.tempo, id_preco_counter, preco
		));

		total += item.oferta.preco * item.quantidade;
		ultimo_preco_espera = id_preco_counter;
		id_preco_counter++;
	}

	for (var item of get_pedidos_em_preparacao().slice().reverse())
	{
		var quantidade = "";
		var preco = item.oferta.preco.toFixed(2);
		if (item.quantidade >= 2)
		{
			quantidade = item.quantidade + "× ";
			preco = item.quantidade + "×" + item.oferta.preco.toFixed(2)
				+ ": " + (item.quantidade * item.oferta.preco).toFixed(2);
		}

		var personalizado = "";
		if (item.personalizado)
		{
			personalizado = "<b>[P]</b> ";
		}

		em_preparacao = em_preparacao.concat(sprintf(template_em_preparacao,
			quantidade, personalizado, item.oferta.nome,
			item.tempo, id_preco_counter, preco
		));

		total += item.oferta.preco * item.quantidade;
		ultimo_preco_preparacao = id_preco_counter;
		id_preco_counter++;
	}

	for (var item of get_pedidos_entregues().slice().reverse())
	{
		var quantidade = "";
		var preco = item.oferta.preco.toFixed(2);
		if (item.quantidade >= 2)
		{
			quantidade = item.quantidade + "× ";
			preco = item.quantidade + "×" + item.oferta.preco.toFixed(2)
				+ ": " + (item.quantidade * item.oferta.preco).toFixed(2);
		}

		var personalizado = "";
		if (item.personalizado)
		{
			personalizado = "<b>[P]</b> ";
		}

		entregues = entregues.concat(sprintf(template_entregues,
			quantidade, personalizado, item.oferta.nome,
			id_preco_counter, preco
		));

		total += item.oferta.preco * item.quantidade;
		ultimo_preco_entregues = id_preco_counter;
		id_preco_counter++;
	}

	$("#lista_em_espera").html(em_espera);
	$("#lista_em_preparacao").html(em_preparacao);
	$("#lista_entregues").html(entregues);
	$("#preco_total").text(total.toFixed(2) + "€");
	
	if (ultimo_preco_espera != -1)
	{
		document.getElementById("preco_listagem_" + ultimo_preco_espera).style["border-bottom-style"] = "none";
	}
	if (ultimo_preco_preparacao != -1)
	{
		document.getElementById("preco_listagem_" + ultimo_preco_preparacao).style["border-bottom-style"] = "none";
	}
	if (ultimo_preco_entregues != -1)
	{
		document.getElementById("preco_listagem_" + ultimo_preco_entregues).style["border-bottom-style"] = "none";
	}
	
	f2_sem_pedidos_espera();
}

function f2_desenhar_pedidos_editar() {
	var template_e = `
<p><img class="add_sub_sign" id="f2_sub_%d" src="images/minus_sign.svg" onclick="f2_subtrair_dose(%d)">
<span id="qtd_2">%d</span>
<img class="add_sub_sign" src="images/plus_sign.svg" onclick="f2_adicionar_dose(%d)">
<a onclick="f2_editar_pedido(%d)">%s%s</a>
<span class="preco_listagem">%s €</span></p>
`;
	var template_ne = `
<p><img class="add_sub_sign" id="f2_sub_%d" src="images/minus_sign.svg" onclick="f2_subtrair_dose(%d)">
<span id="qtd_2">%d</span>
<img class="add_sub_sign" src="images/plus_sign.svg" onclick="f2_adicionar_dose(%d)">
%s%s
<span class="preco_listagem">%s €</span></p>
`;

	var html = "";
	for (var item of get_pedidos_em_espera().slice().reverse())
	{
		var personalizado = "";
		if (item.personalizado)
		{
			personalizado = "<b>[P]</b> ";
		}

		if (item.oferta.tipo == "carne" || item.oferta.tipo == "peixe"
			|| item.oferta.tipo == "vegetariano")
		{
			html = html.concat(sprintf(template_e,
				item.id, item.id, item.quantidade, item.id, item.id,
				personalizado, item.oferta.nome, item.oferta.preco.toFixed(2)
			));
		}
		else
		{
			html = html.concat(sprintf(template_ne,
				item.id, item.id, item.quantidade, item.id,
				personalizado, item.oferta.nome, item.oferta.preco.toFixed(2)
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
<button type="button" id="botao_guardar_alteracao_personalizar" class="btn btn-primary btn-lg" onclick="f2_editar_pedido2(%d); f1_2_retroceder()">Guardar Alteração</button>
`;
	html = sprintf(html, id);
	var html_retroceder = `
<button type="button" class="btn btn-primary btn-lg" onclick="f1_2_retroceder()">Retroceder</button>
`;
	$("#loaded").load("f1_4.html", function()
	{
		$("#f1_div_botao_pedido_personalizado").html(html);
		$("#f1_div_botao_pedido_personalizado_retroceder").html(html_retroceder);
		f1_personalizacoes_carregar(oferta, get_personalizacoes_pedido_em_espera(id), id, true);
		document.getElementById('botao_guardar_alteracao_personalizar').disabled = true;
		set_ignorar_desligar_qtd();
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

// H4x0r1ng m0d3
// 13 = Enter
// 32 = Space
$(document).keypress(function(e) {
	if(e.which == 32) {
		decrementar_tempo_espera();
		f2_desenhar_pedidos();
	}
});

function f2_sem_pedidos_espera(){
	var botao_editar = document.getElementById('botao_editar_em_espera');
	if(pedidos_em_espera.length == 0){
    	botao_editar.disabled = true;
	}
	else{
		botao_editar.disabled = false;
	}
}

var f2_vendo_1 = false;
function set_f2_vendo_1(val)
{
	f2_vendo_1 = val;
}
function get_f2_vendo_1()
{
	return f2_vendo_1;
}

function f2_load_timer() {
	var vw = $(window).width() / 100;
	var template = `
<svg width="%d" height="%d" xmlns="http://www.w3.org/2000/svg">
	<g>
		<title>Layer 1</title>
		<circle id="prato_timer_circle" class="prato_timer_circle_animation" r="%f" cy="%f" cx="%f" stroke-width="%f" stroke="#f4d65b" fill="none"/>
	</g>
</svg>
`;
	var html = sprintf(template,
		100*vw, 100*vw, 25*vw, 50*vw, 50*vw, 0.6*vw
	);
	$("#prato_timer").html(html);
	var r = 2*Math.PI*25*vw;
	document.getElementById("prato_timer_circle").style["stroke-dasharray"] = r;
	document.getElementById("prato_timer_circle").style["stroke-dashoffset"] = r;
	
}

window.onresize = function(event) {
    f2_load_timer();
};

function f2_timer() {
	/* (Pi-2*ArcSin(0.25))/(2*Pi) */
	var fraccao = 0.419569376744833756229049806671515744415935568752463241799;
	var interval = setInterval(function() {
		var vw = $(window).width() / 100;
		var r = 2*Math.PI*25*vw;
		
		decrementar_tempo_espera(5);
		if(f2_vendo_1)
		{
			f2_desenhar_pedidos();
		}
		
		var tempos = tempos_proximo_pedido_em_espera();
		var i = tempos[0];
		var time = tempos[1];
		var item = tempos[2];
		if (item != null)
		{
			var quantidade = "";
			if (item.quantidade >= 2)
			{
				quantidade = item.quantidade + "× ";
			}

			var personalizado = "";
			if (item.personalizado)
			{
				personalizado = "<b>[P]</b> ";
			}
			
			var template = `Próximo: %s%s%s`;
			
			$("#proximo_pedido_entregue").html(sprintf(template,
				quantidade, personalizado, item.oferta.nome));
		}
		else
		{
			$("#proximo_pedido_entregue").html("");
		}
		
		$('.prato_timer_circle_animation').css('stroke-dashoffset', r-((time-i)*((r*fraccao)/time)));
	}, 1000);
}
f2_timer();
