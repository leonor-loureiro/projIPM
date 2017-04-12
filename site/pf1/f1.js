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
{
	f1_info_nutricional(f1_anterior_tipo, f1_anterior_id);

}

function f1_cancelar_fazer_pedido(){
	f1_limpar_pedidos();
	f1_retroceder();
}

function f1_concluir_fazer_pedido(){
	if(id_counter==0){
		window.alert("O seu pedido está vazio!");
		return;
	}
	var result = confirm("Tem a certeza que não deseja adicionar mais nada ao pedido?");
	if(result){
		f1_retroceder();
	}
}

function f1_desenhar_pedidos() {
	var template = `
<p><img src="images/remover.svg" class="imagem_pedido_lista" onclick="remover_pedido(%d); f1_desenhar_pedidos()"> %s %s %s €
`;
	var html_pedidos = "";
	var total = 0;
	for (var item of pedidos)
	{
		if (item.personalizado === false)
		{
			html = sprintf(template,
				item.id, String(item.quantidade) + "×", item.oferta.nome,
				item.oferta.preco.toFixed(2)
			);
		}
		else
		{
			html = sprintf(template,
				item.id, String(item.quantidade) + "× <b>[P]</b>", item.oferta.nome,
				item.oferta.preco.toFixed(2)
			);
		}
		html_pedidos = html_pedidos.concat(html);
		total += item.oferta.preco * item.quantidade;
	}
	$("#lista_pedidos").html(html_pedidos);
	$("#lista_pedidos_preco_total").html("Total: " + total.toFixed(2) + "€");
}

function f1_limpar_pedidos() {
	limpar_pedidos();
	f1_desenhar_pedidos();
}
