function f3_2()
{
	$("#loaded").load("f3_2.html");
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
	$("#loaded").load("f3_5.html");
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
