var pedidos = [];
var id_counter = 0;
var pedidos_em_espera = [];
var pedidos_em_preparacao = [];
var pedidos_entregues = [];
var pedidos_pagos = [];

function adicionar_pedido(_tipo, _id, _personalizacoes, _quantidade, onde=pedidos) {
	if (_personalizacoes == null)
	{
		_personalizacoes = ["f1_checkbox_personalizacao_0", "f1_checkbox_personalizacao_1"];
	}
	else
	{
		_personalizacoes = _personalizacoes.sort();
	}
	
	var index = onde.map(function(e) { return String(e.oferta.tipo) + String(e.oferta.id) + String(e.personalizacoes) }).indexOf(String(_tipo) + String(_id) + String(_personalizacoes));
	
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
			personalizacoes: _personalizacoes, tempo: oferta.informacoes.tempo
		};
		id_counter += 1;
		onde.push(pedido);
	}
	// Adicionar a pedido existente
	else
	{
		onde[index].quantidade += _quantidade;
	}
	
	marcar_img_f2();
	marcar_img_f3();
}

function remover_pedido(_id, quantidade=1) {

	var index = pedidos.map(function(e) { return e.id; }).indexOf(_id);

	if (quantidade != null && index > -1 && pedidos[index].quantidade > quantidade){
		pedidos[index].quantidade -= quantidade;
	}
	else if(quantidade == null || index > -1){
		pedidos.splice(index, 1);
	}
	
	marcar_img_f2();
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

function remover_pedido_em_espera(_id, quantidade=1) {

	var index = pedidos_em_espera.map(function(e) { return e.id; }).indexOf(_id);

	if (quantidade != null && index > -1 && pedidos_em_espera[index].quantidade > quantidade){
		pedidos_em_espera[index].quantidade -= quantidade;
	}
	else if(quantidade == null || index > -1){
		pedidos_em_espera.splice(index, 1);
	}
	
	marcar_img_f3();
}

function remover_pedido_em_preparacao(_id, quantidade=1) {

	var index = pedidos_em_preparacao.map(function(e) { return e.id; }).indexOf(_id);

	if (quantidade != null && index > -1 && pedidos_em_preparacao[index].quantidade > quantidade){
		pedidos_em_preparacao[index].quantidade -= quantidade;
	}
	else if(quantidade == null || index > -1){
		pedidos_em_preparacao.splice(index, 1);
	}
}

function remover_pedido_entregue(_id, quantidade=1) {

	var index = pedidos_entregues.map(function(e) { return e.id; }).indexOf(_id);

	if (quantidade != null && index > -1 && pedidos_entregues[index].quantidade > quantidade){
		pedidos_entregues[index].quantidade -= quantidade;
	}
	else if(quantidade == null || index > -1){
		pedidos_entregues.splice(index, 1);
	}
}

function get_pedido_entregue(_id) {
	var index = pedidos_entregues.map(function(e) { return e.id; }).indexOf(_id);
	return pedidos_entregues[index];
}

function get_oferta_pedido_em_espera(_id) {
	var index = pedidos_em_espera.map(function(e) { return e.id; }).indexOf(_id);
	return pedidos_em_espera[index].oferta;
}

function get_pedido_em_espera(_id) {
	var index = pedidos_em_espera.map(function(e) { return e.id; }).indexOf(_id);
	return pedidos_em_espera[index];
}

function get_personalizacoes_pedido_em_espera(_id) {
	var index = pedidos_em_espera.map(function(e) { return e.id; }).indexOf(_id);
	return pedidos_em_espera[index].personalizacoes;
}

function editar_pedido_em_espera(_id, _personalizacoes, _quantidade)
{
	var index = pedidos_em_espera.map(function(e) { return e.id; }).indexOf(_id);
	var pedido = pedidos_em_espera[index];
	if(index > -1){
		pedidos_em_espera.splice(index, 1);
		adicionar_pedido(pedido.oferta.tipo, pedido.oferta.id,
			_personalizacoes, _quantidade, pedidos_em_espera);
	}
}

function decrementar_tempo_espera(quanto=60, em_edicao=null)
{
	quanto /= 60;
	for (var item of pedidos_em_espera)
	{
		if (item.id == em_edicao)
		{
			continue;
		}
		item.tempo -= quanto;
		if (item.oferta.tipo == "carne" || item.oferta.tipo == "peixe"
			|| item.oferta.tipo == "vegetariano")
		{
			if (item.tempo <= item.oferta.informacoes.tempo / 2)
			{
				remover_pedido_em_espera(item.id, null);
				pedidos_em_preparacao.push(item);
			}
		}
		else if (item.tempo <= 0)
		{
			remover_pedido_em_espera(item.id, null);
			pedidos_entregues.push(item);
		}
	}
	for (var item of pedidos_em_preparacao)
	{
		item.tempo -= quanto;
		if (item.tempo <= 0)
		{
			remover_pedido_em_preparacao(item.id, null);
			pedidos_entregues.push(item);
		}
	}
}

function tempos_proximo_pedido_em_espera()
{
	if (pedidos_em_espera.length == 0
		&& pedidos_em_preparacao.length == 0)
	{
		return [1, 1, null];
	}
	
	var menor_pedido;
	var menor_tempo = Infinity;
	for (var item of pedidos_em_espera)
	{
		if (item.tempo < menor_tempo)
		{
			menor_pedido = item;
			menor_tempo = item.tempo;
		}
	}
	for (var item of pedidos_em_preparacao)
	{
		if (item.tempo < menor_tempo)
		{
			menor_pedido = item;
			menor_tempo = item.tempo;
		}
	}
	return [menor_tempo, menor_pedido.oferta.informacoes.tempo, menor_pedido];
}

function tempos_ultimo_pedido_em_espera()
{
	if (pedidos_em_espera.length == 0
		&& pedidos_em_preparacao.length == 0)
	{
		return [1, 1, null];
	}
	
	var maior_pedido;
	var maior_tempo = -1;
	for (var item of pedidos_em_espera)
	{
		if (item.tempo > maior_tempo)
		{
			maior_pedido = item;
			maior_tempo = item.tempo;
		}
	}
	for (var item of pedidos_em_preparacao)
	{
		if (item.tempo > maior_tempo)
		{
			maior_pedido = item;
			maior_tempo = item.tempo;
		}
	}
	return [maior_tempo, maior_pedido.oferta.informacoes.tempo, maior_pedido];
}

function get_total_pedidos_efetuados()
{
	var total = 0;
	for (var item of pedidos_em_espera)
	{
		total += item.oferta.preco * item.quantidade;
	}
	for (var item of pedidos_em_preparacao)
	{
		total += item.oferta.preco * item.quantidade;
	}
	for (var item of pedidos_entregues)
	{
		total += item.oferta.preco * item.quantidade;
	}
	return total;
}

function pode_acompanhar()
{
	return pedidos_em_espera.length > 0 || pedidos_em_preparacao.length > 0
		|| pedidos_entregues.length > 0;
}

function pode_pagar()
{
	return pedidos_em_espera.length == 0 && pedidos_em_preparacao.length == 0
		&& pedidos_entregues.length > 0;
}
