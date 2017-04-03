function f1_carregar_ofertas(tipo)
{
	switch(tipo)
	{
		case "bebidas":
			for (i = 0; i < 16; i++)
			{
				adicionar_oferta("Bebida", 12.98, "comida_bebidas.svg", "bebidas", "f1_3_placeholder.html");
			}
			break;
		case "entradas":
			for (i = 0; i < 16; i++)
			{
				adicionar_oferta("Entrada", 12.98, "comida_entradas.svg", "entradas", "f1_3_placeholder.html");
			}
			break;
		case "sopas":
			for (i = 0; i < 16; i++)
			{
				adicionar_oferta("Sopa", 12.98, "comida_sopas.svg", "sopas", "f1_3_placeholder.html");
			}
			break;
		case "carne":
			for (i = 0; i < 16; i++)
			{
				adicionar_oferta("Carne", 12.98, "comida_carne.svg", "carne", "f1_3_placeholder.html");
			}
			break;
		case "peixe":
			for (i = 0; i < 16; i++)
			{
				adicionar_oferta("Peixe", 12.98, "comida_peixe.svg", "peixe", "f1_3_placeholder.html");
			}
			break;
		case "vegetariano":
			for (i = 0; i < 16; i++)
			{
				adicionar_oferta("Vegetal", 12.98, "comida_vegetariano.svg", "vegetariano", "f1_3_placeholder.html");
			}
			break;
		case "sobremesas":
			for (i = 0; i < 16; i++)
			{
				adicionar_oferta("Sobremesa", 12.98, "comida_sobremesas.svg", "sobremesas", "f1_3_placeholder.html");
			}
			break;
	}
}
