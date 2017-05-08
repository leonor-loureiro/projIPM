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
	pedidos_a_pagar = [];
	$("#loaded").load("f3_2.html", function() {
		if (f3_pagamento_comecado)
		{
			$("#botao_f3_2_retroceder").hide();
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
	$("#loaded").load("f3_3.html");
}

function f3_3_retroceder()
{
	if (f3_3_voltar_para_f3_1)
	{
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
	$("#loaded").load("f3_4.html");
	f3_modo_de_pagamento = modo_de_pagamento;
}

function f3_4_retroceder()
{
	f3_3(f3_3_voltar_para_f3_1);
}

function f3_5()
{
	f3_pagamento_comecado = true;
	for (var id of pedidos_a_pagar)
	{
		mover_pedido_entregue_para_pago(id);
	}
	if (existem_itens_por_pagar())
	{
		f3_2();
	}
	else
	{
		$("#loaded").load("f3_5.html");
	}
}

function f3_5_concluir()
{
	window.location.reload(false);
}

function f3_6()
{
	$("#loaded").load("f3_6.html");
}

function f3_6_concluir()
{
	window.location.reload(false);
}

function f3_2_desenhar()
{
	template = `<input type="checkbox" name="f3_2_pedidos" value=%d onchange="f3_2_checkbox(this)"><b>%s€</b>: %s%s</br>`;
	
	var html = "";
	for (var item of get_pedidos_entregues().slice().reverse())
	{
		var mult = "";
		if (item.quantidade > 1)
		{
			mult = String(item.quantidade) + "× ";
		}
		
		html = html.concat(sprintf(template,
			item.id,
			(item.oferta.preco * item.quantidade).toFixed(2),
			mult, item.oferta.nome
		));
	}
	
	$("#f3_2_lista_checkboxes").html(html);
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
	$("#f3_2_total_selecionado").html("Total: " + total_parte.toFixed(2)
		+ "€ de " + totais[1].toFixed(2) + "€ (pago: " + totais[0].toFixed(2) + "€)");
}
