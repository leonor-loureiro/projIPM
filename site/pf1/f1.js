function f1_ofertas(tipo) {
	$("#loaded").load("f1_2.html", function()
	{
		f1_carregar_ofertas(tipo);
	});
	$("#prato_decor").load("f1_tipos_pratos.html");
	$("#area_direita").load("f1_pedido.html");
}

function adicionar_oferta(nome, preco, imagem, anterior, informacoes)
{
	$(ofertas).append('<div class = "oferta">\
	<div class="imagem_oferta imagem_teste" onclick=" \
	adicionar_pedido(\'' + nome + '\', 12.98, \'images/' + imagem +'\'); \
	desenhar_pedidos();" ></div>' + nome + '<p>Preço: ' + preco.toFixed(2) + '€\
	<p><button type="button" onclick="\
	f1_info_nutricional(\'' + informacoes + '\', \'' + anterior + '\', \'' + nome + '\', 12.98, \'images/' + imagem +'\') \
	" class="btn btn-secundary  btn-xs">Detalhes</button></div>');
}

function ofertas_mover_esquerda() {
	document.getElementById("ofertas").scrollLeft -= 256;
}

function ofertas_mover_direita() {
	document.getElementById("ofertas").scrollLeft += 256;
}

var f1_anterior = "";
var f1_nome = "";
var	f1_preco = "";
var f1_imagem = "";
var f1_nutricional= "";
function f1_info_nutricional(info_produto, anterior, nome, preco, imagem) {
	f1_anterior = anterior;
	f1_nome = nome;
	f1_preco = preco;
	f1_imagem = imagem;
	f1_nutricional = info_produto;
	$("#loaded").load("f1_3.html", function()
	{
		$("#info_produto").load(info_produto);
	});
	$("#prato_decor").html("");
	$("#area_direita").load("f1_pedido.html");
}

function def3_retroceder()
{
	f1_ofertas(f1_anterior);
}

function def3_adicionar_pedido()
{
	adicionar_pedido("f1_nome", 12,98, "images/info.svg");
	desenhar_pedidos();
}


var qtd = 1;
function f1_personalizar(info_produto) {
	qtd = 1;
	$("#loaded").load("f1_4.html", function()
	{
		$("#personalizacoes").load(info_produto);
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

function def4_retroceder()
{
	f1_info_nutricional(f1_nutricional, f1_anterior, f1_nome, f1_preco, f1_imagem);
}
