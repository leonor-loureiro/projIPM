var pedidos = [];
var id_counter = 0;
var pedidos_em_espera;
var pedidos_em_preparacao;
var pedidos_entregues;

function adicionar_pedido(_tipo, _id, _personalizacoes, _quantidade) {
	if (_personalizacoes == null)
	{
		_personalizacoes = ["f1_checkbox_personalizacao_0", "f1_checkbox_personalizacao_1"];
	}
	else
	{
		_personalizacoes = _personalizacoes.sort();
	}
	
	var index = pedidos.map(function(e) { return String(e.oferta.tipo) + String(e.oferta.id) + String(e.personalizacoes) }).indexOf(String(_tipo) + String(_id) + String(_personalizacoes));
	
	// Novo pedido
	if (index < 0)
	{
		var personalizado = true;
		if (_personalizacoes.length == 2
			&& _personalizacoes[0] == "f1_checkbox_personalizacao_0"
			&& _personalizacoes[1] == "f1_checkbox_personalizacao_1")
		{
			personalizado = false;
		}
		
		var oferta = obter_oferta(_tipo, _id);
		var pedido = { id: id_counter, oferta: oferta,
			personalizado: personalizado, quantidade: _quantidade,
			personalizacoes: _personalizacoes
		};
		id_counter += 1;
		pedidos.push(pedido);
	}
	// Adicionar a pedido existente
	else
	{
		pedidos[index].quantidade += _quantidade;
	}
	
	pedidos_vazio = false;
}

function remover_pedido(_id) {

	var index = pedidos.map(function(e) { return e.id; }).indexOf(_id);

	if (index > -1 && pedidos[index].quantidade > 1){
		pedidos[index].quantidade-=1;
	}
	else if(index > -1){
		pedidos.splice(index, 1);
	}
}

// Usar f1_limpar_pedidos() se a trabalhar na f1
function limpar_pedidos() {
	// http://stackoverflow.com/a/1232046
	pedidos.splice(0, pedidos.length);
}

function pedidos_estao_vazios() {
	return pedidos.length == 0;
}

function get_pedidos() {
	return pedidos;
}

function get_pedido(_id) {
	var index = pedidos.map(function(e) { return e.id; }).indexOf(_id);
	return pedidos[index];
}

function get_oferta_pedido(_id) {
	var index = pedidos.map(function(e) { return e.id; }).indexOf(_id);
	return pedidos[index].oferta;
}

function get_personalizacoes_pedido(_id) {
	var index = pedidos.map(function(e) { return e.id; }).indexOf(_id);
	return pedidos[index].personalizacoes;
}

function editar_pedido(_id, _personalizacoes, _quantidade)
{
	var index = pedidos.map(function(e) { return e.id; }).indexOf(_id);
	var pedido = pedidos[index];
	if(index > -1){
		pedidos.splice(index, 1);
		adicionar_pedido(pedido.oferta.tipo, pedido.oferta.id, _personalizacoes, _quantidade);
	}
}

function concluir_pedido()
{
	pedidos_em_espera = pedidos_em_espera.concat(pedidos.splice(0));
	limpar_pedidos();
}

function get_pedidos_em_espera() {
	return pedidos_em_espera;
}

function get_pedidos_em_preparacao() {
	return pedidos_em_preparacao;
}

function get_pedidos_entregues() {
	return pedidos_entregues;
}

function remover_pedido_em_espera(_id) {

	var index = pedidos_em_espera.map(function(e) { return e.id; }).indexOf(_id);

	if (index > -1 && pedidos_em_espera[index].quantidade > 1){
		pedidos_em_espera[index].quantidade-=1;
	}
	else if(index > -1){
		pedidos_em_espera.splice(index, 1);
	}
}

function TESTING_dup_espera()
{
	pedidos_em_espera = pedidos.splice(0);
	limpar_pedidos();
}

function TESTING_dup_preparacao()
{
	pedidos_em_preparacao = pedidos.splice(0);
	limpar_pedidos();
}

function TESTING_dup_entregues()
{
	pedidos_entregues = pedidos.splice(0);
	limpar_pedidos();
}
