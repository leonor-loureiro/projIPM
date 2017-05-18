function f3_DUMMY_DATA()
{
	adicionar_pedido("sopas", 0, null, 1, get_pedidos_entregues());
	adicionar_pedido("carne", 1, null, 2, get_pedidos_entregues());
	adicionar_pedido("peixe", 2, null, 3, get_pedidos_entregues());
	adicionar_pedido("sobremesas", 0, null, 1, get_pedidos_entregues());
	adicionar_pedido("sobremesas", 1, null, 1, get_pedidos_entregues());
	adicionar_pedido("sobremesas", 2, null, 1, get_pedidos_entregues());
	adicionar_pedido("sobremesas", 3, null, 1, get_pedidos_entregues());
	adicionar_pedido("sobremesas", 4, null, 1, get_pedidos_entregues());
	adicionar_pedido("sobremesas", 5, null, 1, get_pedidos_entregues());
	adicionar_pedido("sobremesas", 6, null, 1, get_pedidos_entregues());
	adicionar_pedido("sobremesas", 7, null, 1, get_pedidos_entregues());
	adicionar_pedido("sobremesas", 8, null, 1, get_pedidos_entregues());
}

// Depois de ser true já não se pode fugir do pagamento até estar tudo pago
f3_pagamento_comecado = false;

function f3_2()
{
	$("#loaded").load("f3_2.html", function() {
		$("#barra_progresso_f3").load("f3_barra_progresso.html", function(){
			$("#lista_produtos").attr("disabled","false");
			$("#lista_produtos").attr("active","true");

		});
		if (f3_pagamento_comecado)
		{
			$("#botao_f3_2_retroceder").hide();
		}
		if (pedidos_a_pagar.length > 0)
		{
			document.getElementById("botao_f3_2_pagar").disabled = false;
		}
		else
		{
			document.getElementById("botao_f3_2_pagar").disabled = true;
		}
	});
}

function f3_2_retroceder()
{
	f3();
}

var f3_3_voltar_para_f3_1 = false;
function f3_3(voltar_para_f3_1 = false)
{
	f3_3_voltar_para_f3_1 = voltar_para_f3_1;
	if (voltar_para_f3_1)
	{
		pedidos_a_pagar = [];
		for (var item of get_pedidos_entregues())
		{
			pedidos_a_pagar.push(item);
		}
	}
	$("#loaded").load("f3_3.html", function(){
		$("#barra_progresso_f3").load("f3_barra_progresso.html", function(){
			$("#modo_pagamento").attr("disabled","false");
			$("#modo_pagamento").attr("active","true");

		});
	});
}

function f3_3_retroceder()
{
	if (f3_3_voltar_para_f3_1)
	{
		pedidos_a_pagar = [];
		f3();
	}
	else
	{
		f3_2();
	}
}

var f3_modo_de_pagamento = null;
function f3_4(modo_de_pagamento)
{
	$("#modalContribuinte").modal();
	setTimeout(function(){
		document.getElementById("f3_4_contribuinte_keyboard").style.visibility ="visible";
	}, 500);
	f3_modo_de_pagamento = modo_de_pagamento;
}

function f3_4_retroceder()
{
	$("#modalContribuinte").modal('hide');
	document.getElementById("f3_4_contribuinte_keyboard").style.visibility ="hidden";
	f3_3(f3_3_voltar_para_f3_1);
}

function f3_5_barra_progresso(){
	$("#barra_progresso_f3").load("f3_barra_progresso.html", function(){
			$("#transacao").attr("disabled","false");
			$("#transacao").attr("active","true");

	});
}

var f3_vendo_5 = false;
function get_f3_vendo_5()
{
	return f3_vendo_5;
}

function f3_5()
{

	$("#modalContribuinte").modal('hide');
	document.getElementById("f3_4_contribuinte_keyboard").style.visibility ="hidden";

	switch(f3_modo_de_pagamento)
	{
		case "dinheiro":
			$("#loaded").load("f3_5_dinheiro.html", function(){
				f3_5_barra_progresso();
				f3_5_desenhar();
			});
			break;
		case "multibanco":
			$("#loaded").load("f3_5_multibanco.html", function(){
				f3_5_barra_progresso();
				f3_5_desenhar();
			});
			break;
		case "smartphone":
			$("#loaded").load("f3_5_smartphone.html", function(){
				f3_5_barra_progresso();
				f3_5_desenhar();
			});
			break;
	}
	f3_vendo_5 = true;
}
 

function f3_5_retroceder()
{
	f3_vendo_5 = false;
	f3_3();
}

function f3_6()
{
	f3_vendo_5 = false;
	var total = 0;
	f3_pagamento_comecado = true;
	preparar_novo_pagamento();
	for (var item of pedidos_a_pagar)
	{
		total += item.oferta.preco * item.quantidade;
		mover_pedido_para_pago(item, item.quantidade);
	}
	$("#loaded").load("f3_6.html", function() {
		$("#barra_progresso_f3").load("f3_barra_progresso.html", function(){
			$("#transacao").attr("disabled","false");
			$("#transacao").attr("active","true");
		});
		$("#preco_total_transacao").html(total.toFixed(2));
		if (existem_itens_por_pagar())
		{
			pedidos_a_pagar = [];
			$("#botao_concluir").attr("onclick","f3_2()");
			document.getElementById("botao_concluir").innerHTML="Próximo";
			

		}
	});
}

f3_vendo_7_flag="false";
function f3_vendo_7(){
	if(f3_vendo_7_flag=="true"){
		return;
	}
	window.location.reload(false);
}
function f3_6_concluir()
{
	f3_despedida();
	
	

}

function f3_7()
{
	f3_vendo_7_flag = "true";
	$("#loaded").load("f3_7.html", function(){
		$("#barra_progresso_f3").load("f3_barra_progresso.html", function(){
				$("#rating").attr("disabled","false");
				$("#rating").attr("active","true");
		});
	});
}

function f3_7_concluir()
{
	f3_vendo_7_flag = "false";
	if (document.getElementById('rating_refeicao').value == 5
		&& document.getElementById('rating_atendimento').value == 5)
		//&& document.getElementById('f3_7_checkbox_elogio').checked)
	{
		f3_surprise();
		setTimeout(function(){
			$("#modalOk-msg").text("A sua avaliação foi submetida.");
			$("#modalOk-footer").hide();
			$("#modalOk").modal();
		}, 1700);
		setTimeout(function(){
			$("#modalOk").modal('hide');
			window.location.reload(false);
		}, 3300);
	}
	else{
		$("#modalOk-msg").text("A sua avaliação foi submetida.");
		$("#modalOk-footer").hide();
		$("#modalOk").modal();
		setTimeout(function(){
				$("#modalOk").modal('hide');
				window.location.reload(false);
		}, 1500);
	}
}

function f3_2_desenhar()
{
	template = `
<div class="checkbox f3_2_checkbox">
	<div class="row pf3_2_lista_pedidos" id="f3_2_linha_%d">
		<div class="col-md-10">
			<label>
				<input type="checkbox" name="f3_2_pedidos" value=%d id="checkbox_pagamento_%d_%d" onchange="f3_2_checkbox(this)">
				<span class="cr"><i class="cr-icon fa fa-check"></i></span>
				%s%s
			</label>
		</div>
		<div class="col-md-2 pull-right text-right">
			<b>%s€</b>
		</div>
	</div>
</div>
`;

	var linha_counter = -1;
	var html = "";
	for (var item of sort_pedidos_por_nome(get_pedidos_entregues().slice()))
	{
		var checkbox_counter = 0;
		for (i = item.quantidade; i > 0; i--)
		{
			linha_counter++;
			var personalizado = "";
			if (item.personalizado)
			{
				personalizado = "<b>[P]</b> "
			}

			html = html.concat(sprintf(template,
				linha_counter, item.id, item.id, checkbox_counter,
				personalizado, item.oferta.nome,
				item.oferta.preco.toFixed(2)
			));
			checkbox_counter++;
		}
	}

	$("#f3_2_lista_checkboxes").html(html);
	f3_2_carregar_checkboxes();

	if (linha_counter != -1)
	{
		document.getElementById("f3_2_linha_" + linha_counter).style["border-bottom-style"] = "none";
	}

	template_row_pagos=`
<div class="row pf3_2_lista_pedidos">
	<div class="col-md-10">
		%s%s%s
	</div>
	<div class="col-md-2 pull-right text-right">
		<b>%s€</b>
	</div>
</div>
`;
	template_collapse_pago=`
<div class="panel panel-default">
	<div class="panel-heading pagamento_header">
			<h4 class="panel-title">
				<a data-toggle="collapse" data-parent="#accordion" href="#collapse%d">%s</a>
			</h4>
	</div>
		<div id="collapse%d" class="panel-collapse collapse in pagamento_body">
			<div class="panel-body">%s</div>
	</div>
</div>
`;

	var html="";
	var ultimo_separador = -1;
	var total_subpagamento = 0;
	var numero_pagamento = get_pedidos_pagos().length;
	for (var lista of get_pedidos_pagos().slice().reverse())
	{	content="";
		header = "";
		total_subpagamento = 0;
		header = header.concat("<p class=\"f3_2_subtitulo_pagamento\">" + numero_pagamento + "º Pagamento</p>");

		for (var item of sort_pedidos_por_nome(lista))
		{
			var mult = "";
			if (item.quantidade > 1)
			{
				mult = String(item.quantidade) + "× ";
			}
			var personalizado = "";
			if (item.personalizado)
			{
				personalizado = "<b>[P]</b> "
			}

			content = content.concat(sprintf(template_pagos,
				mult, personalizado, item.oferta.nome,
				(item.oferta.preco * item.quantidade).toFixed(2)
			));

			total_subpagamento += item.oferta.preco * item.quantidade;
		}

		content = content.concat("<p class=\"f3_2_subtotal_pagamento\">Total: <b>" + total_subpagamento.toFixed(2) + "€</b></p>");
		html=html.concat(sprintf(template_collapse_pago,numero_pagamento,header,numero_pagamento,content));
		numero_pagamento--;
	}
	$("#accordion").html(html);
	if (ultimo_separador != -1)
	{
		$("#f3_2_separador_" + ultimo_separador).hide();
	}
}

// http://stackoverflow.com/a/8175221
function sort_pedidos_por_nome(array) {
    return array.sort(function(a, b) {
        var x = a['oferta']['nome']; var y = b['oferta']['nome'];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

// Temporário, depois são movidos para pedidos_pagos de pedidos.js
var pedidos_a_pagar = []
var selecionou_tudo = false;
var tudo_selecionado = false;

function f3_2_checkbox(element)
{
	var pedido_copiado = jQuery.extend({}, get_pedido_entregue(parseInt(element.value)));
	pedido_copiado.quantidade = 1;
	var index = pedidos_a_pagar.map(function(e) { return e.id; }).indexOf(parseInt(element.value));

	if (element.checked)
	{
		if(index < 0) {
			pedidos_a_pagar.push(pedido_copiado);
		}
		else
		{
			pedidos_a_pagar[index].quantidade++;
		}
	}
	else
	{
		if(index > -1) {
			if (pedidos_a_pagar[index].quantidade == 1)
			{
				pedidos_a_pagar.splice(index, 1);
			}
			else
			{
				pedidos_a_pagar[index].quantidade--;

			}
			if(selecionou_tudo){
					f3_selecionar_tudo.checked = false;
			}
		}
	}

	f3_2_desenhar_total();
	if (pedidos_a_pagar.length != 0)
	{
		document.getElementById("botao_f3_2_pagar").disabled = false;
	}
	else
	{
		document.getElementById("botao_f3_2_pagar").disabled = true;
	}
}

function f3_2_checkbox_tudo()
{
	selecionou_tudo = true;
	checkboxes = document.getElementsByName("f3_2_pedidos");

	for (var item of checkboxes)
	{
		var atualizar = true;
		if (item.checked == f3_selecionar_tudo.checked)
		{
			atualizar = false;

		}
		else
		{
			item.checked = f3_selecionar_tudo.checked;
		}

		if (atualizar)
		{
			f3_2_checkbox(item);
		}
	}
}

function f3_2_desenhar_total()
{
	var total_parte = 0;
	for (var item of pedidos_a_pagar)
	{
		total_parte += item.oferta.preco * item.quantidade;
	}
	totais = get_total_pagamento();
	$("#f3_2_total_selecionado").html("<b>Total:</b> " + total_parte.toFixed(2)
		+ "€ (faltam pagar " + (totais[1] - totais[0]).toFixed(2) + "€ de " + totais[1].toFixed(2) + "€)");
}

function f3_2_carregar_checkboxes()
{
	for (var item of pedidos_a_pagar)
	{
		for (i = 0; i < item.quantidade; i++)
		{
			document.getElementById("checkbox_pagamento_" + item.id + "_" + i).checked = true;
		}
	}
	if (pedidos_a_pagar.length != 0)
	{
		document.getElementById("botao_f3_2_pagar").disabled = false;
	}
}

// http://stackoverflow.com/a/7455124
function f3_surprise_translate( elem, x, y ) {
    var right = parseInt( f3_surprise_css( elem, 'right' ), 10 ),
        bottom = parseInt( f3_surprise_css( elem, 'bottom' ), 10 ),
        dx = right - x,
        dy = bottom - y,
        i = 1,
        count = 20,
        delay = 20;

    function loop() {
        if ( i >= count ) { return; }
        i += 1;
        elem.style.right = ( right - ( dx * i / count ) ).toFixed( 0 ) + 'px';
        elem.style.bottom = ( bottom - ( dy * i / count ) ).toFixed( 0 ) + 'px';
        setTimeout( loop, delay );
    }

    loop();
}

function f3_surprise_css( element, property ) {
    return window.getComputedStyle( element, null ).getPropertyValue( property );
}

function f3_surprise()
{
	var height = parseInt(f3_surprise_css(surprise, 'height'), 10);
	f3_surprise_translate(surprise, -height/4, -height/4);
	setTimeout(function(){
		f3_surprise_translate(surprise, -height, -height);
	}, 2500);
}

function f3_despedida(){
	$("#modalPagamento").modal();

	// http://stackoverflow.com/a/22944616
	setTimeout(function(){
		$("#modalPagamento").modal('hide');
		f3_vendo_7();
	}, 4000);
}


function f3_5_desenhar()
{
	template_pagos = `
<div class="row pf3_2_lista_pedidos">
	<div class="col-md-10">
		%s%s%s
	</div>
	<div class="col-md-2 pull-right text-right">
		<b>%s€</b>
	</div>
</div>
`;

	var html = "";
	var total_pagamento = 0;
	var numero_pagamento = get_pedidos_pagos().length;

	for (var item of sort_pedidos_por_nome(pedidos_a_pagar))
	{
		var mult = "";
		if (item.quantidade > 1)
		{
			mult = String(item.quantidade) + "× ";
		}
		var personalizado = "";
		if (item.personalizado)
		{
			personalizado = "<b>[P]</b> "
		}

		html = html.concat(sprintf(template_pagos,
			mult, personalizado, item.oferta.nome,
			(item.oferta.preco * item.quantidade).toFixed(2)
		));

		total_pagamento += item.oferta.preco * item.quantidade;
	}

	$("#f3_5_lista_pagos").html(html);
	$("#f3_5_lista_pagos_total").html("<p class=\"f3_2_subtotal_pagamento\">Total: <b>" + total_pagamento.toFixed(2) + "€</b></p>");
}
