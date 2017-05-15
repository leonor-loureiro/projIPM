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
			pedidos_a_pagar.push(item.id);
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
	$("#loaded").load("f3_4.html", function(){
		$("#barra_progresso_f3").load("f3_barra_progresso.html", function(){
			$("#nr_contribuinte").attr("disabled","false");
			$("#nr_contribuinte").attr("active","true");

		});
	});
	f3_modo_de_pagamento = modo_de_pagamento;
}

function f3_4_retroceder()
{
	var keyboard = $('#f3_4_contribuinte').getkeyboard();
	keyboard.destroy();
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
	var keyboard = $('#f3_4_contribuinte').getkeyboard();
	keyboard.destroy();
	switch(f3_modo_de_pagamento)
	{
		case "dinheiro":
			$("#loaded").load("f3_5_dinheiro.html", function(){
				f3_5_barra_progresso();
			});
			break;
		case "multibanco":
			$("#loaded").load("f3_5_multibanco.html", function(){
				f3_5_barra_progresso();
			});
			break;
		case "smartphone":
			$("#loaded").load("f3_5_smartphone.html", function(){
				f3_5_barra_progresso();
			});
			break;
	}
	f3_vendo_5 = true;
}

function f3_5_retroceder()
{
	f3_vendo_5 = false;
	f3_4(f3_modo_de_pagamento);
}

function f3_6()
{
	f3_vendo_5 = false;
	var total = 0;
	f3_pagamento_comecado = true;
	preparar_novo_pagamento();
	for (var id of pedidos_a_pagar)
	{
		var pedido = get_pedido_entregue(id);
		total += pedido.oferta.preco * pedido.quantidade;
		mover_pedido_entregue_para_pago(id);
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
			$("#botao_avaliar").attr("onclick","f3_2()");
			document.getElementById("botao_avaliar").innerHTML="Próximo";
			document.getElementById("botao_concluir").style.visibility="hidden";
		
		}
	});
}

function f3_6_concluir()
{
	f3_despedida();
	setTimeout(function(){
		window.location.reload(false);
	}, 2000);

}

function f3_7()
{
	$("#loaded").load("f3_7.html", function(){
		$("#barra_progresso_f3").load("f3_barra_progresso.html", function(){
				$("#rating").attr("disabled","false");
				$("#rating").attr("active","true");
		});
	});
}

function f3_7_concluir()
{
	if (document.getElementById('rating_refeicao').value == 5
		&& document.getElementById('rating_atendimento').value == 5
		&& document.getElementById('f3_7_checkbox_elogio').checked)
	{
		var keyboard = $('#f3_7_comentario_keyboard').getkeyboard();
		keyboard.destroy();
		f3_surprise();

		setTimeout(function(){
			f3_despedida();
		}, 3000);

		setTimeout(function(){
			window.location.reload(false);
		}, 4000);
	}
	else
	{
		var keyboard = $('#f3_7_comentario_keyboard').getkeyboard();
		keyboard.destroy();

		setTimeout(function(){
			f3_despedida();
		}, 1000);

		setTimeout(function(){
			window.location.reload(false);
		}, 2000);
	}

}

function f3_2_desenhar()
{
	template = `
<div class="checkbox">
	<div class="row pf3_2_lista_pedidos" id="f3_2_linha_%d">
		<div class="col-md-10">
			<label>
				<input type="checkbox" name="f3_2_pedidos" value=%d id="checkbox_pagamento_%d" onchange="f3_2_checkbox(this)">
				<span class="cr"><i class="cr-icon fa fa-check"></i></span>
				%s%s%s
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
	for (var item of get_pedidos_entregues().slice().reverse())
	{
		linha_counter++;
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

		html = html.concat(sprintf(template,
			linha_counter, item.id, item.id,
			mult, personalizado, item.oferta.nome,
			(item.oferta.preco * item.quantidade).toFixed(2)
		));
	}
	
	$("#f3_2_lista_checkboxes").html(html);
	f3_2_carregar_checkboxes();
	
	if (linha_counter != -1)
	{
		document.getElementById("f3_2_linha_" + linha_counter).style["border-bottom-style"] = "none";
	}
	
	
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
	var ultimo_separador = -1;
	var total_subpagamento = 0;
	var numero_pagamento = get_pedidos_pagos().length;
	for (var lista of get_pedidos_pagos().reverse())
	{
		total_subpagamento = 0;
		html = html.concat("<p class=\"f3_2_subtitulo_pagamento\">" + numero_pagamento + "º Pagamento</p>");
		
		for (var item of lista)
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
			
			total_subpagamento += item.oferta.preco * item.quantidade;
		}
		html = html.concat("<p class=\"f3_2_subtotal_pagamento\">Total: <b>" + total_subpagamento.toFixed(2) + "€</b></p>");
		ultimo_separador++;
		html = html.concat("<hr class=\"f3_2_separador\" id=f3_2_separador_" + ultimo_separador + ">");
		numero_pagamento--;
	}
	
	$("#f3_2_lista_pagos").html(html);
	if (ultimo_separador != -1)
	{
		$("#f3_2_separador_" + ultimo_separador).hide();
	}
}

// Temporário, depois são movidos para pedidos_pagos de pedidos.js
var pedidos_a_pagar = []

function f3_2_checkbox(element)
{
	if (element.checked)
	{
		var index = pedidos_a_pagar.indexOf(parseInt(element.value));
		if(index < 0) {
			pedidos_a_pagar.push(parseInt(element.value));
		}
	}
	else
	{
		var index = pedidos_a_pagar.indexOf(parseInt(element.value));
		if(index > -1) {
			pedidos_a_pagar.splice(index, 1);
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
	checkboxes = document.getElementsByName("f3_2_pedidos");
	for (var item of checkboxes)
	{
		item.checked = f3_selecionar_tudo.checked;
		f3_2_checkbox(item);
	}
}

function f3_2_desenhar_total()
{
	var total_parte = 0;
	for (var id of pedidos_a_pagar)
	{
		var item = get_pedido_entregue(id);
		total_parte += item.quantidade * item.oferta.preco;
	}
	totais = get_total_pagamento();
	$("#f3_2_total_selecionado").html("<b>Total:</b> " + total_parte.toFixed(2)
		+ "€ de " + totais[1].toFixed(2) + "€ (pago: " + totais[0].toFixed(2) + "€)");
}

function f3_2_carregar_checkboxes()
{
	for (var id of pedidos_a_pagar)
	{
		document.getElementById("checkbox_pagamento_" + id).checked = true;
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
	}, 1500);
}
