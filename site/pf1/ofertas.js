var dados_ofertas = { bebidas: [], entradas: [], sopas: [], carne: [], peixe: [], vegetariano: [], sobremesas: [] };
var ofertas_id_counter = 0;

function f1_inserir_oferta(_tipo, _nome, _preco, _imagem, _anterior, _informacoes, _personalizacoes)
{
	 var oferta = {id: ofertas_id_counter, tipo: _tipo, nome: _nome, preco: _preco, imagem: _imagem, anterior: _anterior, informacoes: _informacoes, personalizacoes: _personalizacoes};
	ofertas_id_counter += 1;
	dados_ofertas[_tipo].push(oferta);
}

function f1_random()
{
	return Math.floor((Math.random() * 101));
}

function f1_random_tempo(min, max)
{
	return Math.floor((Math.random() * (max - 1)) + min);
}

function f1_random_preco_real(min, max)
{
	return Math.floor((Math.random() * (max - min + 1) * 2) + min * 2) / 2 - 0.01;
}

function f1_random_preco(tipo)
{
	switch(tipo)
	{
		case "bebidas":
			return f1_random_preco_real(0.5, 3);
		case "entradas":
			return f1_random_preco_real(0.5, 2);
		case "sopas":
			return f1_random_preco_real(1, 1.5);
		case "carne":
			return f1_random_preco_real(6, 15);
		case "peixe":
			return f1_random_preco_real(6, 15);
		case "vegetariano":
			return f1_random_preco_real(5, 12);
		case "sobremesas":
			return f1_random_preco_real(0.5, 2.5);
		default:
			return 99.98;
	}
}

function f1_informacoes_random(tempo_min, tempo_max)
{
	return {
		energia: f1_random(), gorduras: f1_random(), gorduras_saturadas: f1_random(),
		hidratos_carbono: f1_random(), acucares: f1_random(), proteinas: f1_random(), fibras: f1_random(), sal: f1_random(), colesterol: f1_random(),
		tempo: f1_random_tempo(tempo_min, tempo_max)};
}

function f1_personalizacoes_random(tipo)
{
	switch(tipo)
	{
		case "carne":
			return { acompanhamentos: ["Batatas fritas", "Batatas cozidas", "Arroz", "Salada Mista"], extras: ["Azeite", "Vinagre", "Ketchup", "Maionese", "Mostarda"] };
		case "peixe":
			return { acompanhamentos: ["Batatas cozidas", "Arroz", "Salada Mista"], extras: ["Azeite", "Vinagre", "Ketchup", "Maionese", "Mostarda"] };
		case "vegetariano":
			return { acompanhamentos: ["Batatas fritas", "Batatas cozidas", "Arroz", "Salada Mista"], extras: ["Azeite", "Vinagre", "Ketchup", "Maionese", "Mostarda"] };
		default:
			return false;
	}
}

function f1_popular_ofertas() {
	var tipos = ['bebidas', 'entradas', 'sopas', 'carne', 'peixe', 'vegetariano', 'sobremesas'];
	var nomes = {bebidas: ['Cerveja Sagres', 'Coca-Cola', 'Coca-Cola Zero', 'Fanta Laranja', 'Guaraná', 'Ice Tea Limão', 'Ice Tea Pessego', '7-up', 'Sumo de Laranja Natural', 'Vinho Tinto', 'Vinho Verde'],
				 entradas: ['Pão', 'Pão com Alho', 'Broa', 'Manteiga com Sal', 'Paté de Atum', 'Paté de Sardinha', 'Queijo de Cabra', 'Queijo de Ovelha'],
				 sopas: ['Caldo Verde', 'Canja de Galinha', 'Creme de Cenoura', 'Creme de Abóbora', 'Sopa de Espinafres', 'Sopa de Feijão', 'Sopa de Feijão Verde', 'Sopa da Pedra', 'Sopa de Tomate'],
				 carne: ['Bitoque', 'Costeletas de Porco', 'Prego no Pão', 'Frango Frito', 'Cozido à Portuguesa', 'Bife com Natas', 'Entremeada', 'Lasanha à Bolonhesa', 'Lombinhos de Porco'],
				 peixe: ['Arroz de Marisco', 'Bacalhau à Brás', 'Bacalhau com Grão', 'Bacalhau com Natas', 'Chocos Fritos', 'Dourada Grelhada', 'Filetes Panados', 'Lulas Guisadas', 'Pasteis de Bacalhau'],
				 vegetariano: ['Espetadas de Tofu e Cogumelos', 'Espetadas Vegetarianas', 'Estrogonofe de Soja', 'Gratinado de Beringela', 'Lasanha de Legumes', 'Pataniscas de Legumes', 'Quiche de Legumes', 'Risoto de Cogumelos e Bróculos', 'Rissóis de Espinhafres'],
				 sobremesas: ['Arroz Doce', 'Bolo de Bolacha', 'Bolo Brigadeiro', 'Tiramisu', 'Doce da Avó', 'Leite Creme', 'Mousse de Chocolate', 'Pudim Molotof', 'Salada de Frutas']
				};
	var imagens = {bebidas: ['cerveja_sagres.jpg','coca_cola.jpg','coca_cola_zero.jpg', 'fanta_laranja.jpg', 'guarana.jpg', 'ice_tea_limao.jpg','ice_tea_pessego.jpg', 'seven_up.jpg', 'sumo_laranja_natural.jpg', 'vinho_tinto.jpg', 'vinho_verde.jpg'],
					entradas: ['pao.jpg', 'pao_alho.jpg', 'broa.jpg', 'manteiga_com_sal.jpg', 'pate_atum.jpg', 'pate_sardinha.jpg', 'queijo_cabra.jpg', 'queijo_ovelha.jpg'],
					sopas: ['caldo_verde.jpg', 'canja_galinha.jpg', 'creme_cenoura.jpg', 'creme_abobora.jpg', 'sopa_espinafres.jpg', 'sopa_feijao.jpg', 'sopa_feijao_verde.jpg', 'sopa_pedra.jpg', 'sopa_tomate.jpg'],
					carne: ['bitoque.jpg', 'costeletas_de_porco.jpg', 'prego_no_pao.jpg', 'frango_frito.jpg', 'cozido_a_portuguesa.jpg', 'bife_com_natas_e_cogumelos.jpg', 'entremeada.jpg', 'lasanha_a_bolonhesa.jpg', 'lombinhos_de_porco.jpeg'],
					peixe: ['arroz_de_marisco.jpg', 'bacalhau_a_bras.jpg', 'bacalhau_com_grao.jpg', 'bacalhau_com_natas.jpg', 'chocos_fritos.jpg', 'dourada_grelhada.jpg', 'filetes_panados.jpg', 'lulas_guisadas.jpg', 'pasteis_de_bacalhau.jpeg'],
					vegetariano: ['espetadas_tofu.jpg', 'espetadas_vegetarianas.jpg', 'estrogonofe_soja.jpg', 'gratinado_beringelas.jpg', 'lasanha_legumes.jpg', 'pataniscas_legumes.jpg', 'quiche_legumes.jpg', 'risoto_cogumelos.jpeg', 'rissois_espinafres.jpg'],
					sobremesas: ['arroz_doce.jpg', 'bolo_bolacha.jpg', 'bolo_brigadeiro.jpg', 'tiramisu.jpg', 'doce_avo.jpg', 'leite_creme.jpg', 'mousse_chocolate.jpg', 'pudim_molotof.jpg', 'salada_frutas.jpg']
				};
	var i = 0;
	for(var tipo of tipos){
		i = 0;
		for(var nome of nomes[tipo]){
			f1_inserir_oferta(tipo,nome,f1_random_preco(tipo), 'images/ofertas/' + imagens[tipo][i], tipo, f1_informacoes_random(3, 10), f1_personalizacoes_random(tipo));
			i += 1;
		}
	}
}
f1_popular_ofertas();

function f1_desenhar_oferta(oferta)
{
	var template = `
<div class = "oferta">
	<img src='%s' class=imagem_oferta onclick="adicionar_pedido('%s', %d, %t, %d); f1_desenhar_pedidos();">
	<p>%s
	<p>Preço: %s€
	<p><button type="button" onclick="f1_info_nutricional('%s', %d);" class="btn btn-secundary btn-xs">Detalhes</button>
</div>
`;
	var html = sprintf(template,
		oferta.imagem, oferta.tipo, oferta.id, false, 1, oferta.nome,
		oferta.preco.toFixed(2), oferta.tipo, oferta.id
	);
	$(ofertas).append(html);
}

function obter_oferta(tipo, _id)
{
	var i = dados_ofertas[tipo].map(function(e) { return e.id; }).indexOf(_id);;
	return dados_ofertas[tipo][i];
}

function f1_carregar_ofertas(tipo)
{
	for (var oferta of dados_ofertas[tipo])
	{
		f1_desenhar_oferta(oferta);
	}
	
	if (isOverflowed(ofertas))
	{
		seta_esquerda.style.display = "inline";
		seta_direita.style.display = "inline";
	}
	else
	{
		seta_esquerda.style.display = "none";
		seta_direita.style.display = "none";
	}
}

function f1_info_nutricional_carregar(oferta) {
	var template = `
<div class="col-xs-4 imagem_info_col">
	<img src='%s' class=imagem_oferta>
	<h3><b>%s</b></h3>
	<h4>%s€</h4>
</div>
<div class="col-xs-4 info_nutricional">
	<table class = "table">
		<thead>
			<tr>
				<th column-span="2">Energia</th>
				<th></th>
				<th> </th>
				<th>%s kcal</th>
			</tr>
		</thead>
		<tbody>
			
			<tr>
				<th>Gorduras</th>
				<td>%sg</td>
				<th>Gorduras Saturadas</th>
				<td>%sg</td>
			</tr>
			<tr>
				<th>Hidratos de Carbono</th>
				<td>%sg</td>
				<th>Açúcares</th>
				<td>%sg</td>
			</tr>
			<tr>
				<th>Proteínas</th>
				<td>%sg</td>
				<th>Fibras</th>
				<td>%sg</td>
			</tr>
			<tr>
				<th>Sal</th>
				<td>%sg</td>
				<th>Colesterol</th>
				<td>%sg</td>
			</tr>
		</tbody>
	</table>
</div>
<div class="col-xs-4 tempo_espera">
	<img src="images/ampulheta.svg" style="width: 5vw; height: 5vw;">
	<h4><b>Tempo de espera </b><p>%s min</p></h4>
</div>
`;
	var dados = sprintf(template,
		oferta.imagem, oferta.nome, oferta.preco.toFixed(2),
		oferta.informacoes.energia, oferta.informacoes.gorduras,
		oferta.informacoes.gorduras_saturadas, oferta.informacoes.hidratos_carbono,
		oferta.informacoes.acucares, oferta.informacoes.proteinas,
		oferta.informacoes.fibras, oferta.informacoes.sal, oferta.informacoes.colesterol,
		oferta.informacoes.tempo
	);
	$("#info_produto").html(dados);
}

function f1_personalizacoes_carregar(oferta) {
	var template = `
<div class="col-xs-2 imagem_info_col">
	<p></p>
	<img src='%s' class=imagem_oferta>
	<h3><b>%s</b></h3>
	<h4>%s€</h4>
</div>
<div class="col-xs-8 acompanhamentos">
	<h3><b>Acompanhamentos:</b></h3>
	<div class="acompanhamento-container">
		%s
	</div>
</div>
<div class="col-xs-2 quantidade">
	<h3><b> Quantidade </b></h3>
		<p>
			<img src="images/minus_sign.svg" class="add_sub" onclick="f1_sub_dose()">
			<span id ="qtd">1</span> 
			<img src="images/plus_sign.svg" class="add_sub" onclick="f1_add_dose()">
		</p>
</div>
`;

var template_acompanhamento = `
<div class="items col-xs-5 col-sm-5 col-md-3 col-lg-3">
	<div class="info-block block-info clearfix">
        <div class="square-box pull-left"></div>
        <div data-toggle="buttons" class="btn-group bizmoduleselect">
        	<label class="btn btn-default %s">
           		<div class = "bizcontent">
            		<input type="checkbox" name="var_id[]" autocomplete="off" value="">
            		<span class = "glyphicon glyphicon-ok glyphicon-lg"></span>
            		<h5><b>%s</b></h5>
            	</div>
        	</label>
        </div>
	</div>
</div>
`;


	var acompanhamentos = "";
	for (var item of oferta.personalizacoes.acompanhamentos)
	{
		acompanhamentos = acompanhamentos.concat(sprintf(template_acompanhamento,"active",
			item
		));
	}
	for (var item of oferta.personalizacoes.extras)
	{
		acompanhamentos = acompanhamentos.concat(sprintf(template_acompanhamento,"",
			item
		));
	}
	
	
	var dados = sprintf(template,
		oferta.imagem, oferta.nome, oferta.preco.toFixed(2),
		acompanhamentos
	);
	$("#personalizacoes").html(dados);
}
