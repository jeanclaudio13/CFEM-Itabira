var xmlHttp;
var msgErro;
var meuHost = window.location.host;
var meuHost2 = location.pathname;
var nomeAplicacaoDWS = "pronimtb";
var servidorUnico = false;
var reestruturacao = false;
var siafic = false;
var valResultadoPesquisa = "";


// 363871 - Pronim TB - Textos de negativas. (Demanda legal)
function msnTipoDespesa() {

    $.ajax({
        type: "GET",
        global: false,
        url: "../acao.asp",
        data: "acao=BuscaTipoDespesas",
        dataType: "json",
        async: false,
        cache: false,
        success: function (jdados) {

            var dado = jdados.Dados[0];
            var tipoDespesa = dado.text;
            var msgTipoDespesa = $(".msgTipoDespesa");

            if (tipoDespesa == "6") {
                $(".msgTipoDespesa").val("");
                $(".msgTipoDespesa").append("Nesta opção é possível consultar as Despesas de Diárias e Passagens, caso habilitado. Não fazemos uso do(s) procedimento(s) administrativo(s) ADIANTAMENTO DE VIAGEM.");
            }
            else if (tipoDespesa == "5") {
                $(".msgTipoDespesa").val("");
                $(".msgTipoDespesa").append("Nesta opção é possível consultar as Despesas de Diárias e Passagens, caso habilitado. Não fazemos uso do(s) procedimento(s) administrativo(s) PASSAGENS.");
            }
            else if (tipoDespesa == "4") {
                $(".msgTipoDespesa").val("");
                $(".msgTipoDespesa").append("Nesta opção é possível consultar as Despesas de Diárias e Passagens, caso habilitado. Não fazemos uso do(s) procedimento(s) administrativo(s) DIÁRIAS.");
            }
            else if (tipoDespesa == "3") {
                $(".msgTipoDespesa").val("");
                $(".msgTipoDespesa").append("Nesta opção é possível consultar as Despesas de Diárias e Passagens, caso habilitado. Não fazemos uso do(s) procedimento(s) administrativo(s) DIÁRIAS e PASSAGENS.");
            }
            else if (tipoDespesa == "2") {
                $(".msgTipoDespesa").val("");
                $(".msgTipoDespesa").append("Nesta opção é possível consultar as Despesas de Diárias e Passagens, caso habilitado. Não fazemos uso do(s) procedimento(s) administrativo(s) DIÁRIAS e ADIANTAMENTO DE VIAGEM.");
            }
            else if (tipoDespesa == "1") {
                $(".msgTipoDespesa").val("");
                $(".msgTipoDespesa").append("Nesta opção é possível consultar as Despesas de Diárias e Passagens, caso habilitado. Não fazemos uso do(s) procedimento(s) administrativo(s) PASSAGENS e ADIANTAMENTO DE VIAGEM.");
            }

        },
        error: function (jerro) {
            $(".msgTipoDespesa").val("");
            $(".msgTipoDespesa").append("Nesta opção é possível consultar as Despesas de Diárias e Passagens.");
        }
    });
}



if (!$.fn.on) {
    $.fn.on = function (ev, data, action) {
        this.live(ev, data, action);
    }
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function MostraTela(id) {
    if (document.getElementById(id).style.display == 'block')
        document.getElementById(id).style.display = 'none';
    else
        document.getElementById(id).style.display = 'block';
}

function mudar_cor_over(celula) {
    //celula.style.backgroundColor = "#C3C3C3";
}

function mudar_cor_out(celula, cor) {
    //celula.style.backgroundColor = cor;
}

function OpcaoMenu(acaoMenu, itemMenu) {
    document.getElementById('hndAcao') = acaoMenu;
    document.getElementById('hndItem') = itemMenu;
}

function MudaCorObjeto_In(nome) {
    document.getElementById(nome).style.backgroundColor = '#F5F5F5';
}

function MudaCorObjeto_Out(nome) {
    document.getElementById(nome).style.backgroundColor = '#FFFFFF';
}

function formataData(campo) {
    var valor = $(campo).val();
    valor = valor.replace(/\D/g, "")                             //Remove tudo o que não é dígito
    valor = valor.replace(/^(\d{2})(\d)/, "$1/$2")               //Coloca uma barra entre o segundo e o terceiro dígitos
    valor = valor.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")   //Coloca uma barra entre o quarto e o quinto dígitos
    if (valor.length > 10) {
        valor = valor.substring(0, 10);
    }
    $(campo).val(valor);
}

function validaData(campo, opcional) {
    var retorno = true;
    var valor = $(campo).val();

    if (valor.length >= 10) {

        if (opcional && valor == "") { retorno = true; }

        if (retorno && valor != "") { retorno = isDate(valor); }

        if (!retorno) {
            alert("A data informada é inválida.");
            document.getElementById(campo.id).value = ""
            document.getElementById(campo.id).focus();
        }
    }
    return retorno;
}

function validaDataProibeCampoVazio(campo, opcional) {
    var retorno = true;
    var valor = $(campo).val();

    validaData(campo);

    if (valor.length == 0 || valor.length != 10) {
        document.getElementById(campo.id).value = "";
        document.getElementById(campo.id).focus();
        //document.getElementById('mensagemDataSpan').style = "color: red;";
        retorno = false;
    }

    return retorno;
}


function isDate(pDate) {
    var currVal = pDate;
    if (currVal == '')
        return false;

    //Declare Regex
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    dtDay = dtArray[1];
    dtMonth = dtArray[3];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}

function validaEntidadeCalamidade(Entidade) {
    msgErro = "";
    if (Entidade == "" || Entidade == null) {
        msgErro = "Não existem dados a serem consultados!";
    }
    return msgErro;
}

function validaDataInicialFinal(idDataInicial, idDataFinal, obrigatorio, validaPeriodo) {
    //msgErro = "";
    if ($("#" + idDataInicial).val() != "" ||
        $("#" + idDataFinal).val() != "") {
        if ($("#" + idDataInicial).val() == "") {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += "Favor informar a data inicial.";
        }
        else {
            if ($("#" + idDataInicial).val().length != 10) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar uma data inicial válida.";
            }
        }
        if ($("#" + idDataFinal).val() == "") {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += "Favor informar a data final.";
        }
        else {
            if ($("#" + idDataFinal).val().length != 10) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar uma data final válida.";
            }
        }
        if (msgErro == "") {
            //new Date(year, month, day, hours, minutes, seconds, milliseconds)
            //O mês inicia em zero
            var auxData = $("#" + idDataInicial).val().split('/');
            var dataInicial = new Date(auxData[2], auxData[1] - 1, auxData[0]);

            //new Date(year, month, day, hours, minutes, seconds, milliseconds)
            //O mês inicia em zero
            auxData = $("#" + idDataFinal).val().split('/');
            var dataFinal = new Date(auxData[2], auxData[1] - 1, auxData[0]);

            if (dataFinal < dataInicial) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "A Data Final não pode ser menor que a Data Inicial.";
            }
            else {
                if (dataInicial.getFullYear() < 1900) {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro = "Informe um período válido.";
                }
                else {
                    if (typeof validaPeriodo == "undefined") {
                        validaPeriodo = true;
                    }
                    if (validaPeriodo) {
                        if (dataFinal.getFullYear() != dataInicial.getFullYear()) {
                            if (msgErro != "") { msgErro += "\n\n"; }
                            msgErro += "Apenas são permitidas consultas no mesmo exercício.";
                        }
                    }
                }
            }
        }
    }
    else {
        if (obrigatorio) {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += "Favor informar um período.";
        }

    }

    return msgErro;
}

function formataCPFCNPJ(campo) {
    var valor = $(campo).val();
    valor = valor.replace(/\D/g, "") //Remove tudo o que não é dígito

    if (valor.length > 11) {
        //CNPJ
        valor = valor.replace(/^(\d{2})(\d)/, "$1.$2") //Coloca ponto entre o segundo e o terceiro dígitos
        valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
        valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2") //Coloca uma barra entre o oitavo e o nono dígitos
        valor = valor.replace(/(\d{4})(\d)/, "$1-$2") //Coloca um hífen depois do bloco de quatro dígitos
    }
    else {
        //CPF
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
    }
    if (valor.length > 18) {
        valor = valor.substring(0, 18);
    }
    $(campo).val(valor);
}

function validaCPF(cpf) {
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11) {
        return false;
    }
    for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    }
    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--) {
            soma += numeros.charAt(10 - i) * i;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            return false;
        }
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--) {
            soma += numeros.charAt(11 - i) * i;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            return false;
        }
        return true;
    }
    else {
        return false;
    }
}

function ConsultaUf(prParam1) {
    var params = "";

    if ($("#" + prParam1).val() != "") {

        // validação campo #1
        if ($("#" + prParam1) && $("#" + prParam1).val() != "") {
            params += "&param1=" + $("#" + prParam1).val();
        }
        // chamada ajax
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=RetornaUfPrefeitura" + replaceAll(params, "/", "|"),
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            document.getElementById('trChamamentoCredenciamento').style.visibility = "visible";
                        }
                    }
                }
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }
}


function alteraTXTDiariasPassagens() {
    var valor = $("#cmbDiariasPassagens").val();
    if (valor == 0) {
        $("#TBiframe").contents().find("p").text("");
    };
    if (valor == 1) {
        $("#TBiframe").contents().find("p").text("As diárias são despesas orçamentárias com cobertura de alimentação, pousada e locomoção urbana, do servidor público estatutário ou celetista que se desloca de sua sede em objeto de serviço, em caráter eventual ou transitório, entendido como sede o Município onde a repartição estiver instalada e onde o servidor tiver exercício em caráter permanente.");
    };
    if (valor == 2) {
        $("#TBiframe").contents().find("p").text("Nesta opção são consideradas as despesas orçamentárias, realizadas diretamente ou por meio de empresa contratada, com aquisição de passagens (aéreas, terrestres, fluviais ou marítimas), taxas de embarque, seguros, fretamento, pedágios, locação ou uso de veículos para transporte de pessoas e suas respectivas bagagens, inclusive quando decorrentes de mudanças de domicílio no interesse da administração.");
    };
    if (valor == 3) {
        $("#TBiframe").contents().find("p").text("O adiantamento caracteriza-se pela concessão de um valor (considerando os limites previstos em lei) ao agente público, para realização de despesas de pronto pagamento, com a prestação de contas ocorrendo posteriormente.");
    };
    if (valor == 0 || valor == "") {
        $("#TBiframe").contents().find("p").text("");
    };
}

function alteraTXTTipoTransferencia() {
    var valor = $("#cmbTipoTransferencia").val();
    if (valor == 41) {
        $("#TBiframe").contents().find("p").text("Contribuições: Despesas orçamentárias às quais não correspondam contraprestação direta em bens e serviços e não sejam reembolsáveis pelo recebedor, inclusive as destinadas a atender a despesas de manutenção de outras entidades de direito público ou privado, observado o disposto na legislação vigente.");
    };
    if (valor == 42) {
        $("#TBiframe").contents().find("p").text("Auxílios: Despesas orçamentárias destinadas a atender a despesas de investimentos ou inversões financeiras de outras esferas de governo ou de entidades privadas sem fins lucrativos, observado, respectivamente, o disposto nos artigos 25 e 26 da Lei de Responsabilidade Fiscal.");
    };
    if (valor == 43) {
        $("#TBiframe").contents().find("p").text("Subvenções Sociais: Despesas orçamentárias para cobertura de despesas de instituições privadas de caráter assistencial ou cultural, sem finalidade lucrativa, de acordo com os artigos. 16, parágrafo único, e 17 da Lei nº 4.320/1964, observado o disposto no artigo 26 da Lei de Responsabilidade Fiscal.");
    };
    if (valor == 45) {
        $("#TBiframe").contents().find("p").text("Subvenções Econômicas: Despesas orçamentárias com o pagamento de subvenções econômicas, a qualquer título, autorizadas em leis específicas, tais como: ajuda financeira a entidades privadas com fins lucrativos; concessão de bonificações a produtores, distribuidores e vendedores; cobertura, direta ou indireta, de parcela de encargos de empréstimos e financiamentos e dos custos de aquisição, de produção, de escoamento, de distribuição, de venda e de manutenção de bens, produtos e serviços em geral; e, ainda, outras operações com características semelhantes.");
    };
    if (valor == 0 || valor == "") {
        $("#TBiframe").contents().find("p").text("");
    };
}

function alteraTXTOrigemRecurso() {
    var valor = $("#cmbOrigemRecurso").val();
    if (valor == 1) {
        $("#TBiframe").contents().find("p").text("Recursos da União: São os valores repassados da esfera federal para a entidade.");
    };
    if (valor == 2) {
        $("#TBiframe").contents().find("p").text("Recursos do Estado: São os valores repassados da esfera estadual para a entidade.");
    };
    if (valor == 3) {
        $("#TBiframe").contents().find("p").text("Outros: São os valores repassados de outras esferas ou outras entidades.");
    };
    if (valor == 0 || valor == "") {
        $("#TBiframe").contents().find("p").text("");
    };
}

function textogp() {
    var valor = $("#cmbVinculoGP").val();
    if (valor == 0 || valor == "") {
        $("#TBiframe").contents().find("p").text("Lista todos os Servidores em atividade.");
    };
    if (valor == 1) {
        $("#TBiframe").contents().find("p").text("Servidor efetivo é aquele aprovado em concurso público, mantendo relação com a administração por tempo indeterminado.");
    };
    if (valor == 2) {
        $("#TBiframe").contents().find("p").text("Servidor comissionado é aquele nomeado para o exercício de função de direção, chefia e assessoramento, sem a necessidade de aprovação prévia em concurso público.");
    };
    if (valor == 3) {
        $("#TBiframe").contents().find("p").text("Servidor cedido/recebido é aquele requisitado para trabalhar em local diferente do seu órgão de origem.");
    };
    if (valor == 4) {
        $("#TBiframe").contents().find("p").text("Servidor cedido é aquele requisitado para trabalhar em local diferente do seu órgão de origem.");
    };
    if (valor == 5) {
        $("#TBiframe").contents().find("p").text("Servidor recebido é aquele requisitado para trabalhar em local diferente do seu órgão de origem.");
    };
    if (valor == 6) {
        $("#TBiframe").contents().find("p").text("Estagiário é o aluno matriculado e que esteja frequentando curso vinculado ao ensino em escola pública e/ou privado que desenvolve, no serviço público, atividades relacionadas à sua área de formação profissional.");
    };
    if (valor == 7) {
        $("#TBiframe").contents().find("p").text("Servidor temporário é aquele contratado por tempo determinado para atender à necessidade temporária de exepcional interesse público.");
    };
    if (valor == 8) {
        $("#TBiframe").contents().find("p").text("Agente político.");
    };
    if (valor == "") {
        $("#TBiframe").contents().find("p").text("");
    };
}

function MinMaxTeste(divID) {
    $("#" + divID).find("tr").each(function (index) {
        if (index > 0) {
            var child = $(this);
            if (child.css("display") == "none") {
                child.show();
            }
            else {
                child.hide();
            }
        }
    });
}

function retiraAcento(obj) {
    com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ';
    sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
    nova = '';
    for (i = 0; i < obj.length; i++) {
        if (com_acento.search(obj.substr(i, 1)) >= 0) {
            nova += sem_acento.substr(com_acento.search(obj.substr(i, 1)), 1);
        }
        else {
            nova += obj.substr(i, 1);
        }
    }
    return nova.toUpperCase();
}

function reestruturacaoIframe(reestruturacao, siafic) {
    document.getElementById('linhaRodape').style.visibility = "hidden";
    document.getElementById('linhaTopo').style.visibility = "hidden";
    document.getElementById('menu').style.visibility = "hidden";
    document.getElementById('topo').style.visibility = "hidden";
    document.getElementById('pesquisaTopo').style.visibility = "hidden";

    $("#formulario").css("background", "white");
    $("#menu").remove();
    $("#topo").remove();
    $(".rodapeLegado").css("color", "white");
    $(".rodapeLegado a").css("color", "white");

    if (reestruturacao) {
        sessionStorage.setItem('CookiesReestruturacao', 'reestruturacao');
        reestruturacao = true;
    }
    if (siafic) {
        sessionStorage.setItem('CookiesSiafic', 'siafic');
        siafic = true;
    }
}

function verificaLocalStorage() {
    reestruturacao = false;
    siafic = false;
}

function readCookie(name) {
    return window.localStorage.getItem(name);
}

function eraseCookie(name) {
    var auxLocal = readCookie(name);
    if (auxLocal !== null) {
        window.storage.removeItem(name);
    }
}

function limparCookies() {
    localStorage.clear();
}

$(document).ready(function () {
    // Nome dinamico da aplicação epla URL ===================================================================================

    var url = window.location.href;

    //Verifica se é para Gerar menu objJson

    verificaChamadaGeraMenuJSON(url);
    if (retornogeradorMenu === true) {
        montaObjItensMenuPeloMapaSite();
    }

    // Fim 

    var urls = url.split("/");
    var urlsReestruturacao = url.split("&");

    for (var i = 0; i < urls.length; i++) {

        if (i == 3) {
            if (urls[i] === "index.asp") {
                nomeAplicacaoDWS = "pronimtb";
            } else {
                nomeAplicacaoDWS = urls[i];
                servidorUnico = true;
            }

        } else {
            if (!servidorUnico) {
                nomeAplicacaoDWS = "pronimtb";
            }
        }

    }
    for (var i = 0; i < urlsReestruturacao.length; i++) {
        if (urlsReestruturacao[i] === "reestruturacao") {
            reestruturacao = true;
        }
        if (urlsReestruturacao[i] === "siafic") {
            siafic = true;
        }
    }

    if (sessionStorage.getItem("CookiesReestruturacao") === "reestruturacao") {
        reestruturacao = true;
    }

    if (sessionStorage.getItem("CookiesSiafic") === "siafic") {
        reestruturacaoIframe(false, true);
        siafic = false;
    }   

    if (reestruturacao) {
        reestruturacaoIframe(true, false);
    }
    else if (siafic) {        
        reestruturacaoIframe(false, true);
        jAlert('Você foi redirecionado para essa página, onde será possível filtrar as informações de uma ou mais entidades. Devido ao SIAFIC(Sistema Único e Integrado de Execução Orçamentária, Administração Financeira e Controle), os dados da entidade ficam disponibilizados juntamente ao portal de transparência da prefeitura.', 'Atenção');
    } else {
        verificaLocalStorage();
    }

    // Fim do nome dinamico da aplicação epla URL =============================================================================


    menuFavoritos()

    if (($("#hndAcao").val() == null)) {
    }
    else {

        //document.getElementById("btExportarPDF").onclick = function (e) {
        //    exportarPDF();
        //    e.preventDefault();
        //}

        validaProdutosInstalados();

        var exportXML = $('#hndItemExporta').val();

        document.getElementById('imprimirPDF').style.visibility = "hidden";
        document.getElementById('exportarXML').style.visibility = "hidden";
        document.getElementById('exportarCSV').style.visibility = "hidden";
    }

    if (($("#hndAcao").val() == 1) && ($("#hndItem").val() == 5)) {
        $("#cmbEstoqueUnidadeCM option:first").attr('selected', 'selected');
        $("#cmbEstoqueDataVigenciaLC option:first").attr('selected', 'selected');
        $("#cmbEstoqueAlmoxarifado option:first").attr('selected', 'selected');
        $("#cmbEstoqueUnidadeGestoraLC option:first").attr('selected', 'selected');
        $("#cmbEstoqueMesInicial option:first").attr('selected', 'selected');
        $("#cmbEstoqueMesFinal option:first").attr('selected', 'selected');
        $("#cmbEstoqueTipoMovimento option:first").attr('selected', 'selected');
    }

    if (($("#hndAcao").val() == 1) && ($("#hndItem").val() == 6)) {
        $("#cmbPatrimonioUnidadePP option:first").attr('selected', 'selected');
        $("#cmbPatrimonioUnidadeGestoraLC option:first").attr('selected', 'selected');
    }
    //Frotas
    if (($("#hndAcao").val() == 1) && ($("#hndItem").val() == 7)) {
        $("#cmbFrotasUnidadeAF option:first").attr('selected', 'selected');
        $("#cmbFrotasUnidadeGestora option:first").attr('selected', 'selected');
    }
    if (($("#hndAcao").val() == 3) && ($("#hndItem").val() == 13)) {
        $('#cmbUnidadeCP').change(function () {
            consultarDadosCP('UnidadeGestoraCP', 'cmbUnidadeGestora', 'cmbUnidadeCP', this.id, 'CP_Fato_EmpenhoDespesa', 'CP_Fato_saldodespesa', 'cmbUnidadeCP');
        })
    }

    if (($("#hndAcao").val() == 3) && ($("#hndItem").val() == 19)) {
        $('#cmbUnidadeCP').change(function () {
            consultarDadosCP('UnidadeGestoraCP', 'cmbUnidadeGestora', 'cmbUnidadeCP', this.id, 'CP_Fato_EmpenhoDespesa', 'CP_Fato_saldodespesa', 'cmbUnidadeCP');
        })
    }

    // Valida se foi acionado o botão de exportação da estrutura organizacional, e exporta
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 2)) {

        function mostrarValorEstrutura() {
            downloadXMLNovo(13);
        }

        document.getElementById("exportarXML").onclick = function (e) {
            mostrarValorEstrutura();
            e.preventDefault();
        }

        document.getElementById("exportarCSV").onclick = function (e) {
            exportacaoCSV(1, 0);
            e.preventDefault();
        }

    }

    // Valida se foi acionado o botão de exportação da estrutura organizacional, e exporta
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 6)) {

        function mostrarValorEstrutura() {
            downloadXMLNovo(15);
        }

        document.getElementById("exportarXML").onclick = function (e) {
            mostrarValorEstrutura();
            e.preventDefault();
        }

        document.getElementById("exportarCSV").onclick = function (e) {
            exportacaoCSV(1, 1);
            e.preventDefault();
        }

    }

    //LC -Contratos
    if (($("#hndAcao").val() == 1) && ($("#hndItem").val() == 1)) {
        //grid contratos com.
        if ($("#ckContrato").attr("checked")) {
            $('.contratos').css('display', "");
        }
        $("#ckContrato").click(function () {
            if ($("#ckContrato").attr("checked")) {
                $('.contratos').css('display', "");
            } else {
                $('.contratos').css('display', 'none');
                $('.contratosCom input').attr("checked", false);
            }
        });


        //setar todos os tipos contratos
        $('.TipoContratoTodos').click(function () {
            if ($('.TipoContratoTodos  input').attr("checked")) {
                $('.TipoContrato input').attr("checked", true);
            } else {
                $('.TipoContrato  input').attr("checked", false);
            }
        });
        $('.TipoContrato').click(function () {
            VerificaInputChecked('TipoContrato', 'TipoContratoTodos');
        });

        //setar todos instrumentos contratual
        $('.instrumentoContratualTodos').click(function () {
            //alert('teste');
            if ($('.instrumentoContratualTodos input').attr("checked")) {
                $('.instrumentoContratual  input').attr("checked", true);
                $('.contratos').css('display', "");
            } else {
                $('.instrumentoContratual  input').attr("checked", false);
                $('.contratosComTodos  input').attr("checked", false);
                $('.contratosCom input').attr("checked", false);
                $('.contratos').css('display', 'none');
            }
        });
        $('.instrumentoContratual').click(function () {
            VerificaInputChecked('instrumentoContratual', 'instrumentoContratualTodos');
        });

        //setar todos os tipos Aditivos
        $('.contratosComTodos').click(function () {
            if ($('.contratosComTodos input').attr("checked")) {
                $('.contratosCom input').attr("checked", true);
            } else {
                $('.contratosCom input').attr("checked", false);
            }
        });
        $('.contratosCom').click(function () {
            VerificaInputChecked('contratosCom', 'contratosComTodos');
        });

    };

    function VerificaInputChecked(checked, notChecked) {
        var estado = true;
        var totalNaoChecadas = 0;
        var totalChecadas = 0;
        $.each($("." + checked + " input"), function () {
            if (!$(this).attr('checked')) {
                totalNaoChecadas++;
                estado = false
            } else {
                totalChecadas++;
            }
        });
        console.log('Não Checadas:' + totalNaoChecadas + " Checadas:" + totalChecadas + " Estado:" + estado);
        if (totalNaoChecadas != 0) {
            $("." + notChecked + " input").attr('checked', estado ? "checked" : "");
        } else {
            $("." + notChecked + " input").attr('checked', estado ? "checked" : "");
        }
    }

    // Valida se foi acionado o botão de exportação da estrutura organizacional, e exporta
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 1)) {

        function mostrarValorPerguntas() {
            downloadXMLNovo(14);
        }

        document.getElementById("exportarXML").onclick = function (e) {
            mostrarValorPerguntas();
            e.preventDefault();
        }

        document.getElementById("exportarCSV").onclick = function (e) {
            exportacaoCSV(2, 0);
            e.preventDefault();
        }
    }

    // Controle de seleção de todos (Selecionar Tudo)
    $(".todos").click(function () {

        var estado = $(this).find('input').attr('checked');
        // Selecionar todos as modalidades
        $.each($(".modalidade input"), function () {
            $(this).attr('checked', estado ? "checked" : "");
            console.log(estado);
        });

        // Selecionar todos as modalidades
        //$.each($(".finalidade input"), function () {
        //$(this).attr('checked', estado ? "checked" : "");

        //$(this).attr("disabled", estado ? "" : "disabled");
        //});
    });

    $(".todosFinalidade").click(function () {

        var estado = $(this).find('input').attr('checked');
        // Selecionar todos as modalidades
        //$.each($(".modalidade input"), function () {
        //$(this).attr('checked', estado ? "checked" : "");
        //});

        // Selecionar todos as modalidades
        $.each($(".finalidade input"), function () {
            $(this).attr('checked', estado ? "checked" : "");

            //$(this).attr("disabled", estado ? "" : "disabled");
        });
    });

    $(".modalidade").click(function () {
        var estado = true;
        var totalModalidadesNaoChecadas = 0;
        var totalModalidadesChecadas = 0;
        $.each($(".modalidade input"), function () {
            if (!$(this).attr('checked')) {
                totalModalidadesNaoChecadas++;
                estado = false
            } else {
                totalModalidadesChecadas++;
            }
        });
        console.log('Não Checadas:' + totalModalidadesNaoChecadas + " Checadas:" + totalModalidadesChecadas + " Estado:" + estado);
        if (totalModalidadesChecadas != 0) {
            $(".finalidade input").attr("disabled", "");
        } else {
            $(".finalidade input").attr("disabled", true);
            $(".finalidade input").attr("checked", "");
        }
        if (totalModalidadesNaoChecadas != 0)
            $('#ckTipoModalidadeTodos').attr('checked', estado ? "checked" : "");
    });

    $(".finalidade").click(function () {
        var estado = true;
        var totalFinalidadesNaoChecadas = 0;
        var totalModalidadesNaoChecadas = 0;
        $.each($(".modalidade input"), function () {
            if (!$(this).attr('checked')) {
                totalModalidadesNaoChecadas++;
                estado = false
            }
        });
        $.each($(".finalidade input"), function () {
            if (!$(this).attr('checked')) {
                totalFinalidadesNaoChecadas++;
                estado = false
            }
        });
        if (totalModalidadesNaoChecadas != 0 || totalFinalidadesNaoChecadas != 0)
            $('#ckTipoModalidadeTodos').attr('checked', estado ? "checked" : "");
    });


    $("h4").live("click", function () {
        var meuHost = window.location.host;
        var mudaImagem = $(this).parent().find("h4").find("img");
        $(this).parent().find("p").toggle();
        if (mudaImagem.attr('src') == "/" + nomeAplicacaoDWS + "/imagens/setaParaBaixo_nova.png") {
            mudaImagem.attr('src', "/" + nomeAplicacaoDWS + "/imagens/setaDireita.png");
        }
        else {
            mudaImagem.attr('src', "/" + nomeAplicacaoDWS + "/imagens/setaDireita.png");
        }
    });

    // Busca publicações Prestação de contas
    if ((($("#hndAcao").val() == 21) && ($("#hndItem").val() == 2)) || (($("#hndAcao").val() == 21) && ($("#hndItem").val() == 3) || (($("#hndAcao").val() == 21) && ($("#hndItem").val() == 4)) || (($("#hndAcao").val() == 21) && ($("#hndItem").val() == 5) && ($("#hndItem").val() == 6)))) {
        exibirAguarde();
        var valParametro = "";

        switch ($("#hndItem").val()) {
            case "2": {
                valParametro = 1;//13; // Prestação de Contas
            } break;
            case "3": {
                valParametro = 2;//5; // Execução Orçamentária
            } break;
            case "4": {
                valParametro = 3;//4; // Gestão Fiscal
            } break;
            case "5": {
                valParametro = 4;//12; // Lei de acesso a informação
            } break;
            case "6": {
                valParametro = 5;//12; // Lei de acesso a informação
            } break;
        }

        $.ajax({
            type: "GET",
            url: "acao.asp?acao=RetornaPublicacoesMenu&param1=" + valParametro,
            dataType: "json",
            //crossDomain: false,
            success: function (jdados) {
                var htm = "";

                htm += "<div id='geraPublicacoes' style='width: 100%; font-size: 14px; color:black !important;'>";
                htm += "<div style='width: 100%; font-size: 8px;'></div>";
                htm += "<div style='width: 100%; text-align: center;'></div>";
                htm += "<p2>";

                if (jdados.Dados.length > 0) {
                    htm += "<h1 style='display:block; font-size: 11px; padding-left: 20px;'> Total de Publicações: " + jdados.Dados.length + "</h1>";
                }

                var iTitulo = 0;
                var strNomeTema = "";

                for (var i = 0; i < jdados.Dados.length; i++) {
                    var objResult = jdados.Dados[i];


                    if (iTitulo == 0) {
                        strNomeTema = objResult.Nome_tema;

                        htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>";
                        htm += "<table id='publicacoesArquivos'>";
                        htm += "<div style='width:100%'>";

                        htm += "<h4 style='height:3px; padding-left: 20px;'><img id='image' src='/" + nomeAplicacaoDWS + "/imagens/setaParaBaixo_nova.png' width='20' height='20'><b> Tema: " + objResult.Nome_tema + "</b></h4>";


                        // htm += "<div style='font-size: 8px; width:100%; height:100%; hspace:10px;'>";
                        if (objResult.Descricao_tema != "") {
                            htm += "<p2 style='display:block; font-size: 11px; padding-left: 50px; padding-top: 10px;'> " + objResult.Descricao_tema + "</p2>";
                            htm += "</br>";
                        }
                        // htm += "</div>";

                        //htm += "<div style='width: 100%; font-size: 8px;'>&nbsp;&nbsp;&nbsp;</div>";
                        iTitulo += 1;
                    }

                    if (strNomeTema != objResult.Nome_tema) {

                        htm += "</div>";
                        htm += " </table>";

                        htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>";
                        htm += "<table id='publicacoesArquivos'>";
                        htm += "<div style='width:100%;'>";

                        htm += "<h4 style='height:3px; padding-left: 20px;'><img id='image' src='/" + nomeAplicacaoDWS + "/imagens/setaParaBaixo_nova.png' width='20' height='20'><b> Tema: " + objResult.Nome_tema + "</b></h4>";

                        // htm += "<div style='font-size: 8px; width:100%; height:100%; hspace:10px;'>";
                        if (objResult.Descricao_tema != null) {
                            htm += "<p2 style='display:block; font-size: 11px; padding-left: 50px; padding-top: 10px;'> " + objResult.Descricao_tema + "</p2>";
                            htm += "</br>";
                        }
                        //htm += "</div>";

                        // htm += "<div style='width: 100%; font-size: 8px;'>&nbsp;&nbsp;&nbsp;</div>";
                        strNomeTema = objResult.Nome_tema;

                    }

                    if (objResult.Nome_arquivo != null && objResult.Nome_arquivo != "") {
                        htm += "<p2 style='display:block; font-size: 11px; padding-left: 50px;'><b>Nome:</b>  " + objResult.Nome_arquivo + "</p2>";
                    } else {
                        htm += "<p2 style='display:block; font-size: 11px; padding-left: 50px;'><b>Nome:</b>  " + objResult.Nome_tema + " - " + objResult.NOME_RELATORIO + "</p2>";
                    }

                    if (objResult.IMG_ARQUIVO != null) {
                        htm += "<p2 style='display:block; font-size: 11px; padding-left: 50px;'>";

                        switch (objResult.ID_AREA) {
                            // DRO 353214 - 07/11/2018 - Inicio
                            case "0": {
                                htm += " Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='/" + nomeAplicacaoDWS + "/upload/Outros/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                            } break;
                            // DRO 353214 - 07/11/2018 - Fim
                            case "1": {
                                htm += " Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='/" + nomeAplicacaoDWS + "/upload/Gestao_de_Pessoal/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";
                            } break;
                            case "2": {
                                htm += " Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='/" + nomeAplicacaoDWS + "/upload/Administracao_Geral/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                            } break;
                            case "3": {
                                htm += " Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='/" + nomeAplicacaoDWS + "/upload/Arrecadacao/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                            } break;
                            case "4": {
                                htm += " Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='/" + nomeAplicacaoDWS + "/upload/Financeira/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                            } break;
                            case "5": {
                                htm += " Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='/" + nomeAplicacaoDWS + "/upload/Outros/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                            } break;
                        };


                        htm += "</p2>";

                        if (objResult.DT_VIGENCIA_INICIO != null && objResult.DT_VIGENCIA_INICIO != "") {

                            if (objResult.DT_VIGENCIA_FIM != null && objResult.DT_VIGENCIA_FIM != "") {
                                htm += "<p2 style='display:block; font-size: 11px; padding-left: 50px;'> Referência:  " + objResult.DT_VIGENCIA_INICIO + " a " + objResult.DT_VIGENCIA_FIM + "</p2>";
                            } else {
                                htm += "<p2 style='display:block; font-size: 11px; padding-left: 50px;'> Referência:  " + objResult.DT_VIGENCIA_INICIO + " a Vigente </p2>";
                            }
                        }

                        if (objResult.DS_DESCRICAO != null) {
                            htm += "<p2 style='display:block; font-size: 11px; padding-left: 50px;'> Descrição:  " + objResult.DS_DESCRICAO + "</p2>";
                        }

                        if (objResult.DT_INCLUSAOARQUIVO != null) {
                            htm += "<p2 style='display:block; font-size: 11px; padding-left: 50px;'> Data inclusão no Portal:  " + objResult.DT_INCLUSAOARQUIVO + "</p2>";
                        }


                        htm += "<p2 style='display:none; width: 50%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'>";
                        htm += "</p2>";
                        htm += "</br>";
                        htm += "</br>";
                    };
                }

                if (jdados.Dados.length == 0) {
                    htm += "<p2 style='font-size: 16px; padding-left: 20px;'><b> Não foi encontrada nenhuma publicação para a consulta selecionada! </b></p2>";
                }

                htm += " </div>";
                htm += " </table>";
                htm += " </div>";

                document.getElementById('confirma').style.display = 'none';
                document.getElementById('tamanhoTabela').style.width = '2000px !important';
                document.getElementById('linhaPublicacoesAcessoRapido').innerHTML = htm;
                exibirAguarde(false);
            },

            error: function (jerro) {
                console.log("Erro ao retornar os arquivos!");
                exibirAguarde(false);
            }
        });

    };

    // Busca Ano Cargas - Publicação
    if (($("#hndAcao").val() == 21) && ($("#hndItem").val() == 1) || ($("#hndAcao").val() == 21) && ($("#hndItem").val() == 6)) {

        $("#cmbOrdenacao").change(function () {
            if ($("#cmbOrdenacao").find('option:selected').val() == 0) {
                $('#cmbCriterioOrdenacao').attr('disabled', 'disabled');
                document.getElementById("cmbCriterioOrdenacao").value = 0;
            } else {
                $('#cmbCriterioOrdenacao').removeAttr('disabled')
            }
        });
        $("#cmbOrdenacao option:first").attr('selected', 'selected');
        $("#cmbCriterioOrdenacao option:first").attr('selected', 'selected');
        var destino = $("#cmbAnoCargasPublicacoes");
        if ((destino) && (destino.is(":visible"))) {
            limparDados("cmbAnoCargasPublicacoes");
            destino.css("background-color", "#cecece");

            destino.attr("disabled", true);
            $.ajax({
                type: "GET",
                global: false,
                url: "acao.asp",
                data: "acao=BuscaAnoCargas",
                dataType: "json",
                async: false,
                cache: false,
                success: function (jdados) {
                    limparDados("cmbAnoCargasPublicacoes");
                    if (jdados) {
                        if (jdados.Dados.length > 0) {
                            destino.removeAttr("disabled");
                            for (x = 0; x < jdados.Dados.length; x++) {
                                var dado = jdados.Dados[x];
                                var optn = document.createElement("OPTION");
                                optn.text = dado.EXERCICO_ANO;
                                optn.value = dado.EXERCICO_ANO;
                                destino.find("option").end().append("<option value='" + dado.text + "'>" + dado.text + "</option>").val("'" + dado.EXERCICO_ANO + "'");
                            };
                        }
                    }
                    destino.css("background-color", "#ffffff");
                    destino.attr("disabled", false);
                },
                error: function (jerro) {
                    alert(jerro.responseText);
                    destino.css("background-color", "#ffffff");
                }
            });
        }
    };




    if (($("#hndAcao").val() == 21) && ($("#hndItem").val() == 1) || ($("#hndAcao").val() == 21) && ($("#hndItem").val() == 6)) {
        $("#txtReferenciaDePublicacoes").blur(function () {
            //alert($('#cmbAnoCargasPublicacoes').val())

            //DRO - 361507 - 26/02/2019 - Inicio
            //if ($("#txtReferenciaDePublicacoes").val() != "") {
            //    if ($('#cmbAnoCargasPublicacoes').val() != $("#txtReferenciaDePublicacoes").val().substr(6, 10)) {
            //        alert("Ano de Referência maior que ano de Exercício.")
            //        $("#txtReferenciaDePublicacoes").focus();
            //    }
            //}

            if (!$("#cmbAnoCargasPublicacoes").is(':disabled')) {
                if ($("#txtReferenciaDePublicacoes").val() != "") {
                    if ($('#cmbAnoCargasPublicacoes').val() != $("#txtReferenciaDePublicacoes").val().substr(6, 10)) {

                        if (($("#hndAcao").val() == 21) && ($("#hndItem").val() == 6)) {
                            alert("Ano de Referência maior que ano de Exercício.")
                            $("#txtReferenciaDePublicacoes").focus();
                        }
                    }
                }
            }


            //DRO - 361507 - 26/02/2019 - Fim
        });

        //DRO - 361507 - 26/02/2019 - Inicio
        //if ($("#txtReferenciaAtePublicacoes").val() < $("#txtReferenciaDePublicacoes").val()) {
        //    alert("Referência final menor que referência inicial!")
        //    $("#txtReferenciaAtePublicacoes").focus();
        //}
        if ($("#txtReferenciaAtePublicacoes").val() !== "" && $("#txtReferenciaDePublicacoes").val() !== "") {
            if ($("#txtReferenciaAtePublicacoes").val() < $("#txtReferenciaDePublicacoes").val()) {
                alert("Referência final menor que referência inicial!")
                $("#txtReferenciaAtePublicacoes").focus();
            }
        }
        //DRO - 361507 - 26/02/2019 - Fim

        $("#txtReferenciaAtePublicacoes").blur(function () {
            if ($("#txtReferenciaAtePublicacoes").val() != "" && $("#txtReferenciaDePublicacoes").val() == "") {
                alert("Favor preencher a data inícial!")
                $("#txtReferenciaDePublicacoes").focus();
            }
        });
        preencheComboTema();
    }


    // Busca perguntas Frequentes
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 1)) {

        // Alterar a URL para usar esta abaixo - NÃO ESQUECER
        // meuHost
        // url: "http://" + meuHost + ":90/api/perguntasfrequentes",
        //url: "http://ws713:90/api/perguntasfrequentes",

        $.ajax({
            type: "GET",
            url: "acao.asp?acao=RetornaPerguntasFrequentes",
            dataType: "json",
            //crossDomain: false,
            success: function (jdados) {
                var htm = "";
                htm += "<div style='width: 100%; text-align: center; '>Abaixo estão relacionadas perguntas e respostas para ajudar o usuário do Portal da Transparência a tirar suas dúvidas mais frequentes.</div>";
                htm += "<p>";
                for (var i = 0; i < jdados.length; i++) {

                    var objResult = jdados[i];
                    //htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>";
                    htm += "<table>";
                    htm += "<div style='width:100%'>";
                    htm += "<h4 style='height:4px; padding-left: 20px; '><img id='image' src='/" + nomeAplicacaoDWS + "/imagens/setaParaBaixo_nova.png' width='20' height='20'> &nbsp;&nbsp; " + objResult.Pergunta + "</h4>";
                    htm += " <b><p style='display:block; width:100%; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-top: 10px;'></b> " + objResult.Resposta + "</p>";
                    htm += " </div>";
                    htm += " </table>";

                }

                //htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>"

                document.getElementById('confirma').style.display = 'none';
                document.getElementById('imprimirPDF').style.visibility = "visible";
                document.getElementById('exportarXML').style.visibility = "visible";
                document.getElementById('exportarCSV').style.visibility = "visible";
                document.getElementById('linhaPerguntasFrequentes').innerHTML = htm;

            },

            error: function (jerro) {
                alert(jerro.responseText + "Erro ao receber o arquivo!");
            }
        });
    };

    // Busca Pedidos Informação
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 5)) {

        $.ajax({
            type: "GET",
            url: "acao.asp?acao=RetornaPedidosInformacao",
            dataType: "json",
            //crossDomain: false,
            success: function (jdados) {
                var htm = "";
                htm += "<div style='width: 100%; text-align: center; '></div>";
                htm += "<p>";
                for (var i = 0; i < jdados.length; i++) {

                    var objResult = jdados[i];
                    //htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>";
                    htm += "<table>";
                    htm += "<div style='width:100%'>";
                    htm += "<div id='coluna_esquerda'>&nbsp;</div>"

                    htm += " <div style='text-align:justify; font-style: italic; font-family: initial; font-size: 17px; colspan= 20; height:100%; padding-left: 90px; padding-top: 10px;'>" + objResult.texto + "</div>";
                    htm += "</br>";

                    htm += " <div style='text-align:left; '>O acesso encontra-se disponível no endereço: <a href=" + objResult.linkPedidos + ">" + objResult.linkPedidos + "</a></div>";
                    htm += " </div>";
                    htm += " </table>";

                }

                //htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>"

                document.getElementById('confirma').style.display = 'none';
                document.getElementById('imprimirPDF').style.display = 'none';
                document.getElementById('exportarXML').style.display = 'none';
                document.getElementById('exportarCSV').style.display = 'none';
                document.getElementById('linhaPedidosInformacao').innerHTML = htm;

            },

            error: function (jerro) {
                alert(jerro.responseText + "Erro ao receber o arquivo!");
            }
        });
    };

    // Busca Estrutura Organizacional
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 2)) {

        // Alterar a URL para usar esta abaixo - NÃO ESQUECER
        // meuHost
        // url: "http://" + meuHost + ":90/api/EstruturaOrganizacional",
        //url: "http://ws713:90/api/EstruturaOrganizacional",

        $.ajax({
            type: "GET",
            url: "acao.asp?acao=RetornaEstruturaOrganizacional&param1=0",
            dataType: "json",
            //crossDomain: false,
            success: function (jdados) {
                var htm = "";
                htm += "<div style='width: 100%; text-align: center;'>Consulta da Estrutura Organizacional das Entidades</div>";
                htm += "<p>";
                for (var i = 0; i < jdados.length; i++) {

                    var objResult = jdados[i];

                    // htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>";
                    htm += "<table id='EstruturaOrganizacional'>";
                    htm += "<div style='font-family:Verdana; font-size:14px; text-align: left; width:100%;'>";

                    if (objResult.nomeEntidade != null) {
                        htm += "<h4 style='height:4px; padding-left: 20px; '><img id='image' src='/" + nomeAplicacaoDWS + "/imagens/setaDireita.png' width='20' height='20'><b> &nbsp;&nbsp; Nome da Entidade:    " + objResult.nomeEntidade + "</b></h4>";
                    }
                    if (objResult.nmEntidadePrincipal != null && objResult.nmEntidadePrincipal != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; padding-top: 10px;'> Nome Entidade Principal:  " + objResult.nmEntidadePrincipal + "</p>";
                    }
                    if (objResult.CompetenciasEntidade != null && objResult.CompetenciasEntidade != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; padding-top: 10px;'> Competências da Entidade:   " + objResult.CompetenciasEntidade + "</p>";
                    }
                    if (objResult.Logradouro != null && objResult.Logradouro != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '> Logradouro:   " + objResult.Logradouro + "</p>";
                    }
                    if (objResult.Bairro != null && objResult.Bairro != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '> Bairro:   " + objResult.Bairro + "</p>";
                    }
                    if (objResult.CEP != null && objResult.CEP != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '> CEP:   " + objResult.CEP + "</p>";
                    }
                    if (objResult.Complemento != null && objResult.Complemento != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '> Complemento:   " + objResult.Complemento + "</p>";
                    }
                    if (objResult.TelefoneFixo != null && objResult.TelefoneFixo != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '> Telefone Fixo:    " + objResult.TelefoneFixo + "</p>";
                    }
                    if (objResult.Celular != null && objResult.Celular != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Celular:    " + objResult.Celular + "</p>";
                    }
                    if (objResult.Fax != null && objResult.Fax != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> FAX:    " + objResult.Fax + "</p>";
                    }
                    if (objResult.EnderecoEletronico != null && objResult.EnderecoEletronico != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '> Endereço Eletrônico: <a href='mailto:" + objResult.EnderecoEletronico + "'>" + objResult.EnderecoEletronico + "</a></p>";
                    }
                    if (objResult.SiteEntidade != null && objResult.SiteEntidade != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '> Site da Entidade: <a href='http://" + objResult.SiteEntidade + "'>" + objResult.SiteEntidade + "</a></p>";
                    }

                    if (objResult.hroAtendimento != null && objResult.hroAtendimento != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '> Horário de Atendimento:   " + objResult.hroAtendimento + "</p>";
                    }
                    if (objResult.cntEletronicoEntidade != null && objResult.cntEletronicoEntidade != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '> Contato Eletrônico da Entidade: <a href='http://" + objResult.cntEletronicoEntidade + "'>" + objResult.cntEletronicoEntidade + "</a></p>";
                    }
                    if (objResult.nmResponsavel != null && objResult.nmResponsavel != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '> Nome do responsável:   " + objResult.nmResponsavel + "</p>";
                    }
                    if (objResult.cntEletronicoResponsavel != null && objResult.cntEletronicoResponsavel != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '> Contato Eletrônico do responsável:   " + objResult.cntEletronicoResponsavel + "</p>";
                    }
                    if (objResult.respTelefone != null && objResult.respTelefone != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '> Telefone Fixo do responsável:   " + objResult.respTelefone + "</p>";
                    }
                    if (objResult.respCelular != null && objResult.respCelular != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '> Celular responsável:   " + objResult.respCelular + "</p>";
                    }

                    var fileName = objResult.arqEstruturaOrganizacional.toString().toUpperCase();
                    if (objResult.arqEstruturaOrganizacional != null && objResult.arqEstruturaOrganizacional != "" && fileName.endsWith('PDF') == false) {
                        htm += "<p style='display:none; text-align:center; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-botton: 3px'> <img alt='' src='/" + nomeAplicacaoDWS + "/imagens/" + objResult.arqEstruturaOrganizacional + "' /></p>";
                    }

                    if (objResult.arqEstruturaOrganizacional != null && objResult.arqEstruturaOrganizacional != "" && fileName.endsWith('PDF') == true) {
                        htm += "<p style='display:none; text-align:center; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-botton: 3px'> <a href='/" + nomeAplicacaoDWS + "/imagens/" + objResult.arqEstruturaOrganizacional + "' title='Clique aqui para realizar o Donwload do PDF disponibilizado'> " + objResult.arqEstruturaOrganizacional + " </a> <img  border='0' src='Imagens/download.jpg' width='18px' height='18px'> </a>";
                    }

                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '><b>Programas:</b></p>";
                    var data = objResult.Programas
                    for (var x in data) {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '>" + data[x] + "</p>";
                    }

                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '><b>Projetos e Ações:</b></p>";
                    var data = objResult.Projetos
                    for (var y in data) {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; width:100%; padding-left: 60px; '>" + data[y] + "</p>";
                    }

                    htm += " </div>";
                    htm += " </table>";

                }

                htm += "<div id='linhaDivisao' style='padding-top: 10px;'></div>"
                // htm += "<div id='linhaEstruturaRopade' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge;'></div>"

                document.getElementById('confirma').style.display = 'none';
                document.getElementById('imprimirPDF').style.visibility = "visible";
                document.getElementById('exportarXML').style.visibility = "visible";
                document.getElementById('exportarCSV').style.visibility = "visible";
                document.getElementById('linhaEstruturaOrganizacional').innerHTML = htm;

                // teste();
            },

            error: function (jerro) {
                alert(jerro.responseText + "Erro ao receber o arquivo!");
            }
        });
    };

    // Busca Estrutura Organizacional_SIC
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 6)) {


        $.ajax({
            type: "GET",
            url: "acao.asp?acao=RetornaEstruturaOrganizacional&param1=1",
            dataType: "json",
            //crossDomain: false,
            success: function (jdados) {
                var htm = "";
                htm += "<div style='width: 100%; text-align: center;'>Consulta da Estrutura Organizacional das Entidades que possuem SIC</div>";
                htm += "<p>";
                for (var i = 0; i < jdados.length; i++) {

                    var objResult = jdados[i];

                    // htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>";
                    htm += "<table id='EstruturaOrganizacional'>";
                    htm += "<div style='font-family:Verdana; font-size:14px; text-align: left; width:100%;'>";

                    if (objResult.nomeEntidade != null) {
                        htm += "<h4 style='height:4px; padding-left: 20px; '><img id='image' src='/" + nomeAplicacaoDWS + "/imagens/setaDireita.png' width='20' height='20'><b> &nbsp;&nbsp; Nome da Entidade:    " + objResult.nomeEntidade + "</b></h4>";
                    }
                    if (objResult.nmEntidadePrincipal != null && objResult.nmEntidadePrincipal != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-top: 10px;'> Nome Entidade Principal:  " + objResult.nmEntidadePrincipal + "</p>";
                    }
                    if (objResult.CompetenciasEntidade != null && objResult.CompetenciasEntidade != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-top: 10px;'> Competências da Entidade:   " + objResult.CompetenciasEntidade + "</p>";
                    }
                    if (objResult.Logradouro != null && objResult.Logradouro != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Logradouro:   " + objResult.Logradouro + "</p>";
                    }
                    if (objResult.Bairro != null && objResult.Bairro != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Bairro:   " + objResult.Bairro + "</p>";
                    }
                    if (objResult.CEP != null && objResult.CEP != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> CEP:   " + objResult.CEP + "</p>";
                    }
                    if (objResult.Complemento != null && objResult.Complemento != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Complemento:   " + objResult.Complemento + "</p>";
                    }
                    if (objResult.TelefoneFixo != null && objResult.TelefoneFixo != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Telefone Fixo:    " + objResult.TelefoneFixo + "</p>";
                    }
                    if (objResult.Celular != null && objResult.Celular != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Celular:    " + objResult.Celular + "</p>";
                    }
                    if (objResult.Fax != null && objResult.Fax != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> FAX:    " + objResult.Fax + "</p>";
                    }
                    if (objResult.EnderecoEletronico != null && objResult.EnderecoEletronico != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Endereço Eletrônico: <a href='mailto:" + objResult.EnderecoEletronico + "'>" + objResult.EnderecoEletronico + "</a></p>";
                    }
                    if (objResult.SiteEntidade != null && objResult.SiteEntidade != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Site da Entidade: <a href='http://" + objResult.SiteEntidade + "'>" + objResult.SiteEntidade + "</a></p>";
                    }

                    if (objResult.hroAtendimento != null && objResult.hroAtendimento != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Horário de Atendimento:   " + objResult.hroAtendimento + "</p>";
                    }
                    if (objResult.cntEletronicoEntidade != null && objResult.cntEletronicoEntidade != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Contato Eletrônico da Entidade: <a href='http://" + objResult.cntEletronicoEntidade + "'>" + objResult.cntEletronicoEntidade + "</a></p>";
                    }
                    if (objResult.nmResponsavel != null && objResult.nmResponsavel != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Nome do responsável:   " + objResult.nmResponsavel + "</p>";
                    }
                    if (objResult.cntEletronicoResponsavel != null && objResult.cntEletronicoResponsavel != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Contato Eletrônico do responsável:   " + objResult.cntEletronicoResponsavel + "</p>";
                    }
                    if (objResult.respTelefone != null && objResult.respTelefone != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Telefone Fixo do responsável:   " + objResult.respTelefone + "</p>";
                    }
                    if (objResult.respCelular != null && objResult.respCelular != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Celular responsável:   " + objResult.respCelular + "</p>";
                    }
                    if (objResult.arqEstruturaOrganizacional != null && objResult.arqEstruturaOrganizacional != "") {
                        htm += "<p style='display:none; text-align:center; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-botton: 3px'> <img alt='' src='/" + nomeAplicacaoDWS + "/imagens/" + objResult.arqEstruturaOrganizacional + "' /></p>";
                    }

                    htm += " </div>";
                    htm += " </table>";

                }

                htm += "<div id='linhaDivisao' style='padding-top: 10px;'></div>"
                htm += "<div id='linhaEstruturaSIC_Ropade' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge;'></div>"

                document.getElementById('confirma').style.display = 'none';
                document.getElementById('imprimirPDF').style.visibility = "visible";
                document.getElementById('exportarXML').style.visibility = "visible";
                document.getElementById('exportarCSV').style.visibility = "visible";
                document.getElementById('linhaEstruturaOrganizacional').innerHTML = htm;

                // teste();
            },

            error: function (jerro) {
                alert(jerro.responseText + "Erro ao receber o arquivo!");
            }
        });
    };

    // Some com o botão de confirmação para as telas de perguntas frequentes e estrutura organizacional
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 3)) {

        document.getElementById('confirma').style.display = 'none';
    }

    $('#cmbEstoqueDataVigenciaLC').change(function () {

        if (this.value > 0) {

            LimpaCombo("cmbEstoqueMesInicial");
            LimpaCombo("cmbEstoqueMesFinal");

            $("#cmbEstoqueMesInicial").css("display", "block");
            //$("#mensagemAteCombo").css("display", "block");

            $("#cmbEstoqueMesInicial").removeAttr("style");
            //$("#mensagemAteCombo").removeAttr("style");

            var comboMesesEstoque;

            for (xx = 0; xx < 2; xx++) {

                if (xx == 0) {
                    comboMesesEstoque = document.getElementById("cmbEstoqueMesInicial");
                } else {
                    comboMesesEstoque = document.getElementById("cmbEstoqueMesFinal");
                }

                var opt0 = document.createElement("option");
                opt0.value = "0";
                opt0.text = "SELECIONE";
                comboMesesEstoque.add(opt0, comboMesesEstoque.options[0]);

                for (x = 1; x < 13; x++) {
                    var opt = document.createElement("option");
                    opt.value = x;
                    if (x == 1) {
                        opt.text = "Janeiro";
                    } else if (x == 2) {
                        opt.text = "Fevereiro";
                    } else if (x == 3) {
                        opt.text = "Março";
                    } else if (x == 4) {
                        opt.text = "Abril";
                    } else if (x == 5) {
                        opt.text = "Maio";
                    } else if (x == 6) {
                        opt.text = "Junho";
                    } else if (x == 7) {
                        opt.text = "Julho";
                    } else if (x == 8) {
                        opt.text = "Agosto";
                    } else if (x == 9) {
                        opt.text = "Setembro";
                    } else if (x == 10) {
                        opt.text = "Outubro";
                    } else if (x == 11) {
                        opt.text = "Novembro";
                    } else if (x == 12) {
                        opt.text = "Dezembro";
                    }

                    comboMesesEstoque.add(opt, comboMesesEstoque.options[x]);
                };
            };

        } else {
            limparDados("cmbEstoqueMesInicial");
        }
    }).change();

    // Tela de Pesquisa
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 4)) {

        var url = $.url(unescape(window.location.href));
        var textoPesquisa = unescape(url.param('txtPesquisa'));

        var valResultadoPesquisa = retiraAcento(textoPesquisa);

        if (valResultadoPesquisa != "") {
            var meuHost = window.location.host;

            $.ajax({
                type: "GET",
                global: false,
                url: "acao.asp",
                data: "acao=buscaPesquisa&param1=" + valResultadoPesquisa.toString(),
                dataType: "json",
                async: false,
                cache: false,
                success: function (jdados) {
                    var htm = "";
                    if (jdados) {
                        // Menu XML

                        htm = "";
                        htm += "<table id='pesquisaRapida'>";
                        htm += "<div style='width:100%; '>";

                        htm += "<div style='width:100%;height:0px;' ><td style='font-family:Verdana; text-align: left; font-size:18px;'>";
                        var vMenu = 0;

                        for (var i = 0; i < jdados.length; i++) {
                            var objResult = jdados[i];
                            if (objResult.Pai != "" && typeof objResult.Pai != "undefined") {

                                if (vMenu == 0) {
                                    htm += "<p style='height:0px;'><b> Menu </b></p>";
                                    vMenu += 1;
                                }

                                htm += "<tr style='font-family:Verdana; font-size:14px; text-align: left; color:#0074B2;' ><td>";
                                htm += "<h4 style='height:3px; padding-left: 20px;'><img id='image' src='/" + nomeAplicacaoDWS + "/imagens/setaDireita.png' width='20px' height='20px'><b style='padding-left: 9px;'>" + objResult.Pai.toUpperCase() + "</b></h4>";

                                if (objResult.Filho != "" && typeof objResult.Filho != "undefined") {

                                    var strFilhos = objResult.Filho;
                                    var resFilhos = strFilhos.split("|");

                                    var strURL = objResult.URL;
                                    var resURL = strURL.split("|");

                                    // htm += " <p style='display:none; height:3px; padding-left: 40px;' > <a style='font-size: 12px;!important; text-decoration:none;' class='but' >" + objResult.Filho + "</a></p>";

                                    htm += " <p style='display:none;width: auto; height:3px; padding-left: 40px;' >";
                                    htm += " | ";

                                    for (var i1 = 0; i1 < resFilhos.length; i1++) {
                                        if (resURL[i1] != 'Vazio') {
                                            var vHttp = resURL[i1].indexOf("http") > -1 ? true : false;
                                            //Aqui eu Verifico o Link que o Usuario Cadastrou, quando não é um link interno do sistema eu ignoro o meu Host
                                            //e escrevo o link que o cliente cadastrou.
                                            if (vHttp) {
                                                htm += " <a style='font-size: 12px;!important; padding: 10px 0px;'  class='but' href='" + resURL[i1] + "' target='_blank'>" + resFilhos[i1] + "</a>";
                                                htm += " | ";
                                            }
                                            else {
                                                htm += " <a style='font-size: 12px;!important; padding: 10px 0px;'  class='but' href='http://" + meuHost + "/" + nomeAplicacaoDWS + "" + resURL[i1] + "' >" + resFilhos[i1] + "</a>";
                                                htm += " | ";
                                            }
                                        }
                                        else {
                                            htm += " <a style='font-size: 12px;!important;' class='but' >" + resFilhos[i1] + "</a>";
                                        }
                                    }

                                    htm += "</p>";

                                }
                                htm += "</td></tr>";
                            }
                        }
                        htm += "</td></div>";
                        htm += " </div>";
                        htm += " </table>";

                        // ---- Perguntas Frequentes

                        htm += "<div style='font-family:Verdana; text-align: left; font-size:18px; '><td>";
                        htm += "<table id='pesquisaRapidaPerguntas'>";
                        htm += "<div style='width:100%; '>";

                        var vPerguntasFrequentes = 0;

                        for (var i = 0; i < jdados.length; i++) {
                            var objResult = jdados[i];
                            if (objResult.Pergunta != "" && typeof objResult.Pergunta != "undefined") {

                                if (vPerguntasFrequentes == 0) {
                                    htm += "<p style='height:0px;'><b> Perguntas Frequentes </b></p>";
                                    vPerguntasFrequentes += 1;
                                }

                                htm += "<tr style='font-family:Verdana; font-size:14px; color:#0074B2;'><td>";
                                htm += "<h4 style='height:3px; padding-left: 20px;'><img id='image' src='/" + nomeAplicacaoDWS + "/imagens/setaDireita.png' width='20px' height='20px'><b style='padding-left: 5px;'> " + objResult.Pergunta.toUpperCase() + "</b></h4>";
                                htm += " <p style='display:block ; text-align:justify; 'height:3px;'><a style='font-size: 12px;!important; padding-left: 70px;' class='but' href='http://" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=20&item=1' >" + objResult.Resposta + "</a></p>";
                                htm += "</td></tr>";
                            }
                        }

                        htm += "</td></div>";

                        htm += " </div>";
                        htm += " </table>";

                        // ---- Publicações

                        htm += "<div id='geraPublicacoes' style='font-family:Verdana; text-align: left; font-size:18px;'>";
                        htm += "<div style='width: 100%; font-size: 8px;'>&nbsp;&nbsp;&nbsp;</div>";
                        htm += "<div style='width: 100%; text-align: center;'></div>";
                        htm += "<p>";

                        var iTitulo = 0;
                        var strNomeTema = "";

                        var vPublicacoes = 0;

                        for (var i = 0; i < jdados.length; i++) {
                            var objResult = jdados[i];
                            if (objResult.ID_AREA != "" && typeof objResult.ID_AREA != "undefined") {

                                if (vPublicacoes == 0) {
                                    htm += "<p><b>Publicações </b></p>";
                                    vPublicacoes += 1;
                                }

                                if (iTitulo == 0) {
                                    strNomeTema = objResult.Nome_tema;

                                    htm += "<div id='linhaPerguntas'  style='font-family:Verdana; font-size:14px; color:#0074B2;'></div>";
                                    htm += "<table id='publicacoesArquivos'>";
                                    htm += "<div style='width:100%'>";

                                    htm += "<h4 style='height:3px; padding-left: 20px;'><img id='image' src='/" + nomeAplicacaoDWS + "/imagens/setaDireita.png' width='20px' height='20px'><b style='font-family:Verdana; font-size:14px; color:#0074B2; padding-left: 5px;'> " + objResult.Nome_tema + "</b></h4>";


                                    htm += "<div style='font-size: 3px; width:100%; height:100%; '>";
                                    if (objResult.Descricao_tema != "") {
                                        htm += "<div style='width:1px; height:1px;'></div>";
                                        htm += "<p style='display:block; font-size: 11px;!important; width:100%; text-align:justify; height:100%; padding-left: 70px;'><a style='font-size: 12px;!important; padding-left: 0px;' class='but' href='http://" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=21&item=1'>" + objResult.Descricao_tema + "</a></p>";
                                    }
                                    htm += "</div>";

                                    iTitulo += 1;
                                }

                                if (strNomeTema != objResult.Nome_tema) {

                                    htm += "</div>";
                                    htm += " </table>";

                                    htm += "<div id='linhaPerguntas' style='font-family:Verdana; font-size:14px; color:#0074B2;'></div>";
                                    htm += "<table id='publicacoesArquivos'>";
                                    htm += "<div style='width:100%;'>";

                                    htm += "<h4 style='height:3px; padding-left: 20px;'><img id='image' src='/" + nomeAplicacaoDWS + "/imagens/setaDireita.png' width='20px' height='20px'><b style='font-family:Verdana; font-size:14px; color:#0074B2; padding-left: 5px;'> " + objResult.Nome_tema + "</b></h4>";

                                    htm += "<div style='font-size: 3px; width:100%; height:100%;'>";
                                    if (objResult.Descricao_tema != null) {
                                        htm += "<div style='width:1px; height:1px;'></div>";
                                        htm += "<p style='display:block; font-size: 11px;!important; width:100%; text-align:justify; height:100%; padding-left: 70px;'><a style='font-size: 12px;!important; padding-left: 0px;' class='but' href='http://" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=21&item=1'>" + objResult.Descricao_tema + "</a></p>";
                                    }
                                    htm += "</div>";

                                    strNomeTema = objResult.Nome_tema;

                                }


                                if (objResult.Nome_arquivo != null && objResult.Nome_arquivo != "") {
                                    htm += "<p style='display:none; font-size: 11px;padding-left: 70px;'>Nome:  " + objResult.Nome_arquivo + "</p>";
                                } else {
                                    htm += "<p style='display:none; font-size: 11px;padding-left: 70px;'>Nome:  " + objResult.Nome_tema + " - " + objResult.NOME_RELATORIO + "</p>";
                                }

                                if (objResult.IMG_ARQUIVO != null) {
                                    htm += "<p style='display:none; font-size: 11px;padding-left: 70px;'>";

                                    switch (objResult.ID_AREA) {
                                        // DRO 353214 - 07/11/2018 - Inicio
                                        case "0": {
                                            htm += "Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but'  href='http://" + meuHost + "/" + nomeAplicacaoDWS + "/upload/Outros/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                                        } break;
                                        // DRO 353214 - 07/11/2018 - Fim
                                        case "1": {
                                            htm += "Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but'   href='http://" + meuHost + "/" + nomeAplicacaoDWS + "/upload/Gestao_de_Pessoal/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";
                                        } break;
                                        case "2": {
                                            htm += "Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px;  backgound: none;' class='but'  href='http://" + meuHost + "/" + nomeAplicacaoDWS + "/upload/Administracao_Geral/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                                        } break;
                                        case "3": {
                                            htm += "Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but'  href='http://" + meuHost + "/" + nomeAplicacaoDWS + "/upload/Arrecadacao/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                                        } break;
                                        case "4": {
                                            htm += "Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but'  href='http://" + meuHost + "/" + nomeAplicacaoDWS + "/upload/Financeira/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                                        } break;
                                        case "5": {
                                            htm += "Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but'  href='http://" + meuHost + "/" + nomeAplicacaoDWS + "/upload/Outros/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                                        } break;
                                    };


                                    htm += "</p>";

                                    if (objResult.DT_VIGENCIA_INICIO != null && objResult.DT_VIGENCIA_INICIO != "") {

                                        if (objResult.DT_VIGENCIA_FIM != null && objResult.DT_VIGENCIA_FIM != "") {
                                            htm += "<p style='display:none; font-size: 11px; padding-left: 70px;'>Referência:  " + objResult.DT_VIGENCIA_INICIO + " a " + objResult.DT_VIGENCIA_FIM + "</p>";
                                        } else {
                                            htm += "<p style='display:none; font-size: 11px; padding-left: 70px;'>Referência:  " + objResult.DT_VIGENCIA_INICIO + " a Vigente </p>";
                                        }
                                    }

                                    if (objResult.DS_DESCRICAO != null) {
                                        htm += "<p style='display:none; font-size: 11px; padding-left: 70px;'>Descrição:  " + objResult.DS_DESCRICAO + "</p>";
                                    }

                                    if (objResult.DT_INCLUSAOARQUIVO != null) {
                                        htm += "<p style='display:none; font-size: 11px; padding-left: 70px;'>Data inclusão no Portal:  " + objResult.DT_INCLUSAOARQUIVO + "</p>";
                                    }

                                    htm += "<p style='display:none; width: 50%; text-align: center; bottom: 0px;  border: 1px ridge'>";
                                    htm += "</p>";
                                };
                            }
                        }

                        htm += " </div>";
                        htm += " </table>";
                        htm += " </div>";

                        var vEstrutura = 0;
                        // Estrutura Organizacional
                        //htm += "<div style='width: 100%; text-align: center;'>Consulta da Estrutura Organizacional das Entidades</div>";
                        htm += "<div id='geraPublicacoes' style='font-family:Verdana; text-align: left; font-size:18px;'>";
                        htm += "<div style='width: 100%; font-size: 8px;'>&nbsp;&nbsp;&nbsp;</div>";
                        htm += "<div style='width: 100%; text-align: center;'></div>";
                        htm += "<p>";
                        for (var i = 0; i < jdados.length; i++) {

                            var objResult = jdados[i];

                            if (objResult.nomeEntidade != "" && typeof objResult.nomeEntidade != "undefined") {

                                if (vEstrutura == 0) {
                                    htm += "<p><b>Estrutura Organizacional </b></p>";
                                    vEstrutura += 1;
                                }

                                //htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>";
                                htm += "<table id='EstruturaOrganizacional'>";
                                htm += "<div style='font-family:Verdana; font-size:14px; text-align: left; width:100%;'>";

                                if (objResult.nomeEntidade != null) {
                                    htm += "<h4 style='height:4px; padding-left: 20px; '><img id='image' src='/" + nomeAplicacaoDWS + "/imagens/setaDireita.png' width='20' height='20'><b <b style='font-family:Verdana; font-size:14px; color:#0074B2; padding-left: 5px;'> NOME DA ENTIDADE:    " + objResult.nomeEntidade.toUpperCase() + "</b></h4>";
                                }
                                if (objResult.nmEntidadePrincipal != null && objResult.nmEntidadePrincipal != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-top: 10px;'> Nome Entidade Principal:  " + objResult.nmEntidadePrincipal + "</p>";
                                }
                                if (objResult.CompetenciasEntidade != null && objResult.CompetenciasEntidade != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-top: 10px;'> Competências da Entidade:   " + objResult.CompetenciasEntidade + "</p>";
                                }
                                if (objResult.Logradouro != null && objResult.Logradouro != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Logradouro:   " + objResult.Logradouro + "</p>";
                                }
                                if (objResult.Bairro != null && objResult.Bairro != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Bairro:   " + objResult.Bairro + "</p>";
                                }
                                if (objResult.CEP != null && objResult.CEP != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> CEP:   " + objResult.CEP + "</p>";
                                }
                                if (objResult.Complemento != null && objResult.Complemento != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Complemento:   " + objResult.Complemento + "</p>";
                                }
                                if (objResult.TelefoneFixo != null && objResult.TelefoneFixo != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Telefone Fixo:    " + objResult.TelefoneFixo + "</p>";
                                }
                                if (objResult.Celular != null && objResult.Celular != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Celular:    " + objResult.Celular + "</p>";
                                }
                                if (objResult.Fax != null && objResult.Fax != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> FAX:    " + objResult.Fax + "</p>";
                                }
                                if (objResult.EnderecoEletronico != null && objResult.EnderecoEletronico != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Endereço Eletrônico: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='mailto:" + objResult.EnderecoEletronico + "'>" + objResult.EnderecoEletronico + "</a></p>";
                                }
                                if (objResult.SiteEntidade != null && objResult.SiteEntidade != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Site da Entidade: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='http://" + objResult.SiteEntidade + "'>" + objResult.SiteEntidade + "</a></p>";
                                }
                                if (objResult.hroAtendimento != null && objResult.hroAtendimento != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Horário de Atendimento:   " + objResult.hroAtendimento + "</p>";
                                }
                                if (objResult.cntEletronicoEntidade != null && objResult.cntEletronicoEntidade != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Contato Eletrônico da Entidade: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='http://" + objResult.cntEletronicoEntidade + "'>" + objResult.cntEletronicoEntidade + "</a></p>";
                                }
                                if (objResult.nmResponsavel != null && objResult.nmResponsavel != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Nome do responsável:   " + objResult.nmResponsavel + "</p>";
                                }
                                if (objResult.cntEletronicoResponsavel != null && objResult.cntEletronicoResponsavel != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Contato Eletrônico do responsável:   " + objResult.cntEletronicoResponsavel + "</p>";
                                }
                                if (objResult.respTelefone != null && objResult.respTelefone != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Telefone Fixo do responsável:   " + objResult.respTelefone + "</p>";
                                }
                                if (objResult.respCelular != null && objResult.respCelular != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Celular responsável:   " + objResult.respCelular + "</p>";
                                }
                                if (objResult.arqEstruturaOrganizacional != null && objResult.arqEstruturaOrganizacional != "") {
                                    htm += "<p style='display:none; text-align:center; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-botton: 3px'> <img alt='' src='/" + nomeAplicacaoDWS + "/imagens/" + objResult.arqEstruturaOrganizacional + "' /></p>";
                                }

                                htm += " </div>";
                                htm += " </table>";
                            }

                        }
                        htm += " </div>";

                        htm += "<div id='linhaDivisao' style='padding-top: 10px;'></div>"
                        htm += "<div id='linhaEstruturaRopade' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge;'></div>"


                        document.getElementById('confirma').style.display = 'none';
                        document.getElementById('linhaResultadoPesquisa').innerHTML = htm;

                    }

                    if (jdados.length == 0) {
                        htm += " <b>Não foi encontrado nenhum item para a pesquisa realizada, por favor refaça a sua pesquisa!</b>  ";


                        document.getElementById('confirma').style.display = 'none';
                        document.getElementById('linhaResultadoPesquisa').innerHTML = htm;


                    }

                },

                error: function (jerro) {
                    alert(jerro.responseText + "Erro ao receber o arquivo!");
                }
            });

        }

    }

    // Some com o botão de confirmação para as telas de perguntas frequentes e estrutura organizacional
    if (($("#hndAcao").val() == 22)) {


        document.getElementById('confirma').style.display = 'none';
        document.getElementById('tamanhoTabela').style.display = 'none';
        document.getElementById('tamanhoTabela').style.visibility = 'hidden';


    }


    //PP
    $("#cmbPatrimonioStatus").change(function () {
        if ($("#cmbPatrimonioSituacaoBem").val() == 1) {
            //em uso
            if ($("#cmbPatrimonioStatus").val() == "N") {
                LimpaCompoTipoIngressoPP()
                CarregaComboTipoingresso()
            }//baixado
            else if ($("#cmbPatrimonioStatus").val() == "B") {
                LimpaCompoTipoIngressoPP()
                $("#TipoPatrimonio").text("Tipo de Baixa:")
                CarregaComboTipoingresso()
            }
        }
        if ($("#cmbPatrimonioStatus").val() == "C") {
            LimpaCompoTipoIngressoPP()
        }
        if ($("#cmbPatrimonioStatus").val() != "B") {
            $("#TipoPatrimonio").text("Tipo de Ingresso:");
        }
    });

    $("#cmbPatrimonioSituacaoBem").change(function () {
        $("#TipoPatrimonio").text("Tipo de Ingresso:");
        if ($("#cmbPatrimonioSituacaoBem").val() != 1) {
            LimpaCompoTipoIngressoPP()
        }

        if ($("#cmbPatrimonioSituacaoBem").val() == 1) {
            //em uso
            if ($("#cmbPatrimonioStatus").val() == "N") {
                LimpaCompoTipoIngressoPP()
                CarregaComboTipoingresso()
            }//baixado
            else if ($("#cmbPatrimonioStatus").val() == "B") {
                LimpaCompoTipoIngressoPP()
                $("#TipoPatrimonio").text("Tipo de Baixa:")
                CarregaComboTipoingresso()
            }
        }
    });
    //AF
    $('#quantEspecf').focusout(function () {
        if ($('#quantEspecf').val() != '') {
            $("input[name='nrMovimentos']:checked").attr("checked", false);
        }
    });
    $("input[name='nrMovimentos']").click(function () {
        $('#quantEspecf').val('');
    });
    $('.tipoDespesaTodas').click(function () {
        var estado = $('.tipoDespesaTodas').attr('checked');
        //alert(estado);
        $.each($('.tipoDespesa'), function () {
            $(this).attr('checked', estado ? "checked" : "");
        });
    });
    $('.tipoDespesa').click(function () {
        var estado = true;
        var totalNaoChecadas = 0;
        var totalChecadas = 0;
        $.each($(".tipoDespesa"), function () {
            if (!$(this).attr('checked')) {
                totalNaoChecadas++;
                estado = false
            } else {
                totalChecadas++;
            }
        });
        $('.tipoDespesaTodas').attr('checked', estado ? "checked" : "")
    });




    //MSR - 369133 - 11/07/2019

    //if ($("#hndAcao").val() == 3 && $("#hndItem").val() == 15) {
    //    preencheComboTipoDespesa();
    //}

    //MSR Descomentado esse trecho, conforme solicitação 369133
    if (($("#hndAcao").val() == 3 && $("#hndItem").val() == 15) || ($("#hndAcao").val() == 10 && $("#hndItem").val() == 6) || ($("#hndAcao").val() == 10 && $("#hndItem").val() == 7)) {
        preencheComboTipoDespesa();
    }


    if ($("#hndAcao").val() == 1 && $("#hndItem").val() == 4) {
        consultaHistoricoLances();
    }



});

function LimpaCompoTipoIngressoPP() {
    $("#cmbPatrimonioTipoIngresso").empty();
    $("#cmbPatrimonioTipoIngresso").append("<option value=''>SELECIONE</option>")
}

function CarregaComboTipoingresso() {
    consultarDados('RetornaTipoDeIngressoPP', 'cmbPatrimonioTipoIngresso', 'cmbPatrimonioUnidadePP', 'cmbPatrimonioStatus', '', '', '');
}

function pesquisaRapida() {

    valResultadoPesquisa = document.getElementById('txtPesquisa').value.toString();
    window.location.href = "http://" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=20&item=4&txtPesquisa=" + valResultadoPesquisa;

}

function telaAcessbilidade() {
    var meuHost = window.location.host;
    window.location.href = "http://" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=20&item=3";
}

function menuFavoritos() {
    var destino = $("#cmbMenuFavoritos");
    if ((destino) && (destino.is(":visible"))) {
        limparDadosFavoritos("cmbMenuFavoritos");
        destino.css("background-color", "#cecece");

        // destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=BuscaFavoritos",
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                limparDadosFavoritos("cmbMenuFavoritos");
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.descricao;
                            optn.value = dado.value;
                            destino.find("option").end().append("<option value='http://" + meuHost + "/" + nomeAplicacaoDWS + "" + dado.value + "'>" + dado.descricao + "</option>").val("'" + dado.value + "'");
                        };
                    }
                }
                destino.css("background-color", "#ffffff");
                //destino.attr("disabled", false);
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }
}


// Gera exportação de CSV para as telas de estrutura organizacional e perguntas frequentes
function exportacaoCSV(tipoExport, validaEsic) {
    // url: "http://ws713:90/api/perguntasfrequentes",
    // url: "http://ws713:90/api/EstruturaOrganizacional",

    if (tipoExport == 1) {
        $.ajax({
            type: "GET",
            url: "acao.asp?acao=RetornaEstruturaOrganizacional&param1=" + validaEsic,
            dataType: "json",
            //crossDomain: false,
            success: function (jdados) {
                var htm = "";

                htm += "ENTIDADE;";
                htm += "ENTIDADE PRINCIPAL;";
                htm += "ESTRUTURA ORGANIZACIONAL;";
                htm += "COMPETENCIAS;";
                htm += "ENDERECO;";
                htm += "BAIRRO;";
                htm += "CEP;";
                htm += "COMPLEMENTO;";
                htm += "TELEFONE FIXO;";
                htm += "TELEFONE CELULAR;";
                htm += "FAX;";
                htm += "ENDERECO ELETRONICO;";
                htm += "SITE DA ENTIDADE;";
                htm += "HORARIO DE ATENDIMENTO;";
                htm += "CONTATO ELETRONICO;";
                htm += "NOME RESPONSAVEL;";
                htm += "CONTATO ELETRONICO RESPONSAVEL;";
                htm += "TELEFONE FIXO RESPONSAVEL;";
                htm += "TELEFONE CELULAR RESPONSAVEL;";
                htm += "E-SIC;";
                htm += "\n";

                for (var i = 0; i < jdados.length; i++) {
                    var objResult = jdados[i];
                    htm += objResult.nomeEntidade + ";";
                    htm += objResult.nmEntidadePrincipal + ";";
                    htm += objResult.arqEstruturaOrganizacional + ";";
                    htm += objResult.CompetenciasEntidade + ";";
                    htm += objResult.Logradouro + ";";
                    htm += objResult.Bairro + ";";
                    htm += objResult.CEP + ";";
                    htm += objResult.Complemento + ";";
                    htm += objResult.TelefoneFixo + ";";
                    htm += objResult.Celular + ";";
                    htm += objResult.Fax + ";";
                    htm += objResult.EnderecoEletronico + ";";
                    htm += objResult.SiteEntidade + ";";
                    htm += objResult.hroAtendimento + ";";
                    htm += objResult.cntEletronicoEntidade + ";";
                    htm += objResult.nmResponsavel + ";";
                    htm += objResult.cntEletronicoResponsavel + ";";
                    htm += objResult.respTelefone + ";";
                    htm += objResult.respCelular + ";";
                    htm += objResult.nrSIC + ";";
                    htm += "\n";
                }

                ExportToCsv('estruturaOrganizacional', htm);
            },

            error: function (jerro) {
                alert(jerro.responseText + "Erro ao receber o arquivo!");
            }
        });
    } else {
        $.ajax({
            type: "GET",
            url: "acao.asp?acao=RetornaPerguntasFrequentes",
            dataType: "json",
            //crossDomain: false,
            success: function (jdados) {
                var htm = "";
                for (var i = 0; i < jdados.length; i++) {

                    var objResult = jdados[i];
                    htm += objResult.Pergunta + ";";
                    htm += objResult.Resposta + ";";
                    htm += "\n";
                }

                ExportToCsv('perguntasFrequentes', htm);
            },

            error: function (jerro) {
                alert(jerro.responseText + "Erro ao receber o arquivo!");
            }
        });
    }
}

function validaCNPJ(cnpj) {
    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;
    if (cnpj.length < 14 && cnpj.length < 15) {
        return false;
    }
    for (i = 0; i < cnpj.length - 1; i++) {
        if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    }
    if (!digitos_iguais) {
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            return false;
        }
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            return false;
        }
        return true;
    }
    else {
        return false;
    }
}

function ApenasNumeros(campo) {

    var tecla = (window.event) ? event.keyCode : e.which;
    if ((tecla > 47 && tecla < 58)) return true;
    else {
        if (tecla == 8 || tecla == 0) return true;
        else return false;
    }

    //if (document.all) // Internet Explorer
    //    var tecla = event.keyCode;
    //else if (document.layers) // Nestcape
    //    var tecla = e.which;

    //if ((tecla > 47 && tecla < 58)) // numeros de 0 a 9
    //    return true;
    //else {
    //    if (tecla != 8) // backspace
    //        //event.keyCode = 0;
    //        return false;
    //    else
    //        return true;
    //}
    //$(campo).val($(campo).val().replace(/\D/g,""));
}

function VerificaSeCheckadas() {

    PreencheHidden('cmbDataFiltro', 'hndDataFiltro');
    var estado = false;
    var estado2 = true;
    var totalModalidadesChecadas = 0;
    var totalModalidadesNaoChecadas = 0;
    var totalFinalidadesChecadas = 0;
    $.each($(".modalidade input"), function () {
        if ($(this).attr('checked')) {
            totalModalidadesChecadas++;
            estado = true;
        } else {
            totalModalidadesNaoChecadas++;
            estado2 = false
        }
    });
    $.each($(".finalidade input"), function () {
        if (!$(this).attr('checked')) {
            totalFinalidadesChecadas++;
        }
    });
    if (totalModalidadesNaoChecadas != 0 || totalFinalidadesChecadas != 0)
        $('#ckTipoModalidadeTodos').attr('checked', estado2 ? "checked" : "");
    if (totalModalidadesChecadas != 0) {
        // Selecionar todos as modalidades
        $.each($(".finalidade input"), function () {
            $(this).attr("disabled", estado ? "" : "disabled");
        });
    } else {
        $.each($(".finalidade input"), function () {
            $(this).attr("disabled", estado ? "" : "disabled");
            $(this).attr('checked', estado ? "checked" : "");
        });
    }
    $.each($(".finalidade input"), function () {
        if (!$(this).attr('checked')) {
            totalFinalidadesChecadas++;
            estado = false;
        }
    });
    $.each($(".modalidade input"), function () {
        if ($(this).attr('checked')) {
            totalModalidadesChecadas++;
            estado = false;
        }
    });
    if (totalFinalidadesChecadas != 0 || totalModalidadesChecadas != 0)
        $('#ckTipoModalidadeTodos').attr('checked', estado ? "checked" : "");
}

function PostForm() {
    //Cookies para os dados do filtro
    if ($("#cmbDataGP").val() != "") { createCookie("ckDataGP", $("#cmbDataGP").val(), 1) };
    if ($("#cmbAnoGP").val() != "") { createCookie("ckAnoGP", $("#cmbAnoGP").val(), 1) };
    if ($("#cmbAno").val() != "") { createCookie("ckAno", $("#cmbAno").val(), 1) };
    if ($("#cmbExercicio").val() != "") { createCookie("ckExercicio", $("#cmbExercicio").val(), 1) };
    if ($("#cmbUnidadeCP").val() != "") { createCookie("ckUnidadeCP", $("#cmbUnidadeCP").val(), 1) };
    if ($("#cmbMesInicial").val() != "") { createCookie("ckMesInicial", $("#cmbMesInicial").val(), 1) };
    if ($("#cmbMesFinal").val() != "") { createCookie("ckMesFinal", $("#cmbMesFinal").val(), 1) };
    if ($("#cmbMesInicialGP").val() != "") { createCookie("ckMesInicialGP", $("#cmbMesInicialGP").val(), 1) };
    if ($("#cmbMesFinalGP").val() != "") { createCookie("ckMesFinalGP", $("#cmbMesFinalGP").val(), 1) };
    if ($("#txtDataInicial").val() != "") { createCookie("ckDataInicial", $("#txtDataInicial").val(), 1) };
    if ($("#txtDataFinal").val() != "") { createCookie("ckDataFinal", $("#txtDataFinal").val(), 1) };
    if ($("#txtDataInicialAR").val() != "") { createCookie("ckDataInicialAR", $("#txtDataInicialAR").val(), 1) };
    if ($("#txtDataFinalAR").val() != "") { createCookie("ckDataFinalAR", $("#txtDataFinalAR").val(), 1) };
    if ($("#cmbSituacaoDividaAtivaAR").val() != "") { createCookie("ckSituacaoDividaAtivaAR", $("#cmbSituacaoDividaAtivaAR").val(), 1) };
    if ($("#txtNomeRazaoSocialInscritoDividaAtivaAR").val() != "") { createCookie("ckNomeRazaoSocialInscritoDividaAtivaAR", $("#txtNomeRazaoSocialInscritoDividaAtivaAR").val(), 1) };
    if ($("#txtCPFCNPJInscritoDividaAtivaAR").val() != "") { createCookie("ckCPFCNPJInscritoDividaAtivaAR", $("#txtCPFCNPJInscritoDividaAtivaAR").val(), 1) };
    if ($("#cmbUnidadeGestora").val() != "") { createCookie("ckUnidadeGestora", $("#cmbUnidadeGestora").val(), 1) };
    if ($("#cmbApresentarPor").val() != "") { createCookie("ckApresentarPor", $("#cmbApresentarPor").val(), 1) };
    if ($("#ckEmpenhoOrcamentario").val() != "") { createCookie("ckEmpenhoOrcamentario", $("#ckEmpenhoOrcamentario").val(), 1) };
    if ($("#ckEmpenhoExtra").val() != "") { createCookie("ckEmpenhoExtra", $("#ckEmpenhoExtra").val(), 1) };
    if ($("#ckEmpenhoResto").val() != "") { createCookie("ckEmpenhoResto", $("#ckEmpenhoResto").val(), 1) };
    if ($("#cmbEstado").val() != "") { createCookie("ckEstado", $("#cmbEstado").val(), 1) };
    if ($("#cmbMunicipio").val() != "") { createCookie("ckMunicipio", $("#cmbMunicipio").val(), 1) };
    if ($("#cmbDataFiltro").val() != "") { createCookie("ckDataFiltro", $("#cmbDataFiltro").val(), 1) };
    if ($("#cmbCategoria").val() != "") { createCookie("ckCategoria", $("#cmbCategoria").val(), 1) };
    if ($("#cmbSitProcessoLicit").val() != "") { createCookie("ckSitProcessoLicit", $("#cmbSitProcessoLicit").val(), 1) };
    if ($("#cmbDataVigenciaLC").val() != "") { createCookie("ckDataVigenciaLC", $("#cmbDataVigenciaLC").val(), 1) };
    if ($("#cmbLeiLicitacoes").val() != "") { createCookie("ckLeiLicitacoes", $("#cmbLeiLicitacoes").val(), 1) };
    if ($("#cmbLicitacaoCompartilhada").val() != "") { createCookie("ckLicitacaoCompartilhada", $("#cmbLicitacaoCompartilhada").val(), 1) };
    if ($("#cmbModoExecucaoModalidade").val() != "") { createCookie("ckModoExecucaoModalidade", $("#cmbModoExecucaoModalidade").val(), 1) };
    if ($("#cmbRegistroPrecos").val() != "") { createCookie("ckRegistroPrecos", $("#cmbRegistroPrecos").val(), 1) };
    if ($("#cmbSituacaoEmergenciaLicitacoes").val() != "") { createCookie("ckSituacaoEmergenciaLicitacoes", $("#cmbSituacaoEmergenciaLicitacoes").val(), 1) };
    if ($("#cmbSituacaoEmergenciaContratos").val() != "") { createCookie("ckSituacaoEmergenciaContratos", $("#cmbSituacaoEmergenciaContratos").val(), 1) };
    if ($("#cmbSituacaoEmergenciaReceitasDespesas").val() != "") { createCookie("ckSituacaoEmergenciaReceitasDespesas", $("#cmbSituacaoEmergenciaReceitasDespesas").val(), 1) };
    if ($("#cmbFonteRecursoCodigoAplicacaoAcaoGoverno").val() != "") { createCookie("ckFonteRecursoCodigoAplicacaoAcaoGoverno", $("#cmbFonteRecursoCodigoAplicacaoAcaoGoverno").val(), 1) };

    //Estoque
    if ($("#cmbEstoqueDataVigenciaLC").val() != "") { createCookie("ckEstoqueAno", $("#cmbEstoqueDataVigenciaLC").val(), 1) };
    if ($("#cmbEstoqueUnidadeGestoraLC").val() != "") { createCookie("ckEstoqueUnidadeGestora", $("#cmbEstoqueUnidadeGestoraLC").val(), 1) };
    if ($("#cmbEstoqueAlmoxarifado").val() != "") { createCookie("ckEstoqueAlmoxarifado", $("#cmbEstoqueAlmoxarifado").val(), 1) };
    if ($("#txtEstoqueLocalizacao").val() != "") { createCookie("ckEstoqueLocalizacao", $("#txtEstoqueLocalizacao").val(), 1) };
    if ($("#txtEstoqueMaterial").val() != "") { createCookie("ckEstoqueMaterial", $("#txtEstoqueMaterial").val(), 1) };
    if ($("#cmbEstoqueMesInicial").val() != "") { createCookie("ckEstoqueDataInicial", $("#cmbEstoqueMesInicial").val(), 1) };
    if ($("#cmbEstoqueMesFinal").val() != "") { createCookie("ckEstoqueDataFinal", $("#cmbEstoqueMesFinal").val(), 1) };
    if ($("#txtEstoqueClassificacao").val() != "") { createCookie("ckEstoqueClassificacao", $("#txtEstoqueClassificacao").val(), 1) };

    //Patrimonio
    if ($("#cmbPatrimonioUnidadeGestoraLC").val() != "") { createCookie("ckPatrimonioUnidadeGestora", $("#cmbPatrimonioUnidadeGestoraLC").val(), 1) };
    if ($("#txtPatrimonioDescricaoBem").val() != "") { createCookie("ckPatrimonioDescricaoBem", $("#txtPatrimonioDescricaoBem").val(), 1) };
    if ($("#txtPatrimonioDataInicial").val() != "") { createCookie("ckPatrimonioDataInicial", $("#txtPatrimonioDataInicial").val(), 1) };
    if ($("#txtPatrimonioDataFinal").val() != "") { createCookie("ckPatrimonioDataFinal", $("#txtPatrimonioDataFinal").val(), 1) };
    if ($("#txtPatrimonioClassificacao").val() != "") { createCookie("ckPatrimonioClassificacao", $("#txtPatrimonioClassificacao").val(), 1) };
    if ($("#txtPatrimonioLocalizacao").val() != "") { createCookie("ckPatrimonioLocalizacao", $("#txtPatrimonioLocalizacao").val(), 1) };
    if ($("#cmbPatrimonioSituacaoBem").val() != "") { createCookie("ckPatrimonioSituacaoBem", $("#cmbPatrimonioSituacaoBem").val(), 1) };
    if ($("#cmbPatrimonioStatus").val() != "") { createCookie("ckPatrimonioStatus", $("#cmbPatrimonioStatus").val(), 1) };

    //Frotas
    if ($("#cmbFrotasUnidadeGestora").val() != "") { createCookie("ckFrotasUnidadeGestora", $("#cmbFrotasUnidadeGestora").val(), 1) };
    if ($("#cmbFrotasTipoVeiculo").val() != "") { createCookie("ckFrotasTipoVeiculo", $("#cmbFrotasTipoVeiculo").val(), 1) };
    if ($("#txtFrotasDescricao").val() != "") { createCookie("ckFrotasDescricao", $("#txtFrotasDescricao").val(), 1) };
    if ($("#txtFrotasDataInicial").val() != "") { createCookie("ckFrotasDataInicial", $("#txtFrotasDataInicial").val(), 1) };
    if ($("#txtFrotasDataFinal").val() != "") { createCookie("ckFrotasDataFinal", $("#txtFrotasDataFinal").val(), 1) };
    if ($("#txtFrotasLocalizacao").val() != "") { createCookie("ckFrotasLocalizacao", $("#txtFrotasLocalizacao").val(), 1) };
    if ($("#txtFrotasPlaca").val() != "") { createCookie("ckFrotasPlaca", $("#txtFrotasPlaca").val(), 1) };
    if ($("#txtFrotasAnoFabricacao").val() != "") { createCookie("ckFrotasAnoFabricacao", $("#txtFrotasAnoFabricacao").val(), 1) };
    if ($("#cmbFrotasSituacaoVeiculo").val() != "") { createCookie("ckFrotaSituacaoVeiculo", $("#cmbFrotasSituacaoVeiculo").val(), 1) };


    document.getElementById("mensagemReferencia").style.display = "none";

    //Ug LC
    if ($("#cmbUnidadeGestoraLC").val() != "") { createCookie("ckUnidadeGestoraLC", $("#cmbUnidadeGestoraLC").val(), 1) };

    //Cookies para os dados do filtro
    //Hidden para tela do Filtro Utilizado
    PreencheHidden('cmbAno', 'hndAno');
    PreencheHidden('cmbExercicio', 'hndExercicio');
    PreencheHidden('cmbUnidadeGestora', 'hndUnidadeGestora');
    PreencheHidden('cmbDiariasPassagens', 'hndDiariasPassagens');
    PreencheHidden('cmbCategoria', 'hndCategoria');
    PreencheHidden('cmbMesInicial', 'hndMesInicial');
    PreencheHidden('cmbMesFinal', 'hndMesFinal');
    PreencheHidden('cmbUnidadeCP', 'hndUnidadeCP');
    PreencheHidden('cmbUnidadeGestoraLC', 'hndUnidadeGestoraLC');

    PreencheHidden('cmbOrgaoLC', 'hndOrgaoLC');

    PreencheHidden('cmbSitProcessoLicit', 'hndSitProcessoLicit');
    PreencheHidden('cmbDataVigenciaLC', 'hndDataVigenciaLC');
    PreencheHidden('cmbLeiLicitacoes', 'hndLeiLicitacoes');
    PreencheHidden('cmbLicitacaoCompartilhada', 'hndLicitacaoCompartilhada');
    PreencheHidden('cmbModoExecucaoModalidade', 'hndModoExecucaoModalidade');
    PreencheHidden('cmbRegistroPrecos', 'hndRegistroPrecos');
    PreencheHidden('cmbSituacaoEmergenciaLicitacoes', 'hndSituacaoEmergenciaLicitacoes');
    PreencheHidden('cmbSituacaoEmergenciaContratos', 'hndSituacaoEmergenciaContratos');
    PreencheHidden('cmbSituacaoEmergenciaReceitasDespesas', 'hndSituacaoEmergenciaReceitasDespesas');
    PreencheHidden('cmbFonteRecursoCodigoAplicacaoAcaoGoverno', 'hndFonteRecursoCodigoAplicacaoAcaoGoverno');

    PreencheHidden('cmbFuncao', 'hndFuncao');
    //AR
    PreencheHidden('cmbUnidadeGestoraAR', 'hndUnidadeGestoraAR');
    PreencheHidden('cmbSituacaoDividaAtivaAR', 'hndSituacaoDividaAtivaAR');
    //GP
    PreencheHidden('cmbVinculoGP', 'hndVinculoGP');
    PreencheHidden('cmbUnidadeGP', 'hndUnidadeGP');
    PreencheHidden('cmbAnoGP', 'hndAnoGP');
    PreencheHidden('cmbMesInicialGP', 'hndMesInicialGP');
    PreencheHidden('cmbMesFinalGP', 'hndMesFinalGP');
    PreencheHidden('cmbDiariasPassagens', 'hndDiariasPassagens');
    PreencheHidden('cmbTipoTransferencia', 'hndTipoTransferencia');
    PreencheHidden('cmbOrigemRecurso', 'hndOrigemRecurso');
    //Estoque
    PreencheHidden('cmbEstoqueDataVigenciaLC', 'hndEstoqueDataVigenciaLC');
    PreencheHidden('cmbEstoqueUnidadeGestoraLC', 'hndEstoqueUnidadeGestoraLC');
    PreencheHidden('cmbEstoqueAlmoxarifado', 'hndEstoqueAlmoxarifado');
    PreencheHidden('cmbEstoqueMesInicial', 'hndEstoqueMesInicial');
    PreencheHidden('cmbEstoqueMesFinal', 'hndEstoqueMesFinal');
    PreencheHidden('cmbEstoqueTipoMovimento', 'hndEstoqueTipoMovimento');

    //Patrimonio
    PreencheHidden('cmbPatrimonioUnidadeGestoraLC', 'hndPatrimonioUnidadeGestoraLC');
    PreencheHidden('cmbPatrimonioSituacaoBem', 'hndPatrimonioSituacaoBem');
    PreencheHidden('cmbPatrimonioStatus', 'hndPatrimonioStatus');
    PreencheHidden('cmbPatrimonioTipoIngresso', 'hndPatrimonioTipoIngresso');

    //Frotas
    PreencheHidden('cmbFrotasUnidadeGestora', 'hndFrotasUnidadeGestora');
    PreencheHidden('cmbFrotasTipoVeiculo', 'hndFrotasTipoVeiculo');
    PreencheHidden('cmbFrotasSituacaoVeiculo', 'hndFrotasSituacaoVeiculo');


    if (($("#hndAcao").val() == 3) && ($("#hndItem").val() == 7)) {
        PreencheHidden('cmbApresentarPor', 'hndApresentarPorCP');
    }
    if ($("#hndAcao").val() == 1) {
        switch ($("#hndItem").val()) {
            //---------jds 22-07-2020
            case "91": // Licitações Calamidade Publica
                {
                    VerificaSeCheckadas();
                } break;
            case "2":
                {
                    VerificaSeCheckadas();
                } break;
            //=================================
            case "3":
                {
                    PreencheHidden('cmbEstado', 'hndEstado');
                    PreencheHidden('cmbMunicipio', 'hndMunicipio');
                } break;
        }
    }

    //Servidores Ativos/Inativo/Quadro de Pessoal

    if (($("#hndAcao").val() == 4) && ($("#hndItem").val() == 2) || ($("#hndAcao").val() == 4) && ($("#hndItem").val() == 3) || ($("#hndAcao").val() == 4) && ($("#hndItem").val() == 4)) {
        PreencheHidden('hndApresentar', 'hndApresentarPorGP');
    }
    else {
        PreencheHidden('ckTipoGestaoPessoas', 'hndApresentarPorGP');
    }

    //Hidden para tela do Filtro Utilizado
    //Limpar variáveis da sessão
    if ($("#hndAcao").val() != 10) {
        $.ajax({
            type: "POST",
            url: "acao.asp?acao=LimparHistoricos",
            data: "",
            async: false,
            cache: false,
            error: function (jerro) {
                alert(jerro.responseText);
            }
        });
    }
    //Limpar variáveis da sessão

    document.getElementById('hndvisao').value = 1;
}

function consultaHistoricoLances() {
    $.ajax({
        type: "GET",
        url: "acao.asp?acao=RetornaConsultaHistoricoLances",
        dataType: "json",
        success: function (jdados) {

        },

        error: function (jerro) {
            alert(jerro.responseText + "Erro ao consultar histórico de lances!");
        }
    });

}

function validaProdutosInstalados() {
    $("#AtalhosAdm").css("display", "none");
    $("#amdEstoque").css("display", "none");
    $("#admPatrimonio").css("display", "none");
    $("#admFrotas").css("display", "none");
    $(".admAG").css("display", "none");
    $("#AtalhosReceitas").css("display", "none");
    $("#AtalhosDespesas").css("display", "none");
    $("#AtalhosTransf").css("display", "none");
    $("#AtalhosTransfVolun").css("display", "none");
    $("#AtalhosCredores").css("display", "none");
    $("#AtalhosGP").css("display", "none");

    $.ajax({
        type: "GET",
        url: "acao.asp?acao=RetornaProdutosTB",
        dataType: "json",
        success: function (jdados) {
            var htm = "";
            for (var i = 0; i < jdados.length; i++) {
                var objResult = jdados[i];
                if (objResult.TipoProduto == 'AG') {
                    $(".admAG").css("display", "block");
                    $(".admAG").removeAttr("style");
                    $("#AtalhosAdm").css("display", "block");
                    $("#AtalhosAdm").removeAttr("style");
                }
                if (objResult.TipoProduto == 'CM') {
                    $("#amdEstoque").css("display", "block");
                    $("#amdEstoque").removeAttr("style");
                    $("#AtalhosAdm").css("display", "block");
                    $("#AtalhosAdm").removeAttr("style");
                }
                if (objResult.TipoProduto == 'PP') {
                    $("#admPatrimonio").css("display", "block");
                    $("#admPatrimonio").removeAttr("style");
                    $("#AtalhosAdm").css("display", "block");
                    $("#AtalhosAdm").removeAttr("style");
                }
                if (objResult.TipoProduto == 'AF') {
                    $("#admFrotas").css("display", "block");
                    $("#admFrotas").removeAttr("style");
                    $("#AtalhosAdm").css("display", "block");
                    $("#AtalhosAdm").removeAttr("style");
                }
                if (objResult.TipoProduto == 'FA') {
                    $("#AtalhosReceitas").css("display", "block");
                    $("#AtalhosReceitas").removeAttr("style");
                }
                if (objResult.TipoProduto == 'FC') {
                    $("#AtalhosCredores").css("display", "block");
                    $("#AtalhosCredores").removeAttr("style");
                }
                if (objResult.TipoProduto == 'FR') {
                    $("#AtalhosReceitas").css("display", "block");
                    $("#AtalhosReceitas").removeAttr("style");
                }
                if (objResult.TipoProduto == 'FD') {
                    $("#AtalhosDespesas").css("display", "block");
                    $("#AtalhosDespesas").removeAttr("style");
                }
                if (objResult.TipoProduto == 'TV') {
                    $("#AtalhosTransfVolun").css("display", "block");
                    $("#AtalhosTransfVolun").removeAttr("style");
                }
                if (objResult.TipoProduto == 'TF') {
                    $("#AtalhosTransf").css("display", "block");
                    $("#AtalhosTransf").removeAttr("style");
                }
                if (objResult.TipoProduto == 'GP') {
                    $("#AtalhosGP").css("display", "block");
                    $("#AtalhosGP").removeAttr("style");
                }
            }
        },

        error: function (jerro) {
            alert(jerro.responseText + "Erro ao receber o arquivo!");
        }
    });

}
// jds 22-07-2020
function ValidaContrato() {

    if (($("#txtValorContratoInicial").val() != "" && $("#txtValorContratoFinal").val() != "") &&
        ($("#txtValorContratoInicial").val().replace(".", "") > $("#txtValorContratoFinal").val().replace(".", ""))) {
        if (msgErro != "") { msgErro += "\n\n"; }
        msgErro += "O Valor do Contrato possui um intervalo inválido."
    }
    if ($("#txtAnoContrato").val() != "" || $("#txtNumeroContrato").val() != "") {
        if ($("#txtAnoContrato").val() == "") {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += "Favor preencher o Ano do contrato."
        }
        if ($("#txtNumeroContrato").val() == "") {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += "Favor preencher o Número do contrato."
        }
    }

    if (msgErro == "") {
        //Tipo Contrato
        var totalTipoContratoChecadas = 0;
        $.each($(".TipoContrato input"), function () {
            if ($(this).attr('checked')) {
                totalTipoContratoChecadas++;
            }
        });
        if (totalTipoContratoChecadas == 0) {
            $.each($(".TipoContrato input"), function () {
                $(this).attr('checked', true)
            });
        };
        //Instrumento Contratual
        var totalInstContratualChecadas = 0;
        $.each($(".instrumentoContratual input"), function () {
            if ($(this).attr('checked')) {
                totalInstContratualChecadas++;
            }
        });
        if (totalInstContratualChecadas == 0) {
            $.each($(".instrumentoContratual input"), function () {
                $(this).attr('checked', true)
            });
        };
        //Contrato Com
        var totalAditivosChecadas = 0;
        if ($('#ckContrato').attr('checked')) {
            $('.contratos').css('display', 'none');
            $.each($(".contratosCom input"), function () {
                if ($(this).attr('checked')) {
                    totalAditivosChecadas++;
                }
            });
            if (totalAditivosChecadas == 0) {
                $.each($(".contratosCom input"), function () {
                    $(this).attr('checked', true)
                });
            };
        }
    }
}
function ValidaProcesso() {

    //checked todas as finalidades caso não exista alguma selecionada
    var totalModalidadesChecadas = 0;
    $.each($(".modalidade input"), function () {
        if ($(this).attr('checked')) {
            totalModalidadesChecadas++;
        }
    });
    if (totalModalidadesChecadas == 0) {
        $.each($(".modalidade input"), function () {
            $(this).attr("disabled", "");
            $(this).attr('checked', true)
        });
    };
    var totalFinalidadesChecadas = 0;
    $.each($(".finalidade input"), function () {
        if ($(this).attr('checked')) {
            totalFinalidadesChecadas++;
        }
    });
    if (totalFinalidadesChecadas == 0) {
        $.each($(".finalidade input"), function () {
            $(this).attr("disabled", "");
            $(this).attr('checked', true)
        });
    };
}
function AlgumCheckSelecionado(classOrID) {

    var resultado = false;

    jQuery.each($(classOrID + " > input:checkbox"), function () {

        if ($(this).is(':checked'))
            resultado = true;
    });

    return resultado;

}

//---------------------
function ValidaForm() {

    msgErro = "";

    if ($("#cmbOrgaoLC").val() == "") {
        ($("#cmbOrgaoLC").val(-1))
    }

    if ($("#cmbFuncao").val() == "") {
        ($("#cmbFuncao").val(-1))
    }

    if ($("#hndAcao").val() == 10) {

        if ($("#hndItem").val() == 1) {

            if ($("#cmbUnidadeGestoraLC").val() == "") {
                ($("#cmbUnidadeGestoraLC").val(-1))
            }
        }



        if ($("#hndItem").val() >= 4 && $("#hndItem").val() <= 7) //Despesas
        {
            if ($("#cmbUnidadeGestora").val() == "" && ($("#cmbUnidadeGestora").val() == "" && $("#cmbUnidadeCP").val() == "")) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o campo Unidade Gestora!";
            }
            if ($("#cmbDiariasPassagens").val() == "" && $("#cmbDiariasPassagens").css("display") == "none") {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o Tipo de Despesa!";
            }
        }

        //'DRO - 382156 - 18/02/2018 - Inicio
        if ($("#hndItem").val() >= 8 && $("#hndItem").val() <= 10) { //Exportação GP
            if ($("#cmbExercicio").attr('selectedIndex') == 0 && $("#cmbMesInicial").val() == '') {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro = validaDataInicialFinal("txtDataInicial", "txtDataFinal", true);
            }
            else {
                if ($("#cmbMesInicial").val() == "" || $("#cmbMesFinal").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor informar o campo Período!";
                }
            }
        }
        else {
            //'DRO - 382156 - 18/02/2018 - Fim

            //Validação para todas as telas do CP e Exportação
            if ($("#hndItem").val() != 1) {

                if ($("#txtDataInicial").val() != "" || $("#txtDataFinal").val() != "") {
                    msgErro = validaDataInicialFinal("txtDataInicial", "txtDataFinal", true);
                }
                else {
                    if ($("#cmbMesInicial").val() == null && $("#cmbMesFinal").val() == null) {
                        if (msgErro != "") {
                            msgErro += "\n\n";
                        }
                        msgErro += "Favor informar o campo Período!";
                    }

                }
                //'DRO - 353774 - 27/10/2018 - Fim
            }
            //'DRO - 382156 - 18/02/2018 - Inicio
        }
        //'DRO - 382156 - 18/02/2018 - Fim

        // Valida Dados para a exportação
        if ($("#hndItem").val() == 1) {
            if ($("#cmbUnidadeLC").val() == "") {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o campo Entidade!";
            }
            if ($("#cmbUnidadeGestoraLC").val() == "" && ($("#cmbUnidadeGestoraLC").val() == "" && $("#cmbUnidadeGestoraLC").val() == "")) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o campo Unidade Gestora!";
            }

            if ($("#txtDataInicial").val() == "" || $("#txtDataInicial").val() == "") {
                if ($('#cmbTipoEsportacaoDados').find('option:selected').val() == "6") { // igual a estoque
                    if ($("#cmbMesInicial").val() == 0 || $("#cmbMesFinal").val() == 0) {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Período!";
                    }
                }
            }

            if ($('#cmbTipoEsportacaoDados').find('option:selected').val() != "7" && $('#cmbTipoEsportacaoDados').find('option:selected').val() != "8") {
                if ($("#cmbExercicio").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor informar o Ano da Vigência!";
                }
            } else {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro = validaDataInicialFinal("txtDataInicial", "txtDataFinal", true, false);
            }
        }


    } else {
        if ($("#txtDataInicial").val() != "" || $("#txtDataFinal").val() != "") {
            if (!validaData("#txtDataInicial", true)) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Data Inicial inválida.";
            }
            if (!validaData("#txtDataFinal", true)) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Data Final inválida.";
            }
        }
    }

    //Validação para as telas do AR
    if ($("#hndAcao").val() == 2 && $("#hndItem").val() == 1 || $("#hndItem").val() == 2) {

        if ($("#txtDataInicialAR").val() == "" || $("#txtDataFinalAR").val() == "") {
            if ($("#txtDataInicialAR").is(":visible") || $("#txtDataFinalAR").is(":visible")) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o campo Período!";
            }
        }
    }


    // 1 - Arrecadação
    if ($("#hndAcao").val() == 2) {
        if ($("#hndItem").val() == 2 || $("#hndItem").val() == 1) //Receitas
        {
            if ($("#cmbAno").val() == "") {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o campo Ano!";
            }

        }
    }
    // 3-Financeiro, Credores
    if ($("#hndAcao").val() == 3) {
        //Validação para todas as telas do CP
        if ($("#cmbUnidadeCP").val() == "") {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += "Favor informar o campo Entidade!";
        }

        if ($("#hndItem").val() == 14 || $("#hndItem").val() == 20 || $("#hndItem").val() == 21) { // Transferência Financeira
            if (($("#cmbMesInicial").val() == "" || $("#cmbMesFinal").val() == "") || ($("#cmbMesInicial").val() == null || $("#cmbMesFinal").val() == null)) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o campo Período!";
            }
        }

        if ($("#hndItem").val() == 11 || $("#hndItem").val() == 1 || $("#hndItem").val() == 3 || $("#hndItem").val() == 4 || $("#hndItem").val() == 7 || $("#hndItem").val() == 12 || $("#hndItem").val() == 8 || $("#hndItem").val() == 13 || $("#hndItem").val() == 15 || $("#hndItem").val() == 16 || $("#hndItem").val() == 17 || $("#hndItem").val() == 18 || $("#hndItem").val() == 19 || $("#hndItem").val() == 92)  //Receitas, Despesas Diarias, Empenhos a Pagar e Despesas Diarias Covid-19
        {
            if ($("#hndItem").val() != 13 && $("#hndItem").val() != 16 && $("#hndItem").val() != 17 && $("#hndItem").val() != 18 && $("#hndItem").val() != 19) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += validaDataInicialFinal("txtDataInicial", "txtDataFinal", true);
            }

            if ($("#hndItem").val() == 16) { // Transferência Voluntária Concedida
                if ($("#cmbMesInicial").val() == "" || $("#cmbMesFinal").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor informar o campo Período!";
                }
                if ($("#cmbUnidadeGestora").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor informar o campo Unidade Gestora!";
                }
            }

            if ($("#hndItem").val() == 17) { // Transferência Voluntária Recebida
                if ($("#cmbMesInicial").val() == "" || $("#cmbMesFinal").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor informar o campo Período!";
                }
                if ($("#cmbUnidadeGestora").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor informar o campo Unidade Gestora!";
                }
            }

            if ($("#hndItem").val() == 13) //Empenhos a Pagar
            {
                if ($("#cmbUnidadeGestora").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    // msgErro += "Favor informar o campo Unidade Gestora!";
                }
            }

            if ($("#hndItem").val() == 19) {
                if ($("#cmbUnidadeGestora").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    // msgErro += "Favor informar o campo Unidade Gestora!";
                }
            }
            //Despesa Diaria - Covid-19 (Item  = 92)
            if ($("#hndItem").val() == 11 || $("#hndItem").val() == 15 || $("#hndItem").val() == 92) //Despesa Diaria
            {
                if (!$("#ckEmpenhoOrcamentario").is(":checked") &&
                    !$("#ckEmpenhoExtra").is(":checked") &&
                    !$("#ckEmpenhoResto").is(":checked")) {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor selecionar um Tipo de Empenho.";
                }
                if ($("#hndItem").val() == 15) {
                    if ($("#cmbMesInicial").val() == "" || $("#cmbMesFinal").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Período!";
                    }
                    if ($("#cmbUnidadeGestora").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Unidade Gestora!";
                    }
                }
                if ($("#txtCPFCNPJFornecedor").val() != "") {
                    var auxCPFCNPJ = $("#txtCPFCNPJFornecedor").val();
                    auxCPFCNPJ = replaceAll(auxCPFCNPJ, ".", "");
                    auxCPFCNPJ = replaceAll(auxCPFCNPJ, "-", "");
                    auxCPFCNPJ = replaceAll(auxCPFCNPJ, "/", "");
                    if (auxCPFCNPJ.length < 12) {
                        if (!validaCPF(auxCPFCNPJ)) {
                            if (msgErro != "") { msgErro += "\n\n"; }
                            msgErro += "CPF inválido!";
                        }
                    }
                    else {
                        if (!validaCNPJ(auxCPFCNPJ)) {
                            if (msgErro != "") { msgErro += "\n\n"; }
                            msgErro += "CNPJ inválido!";
                        }
                    }
                }
                //Validação de Diarias/passagens
                if ($("#hndItem").val() == 15) //Despesa Diaria
                {

                    if ($("#cmbDiariasPassagens").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o Tipo de Despesa!";
                    }
                }
            }
        }
        else {
            if ($("#cmbReceitas").val() != "LANÇAMENTO DAS RECEITAS") {
                if ($("#cmbMesInicial").val() == "" || $("#cmbMesFinal").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor informar o campo Período!";
                }
            }
            //Financeiro | Itens:Ação, Categoria, Programa, Classificação institucional, Esfera, Fonte categoria e funcional
            if ($("#cmbReceitas").val() != "LANÇAMENTO DAS RECEITAS") {
                if ($("#hndItem").val() == 1 || $("#hndItem").val() == 2 || $("#hndItem").val() == 3 || $("#hndItem").val() == 4 || $("#hndItem").val() == 5 || $("#hndItem").val() == 6 || $("#hndItem").val() == 7 || $("#hndItem").val() == 8 || $("#hndItem").val() == 9 || $("#hndItem").val() == 10) {
                    if ($("#cmbUnidadeGestora").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Unidade Gestora!";
                    }
                }
            }
        }
    }

    // Validação Tela de Publicações //

    if ($("#hndAcao").val() == 21) {

        if ($("#txtReferenciaAtePublicacoes").val() != "" && $("#txtReferenciaDePublicacoes").val() == "") {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += "Favor preencher a data inícial!"
        }

        if ($("#cmbPeriodoPublicacao").val() != 0) {
            if ($("#cmbReferenciaDePublicacoes").val() == 0) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Informe a referência!"
            }
        }

        if ($("#hndItem").val() != 6) {
            if ($("#cmbTemaPublicacoes").val() == "" ||
                $("#cmbTemaPublicacoes").val() == "SELECIONE")
            {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o Tema!";
            }
        }

        var destino = $("#txtAreaDoTema");

        /*if (destino.val() === '0') */
        if ($("#txtAreaDoTema").val() == '0') {

            $("#cmbAnoCargasPublicacoes").attr("disabled", true);
            if ($("#txtReferenciaDePublicacoes").val() == '0' ||
                $("#txtReferenciaAtePublicacoes").val() == '0') {
                msgErro += "Favor informar período da Referência Inicial e Final!";
            } else if ($("#txtReferenciaDePublicacoes").val() != '0') {
                if ($("#txtReferenciaDePublicacoes").val().substring(6, 10) !=
                    $("#txtReferenciaAtePublicacoes").val().substring(6, 10)) {
                    msgErro += "Ano de Referência Inicial e/ou Final inválidos. O intervalo tem que está no mesmo Ano!";
                }
            }
        }
        else {
            $("#cmbAnoCargasPublicacoes").attr("disabled", false);

            if ($("#cmbAnoCargasPublicacoes").val() == "" ||
                $("#cmbAnoCargasPublicacoes").val() == "SELECIONE") {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o Ano de Vigência!";
            }
        }
    }


    if ($("#hndAcao").val() == 4) {
        if ($("#hndItem").val() == 3) {
            if ($("#cmbVinculoGP").val() == "") {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor selecionar o Tipo de Vínculo!"
            }
        }
        if ($("#hndItem").val() == 3 || $("#hndItem").val() == 7) {
            if ($("#cmbMesInicialGP").val() == "0") {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o campo período inicial."
            }
            if ($("#cmbMesFinalGP").val() == "0") {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o campo período final."
            }
            if ($("#cmbMesInicialGP").val() != "0" && $("#cmbMesFinalGP").val() != "0") {
                if (parseInt($("#cmbMesInicialGP").val()) > parseInt($("#cmbMesFinalGP").val())) {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Período inicial não pode ser maior que período final."
                }
            }
            if ($("#cmbAnoGP").val() == "0") {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o campo ano."
            }
        } else if ($("#cmbDataGP").val() == null || $("#cmbDataGP").val() == "") {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += "Favor selecionar a Data!"
        }
        if ($("#hndItem").val() == 1) {
            if ($("#ckTipoGestaoPessoas").val() == -1 && $("#ApresentarPorLotacaoCargos").css("display") != "none") {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor selecionar a opção em: Apresentar Por!"
            }
        }
    }

    if ($("#hndAcao").val() == 1) //ADM
    {
        if (msgErro != "") { msgErro += "\n\n"; }
        msgErro += validaDataInicialFinal("txtDataInicial", "txtDataFinal", false);


        // Valida Calamidade 
        if ($("#hndItem").val() == 90 || $("#hndItem").val() == 91) {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += validaEntidadeCalamidade($("#cmbUnidadeLC").val());
        }
        if ($("#hndItem").val() == 92 || $("#hndItem").val() == 93 || $("#hndItem").val() == 94 || $("#hndItem").val() == 95 || $("#hndItem").val() == 97) {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += validaEntidadeCalamidade($("#cmbUnidadeCP").val());
        }
        if ($("#hndItem").val() == 96) {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += validaEntidadeCalamidade($("#cmbPatrimonioUnidadePP").val());
        }

        //Estoque = Item 5
        //Validar Ano de Vigencia
        if ($("#hndItem").val() != 5 && $("#hndItem").val() != 6 && $("#hndItem").val() != 7) {
            //entidade
            if ($("#cmbUnidadeLC").val() == "") {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar a Entidade!";
            }
            //contrato
            if ($("#hndItem").val() == 1 || ($("#hndItem").val() == 90 && $("#hndflagfiltrocontratos").val() == 1)) {
                if ($("#hndDataVigenciaLC").val() == "") {
                    if ($("#cmbDataVigenciaLC").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o Ano de Vigência!";
                    }

                }
            }
            //Processo
            if ($("#hndItem").val() == 2 || ($("#hndItem").val() == 91 && $("#hndflagfiltrolicitacoes").val() == 1)) {
                if ($("#txtAnoProcesso").val() == '') {
                    if ($("#hndDataVigenciaLC").val() == "") {
                        if ($("#cmbDataVigenciaLC").val() == "") {
                            if (msgErro != "") { msgErro += "\n\n"; }
                            msgErro += "Favor informar o Ano de Vigência!";
                        }

                    }
                }
                // DRO - 9245 - 01/02/2019 - Inicio
                if ($("#cmbDataVigenciaLC").val() == "" || $("#cmbDataVigenciaLC").val() == "SELECIONE") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor informar o Ano de Vigência!";
                }
                // DRO - 9245 - 01/02/2019 - Fim
            }
        }
        //Estoque = Item 5
        if ($("#hndItem").val() != 5 && $("#hndItem").val() != 6) {
            if ($("#cmbUnidadeGestoraLC").val() == "") {
                ($("#cmbUnidadeGestoraLC").val(-1))
            }
        }
        switch ($("#hndItem").val()) {
            case "90": //Contrato Calamidade jds 22-07-2020
                {
                    if ($("#hndflagfiltrocontratos").val() == 1) {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        ValidaContrato();
                    };
                } break;
            case "1": //Contrato jds 22-07-2020
                {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    ValidaContrato();
                } break;
            case "91": //Processos Calamidade
                {
                    if ($("#hndflagfiltrolicitacoes").val() == 1) {
                        ValidaProcesso();
                    };
                } break;
            case "2": //Processos
                {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    ValidaProcesso();
                } break;
            //-------------------------jds 22-07-2020
            case "3": //fornecedores
                {
                    if ($("#cmbEstado").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Estado!";
                    }
                    else {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        if ($("#cmbMunicipio").val() == "") {
                            msgErro += "Favor informar o campo Município!";
                        }
                    }

                } break;

            case "4": //Produtos
                {
                    if (msgErro == "") {
                        //Se todos TipoContrato estiverem desmarcados então marca todos
                        if (!$("#ckClassificacaoBensPatrimoniais").is(":checked") &&
                            !$("#ckClassificacaoMaterialConsumo").is(":checked") &&
                            !$("#ckClassificacaoObrasServicos").is(":checked")) {
                            $("#ckClassificacaoBensPatrimoniais").attr("checked", true);
                            $("#ckClassificacaoMaterialConsumo").attr("checked", true);
                            $("#ckClassificacaoObrasServicos").attr("checked", true);
                        }
                    }
                } break;

            case "5": //Estoque
                {

                    if ($("#cmbEstoqueUnidadeCM").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Entidade!";
                    }
                    if ($("#cmbEstoqueDataVigenciaLC").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Ano!";
                    }
                    if ($("#cmbEstoqueUnidadeGestoraLC").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Unidade Gestora!";
                    }
                    //if ($('#cmbEstoqueMesInicial :selected').val() == 0) {
                    //	if (msgErro != "") { msgErro += "\n\n"; }
                    //	msgErro += "Favor informar o campo Mês Inicial do Movimento!";
                    //}
                    //if ($('#cmbEstoqueMesFinal :selected').val() == 0) {
                    //	if (msgErro != "") { msgErro += "\n\n"; }
                    //	msgErro += "Favor informar o campo Mês Final do Movimento!";
                    //}

                } break;

            case "6": //Patrimonio
                {
                    if ($("#cmbPatrimonioUnidadeCM").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Entidade!";
                    }
                    if ($("#cmbPatrimonioDataVigenciaLC").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Ano!";
                    }
                    if ($("#cmbPatrimonioUnidadeGestoraLC").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Unidade Gestora!";
                    }
                } break;

            case "7": //Frotas
                {
                    msgErro += ""
                    if ($("#cmbFrotasUnidadeAF").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Entidade!";
                    }
                    if ($("#cmbFrotasUnidadeGestora").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Unidade Gestora!";
                    }
                } break;
            case "96": //Patrimonio
                {
                    if ($("#cmbPatrimonioUnidadeCM").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Entidade!";
                    }
                    if ($("#cmbPatrimonioUnidadeGestoraLC").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Unidade Gestora!";
                    }
                } break;
        }
    }
    if (msgErro == "") {
        if ($("#hndAcao").val() == 10)
            return true;

        PostForm();
        exibirAguarde();
    }
    else {
        jAlert(msgErro, 'Atenção');
        return false;
    }
}

function exibirAguarde(param) {
    var exibir = true;

    if (param != undefined)
        exibir = param;

    var agd = document.getElementById("aguarde");
    if (agd) {
        if (exibir)
            agd.style.display = "block";
        else
            agd.style.display = "none";

        if (agd.getAttribute("primeiravez") == "1")
            return;

        window.scrollTo(0, 0);
        resize();
        agd.setAttribute("primeiravez", "1");
    }
}

function resize() {
    var agd = document.getElementById("aguarde");

    if (agd) {
        var htmlheight = document.body.scrollHeight || agd.parentElement.scrollHeight;
        var htmlwidth = document.body.scrollWidth || agd.parentElement.scrollWidth;
        agd.style.height = htmlheight + "px";
        agd.style.width = htmlwidth + "px";
    }
    mover('aguardeinterno');
}

function resizeLC() {
    var agd = document.getElementById("aguarde");

    if (agd) {
        var htmlheight = document.body.scrollHeight || agd.parentElement.scrollHeight;
        var htmlwidth = document.body.scrollWidth || agd.parentElement.scrollWidth;
        agd.style.height = htmlheight + "px";
        agd.style.width = htmlwidth + "px";
    }
    mover('aguardeinternoLC');
}

function mover(idElemento) {
    var elemento = $("#" + idElemento);
    if (elemento) {
        $(elemento).css("top", ($(window).height() - $(elemento).height()) / 2 + $(window).scrollTop() + "px");
        $(elemento).css("left", ($(window).width() - $(elemento).width()) / 2 + $(window).scrollLeft() + "px");
    }
}

function NovaJanela(idElemento) {
    var elemento = $("#" + idElemento);
    var elemento2 = $("#topo");
    if (elemento) {
        var conteudohtml = $('<div>').append(elemento.clone()).html();
        conteudohtml = $('<div>').append(elemento2.clone()).html() + conteudohtml;
        var novaJanela = window.open("", "NovaJanela", "scrollbars,status,resizable");
        novaJanela.document.write("<html><head>"
            + "<link href='style.css' rel='stylesheet' type='text/css'></head>"
            + "<body onload='$(\"a\").contents().unwrap();$(\"#tbAtualizacao\").remove();$(\"#txtPaginacao\").show();$(\"#tbPageTop\").remove();$(\"#tbPageBottom\").remove();'>"
            + "<script type='text/javascript' src='script.js'></script>"
            + "<script type='text/javascript' src='jquery-1.4.2.min.js'></script>"
            + "<script type='text/javascript'>"
            + "function Imprimir() { window.print(); }"
            + "</script>"
            + "<form>"
            + conteudohtml
            + "<br /><input type='button' onclick='Imprimir();' value='Imprimir' />"
            + "<input type='button' style='margin-left:10px;' onclick='window.close();' value='Fechar' />"
            + "</form></body></html>");
        novaJanela.document.close();
    }
}



/*
 * Metodo responsável pela configuração das datas da opção
 * de menu Exportar Dados
 */
function ExibicaoPeriodoExportarDados(exercicio, data, meses) {
    alteraEntidade();
    if (exercicio.attr('selectedIndex') > 0 || exercicio.val() != '') {
        exibirEsconderControle(data, false)
        exibirEsconderControle(meses, true)
    }
    else {
        exibirEsconderControle(data, true)
        exibirEsconderControle(meses, false)
    }

}

function alteraEntidade(limpaCampo) {
    if (limpaCampo === undefined) {
        limpaCampo = true;
    }
    limparDados('cmbMesInicial');
    limparDados('cmbMesFinal');
    //limparDados('txtDataInicial');
    //limparDados('txtDataFinal');
    //limparDados('cmbUnidadeGestora');
    incializaValoresPadraoCP(limpaCampo);

}



function exibirEsconderControle(controle, exibir) {
    if (exibir)
        $(controle).show();
    else
        $(controle).hide();
}

function limparDadosFavoritos(objID) {
    var obj = $("#" + objID);
    if (obj) {
        obj.find("option").remove().end().append("<option value=''>Acesso Rápido</option>").val("''");
    }
}


function limparDados(objID) {

    var obj = $("#" + objID);
    if (obj) {
        //'DRO - 353774 - 26/10/2018 - Inicio
        //if ($("#hndAcao").val() != 1 && $("#hndAcao").val() != 10 && $("#hndAcao").val() != 21) {//ADM e ExpotarBD
        if ($("#hndAcao").val() != 1 && $("#hndAcao").val() != 21) {//ADM e ExpotarBD
            //'DRO - 353774 - 26/10/2018 - Fim
            if ($("#hndItem").val() == 90 || $("#hndItem").val() == 91 || $("#hndItem").val() == 92 || $("#hndItem").val() == 93 || $("#hndItem").val() == 94 || $("#hndItem").val() == 95 || $("#hndItem").val() == 97 || $("#hndItem").val() == 1 || $("#hndItem").val() == 2 || $("#hndItem").val() == 3 || $("#hndItem").val() == 4 || $("#hndItem").val() == 5 || $("#hndItem").val() == 6 || $("#hndItem").val() == 7 || $("#hndItem").val() == 8 || $("#hndItem").val() == 9 || $("#hndItem").val() == 10 || $("#hndItem").val() == 11 || $("#hndItem").val() == 12 || $("#hndItem").val() == 13 || $("#hndItem").val() == 14 || $("#hndItem").val() == 15 || $("#hndItem").val() == 16 || $("#hndItem").val() == 17 || $("#hndItem").val() == 18 || $("#hndItem").val() == 19 || $("#hndItem").val() == 20 || $("#hndItem").val() == 21) { //Licitacoes 
                if (obj.is("input")) {
                    obj.val("");
                } else {
                    obj.find("option").remove().end().append("<option value=''>SELECIONE</option>").val("''");
                    //Verficica qual a área para permitir valores defaut via windows load na página principal.html
                    if ($("#hndItem").val() == 90 || $("#hndItem").val() == 91 || $("#hndItem").val() == 92 || $("#hndItem").val() == 93 || $("#hndItem").val() == 94 || $("#hndItem").val() == 95 || $("#hndItem").val() == 97 || $("#hndItem").val() == 1 || $("#hndItem").val() == 2 || $("#hndItem").val() == 3 || $("#hndItem").val() == 4 || $("#hndItem").val() == 5 || $("#hndItem").val() == 6 || $("#hndItem").val() == 7 || $("#hndItem").val() == 8 || $("#hndItem").val() == 9 || $("#hndItem").val() == 10 || $("#hndItem").val() == 11 || $("#hndItem").val() == 12 || $("#hndItem").val() == 13 || $("#hndItem").val() == 14 || $("#hndItem").val() == 15 || $("#hndItem").val() == 16 || $("#hndItem").val() == 17 || $("#hndItem").val() == 18 || $("#hndItem").val() == 20 || $("#hndItem").val() == 21) {
                        obj.find("option").remove();

                    }
                }
            }

        }

        //Rotina para limpar o combo Entidade das Publicações e Auditorias
        if ($("#hndAcao").val() == 21) {
            obj.find("option").remove().end().append("<option value=''>SELECIONE</option>").val("''");
        }

    }
}

function consultarMes(maiorqueID, mesID, anoID, fato1, fato2) {
    consultarDados("Mes", mesID, anoID, maiorqueID, fato1, fato2);
}

function AtualizaMesFinal(mesInicial, mesFinal) {

    var valorSelecionado = $("#" + mesInicial + " option:selected").val();

    if (valorSelecionado != "") {
        LimpaCombo(mesFinal)
        adicionarItem(mesFinal, "", "SELECIONE");
        $("select#" + mesInicial).find('option').each(function () {
            if ($(this).val() != "" && parseInt($(this).val()) >= parseInt(valorSelecionado))
                adicionarItem(mesFinal, $(this).val(), $(this).text());
        });
    }
    else {
        LimpaCombo(mesFinal)
        adicionarItem(mesFinal, "", "SELECIONE");
    }
}

function adicionarItem(select, val, tex) {
    $("#" + select).append("<option value='" + val + "'>" + tex + "</option>");
}

function LimpaCombo(select) {
    $("#" + select + " > option").remove();

}

/* Publicações Inicio */
function preencheComboTema() {

    var destino = $("#cmbTemaPublicacoes");
    if ((destino) && (destino.is(":visible"))) {
        limparDados("cmbTemaPublicacoes");
        destino.css("background-color", "#cecece");

        destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=PreencheTema",
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                limparDados("cmbTemaPublicacoes");
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                    }
                }
                destino.css("background-color", "#ffffff");
                destino.attr("disabled", false);
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }
}

function preencheComboEntidadePublicacoes() {

    var destino = $("#cmbEntidadePublicacoes");
    var destino2 = $("#cmbPeriodoPublicacao");
    if ((destino) && (destino.is(":visible"))) {
        limparDados("cmbEntidadePublicacoes");
        limparDados("cmbPeriodoPublicacao");
        destino.css("background-color", "#cecece");

        if ($("#cmbAnoCargasPublicacoes").select().val() != "") {
            var comboMesesPublicacao = document.getElementById("cmbPeriodoPublicacao");

            for (x = 0; x < 6; x++) {
                var opt = document.createElement("option");
                opt.value = x;
                if (x == 0) {
                    opt.text = "Livre";
                } else if (x == 1) {
                    opt.text = "Semestre";
                } else if (x == 2) {
                    opt.text = "Quadrimestre";
                } else if (x == 3) {
                    opt.text = "Trimestre";
                } else if (x == 4) {
                    opt.text = "Bimestre";
                } else if (x == 5) {
                    opt.text = "Mês";
                }

                comboMesesPublicacao.add(opt, comboMesesPublicacao.options[x]);
            }

            destino2.attr("disabled", false);

        } else {
            destino2.attr("disabled", true);
            limparDados("cmbPeriodoPublicacao");
            limparDados("cmbUnidadeGestoraPublicacoes");
            $("#cmbRef").css("display", "none");
            $("#txtRef").css("display", "block");
        }

        destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=BuscaEntidadesPublicacoes&param1=" + $("#cmbAnoCargasPublicacoes").select().val() + "&param2=" + $("#cmbTemaPublicacoes").select().val(),
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                limparDados("cmbEntidadePublicacoes");
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                    }
                }
                destino.css("background-color", "#ffffff");
                destino.attr("disabled", false);
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }

}

// DRO - 361507 - 26/02/2019 - Inicio
function verificaAreaDoTema() {
    var destino = $("#txtAreaDoTema");

    //if ((destino) && (destino.is(":visible"))) {
    if (destino) {
        limparDados("txtAreaDoTema");
        destino.css("background-color", "#cecece");

        destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=BuscaAreaDoTema&param1=" + $("#cmbTemaPublicacoes").select().val(),
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                limparDados("txtAreaDoTema");
                if (jdados !== "") {
                    destino.val(jdados);
                }

                destino.css("background-color", "#ffffff");
                destino.attr("disabled", true);

                if (destino.val() === '0') {
                    $("#cmbAnoCargasPublicacoes").attr("disabled", true);
                }
                else {
                    $("#cmbAnoCargasPublicacoes").attr("disabled", false);
                }
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }
}
// DRO - 361507 - 26/02/2019 - Fim

function preencheComboUnidadeGestoraPublicacoes() {

    var destino = $("#cmbUnidadeGestoraPublicacoes");
    if ((destino) && (destino.is(":visible"))) {
        limparDados("cmbUnidadeGestoraPublicacoes");
        destino.css("background-color", "#cecece");

        destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=BuscaUnidadesGestorasPublicacoes&param1=" + $("#cmbEntidadePublicacoes").select().val() + "&param2=" + $("#cmbAnoCargasPublicacoes").select().val(),
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                limparDados("cmbUnidadeGestoraPublicacoes");
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                    }
                }
                destino.css("background-color", "#ffffff");
                destino.attr("disabled", false);
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }
}


// 363871 - Pronim TB - Textos de negativas. (Demanda legal)
function preencheComboTipoDespesa() {
    var destino = $("#cmbDiariasPassagens");
    $.ajax({
        type: "GET",
        global: false,
        url: "acao.asp",
        data: "acao=BuscaTipoDespesas",
        dataType: "json",
        async: false,
        cache: false,
        success: function (jdados) {

            var dado = jdados.Dados[0];

            if (dado == undefined) {
                //Aqui será as opções de dados para apresentar somente as opções da combo marcada no TBNET.
                destino.find("option").end().append("<option value='0'>SELECIONE</option>").val("'0'");
                destino.find("option").end().append("<option value='1'>DIÁRIAS</option>").val("'1'");
                destino.find("option").end().append("<option value='2'>PASSAGENS E DESPESAS COM LOCOMOÇÃO</option>").val("'2'");
                destino.find("option").end().append("<option value='3'>ADIANTAMENTO DE VIAGEM</option>").val("'3'");
            }

            if (dado != undefined) {
                var tipoDespesa = dado.text;
                var msgTipoDespesa = $(".msgTipoDespesa");
                var tituloForm = $("tamanhoTabela");

                if (tipoDespesa == "7") {
                    //Aqui será as opções de dados para apresentar somente as opções da combo marcada no TBNET.
                    destino.find("option").end().append("<option value='0'>SELECIONE</option>").val("'0'");
                    destino.find("option").end().append("<option value='1'>DIÁRIAS</option>").val("'1'");
                    destino.find("option").end().append("<option value='2'>PASSAGENS E DESPESAS COM LOCOMOÇÃO</option>").val("'2'");
                    destino.find("option").end().append("<option value='3'>ADIANTAMENTO DE VIAGEM</option>").val("'3'");
                    tituloForm.find("ClassTituloForm").end().append("Teste").val("'Teste'");
                }
                else if (tipoDespesa == "6") {
                    //Aqui será as opções de dados para apresentar somente as opções da combo marcada no TBNET.
                    destino.find("option").end().append("<option value='0'>SELECIONE</option>").val("'0'");
                    destino.find("option").end().append("<option value='1'>DIÁRIAS</option>").val("'1'");
                    destino.find("option").end().append("<option value='2'>PASSAGENS E DESPESAS COM LOCOMOÇÃO</option>").val("'2'");
                    tituloForm.find("ClassTituloForm").end().append("Teste").val("'Teste'");

                }
                else if (tipoDespesa == "5") {
                    //Aqui será as opções de dados para apresentar somente as opções da combo marcada no TBNET.
                    destino.find("option").end().append("<option value='0'>SELECIONE</option>").val("'0'");
                    destino.find("option").end().append("<option value='1'>DIÁRIAS</option>").val("'1'");
                    destino.find("option").end().append("<option value='3'>ADIANTAMENTO DE VIAGEM</option>").val("'3'");
                    tituloForm.find("ClassTituloForm").end().append("Teste").val("'Teste'");
                }
                else if (tipoDespesa == "4") {
                    //Aqui será as opções de dados para apresentar somente as opções da combo marcada no TBNET.
                    destino.find("option").end().append("<option value='0'>SELECIONE</option>").val("'0'");
                    destino.find("option").end().append("<option value='2'>PASSAGENS E DESPESAS COM LOCOMOÇÃO</option>").val("'2'");
                    destino.find("option").end().append("<option value='3'>ADIANTAMENTO DE VIAGEM</option>").val("'3'");
                    tituloForm.find("ClassTituloForm").end().append("Teste").val("'Teste'");
                }
                else if (tipoDespesa == "3") {
                    //Aqui será as opções de dados para apresentar somente as opções da combo marcada no TBNET.
                    destino.find("option").end().append("<option value='0'>SELECIONE</option>").val("'0'");
                    destino.find("option").end().append("<option value='3'>ADIANTAMENTO DE VIAGEM</option>").val("'3'");
                    tituloForm.find("ClassTituloForm").end().append("Teste").val("'Teste'");
                }
                else if (tipoDespesa == "2") {
                    //Aqui será as opções de dados para apresentar somente as opções da combo marcada no TBNET.
                    destino.find("option").end().append("<option value='0'>SELECIONE</option>").val("'0'");
                    destino.find("option").end().append("<option value='2'>PASSAGENS E DESPESAS COM LOCOMOÇÃO</option>").val("'2'");
                    tituloForm.find("ClassTituloForm").end().append("Teste").val("'Teste'");
                }
                else if (tipoDespesa == "1") {
                    //Aqui será as opções de dados para apresentar somente as opções da combo marcada no TBNET.
                    destino.find("option").end().append("<option value='0'>SELECIONE</option>").val("'0'");
                    destino.find("option").end().append("<option value='1'>DIÁRIAS</option>").val("'1'");
                    tituloForm.find("ClassTituloForm").end().append("Teste").val("'Teste'");
                } else {
                    //Aqui será as opções de dados para apresentar somente as opções da combo marcada no TBNET.
                    destino.find("option").end().append("<option value='0'>SELECIONE</option>").val("'0'");
                    destino.find("option").end().append("<option value='1'>DIÁRIAS</option>").val("'1'");
                    destino.find("option").end().append("<option value='2'>PASSAGENS E DESPESAS COM LOCOMOÇÃO</option>").val("'2'");
                    destino.find("option").end().append("<option value='3'>ADIANTAMENTO DE VIAGEM</option>").val("'3'");
                    tituloForm.remove();
                }
            }

        },
        error: function (jerro) {
            //Aqui será as opções de dados para apresentar somente as opções da combo marcada no TBNET.
            destino.find("option").end().append("<option value='0'>SELECIONE</option>").val("'0'");
            destino.find("option").end().append("<option value='1'>DIÁRIAS</option>").val("'1'");
            destino.find("option").end().append("<option value='2'>PASSAGENS E DESPESAS COM LOCOMOÇÃO</option>").val("'2'");
            destino.find("option").end().append("<option value='3'>ADIANTAMENTO DE VIAGEM</option>").val("'3'");
        }
    });
}

function preencheNaturezaDespesa() {

    var destino = $("#cmbDesdobramentoDespesa");
    var comboDPassagens = $("#cmbDiariasPassagens").select().val();
    var param1 = "";
    if (comboDPassagens == "1") {
        param1 = "14";
    } else if (comboDPassagens == "2") {
        param1 = "33";
    } else {
        param1 = "0";
        destino.css("background-color", "#ffffff");
        destino.attr("disabled", true);
    }
    var param2 = $("#cmbAno").select().val();

    var param3 = $("#cmbUnidadeCP").select().val();

    if ((destino) && (destino.is(":visible"))) {
        limparDados("cmbDesdobramentoDespesa");
        destino.css("background-color", "#cecece");

        destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=BuscaNaturezaDespesa&param1=" + param1 + "&param2=" + param2 + "&param3=" + param3,
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                limparDados("cmbDesdobramentoDespesa");
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                        destino.css("background-color", "#ffffff");
                        destino.attr("disabled", false);
                    }
                }
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }

}

function alteraComboReferenciaPublicacoes() {

    var destino = $("#cmbPeriodoPublicacao");
    var destino2 = $("#cmbReferenciaDePublicacoes");

    limparDados("cmbReferenciaDePublicacoes");
    destino.css("background-color", "#cecece");

    //$("#mensagemReferencia").css("display", "none");

    if ($("#cmbPeriodoPublicacao").select().val() != 0) { // Se for diferente de Livre
        $("#txtRef").css("display", "none");
        $("#cmbRef").css("display", "block");

    } else {
        $("#cmbRef").css("display", "none");
        $("#txtRef").css("display", "block");
    }

    if ($("#cmbPeriodoPublicacao").select().val() == 1) {// Semestre

        LimpaCombo("cmbReferenciaDePublicacoes");

        $("#cmbReferenciaAtePublicacoes").css("display", "none");
        $("#mensagemAteCombo").css("display", "none");
        //$("#mensagemReferencia").css("display", "block");
        //$("#mensagemReferencia").removeAttr("display");

        var comboMesesPublicacao = document.getElementById("cmbReferenciaDePublicacoes");

        var opt0 = document.createElement("option");
        opt0.value = "0";
        opt0.text = "SELECIONE";
        comboMesesPublicacao.add(opt0, comboMesesPublicacao.options[0]);

        for (x = 1; x < 3; x++) {
            var opt = document.createElement("option");
            opt.value = x;
            if (x == 1) {
                opt.text = "Primeiro";
            } else if (x == 2) {
                opt.text = "Segundo";
            }
            comboMesesPublicacao.add(opt, comboMesesPublicacao.options[x]);
        }

    } else if ($("#cmbPeriodoPublicacao").select().val() == 2) {// Quadrimestre

        LimpaCombo("cmbReferenciaDePublicacoes");
        $("#cmbReferenciaAtePublicacoes").css("display", "none");
        $("#mensagemAteCombo").css("display", "none");
        //$("#mensagemReferencia").css("display", "block");
        //$("#mensagemReferencia").removeAttr("display");

        var comboMesesPublicacao = document.getElementById("cmbReferenciaDePublicacoes");

        var opt0 = document.createElement("option");
        opt0.value = "0";
        opt0.text = "SELECIONE";
        comboMesesPublicacao.add(opt0, comboMesesPublicacao.options[0]);

        for (x = 1; x < 4; x++) {
            var opt = document.createElement("option");
            opt.value = x;
            if (x == 1) {
                opt.text = "Primeiro";
            } else if (x == 2) {
                opt.text = "Segundo";
            } else if (x == 3) {
                opt.text = "Terceiro";
            }

            comboMesesPublicacao.add(opt, comboMesesPublicacao.options[x]);
        }

    } else if ($("#cmbPeriodoPublicacao").select().val() == 3) {// Trimestre

        LimpaCombo("cmbReferenciaDePublicacoes");
        $("#cmbReferenciaAtePublicacoes").css("display", "none");
        $("#mensagemAteCombo").css("display", "none");
        //$("#mensagemReferencia").css("display", "block");
        //$("#mensagemReferencia").removeAttr("display");

        var comboMesesPublicacao = document.getElementById("cmbReferenciaDePublicacoes");

        var opt0 = document.createElement("option");
        opt0.value = "0";
        opt0.text = "SELECIONE";
        comboMesesPublicacao.add(opt0, comboMesesPublicacao.options[0]);

        for (x = 1; x < 5; x++) {
            var opt = document.createElement("option");
            opt.value = x;
            if (x == 1) {
                opt.text = "Primeiro";
            } else if (x == 2) {
                opt.text = "Segundo";
            } else if (x == 3) {
                opt.text = "Terceiro";
            } else if (x == 4) {
                opt.text = "Quarto";
            }

            comboMesesPublicacao.add(opt, comboMesesPublicacao.options[x]);
        }

    } else if ($("#cmbPeriodoPublicacao").select().val() == 4) {// Bimestre

        LimpaCombo("cmbReferenciaDePublicacoes");
        $("#cmbReferenciaAtePublicacoes").css("display", "none");
        $("#mensagemAteCombo").css("display", "none");
        // $("#mensagemReferencia").css("display", "block");
        // $("#mensagemReferencia").removeAttr("display");

        var comboMesesPublicacao = document.getElementById("cmbReferenciaDePublicacoes");

        var opt0 = document.createElement("option");
        opt0.value = "0";
        opt0.text = "SELECIONE";
        comboMesesPublicacao.add(opt0, comboMesesPublicacao.options[0]);

        for (x = 1; x < 7; x++) {
            var opt = document.createElement("option");
            opt.value = x;
            if (x == 1) {
                opt.text = "Primeiro";
            } else if (x == 2) {
                opt.text = "Segundo";
            } else if (x == 3) {
                opt.text = "Terceiro";
            } else if (x == 4) {
                opt.text = "Quarto";
            } else if (x == 5) {
                opt.text = "Quinto";
            } else if (x == 6) {
                opt.text = "Sexto";
            }

            comboMesesPublicacao.add(opt, comboMesesPublicacao.options[x]);
        }

    } else if ($("#cmbPeriodoPublicacao").select().val() == 5) {// Mês

        LimpaCombo("cmbReferenciaDePublicacoes");
        LimpaCombo("cmbReferenciaAtePublicacoes");

        $("#cmbReferenciaAtePublicacoes").css("display", "block");
        $("#mensagemAteCombo").css("display", "block");

        $("#cmbReferenciaAtePublicacoes").removeAttr("style");
        $("#mensagemAteCombo").removeAttr("style");

        var comboMesesPublicacao;

        for (xx = 0; xx < 2; xx++) {

            if (xx == 0) {
                comboMesesPublicacao = document.getElementById("cmbReferenciaDePublicacoes");
            } else {
                comboMesesPublicacao = document.getElementById("cmbReferenciaAtePublicacoes");
            }

            var opt0 = document.createElement("option");
            opt0.value = "0";
            opt0.text = "SELECIONE";
            comboMesesPublicacao.add(opt0, comboMesesPublicacao.options[0]);

            for (x = 1; x < 13; x++) {
                var opt = document.createElement("option");
                opt.value = x;
                if (x == 1) {
                    opt.text = "Janeiro";
                } else if (x == 2) {
                    opt.text = "Fevereiro";
                } else if (x == 3) {
                    opt.text = "Março";
                } else if (x == 4) {
                    opt.text = "Abril";
                } else if (x == 5) {
                    opt.text = "Maio";
                } else if (x == 6) {
                    opt.text = "Junho";
                } else if (x == 7) {
                    opt.text = "Julho";
                } else if (x == 8) {
                    opt.text = "Agosto";
                } else if (x == 9) {
                    opt.text = "Setembro";
                } else if (x == 10) {
                    opt.text = "Outubro";
                } else if (x == 11) {
                    opt.text = "Novembro";
                } else if (x == 12) {
                    opt.text = "Dezembro";
                }

                comboMesesPublicacao.add(opt, comboMesesPublicacao.options[x]);
            };
        };

    } else {
        limparDados("cmbReferenciaDePublicacoes");
    }
}

function preencheComboReferenciaAtePublicacoes() {

    var valorCombo = $("#cmbReferenciaDePublicacoes").select().val();

    LimpaCombo("cmbReferenciaAtePublicacoes");

    var comboMesesPublicacao = document.getElementById("cmbReferenciaAtePublicacoes");

    var opt0 = document.createElement("option");
    opt0.value = "0";
    opt0.text = "SELECIONE";
    comboMesesPublicacao.add(opt0, comboMesesPublicacao.options[0]);

    for (x = valorCombo; x < 13; x++) {
        var opt = document.createElement("option");
        opt.value = x;
        if (x == 1) {
            opt.text = "Janeiro";
        } else if (x == 2) {
            opt.text = "Fevereiro";
        } else if (x == 3) {
            opt.text = "Março";
        } else if (x == 4) {
            opt.text = "Abril";
        } else if (x == 5) {
            opt.text = "Maio";
        } else if (x == 6) {
            opt.text = "Junho";
        } else if (x == 7) {
            opt.text = "Julho";
        } else if (x == 8) {
            opt.text = "Agosto";
        } else if (x == 9) {
            opt.text = "Setembro";
        } else if (x == 10) {
            opt.text = "Outubro";
        } else if (x == 11) {
            opt.text = "Novembro";
        } else if (x == 12) {
            opt.text = "Dezembro";
        }

        comboMesesPublicacao.add(opt, comboMesesPublicacao.options[x]);
    };
}

/* Publicações Fim */


function consultarMesGeral(parametros) {
    var dados = parametros.split('#');

    var destino = $("#cmbMesInicial");
    if ((destino) && (destino.is(":visible"))) {
        var params = "";
        if ($("#hndAcao").val() == 10 && $("#hndItem").val() == 3) //ADM
        {
            dados[5] = $("#cmbUnidadeCP option:selected").val().split('|')[1];
        }
        var obj = $("#" + dados[0] + " option:selected").text();
        if (obj != "")
            params += "&param1=" + obj;
        else
            limparDados("cmbMesInicial");

        params += "&param2=''";

        params += "&param3=" + dados[2];
        params += "&param4=" + dados[3];
        params += "&param5=" + dados[4];
        params += "&param6=" + (dados[5] == '' ? $("#" + dados[0] + " option:selected").val() : dados[5]);
        destino.css("background-color", "#cecece");

        destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=MesGeral" + replaceAll(params, "/", "|"),
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                limparDados("cmbMesInicial");
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                    }
                }
                destino.css("background-color", "#ffffff");
                destino.attr("disabled", false);
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }
}

function consultarMesTransferencia(parametros) {
    var dados = parametros.split('#');

    var destino = $("#cmbMesInicial");

    var params = "";
    //var obj = $("#cmbAno option:selected").text();
    var obj = $("#" + dados[0] + " option:selected").text();
    params += "&param1=" + obj;

    //var obj = $('#cmbUnidadeCP option:selected').val();
    var obj = $("#" + dados[1] + " option:selected").val();
    params += "&param2=" + obj;


    destino.css("background-color", "#cecece");
    destino.attr("disabled", true);
    $.ajax({
        type: "GET",
        global: false,
        url: "acao.asp",
        data: "acao=MesTransferencia" + replaceAll(params, "/", "|"),
        dataType: "json",
        async: false,
        cache: false,
        success: function (jdados) {
            limparDados("cmbMesInicial");
            if (jdados) {
                if (jdados.Dados.length > 0) {
                    destino.removeAttr("disabled");
                    for (x = 0; x < jdados.Dados.length; x++) {
                        var dado = jdados.Dados[x];
                        var optn = document.createElement("OPTION");
                        optn.text = dado.text;
                        optn.value = dado.id;
                        destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                    };
                }
            }
            destino.css("background-color", "#ffffff");
            destino.attr("disabled", false);
        },
        error: function (jerro) {
            alert(jerro.responseText);
            destino.css("background-color", "#ffffff");
        }
    });
}

function consultarSituacoesEmergenciaLC(prFuncao, prDestino, prParam1, prParam2) {
    var params = "";
    var destino = $("#" + prDestino);

    if (destino && $("#" + prParam1).val() != "" && $("#" + prParam2).val() != "") {

        if ($("#" + prParam1) && $("#" + prParam1).val() != "") {
            params += "&param1=" + $("#" + prParam1).val();
        }

        if ($("#" + prParam2) && $("#" + prParam2).val() != "") {
            params += "&param2=" + $("#" + prParam2).val();
        }

        if (prDestino != "null") {

            $.ajax({
                type: "GET",
                global: false,
                url: "acao.asp",
                data: "acao=" + prFuncao + replaceAll(params, "/", "|"),
                dataType: "json",
                async: false,
                cache: false,
                success: function (result) {
                    if (result) {
                        if (result.Dados.length > 0) {
                            $("#" + prDestino).empty();
                            $("#" + prDestino).append("<option value='0'>TODOS</option>")
                            for (x = 0; x < result.Dados.length; x++) {
                                var dado = result.Dados[x];
                                if (dado.id != "0") {
                                    var option = document.createElement("OPTION");
                                    option.value = dado.id;
                                    option.text = dado.text;
                                    destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text.split(';')[0] + "</option>").val("'" + dado.id + "'");
                                }
                            };
                        }
                    }
                    destino.css("background-color", "#ffffff");
                },
                error: function (erro) {
                    alert(erro.responseText);
                    destino.css("background-color", "#ffffff");
                }
            });
        }
    }
}

function consultarSituacoesEmergenciaCP(prFuncao, prDestino, prParam1) {
    var params = "";
    var destino = $("#" + prDestino);

    if (destino && $("#" + prParam1).val() != "") {

        if ($("#" + prParam1) && $("#" + prParam1).val().split('|')[0] != "") {
            params += "&param1=" + $("#" + prParam1).val().split('|')[0];
        }

        if (prDestino != "null") {

            $.ajax({
                type: "GET",
                global: false,
                url: "acao.asp",
                data: "acao=" + prFuncao + replaceAll(params, "/", "|"),
                dataType: "json",
                async: false,
                cache: false,
                success: function (result) {
                    if (result) {
                        if (result.Dados.length > 0) {
                            $("#" + prDestino).empty();
                            $("#" + prDestino).append("<option value='0'>TODOS</option>")
                            $("#" + prDestino).append("<option value='1'>COVID-19</option>")
                            for (x = 0; x < result.Dados.length; x++) {
                                var dado = result.Dados[x];
                                if (dado.id != "0") {
                                    var option = document.createElement("OPTION");
                                    option.value = dado.id;
                                    option.text = dado.text;
                                    destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                                }
                            };
                        }
                        else {
                            $("#" + prDestino).empty();
                            $("#" + prDestino).append("<option value='0'>TODOS</option>")
                            $("#" + prDestino).append("<option value='1'>COVID-19</option>")
                        }
                    }
                    destino.css("background-color", "#ffffff");
                },
                error: function (erro) {
                    alert(erro.responseText);
                    destino.css("background-color", "#ffffff");
                }
            });
        }
    }
}

function consultarFonteRecursoCodigoAplicacaoAcaoGovernoCP(prFuncao, prDestino, prParam1, prParam2) {
    var params = "";
    var destino = $("#" + prDestino);

    if (destino && $("#" + prParam1).val() != "" && $("#" + prParam2).val() != "") {

        if ($("#" + prParam1) && $("#" + prParam1).val().split('|')[0] != "") {
            params += "&param1=" + $("#" + prParam1).val().split('|')[0];
        }

        if ($("#" + prParam2) && $("#" + prParam2).val() != "") {
            params += "&param2=" + $("#" + prParam2).val();
        }

        if (prDestino != "null") {

            $.ajax({
                type: "GET",
                global: false,
                url: "acao.asp",
                data: "acao=" + prFuncao + replaceAll(params, "/", "|"),
                dataType: "json",
                async: false,
                cache: false,
                success: function (result) {
                    if (result) {
                        if (result.Dados.length > 0) {
                            $("#" + prDestino).empty();

                            var cdsFonteRecurso = '(';
                            var cdsAplicacao = '(';
                            var cdsProjetoAtividade = '(';

                            for (x = 0; x < result.Dados.length; x++) {
                                var dado = result.Dados[x];

                                if (dado.id != "0") {

                                    var str = dado.text.substr(0, dado.text.length - 1);
                                    var textSplitted = str.split(';');

                                    for (y = 0; y < textSplitted.length; y++) {
                                        var option = document.createElement("OPTION");
                                        var recurso = textSplitted[y].split(',')[0];
                                        var aplicacao = textSplitted[y].split(',')[1];
                                        var atividade = textSplitted[y].split(',')[2];

                                        cdsFonteRecurso += recurso + ',';
                                        cdsAplicacao += aplicacao + ',';
                                        cdsProjetoAtividade += atividade + ',';

                                        // TODO: Ajustar texto a ser exibido.
                                        option.text = '(' + recurso + ');(' + aplicacao + ');(' + atividade + ')';
                                        option.value = '(' + recurso + ');(' + aplicacao + ');(' + atividade + ')';
                                        destino.find("option").end().append("<option value='" + option.value + "'>" + option.text + "</option>").val("'" + option.value + "'");
                                    };
                                }
                            };

                            cdsFonteRecurso = cdsFonteRecurso.substr(0, cdsFonteRecurso.length - 1) + ')';
                            cdsAplicacao = cdsAplicacao.substr(0, cdsAplicacao.length - 1) + ')';
                            cdsProjetoAtividade = cdsProjetoAtividade.substr(0, cdsProjetoAtividade.length - 1) + ')';

                            var cdTodos = cdsFonteRecurso + ';' + cdsAplicacao + ';' + cdsProjetoAtividade;
                            destino.find("option").end().prepend("<option value='" + cdTodos + "'>" + "TODOS" + "</option>").val("'" + cdTodos + "'");
                        }
                        else {
                            $("#" + prDestino).empty(); // Para COVID => value=''
                            $("#" + prDestino).append("<option value=''>TODOS</option>")
                        }
                    }
                    destino.css("background-color", "#ffffff");
                },
                error: function (erro) {
                    alert(erro.responseText);
                    destino.css("background-color", "#ffffff");
                }
            });
        }
    }
}

function consultarAnosCargaLC(prFuncao, prDestino, prParam1) {

    var destino = $("#" + prDestino);
    var params = "";

    if (destino && $("#" + prParam1).val() != "") {

        // validação campo #1
        if ($("#" + prParam1) && $("#" + prParam1).val() != "") {
            params += "&param1=" + $("#" + prParam1).val();
        }
        // chamada ajax
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=" + prFuncao + replaceAll(params, "/", "|"),
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                    }
                }
                destino.css("background-color", "#ffffff");
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }
}
function consultarDadosComboFuncao(prFuncao, prDestino, param1) {
    var base = $("#" + param1).val().split("|")[1];
    var destino = $("#" + prDestino);
    limparDados(prDestino);
    destino.find('option')
        .remove()
        .end()
        .append('<option value="">SELECIONE</option>')
        .val('');
    destino.trigger("change");
    postDataAjaxCP(destino, prFuncao, base);
}

function consultarDadosComboLC(prFuncao, prDestino, prParam1, prParam2) {
    var destino = $("#" + prDestino);
    var params = "";

    limparDados(prDestino);
    //limparDados("cmbUnidadeGestoraLC");

    destino.find('option')
        .remove()
        .end()
        .append('<option value="">SELECIONE</option>')
        .val('');

    destino.trigger("change");

    if (destino && $("#" + prParam1).val() != "" && $("#" + prParam2).val() != "") {

        // validação campo #1
        if ($("#" + prParam1) && $("#" + prParam1).val() != "") {
            params += "&param1=" + $("#" + prParam1).val();
        }

        // validação campo #2
        if ($("#" + prParam2).val() != "") {

            if ($("#" + prParam2) && $("#" + prParam2).val() != "") {
                params += "&param2=" + $("#" + prParam2).val();
            }
        }

        // chamada ajax
        postDataAjaxLc(destino, prFuncao, params);

    }
}


function consultarDadosLC(prOrigem, prDestino) {
    var destino = $("#" + prDestino);

    if ($("#" + prOrigem).val() != "" || $("#" + prOrigem).val() == "") {
        //LimpaCombo(destino);
        destino.find('option')
            .remove()
            .end()
            .append('<option value="">SELECIONE</option>')
            .val('');
    }
    destino.trigger("change");
}

function postDataAjaxCP(destino, prFuncao, base) {
    console.log("acao.asp?acao=" + prFuncao + "&base=" + base)
    $("#cmbFuncao").attr("disabled", false);
    $('#confirma').attr('disabled', false);
    $.ajax({
        type: "POST",
        url: "acao.asp?acao=" + prFuncao + "&base=" + base,
        data: "",
        async: false,
        cache: false,
        success: function (d) {
            if (d && d.length > 0) {
                var dados = d.split("|");
                for (x = 0; x < dados.length; x++) {
                    var dado = dados[x];
                    var dadosID = dado.split("#")
                    if (dado != "") {
                        destino.append("<option value='" + dadosID[1] + "'>" + dadosID[0] + "</option>").val("'" + dadosID[1] + "'");
                    }
                    destino.removeAttr("disabled");
                };
            };

            var funcaoSelecionada = getUrlVars()['funcao'];
            console.log(funcaoSelecionada);
            console.log("x");
            if ($('#cmbFuncao option[value=' + funcaoSelecionada + ']').length > 0) {
                console.log("y");
                if (funcaoSelecionada.trim()) {
                    console.log("y1");
                    $('#cmbFuncao option[value=' + funcaoSelecionada + ']').attr('selected', 'selected');
                    $("#cmbFuncao").attr("disabled", true);
                }
                else {
                    console.log("y2");
                    alert('A função não está disponível para o ano selecionado.\r\nVocê pode selecionar outras funções disponíveis.');
                    $('#confirma').attr('disabled', true);
                }

            }


        },

        error: function (jerro) {
            destino.attr('disabled', true);
            alert(jerro.responseText);
        }
    });
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function postDataAjaxLc(destino, prFuncao, params) {
    $.ajax({
        type: "POST",
        url: "acao.asp?acao=" + prFuncao + replaceAll(params, "/", "|"),
        data: "",
        async: false,
        cache: false,
        success: function (d) {
            if (d && d.length > 0) {
                var dados = d.split("|");
                for (x = 0; x < dados.length; x++) {
                    var dado = dados[x];
                    var dadosID = dado.split("#")
                    if (dado != "") {
                        destino.append("<option value='" + dadosID[1] + "'>" + dadosID[0] + "</option>").val("'" + dadosID[1] + "'");
                    }
                    destino.removeAttr("disabled");
                };
            }
        },

        error: function (jerro) {
            destino.attr('disabled', true);
            alert(jerro.responseText);
        }
    });
}

function consultarDadosEXportaBDCP(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, prParam5, prParam6) {

    var params = "";
    var obj = $("#" + prParam5);

    var pr6 = "";
    if ($("#hndAcao").val() == 10 || $("#hndItem").val() == 3) //ADM
    {
        pr6 = "cmbUnidadeCP";
    } else {
        pr6 = $("#" + prParam6 + " option:selected").text() + '|' + $("#" + prParam6 + " option:selected").val().split('|')[1];
    }

    if (obj && obj.val() != "") {
        consultarDados(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, pr6);
    } else {
        consultarDados(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, "");
    }
}

function consultarDadosCP(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, prParam5, prLimpar) {

    var naturezaDespesa = $("#cmbDesdobramentoDespesa");

    if (naturezaDespesa != "") {
        preencheNaturezaDespesa();
    }

    if (prLimpar === undefined) {
        prLimpar = true;
    }

    var params = "";
    var obj = $("#" + prParam5);

    if (obj && obj.val() != "") {
        consultarDados(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, prParam5, prLimpar);
    } else {
        consultarDados(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, "", prLimpar);
    }
}

function changeTipoEsportaDados() {
    var dscAjuda = "Todas as informações referente a parte de administração.";
    var valTipoExporta = $('#cmbTipoEsportacaoDados').find('option:selected').val();


    $('#txtDataInicial').parent('td').parent('tr').show();
    $('#txtDataFinal').parent('td').parent('tr').show();

    $('#txtDataInicial').val("");
    $('#txtDataFinal').val("");

    $('#cmbMesInicial').parent('td').parent('tr').hide();
    $('#cmbMesFinal').parent('td').parent('tr').hide();
    $('#cmbMesInicial option[value=""]').attr('selected', 'selected');
    $('#cmbMesFinal option[value=""]').attr('selected', 'selected');
    $('#cmbExercicio option[value=""]').attr('selected', 'selected');


    switch (valTipoExporta) {
        case "2"://LC
            dscAjuda = "Informações de Licitações, Contratos, Produtos e Fornecedores";
            $("#cmbExercicio").parent('td').parent('tr').show();
            $("#cmbUnidadeLC")[0].setAttribute("onchange", "consultarDadosLC('cmbUnidadeLC', 'cmbExercicio'); consultarAnosCargaLC('ConsultarDataLC', 'cmbExercicio', 'cmbUnidadeLC')");
            $("#cmbExercicio")[0].setAttribute("onchange", "consultarDadosLC('cmbExercicio', 'cmbUnidadeGestoraLC');consultarDadosComboLC('ConsultarUnidadeGestoraLC', 'cmbUnidadeGestoraLC', 'cmbExercicio', 'cmbUnidadeLC'); ExibicaoPeriodoExportarDados($('#cmbExercicio'),$('#txtDataInicial').parent('td').parent('tr'), $('#cmbMesInicial').parent('td').parent('tr')),consultarMesGeral('cmbExercicio##LC_Dim_Tempo#LC_Fato_ContratoProcessos#dt_Homologacao#' + $('#cmbUnidadeLC option:selected').val());");
            break;
        case "6": //CM
            dscAjuda = "Informações de Itens de Estoque";
            $("#cmbExercicio").parent('td').parent('tr').show();
            //Este Deve ser alterado
            $("#cmbUnidadeLC")[0].setAttribute("onchange", "consultarDadosLC('cmbUnidadeLC', 'cmbExercicio'); consultarAnosCargaLC('ConsultarDataCM', 'cmbExercicio','cmbUnidadeLC');");
            $("#cmbExercicio")[0].setAttribute("onchange", "consultarDadosLC('cmbExercicio', 'cmbUnidadeGestoraLC'); consultarDados('RetornaUnidadeGestoraCM', 'cmbUnidadeGestoraLC', this.id,'cmbUnidadeLC');");
            $('#cmbExercicio').change(function () {
                if (this.value > 0) {

                    $('#cmbMesInicial').parent('td').parent('tr').show();
                    $('#cmbMesFinal').parent('td').parent('tr').show();
                    $('#txtDataInicial').parent('td').parent('tr').hide();
                    $('#txtDataFinal').parent('td').parent('tr').hide();


                    LimpaCombo("cmbMesInicial");
                    LimpaCombo("cmbMesFinal");

                    $("#cmbMesInicial").css("display", "block");
                    //$("#mensagemAteCombo").css("display", "block");

                    $("#cmbMesInicial").removeAttr("style");
                    //$("#mensagemAteCombo").removeAttr("style");

                    var comboMesesEstoque;

                    for (xx = 0; xx < 2; xx++) {

                        if (xx == 0) {
                            comboMesesEstoque = document.getElementById("cmbMesInicial");
                        } else {
                            comboMesesEstoque = document.getElementById("cmbMesFinal");
                        }

                        var opt0 = document.createElement("option");
                        opt0.value = "0";
                        opt0.text = "SELECIONE";
                        comboMesesEstoque.add(opt0, comboMesesEstoque.options[0]);

                        for (x = 1; x < 13; x++) {
                            var opt = document.createElement("option");
                            opt.value = x;
                            if (x == 1) {
                                opt.text = "JANEIRO";
                            } else if (x == 2) {
                                opt.text = "FEVEREIRO";
                            } else if (x == 3) {
                                opt.text = "MARÇO";
                            } else if (x == 4) {
                                opt.text = "ABRIL";
                            } else if (x == 5) {
                                opt.text = "MAIO";
                            } else if (x == 6) {
                                opt.text = "JUNHO";
                            } else if (x == 7) {
                                opt.text = "JULHO";
                            } else if (x == 8) {
                                opt.text = "AGOSTO";
                            } else if (x == 9) {
                                opt.text = "SETEMBRO";
                            } else if (x == 10) {
                                opt.text = "OUTUBRO";
                            } else if (x == 11) {
                                opt.text = "NOVEMBRO";
                            } else if (x == 12) {
                                opt.text = "DEZEMBRO";
                            }
                            comboMesesEstoque.add(opt, comboMesesEstoque.options[x]);
                        };
                    };

                } else {
                    limparDados("cmbMesInicial");
                }
            }).change();

            break;
        case "7": //PP
            dscAjuda = "Informações de Itens Patrimoniais";
            $("#cmbExercicio").parent('td').parent('tr').hide();
            $("#cmbUnidadeLC")[0].setAttribute("onchange", "consultarDadosLC('cmbUnidadeLC', 'cmbUnidadeGestoraLC'); consultarDados('RetornaUnidadeGestoraPP', 'cmbUnidadeGestoraLC', 'cmbUnidadeLC')");;
            break;
        case "8": //AF
            dscAjuda = "Informações da Frota Municipal";
            $("#cmbExercicio").parent('td').parent('tr').hide();
            $("#cmbUnidadeLC")[0].setAttribute("onchange", "consultarDadosLC('cmbUnidadeLC', 'cmbUnidadeGestoraLC'); consultarDados('RetornaUnidadeGestoraAF', 'cmbUnidadeGestoraLC', 'cmbUnidadeLC')");;
            break;

    }
    consultarDadosLC('cmbTipoEsportacaoDados', 'cmbUnidadeLC');
    consultarAnosCargaLC('RetornaTodosDatabases', 'cmbUnidadeLC', 'cmbTipoEsportacaoDados');
    $('#dscTipo').text(dscAjuda);
}

function SetarBancoDados(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, prParam5, prLimpar) {

    if (prLimpar === undefined) {
        prLimpar = true;
    }

    var destino = $("#" + prDestino);

    var params = "";
    var obj = $("#" + prParam1);
    if (obj && obj.val() != "") {
        params += "&param1=" + obj.val();
    }
    else if (prLimpar) {
        limparDados(prDestino);
    }

    if (prParam2 != "") {
        obj = $("#" + prParam2);
        if (obj) {
            params += "&param2=" + obj.val();
        }
    }

    if (prParam3 != "") {
        obj = $("#" + prParam3);
        if (obj) {
            if (obj.val()) {
                params += "&param3=" + obj.val();
            }
            else {
                params += "&param3=" + prParam3;
            }
        }
    }
    if (prParam4 != "") {
        obj = $("#" + prParam4);
        if (obj) {
            if (obj.val()) {
                params += "&param4=" + obj.val();
            }
            else {
                params += "&param4=" + prParam4;
            }
        }
    }
    if (prParam5 != "") {
        obj = $("#" + prParam5);
        if (obj) {
            if (obj.val()) {
                params += "&param5=" + obj.val();
            }
            else {
                params += "&param5=" + prParam5;
            }
        }
    }
    destino.css("background-color", "#cecece");
    destino.attr("disabled", true);
    $.ajax({
        type: "GET",
        global: false,
        url: "acao.asp",
        data: "acao=" + prFuncao + replaceAll(params, "/", "|"),
        dataType: "json",
        async: false,
        cache: false,
        success: function (jdados) {
            if (prLimpar) {
                limparDados(prDestino);
            }
            if (jdados) {
                if (jdados.Dados.length > 0) {
                    destino.removeAttr("disabled");
                    for (x = 0; x < jdados.Dados.length; x++) {
                        var dado = jdados.Dados[x];
                        var optn = document.createElement("OPTION");
                        optn.text = dado.text;
                        optn.value = dado.id;
                        destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                    };
                }
            }
            //else {
            //    destino.attr("disabled", true);
            //}
            destino.css("background-color", "#ffffff");
            destino.attr("disabled", false);
        },
        // error: function (jerro) {
        //var w = window.open("", "Erro", "scrollbars,status,resizable")
        //w.document.write(jerro.responseText);
        //w.document.close();
        // alert(jerro.responseText);
        // destino.css("background-color", "#ffffff");
        //}
    });

}


function consultarDados(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, prParam5, prLimpar) {

    if (prLimpar === undefined) {
        prLimpar = true;
    }

    var destino = $("#" + prDestino);

    if ((destino) && (destino.is(":visible"))) {

        var params = "";
        var obj = $("#" + prParam1);
        if (obj && obj.val() != "") {
            params += "&param1=" + obj.val();
        }
        else if (prLimpar) {
            limparDados(prDestino);
        }

        if (prParam2 != "") {
            obj = $("#" + prParam2);
            if (obj) {
                params += "&param2=" + obj.val();
            }
        }

        if (prParam3 != "") {
            obj = $("#" + prParam3);
            if (obj) {
                if (obj.val()) {
                    params += "&param3=" + obj.val();
                }
                else {
                    params += "&param3=" + prParam3;
                }
            }
        }
        if (prParam4 != "") {
            obj = $("#" + prParam4);
            if (obj) {
                if (obj.val()) {
                    params += "&param4=" + obj.val();
                }
                else {
                    params += "&param4=" + prParam4;
                }
            }
        }
        if (prParam5 != "") {
            obj = $("#" + prParam5);
            if (obj) {
                if (obj.val()) {
                    params += "&param5=" + obj.val();
                }
                else {
                    params += "&param5=" + prParam5;
                }
            }
        }
        destino.css("background-color", "#cecece");
        destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=" + prFuncao + replaceAll(params, "/", "|"),
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                if (prLimpar) {
                    limparDados(prDestino);
                }
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                    }
                }
                //else {
                //    destino.attr("disabled", true);
                //}
                destino.css("background-color", "#ffffff");
                destino.attr("disabled", false);
            },
            // error: function (jerro) {
            //var w = window.open("", "Erro", "scrollbars,status,resizable")
            //w.document.write(jerro.responseText);
            //w.document.close();
            // alert(jerro.responseText);
            // destino.css("background-color", "#ffffff");
            //}
        });
    }
}

function consultarDadosCondicao(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, prParam5, prParam6) {

    var destino = $("#" + prDestino);
    if ((destino) && (destino.is(":visible"))) {
        var params = "";
        var obj = $("#" + prParam1);
        if (obj && obj.val() != "") {
            params += "&param1=" + obj.val();
        }
        else {
            limparDados(prDestino);
        }

        if (prParam2 != "") {
            obj = $("#" + prParam2);
            if (obj) {
                if (obj.val()) {
                    params += "&param2=" + obj.val();
                }
            }
        }

        if (prParam3 != "") {
            obj = $("#" + prParam3);
            if (obj) {
                if (obj.val()) {
                    params += "&param3=" + obj.val();
                }
                else {
                    params += "&param3=" + prParam3;
                }

            }
        }

        if (prParam4 != "") {
            obj = $("#" + prParam4);
            if (obj) {
                if (obj.val()) {
                    params += "&param4=" + obj.val();
                }
                else {
                    params += "&param4=" + prParam4;
                }

            }
        }

        if (prParam5 != "") {
            obj = $("#" + prParam5);
            if (obj) {
                if (obj.val()) {
                    params += "&param5=" + obj.val();
                }
                else {
                    params += "&param5=" + prParam5;
                }
            }

        }

        if (prParam6 != "") {
            params += "&param6=" + prParam6;
        }


        destino.css("background-color", "#cecece");
        destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=" + prFuncao + replaceAll(params, "/", "|"),
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                limparDados(prDestino);
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                    }
                }
                //else {
                //    destino.attr("disabled", true);
                //}
                destino.css("background-color", "#ffffff");
                destino.attr("disabled", false);
            },
            error: function (jerro) {
                /*var w = window.open("", "Erro", "scrollbars,status,resizable")
                w.document.write(jerro.responseText);
                w.document.close();*/
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }

}

function replaceAll(string, texto, novotexto) {
    while (string.indexOf(texto) != -1) {
        string = string.replace(texto, novotexto);
    }
    return string;
}

function atualizaFiltroPagina() {
    var aux = readCookie("ckAno");
    if (aux) {
        $("#cmbAno").val(aux);
        $("#cmbAno").change();

    }

    var aux = readCookie("ckDataVigenciaLC")
    if (aux) {
        $("#cmbDataVigenciaLC").val(aux);
    }

    var aux = readCookie("ckSitProcessoLicit")
    if (aux) {
        $("#cmbSitProcessoLicit").val(aux);
    }
    if ($("#cmbSitProcessoLicit").size() > 0) {
        licSituacaoFiltrarPor($("#cmbSitProcessoLicit"));
    }

    aux = readCookie("ckLeiLicitacoes");
    if (aux) {
        $("#cmbLeiLicitacoes").val(aux);
    }

    aux = readCookie("ckLicitacaoCompartilhada");
    if (aux) {
        $("#cmbLicitacaoCompartilhada").val(aux);
    }
    
    aux = readCookie("ckModoExecucaoModalidade");
    if (aux) {
        $("#cmbModoExecucaoModalidade").val(aux);
    }

    aux = readCookie("ckRegistroPrecos");
    if (aux) {
        $("#cmbRegistroPrecos").val(aux);
    }

    aux = readCookie("ckSituacaoEmergenciaLicitacoes");
    if (aux) {
        $("#cmbSituacaoEmergenciaLicitacoes").val(aux);
    }

    aux = readCookie("ckSituacaoEmergenciaContratos");
    if (aux) {
        $("#cmbSituacaoEmergenciaContratos").val(aux);
    }

    aux = readCookie("ckSituacaoEmergenciaReceitasDespesas");
    if (aux) {
        $("#cmbSituacaoEmergenciaReceitasDespesas").val(aux);
    }

    aux = readCookie("ckFonteRecursoCodigoAplicacaoAcaoGoverno");
    if (aux) {
        $("#cmbFonteRecursoCodigoAplicacaoAcaoGoverno").val(aux);
    }

    aux = readCookie("ckExercicio");
    if (aux) {
        $("#cmbExercicio").val(aux);
    }


    aux = readCookie("ckDataGP");
    if (aux) {
        $("#cmbDataGP").val(aux);
    }
    aux = readCookie("ckUnidadeCP");
    if (aux) {
        $("#cmbUnidadeCP").val(aux);
        $("#cmbUnidadeCP").change();
    }
    aux = readCookie("ckDataInicial");
    if (aux) {
        $("#txtDataInicial").val(aux);
    }
    aux = readCookie("ckDataFinal");
    if (aux) {
        $("#txtDataFinal").val(aux);
        $("#txtDataFinal").blur();
    }

    aux = readCookie("ckDataInicialAR");
    if (aux) {
        $("#txtDataInicialAR").val(aux);
    }
    aux = readCookie("ckDataFinalAR");
    if (aux) {
        $("#txtDataFinalAR").val(aux);
        $("#txtDataFinalAR").blur();
    }

    aux = readCookie("ckMesInicial");
    if (aux) {
        $("#cmbMesInicial").val(aux);
        $("#cmbMesInicial").change();
        aux = readCookie("ckMesFinal");
        if (aux) {
            $("#cmbMesFinal").val(aux);
            $("#cmbMesFinal").change();
        }
    }

    aux = readCookie("ckMesInicialGP");
    if (aux) {
        $("#cmbMesInicialGP").val(aux);
        $("#cmbMesInicialGP").change();
        aux = readCookie("ckMesFinalGP");
        if (aux) {
            $("#cmbMesFinalGP").val(aux);
            $("#cmbMesFinalGP").change();
        }
    }

    aux = readCookie("ckUnidadeGestora");
    if (aux) {
        $("#cmbUnidadeGestora").val(aux);
    }
    aux = readCookie("ckCategoria");
    if (aux) {
        $("#cmbCategoria").val(aux.split(','));
    }
    aux = readCookie("ckApresentarPor");
    if (aux) {
        $("#cmbApresentarPor").val(aux);
    }
    aux = readCookie("ckEmpenhoOrcamentario");
    if (aux) {
        $("#ckEmpenhoOrcamentario").val(aux);
    }
    aux = readCookie("ckEmpenhoExtra");
    if (aux) {
        $("#ckEmpenhoExtra").val(aux);
    }
    aux = readCookie("ckEmpenhoResto");
    if (aux) {
        $("#ckEmpenhoResto").val(aux);
    }
    aux = readCookie("ckEstado");
    if (aux) {
        $("#cmbEstado").val(aux);
        aux = readCookie("ckMunicipio");
        if (aux) {
            $("#cmbEstado").change();
            $("#cmbMunicipio").val(aux);
        }
    }
    aux = readCookie("ckDataFiltro");
    if (aux) {
        $("#cmbDataFiltro").val(aux);
    }
    //Filtro oculto
    if ($("#hndAcao").val() == 1) //ADM
    {
        if ($("#hndItem").val() == 2) //Licitacoes
        {
            Exibir('trTipoLicitacaoConcurso1', $('#ckTipoModalidadeConcurso').is(':checked'));
            Exibir('trTipoLicitacaoConcurso2', $('#ckTipoModalidadeConcurso').is(':checked'));
        }
    }
}

function createCookie(name, value, days) {
    window.localStorage.setItem(name, value);
}

function MinMax(iconeID, tableID) {
    $("#" + tableID).find("tr").each(function (index) {
        if (index > 0) {
            var child = $(this);
            if (child.css("display") == "none") {
                child.show();
            }
            else {
                child.hide();
            }
        }
    });
    var icone = $("#" + iconeID);
    if (icone.attr("alt") == "Minimizar") {
        icone.attr("alt", "Maximizar");
        icone.attr("src", "max.png");
    }
    else {
        icone.attr("alt", "Minimizar");
        icone.attr("src", "min.png");
    }
}

function PreencheHidden(cmbID, hndID) {
    $("#" + hndID).val($("#" + cmbID + " option:selected").text());

    if ($("#" + cmbID).attr("type") == "select-multiple") {
        var str = "";
        $("#" + cmbID + " option:selected").each(function () {
            str += $(this).text() + ",<br>";
        });
        $("#" + hndID).val(str.slice(0, -5));
    }
}

function montaURLDetalhamentoItem(urlItem) {
    exibirAguarde();
    window.location.href = urlItem
    exibirAguarde(false);
}

function fnRedirecionarTelaLC(urlItemLC) {
    //alert("Ao clicar em [OK] será aberta a tela de pesquisa de processo licitatório, onde será possível efetuar a seleção de dados através da indicação de parâmetros.", "Atenção");
    var exibir = true;

    var agd = document.getElementById("redirecionaLC");
    agd.style.display = "block";

    window.scrollTo(0, 0);
    resizeLC();

    $('<a>', {
        class: 'linkRedirecionar',
        href: urlItemLC,
        target: '_blank',
        text: 'OK'
    }).appendTo('#aguardeinternoLCTable');

}

function fecharJanela() {
    var agd = document.getElementById("redirecionaLC");
    agd.style.display = "none";
    $('.linkRedirecionar').remove();
}

function IncluirHistorico(linhaID) {
    var linha = $("#" + linhaID);
    var tabela = linha.parent().parent();
    var texto = ""
    var link = ""
    linha.children().each(function (index) {
        var child = $(this);
        if (child.attr("exibir")) {
            if (child.attr("exibir") != 0) {
                for (x = 0; x < parseInt(child.attr("exibir")); x++) {
                    texto += "|";
                }
            }
        }
        else {
            if (texto != "") { texto += "|"; }
            //Busca a legenda do table e só adiciono se não houver nenhum texto
            if (texto.replace("|", "") == "") {
                texto = tabela.attr("legenda") + texto;
            }
            texto += child.text();
        }
        if (index == 0) {
            link = child.find("a").attr("href");
        }
    });
    if (tabela.attr("novocab")) {
        if (tabela.attr("novocab") != "") {
            texto = tabela.attr("novocab") + texto;
        }
    }

    var spl
    spl = link.split(';');
    link = "";
    for (x = 0; x < spl.length; x++) {
        if (x > 0) {
            if (spl[x].substring(0, 25) == "montaURLDetalhamentoItem(") {
                link += spl[x].substring(26, spl[x].length - 2);
            }
        }
    }
    link = escape(link);
    $.ajax({
        type: "POST",
        url: "acao.asp?acao=IncluirHistorico&visao=" + $("#hndvisao").val() +
            "&produto=" + $("#hndAcao").val() +
            "&nivel=" + QueryString("nivel") +
            "&link=" + link,
        data: texto,
        async: false,
        cache: false,
        error: function (jerro) {
            alert(jerro.responseText);
        }
    });
}

function ExcluirHistorico(linha) {
    $.ajax({
        type: "POST",
        url: "acao.asp?acao=ExcluirHistorico&visao=" + linha,
        data: "",
        async: false,
        cache: false,
        error: function (jerro) {
            alert(jerro.responseText);
        }
    });
}

function QueryString(variavel) {
    var result = ""
    var variaveis = location.search.replace(/\x3F/, "").replace(/\x2B/g, " ").split("&");
    var nvar;
    if (variaveis != "") {
        var qs = [];
        for (var i = 0; i < variaveis.length; i++) {
            nvar = variaveis[i].split("=");
            qs[nvar[0]] = unescape(nvar[1]);
        }
        if (qs[variavel]) { result = qs[variavel]; }
    }
    return result;
}

function SetNotCheckBox(idCheck, idTodos) {
    $("#" + idCheck).attr("checked", !$("#" + idCheck).is(":checked"));
    if (!$("#" + idCheck).is(":checked")) {
        $("#" + idTodos).attr("checked", false);
    }
}

function SetGroupCheckBox(elemHtml, checked) {
    jQuery.each($(elemHtml + " input:checkbox"), function () {

        var elem = $(this);

        if (checked) {
            if (elem.attr("disabled") == '') {
                $(this).attr("checked", true);
            }
        }
        else {
            $(this).attr("checked", false);
        }
    });
}

function SetTodosCheckBox(idCheck, idTodos, idAux1, idAux2, idAux3) {
    if (!$("#" + idCheck).is(":checked")) {
        $("#" + idTodos).attr("checked", false);
    }
    if (!$("#" + idCheck).is(":checked") && idAux1) {
        $("#" + idAux1).attr("checked", $("#" + idCheck).is(":checked"));
    }
    if (!$("#" + idCheck).is(":checked") && idAux2) {
        $("#" + idAux2).attr("checked", $("#" + idCheck).is(":checked"));
    }
    //    if (!$("#"+idCheck).is(":checked") && idAux3)
    //    {
    //        $("#"+idAux3).attr("checked", $("#"+idCheck).is(":checked"));
    //    }
}

function Exibir(idObj, exibir) {
    if (exibir) {
        $("#" + idObj).show();
    }
    else {
        $("#" + idObj).hide();
    }
}

function getLastDateOfMonth(Year, Month) {
    return (new Date((new Date(Year, Month, 1)) - 1));
}

function createObjectURL(file) {
    if (window.webkitURL) {
        return window.webkitURL.createObjectURL(file);
    } else if (window.URL && window.URL.createObjectURL) {
        return window.URL.createObjectURL(file);
    } else if (URL.createObjectURL) {
        return URL.createObjectURL(file);
    } else {
        return createObjectURL(file);
    }
}

function downloadXML(itemMenu) {

    var dataInicial = "";
    var ano = "";
    var dataFinal = "";
    var unidadeGestora = "-1";
    var banco = "";
    var NomeFornecedor = "";
    var CPFCNPJFornecedor = "";
    var TipoDespesa = "";
    var tipoEsportacao = "";

    if (ValidaForm() == true) {

        //'DRO - 353774 - 26/10/2018 - Inicio
        //if ($('#cmbExercicio option:selected').index() == 0) { // Por data
        //    if ($('#txtDataInicial').val() != "" && $('#txtDataFinal').val() != "") {
        //        dataInicial = $('#txtDataInicial').val().substr(6, 4) + $('#txtDataInicial').val().substr(3, 2) + $('#txtDataInicial').val().substr(0, 2);
        //        dataFinal = $('#txtDataFinal').val().substr(6, 4) + $('#txtDataFinal').val().substr(3, 2) + $('#txtDataFinal').val().substr(0, 2);;
        //    }
        //
        //}
        //else { // Por mes
        //    if (($('#cmbAno option:selected').val() == '') || ($('#cmbAno option:selected').index() == -1)) {
        //        dataInicial = $('#cmbExercicio option:selected').text() + ('0' + $('#cmbMesInicial option:selected').val()).slice(-2) + '01';
        //        dataFinal =
        //			$('#cmbExercicio option:selected').text() +
        //			('0' + $('#cmbMesFinal option:selected').val()).slice(-2) +
        //			('0' + getLastDateOfMonth($('#cmbExercicio option:selected').text(), $('#cmbMesFinal option:selected').val()).getDate()).slice(-2);
        //   }
        //    else {
        //        dataInicial = $('#cmbAno option:selected').text() + ('0' + $('#cmbMesInicial option:selected').val()).slice(-2) + '01';
        //        dataFinal =
        //			$('#cmbAno option:selected').text() +
        //			('0' + $('#cmbMesFinal option:selected').val()).slice(-2) +
        //			('0' + getLastDateOfMonth($('#cmbAno option:selected').text(), $('#cmbMesFinal option:selected').val()).getDate()).slice(-2);
        //   }
        //}

        if ($('#cmbExercicio option:selected').index() == 0) { // Por data
            if ($('#txtDataInicial').val() != "" && $('#txtDataFinal').val() != "") {
                dataInicial = $('#txtDataInicial').val().substr(6, 4) + $('#txtDataInicial').val().substr(3, 2) + $('#txtDataInicial').val().substr(0, 2);
                dataFinal = $('#txtDataFinal').val().substr(6, 4) + $('#txtDataFinal').val().substr(3, 2) + $('#txtDataFinal').val().substr(0, 2);;
            }
            else {
                if ($('#cmbMesInicial option:selected').text() != "" && $('#cmbMesInicial option:selected').text() != "") {
                    dataInicial = $('#cmbAno option:selected').text() + ('0' + $('#cmbMesFinal option:selected').val()).slice(-2) + '01';
                    dataFinal =
                        $('#cmbAno option:selected').text() +
                        ('0' + $('#cmbMesFinal option:selected').val()).slice(-2) +
                        ('0' + getLastDateOfMonth($('#cmbAno option:selected').text(), $('#cmbMesFinal option:selected').val()).getDate()).slice(-2);
                }
            }
        }
        else { // Por mes
            if (($('#cmbAno option:selected').val() == '') || ($('#cmbAno option:selected').index() == -1)) {
                dataInicial = $('#cmbExercicio option:selected').text() + ('0' + $('#cmbMesInicial option:selected').val()).slice(-2) + '01';
                dataFinal =
                    $('#cmbExercicio option:selected').text() +
                    ('0' + $('#cmbMesFinal option:selected').val()).slice(-2) +
                    ('0' + getLastDateOfMonth($('#cmbExercicio option:selected').text(), $('#cmbMesFinal option:selected').val()).getDate()).slice(-2);
            }
            else {
                dataInicial = $('#cmbAno option:selected').text() + ('0' + $('#cmbMesInicial option:selected').val()).slice(-2) + '01';
                dataFinal =
                    $('#cmbAno option:selected').text() +
                    ('0' + $('#cmbMesFinal option:selected').val()).slice(-2) +
                    ('0' + getLastDateOfMonth($('#cmbAno option:selected').text(), $('#cmbMesFinal option:selected').val()).getDate()).slice(-2);
            }
        }
        //'DRO - 353774 - 26/10/2018 - Fim

        //Ano
        if (($('#cmbAno option:selected').val() == '') || ($('#cmbAno option:selected').index() == -1)) {
            ano = $('#cmbExercicio option:selected').text();
        }
        else {
            ano = $('#cmbAno option:selected').text();
        }

        //Unidade Gestora
        //'DRO - 353774 - 26/10/2018 - Inicio
        //if ($('#cmbUnidadeGestora option:selected').val() != "")
        //    unidadeGestora = $('#cmbUnidadeGestora option:selected').val();
        if ($('#cmbUnidadeGestora option:selected').val() != '' && $('#cmbUnidadeGestora option:selected').index() != -1) {
            unidadeGestora = $('#cmbUnidadeGestora option:selected').val();
        }
        else {
            unidadeGestora = "-1";
        }
        //'DRO - 353774 - 26/10/2018 - Fim

        //NomeFornecedor
        if ($('#txtNomeFornecedor').val() != "")
            NomeFornecedor = $('#txtNomeFornecedor').val();
        //CPFCNPJFornecedor
        if ($('#txtCPFCNPJFornecedor').val() != "")
            CPFCNPJFornecedor = $('#txtCPFCNPJFornecedor').val();
        //Unidade Gestora LC
        if ($('#cmbUnidadeGestoraLC option:selected').val() != "")
            unidadeGestora = $('#cmbUnidadeGestoraLC option:selected').val();

        if (banco == "" || banco == null) { banco = $('#cmbUnidadeLC').val() };
        if (banco == "" || banco == null) {
            if ($('#cmbUnidadeCP').val() != null) {
                banco = $('#cmbUnidadeCP').val().split('|')[1]
            }

        };
        if (banco == "" || banco == null) { banco = $('#cmbUnidadeAR').val() };

        //  Prepara URL com parâmetros de consulta
        var strURL = "geraxml.asp"
            + "?item=" + itemMenu
            + "&banco=" + banco
            + "&exercicio=" + ano
            + "&dataInicial=" + dataInicial
            + "&dataFinal=" + dataFinal
            + "&unidadeGestora=" + unidadeGestora
            + "&nmFornecedor=" + NomeFornecedor;

        if ($('#txtCPFCNPJFornecedor').val() != "") {
            CPFCNPJFornecedor = $('#txtCPFCNPJFornecedor').val();
            strURL = strURL + "&CPFCNPJFornecedor=" + CPFCNPJFornecedor;
        }
        if ($('#cmbDiariasPassagens').val() != "") {
            TipoDespesa = $('#cmbDiariasPassagens').val();
            strURL = strURL + "&TipoDespesa=" + TipoDespesa;
        }
        if ($('#cmbTipoTransferencia').val() != "") {
            TipoDespesa = $('#cmbTipoTransferencia').val();
            strURL = strURL + "&TipoDespesa=" + TipoDespesa;
        }
        if ($('#cmbTipoEsportacaoDados').find('option:selected').val() != "") {
            var tipoEsportacao = $('#cmbTipoEsportacaoDados').find('option:selected').val();
            strURL = strURL + "&TipoEsportacaoDados=" + tipoEsportacao;
        }


        var iframe = document.createElement("iframe");
        exibirAguarde();
        iframe.id = "ifrmDownload";
        iframe.style.display = "none";

        var htm = "<iframe id='ifrmDownload' src='" + strURL + "' onload='finalizaDownload();'></iframe>";
        document.getElementById('conteudo').innerHTML = htm;

        var ST_LOADING = 1
        var ST_LOADED = 4

        //Verifica erros
        var client = new XMLHttpRequest();
        client.open("GET", strURL, true);
        client.responseType = "blob";
        client.send();
        client.onreadystatechange = function () {
            if (this.readyState == ST_LOADED) {
                if (this.getResponseHeader("ERRO")) {
                    jAlert(this.getResponseHeader("ERRO"), "Atenção");
                    exibirAguarde(false);
                }
            }
        }
    }
}

function finalizaDownload() {
    exibirAguarde(false);
    if (document.getElementById("ifrmDownload").contentWindow.document.getElementById("lnkDownload") != null) {
        document.getElementById("ifrmDownload").src = document.getElementById("ifrmDownload").contentWindow.document.getElementById("lnkDownload").href;
    }
}

function licSituacaoFiltrarPor(item) {
    var sel = $(item).find('option:selected').val();
    if (sel == "Aberta" || sel == "Deserta" || sel == "Frustrada") {
        $("#cmbDataFiltro").find("option[value=3]").remove();
    } else {
        if ($("#cmbDataFiltro").find("option[value=3]").size() == 0) {
            $("#cmbDataFiltro").append($("<option>").val(3).text("DATA DE HOMOLOGAÇÃO"));
        }
    }
}

/// Download utilizado para gerar arquivo xml para estrutura organizacional e perguntas frequentes
function downloadXMLNovo(itemMenu) {

    var dataInicial = "";
    var ano = "";
    var dataFinal = "";
    var unidadeGestora = "-1";
    var banco = "";
    var NomeFornecedor = "";
    var CPFCNPJFornecedor = "";
    var TipoDespesa = "";


    //  Prepara URL com parâmetros de consulta
    var strURL = "geraxml.asp"
        + "?item=" + itemMenu

    var iframe = document.createElement("iframe");
    exibirAguarde();
    iframe.id = "ifrmDownload";
    iframe.style.display = "none";

    var htm = "<iframe id='ifrmDownload' src='" + strURL + "' onload='finalizaDownload();'></iframe>";
    document.getElementById('conteudo').innerHTML = htm;

    var ST_LOADING = 1
    var ST_LOADED = 4

    //Verifica erros
    var client = new XMLHttpRequest();
    client.open("GET", strURL, true);
    client.responseType = "blob";
    client.send();
    client.onreadystatechange = function () {
        if (this.readyState == ST_LOADED) {
            if (this.getResponseHeader("ERRO")) {
                jAlert(this.getResponseHeader("ERRO"), "Atenção");
                exibirAguarde(false);
            }
        }
    }
}


function URLoader_Timeout() {

    if ($('#ifrmDownload').contents().attr('readyState') == 'loading')
        setTimeout(URLoader_Timeout, 100);
    else {
        exibirAguarde(false);
        document.body.removeChild(document.getElementById("ifrmDownload"));
    }
}
function exportarXLS() {
    exportar(1);
}

function exportarPDF() {
    exportar(2);
}

function exportarCSV() {
    exportar(3);
}

function exportarODT() {
    exportar(4);
}

function exportarODS() {
    exportar(5);
}


function exportar(tipoArquivo) {

    // var pageCount = $("#tbPageTop").find("tr").find("a").length;
    // if (pageCount > 200) {
    //     alert("Não é possível realizar exportação com mais de 200 páginas de resultado. Por favor refine sua busca.");
    //     return;
    // }

    exibirAguarde();

    var locationSearch = window.location.search
    locationSearch = locationSearch.replace("&reestruturacao", "");

    var url = "index.asp" + locationSearch + "&itensPorPagina=100000&tipoArquivo=" + tipoArquivo;
    url = url.replace("numpag", "undefined");

    if (window.location.search.indexOf("visao") == -1)
        url = url + "&visao=" + $("#hndvisao").val();

    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            var file = $(data).find("#file").html();
            if (file == null || file == "") {
                alert("Não há informação gerada para exportar!");
                exibirAguarde(false);
            } else {
                window.open(file);
                exibirAguarde(false);
            }
        },
        error: function (jerro) {
            console.log(jerro.responseText);
            exibirAguarde(false);
            alert("Erro ao gerar arquivo! Esta visão ainda não suporta esse tipo de exportação.");
        }
    });
}

function ExportToCsv(fileName, arquivo) {
    // var data = GetCellValues(arquivo);
    // var csv = ConvertToCsv(data);
    // EstruturaOrganizacional
    //alert("Procedimento disponível somente para IE, Chrome e Firefox!")

    //var download = function(content, fileName, mimeType) {
    //download(csvContent, 'dowload.csv', 'text/csv');

    var fileName = fileName + ".csv";
    var content = arquivo;
    var mimeType = 'text/csv';
    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';

    if (navigator.msSaveBlob) { // IE10
        return navigator.msSaveBlob(new Blob([content], { type: mimeType }), fileName);
    } else if ('download' in a) { //html5 A[download]
        a.href = 'data:' + mimeType + ',' + encodeURIComponent(content);
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        setTimeout(function () {
            a.click();
            document.body.removeChild(a);
        }, 66);
        return true;
    } else { //do iframe dataURL download (old ch+FF):

        alert("Procedimento disponível somente para IE, Chrome, Firefox e Opera!")

    }

};
function validaCkTipoDespesa() {
    var totalNaoChecadas = 0;
    var totalChecadas = 0;
    $.each($(".tipoDespesa"), function () {
        if (!$(this).attr('checked')) {
            totalNaoChecadas++;
        } else {
            totalChecadas++;
        }
    });
    if (totalChecadas == 0) {
        $('.tipoDespesaTodas').attr('checked', "checked");
        $('.tipoDespesa').attr('checked', 'checked');
    }

}
function retornaFiltroDespesas() {
    var destino = $("#gridHistMovFrotas tbody");
    var nrMoviemtos;
    var params = "";
    var url_parms = URLParameters();

    params += "&param1=" + url_parms.id_Veiculo

    if ($("#quantEspecf").val() != "") {
        params += "&param2=" + $("#quantEspecf").val();
    } else {
        if ($("input[name='nrMovimentos']:checked").val() == undefined) {
            alert('Informe uma quantidade de movimentos!');
            return;
        }
        params += "&param2=" + $("input[name='nrMovimentos']:checked").val()
    }    // quantidade especifica
    if ($("#txtFrotasDespesasIni") && $("#txtFrotasDespesasIni").val() != "") {
        params += "&param3=" + $("#txtFrotasDespesasIni").val().replaceAll("/", "");
    }   //
    if ($("#txtFrotasDespesasFim") && $("#txtFrotasDespesasFim").val() != "") {
        params += "&param4=" + $("#txtFrotasDespesasFim").val().replaceAll("/", "");
    }   //

    validaCkTipoDespesa();

    if ($("#ckAbastecimento").is(":checked"))
        params += "&param5=" + $("#ckAbastecimento").val();
    //
    if ($("#ckOutrasManutencoes").is(":checked"))
        params += "&param6=" + $("#ckOutrasManutencoes").val();
    //
    if ($("#ckImpostos").is(":checked"))
        params += "&param7=" + $("#ckImpostos").val();
    //
    if ($("#ckTodasDespesasFrotas").is(":checked"))
        params += "&param8=" + $("#ckTodasDespesasFrotas").val();

    params += "&param9=" + $("input[name='ordenacao']:checked").val();
    //
    //console.log(params)
    $.ajax({
        type: "GET",
        url: "acao.asp?acao=RetornaMontaFrotasItens" + replaceAll(params, "/", "|"),
        dataType: "json",
        success: function (jdados) {
            $('.histMovi').remove();
            var htm = "";
            if (jdados.Dados.length > 0) {

                htm = "";
                for (x = 0; x < jdados.Dados.length; x++) {
                    var dado = jdados.Dados[x];
                    htm += "<tr class='histMovi'>";
                    htm += "<td style='white-space: nowrap;' align='center'>" + dado.dtEvento + "</td>";
                    htm += "<td style='white-space: nowrap;' align='left'>" + dado.dsEvento + "</td>";
                    htm += "<td style='white-space: nowrap;' align='right'>" + dado.qtLancamento + "</td>";
                    htm += "<td style='white-space: nowrap;' align='center'>" + dado.vlLancamento + "</td>";
                    htm += "<td style='white-space: nowrap;' align='center'>" + dado.vlTotalDespesa + "</td>";
                    htm += "</tr>";
                };
            } else {
                htm += "<tr class='histMovi'>";
                htm += "<td colspan='5' style='white-space: nowrap;' align='center'>Não existe movimentos nesse período.</td>";
                htm += "</tr>";
            }
            $('#gridHistMovFrotas').append(htm);
        },
        error: function (jerro) {
            var htm = "";
            htm += "<tr class='histMovi'>";
            htm += "<td colspan='5' style='white-space: nowrap;' align='center'>Erro ao retornar movimentos para o período.</td>";
            htm += "</tr>";
            $('#gridHistMovFrotas').append(htm);
        }
    });
}
function URLParameters() {
    var result = {};

    var params = window.location.search.split(/\?|\&/);

    params.forEach(function (it) {
        if (it) {
            var param = it.split("=");
            result[param[0]] = param[1];
        }
    });

    return result;
}



function atualizarNomes() {
    var paramNome = $("#txtNomeFornecedor");
    var paramDataBase = "";
    var arrayResult = [];
    var obj = $("#cmbUnidadeCP");
    if (obj && obj.val() != "") {
        paramDataBase = obj.val().split('|')[1];
    }
    if (paramDataBase != "") {
        $.ajax({
            type: "GET",
            url: "acao.asp?acao=ConsultaNomeServidor&param1=" + paramNome.val() + "&param2=" + paramDataBase,
            dataType: "json",
            success: function (jdados) {
                for (var i = 0; i < jdados.length; i++) {
                    var objResult = jdados[i];
                    arrayResult.push(objResult.Nome);
                }
                $(function () {
                    $("#txtNomeFornecedor").autocomplete({
                        source: arrayResult
                    });
                });
            },
            error: function (jerro) {
                if (jerro.responseText != "")
                    alert(jerro.responseText + "Erro ao fazer a consulta auto-complete dos Nomes!");
            }
        });
    }

}



function preencheComboUnidadeGestoraAR() {

    var destino = $("#cmbUnidadeGestoraAR");
    if ((destino) && (destino.is(":visible"))) {
        limparDados("cmbUnidadeGestoraAR");
        destino.css("background-color", "#cecece");

        destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=RetornaUnidadeGestoraAR&param1=" + $("#cmbUnidadeAR").select().val() + "&param2=" + $("#cmbAno").select().val() + "&param3=" + $("#cmbUnidadeAR").find(":selected").text(),
            dataType: "json",
            cache: false,
            success: function (jdados) {
                limparDados("cmbUnidadeGestoraAR");
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                    }
                }
                destino.css("background-color", "#ffffff");
                destino.attr("disabled", false);
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }
}



function incializaValoresPadraoCP(limpaCampo) {

    if (limpaCampo === undefined) {
        limpaCampo = true;
    }

    // DRO - 355383 - 23/11/2018 - Inicio
    //setTimeout(function () {
    //    consultarMes('', 'cmbMesInicial', 'cmbUnidadeCP', 'CP_Fato_EmpenhoDespesa', 'CP_Fato_saldodespesa');
    //}, 0);
    //setTimeout(function () {
    //    if ($("#cmbMesInicial").val() != null) {
    //        consultarMes('cmbMesInicial', 'cmbMesFinal', 'cmbUnidadeCP', 'CP_Fato_EmpenhoDespesa', 'CP_Fato_saldodespesa');
    //    }
    //}, 10);
    // DRO - 355383 - 23/11/2018 - Fim

    //Formata data dd//mm/yyyy
    function dataFormatada(dataAtual, dia) {
        var data = dataAtual,
            // dia = data.getDate(),
            mes = ("0" + (data.getMonth() + 1)).slice(-2),
            ano = data.getFullYear();
        if ($('#cmbAno option:selected').text() != data.getFullYear()) {
            if ($('#cmbAno option:selected').text() != "") {
                ano = $('#cmbAno option:selected').text();
            };
        };
        return [dia, mes, ano].join('/');
    }


    //Retorna último dia do mês
    function retornaUltimoDiaDoMes(data) {
        return (new Date(data.getFullYear(), data.getMonth() + 1, 0)).getDate();
    }
    if ($("#hndAcao").val() == 3) {                                                                                                                                                                                                                                                                                                                                                                                                                                             //DRO - 19522 - 21/06/2021
        if ($("#hndItem").val() == 11 || $("#hndItem").val() == 12 || $("#hndItem").val() == 8 || $("#hndItem").val() == 9 || $("#hndItem").val() == 13 || $("#hndItem").val() == 4 || $("#hndItem").val() == 7 || $("#hndItem").val() == 3 || $("#hndItem").val() == 1 || $("#hndItem").val() == 2 || $("#hndItem").val() == 6 || $("#hndItem").val() == 5 || $("#hndItem").val() == 15 || $("#hndItem").val() == 16 || $("#hndItem").val() == 17 || $("#hndItem").val() == 10 || $("#hndItem").val() == 92) {
            $("#txtDataInicial").val(dataFormatada(new Date, '01'));
            $("#txtDataFinal").val(dataFormatada(new Date, retornaUltimoDiaDoMes(new Date)));
        }
        // DRO - 355686 - 11/12/2018 - Inicio
        // DRO - 356474 - 13/12/2018 - Inicio
        // else if ($("#hndItem").val() == 20 || $("#hndItem").val() == 21) {
        else if ($("#hndItem").val() == 20 || $("#hndItem").val() == 21 || $("#hndItem").val() == 14) {
            // DRO - 356474 - 13/12/2018 - Fim
            consultarMes('', 'cmbMesInicial', 'cmbUnidadeCP', 'CP_Fato_EmpenhoDespesa', 'CP_Fato_saldodespesa');

            if ($("#cmbMesInicial").val() != null) {
                consultarMes('cmbMesInicial', 'cmbMesFinal', 'cmbUnidadeCP', 'CP_Fato_EmpenhoDespesa', 'CP_Fato_saldodespesa');
            }
        }
        // DRO - 355686 - 11/12/2018 - Fim
    }


    var cmbMesFinal = $("#cmbMesFinal");

    //Como a chamada é feita para o mesmo método que recebe vários parametroso timeout controla a sequencia para náo enviar valores ainda não carregados.
    //Sugestão de melhoria criar metodos específicos e carregar no callback quando houver dependência.
    setTimeout(function () {
        //Verifica se o campo é tipo text ou select para aplicar valores default 
        if (cmbMesFinal.val() != null && cmbMesFinal.val() != '') {
            consultarDadosCP('UnidadeGestoraMes', 'cmbUnidadeGestora', 'cmbMesInicial', 'cmbMesFinal', 'CP_Fato_EmpenhoDespesa', 'CP_Fato_saldodespesa', 'cmbUnidadeCP');
            var ultimaOpcaoMesFinal;
            $("#cmbMesFinal option").each(function () {
                ultimaOpcaoMesFinal = $(this).val();
            });
            $("#cmbMesFinal").val(ultimaOpcaoMesFinal);

        } else if ($("#cmbUnidadeCP").val() != null && $("#cmbUnidadeCP").val() != '') {
            //DRO - 353374 - 24/10/2018 - Inicio
            //consultarDadosCP('UnidadeGestora', 'cmbUnidadeGestora', 'txtDataInicial', 'txtDataFinal', 'CP_Fato_MovimentoReceita', '', 'cmbUnidadeCP', limpaCampo);
            //consultarDadosCP('UnidadeGestora', 'cmbUnidadeGestora', 'txtDataInicial', 'txtDataFinal', 'CP_Fato_EmpenhoDespesa', 'CP_Fato_saldodespesa', 'cmbUnidadeCP', limpaCampo);
            if ($("#hndItem").val() == 92 || $("#hndItem").val() == 94 || $("#hndItem").val() == 95 || $("#hndItem").val() == 97) {
                SetarBancoDados('UnidadeGestoraCP', 'cmbUnidadeGestora', 'txtDataInicial', 'txtDataFinal', 'CP_Fato_EmpenhoDespesa', 'CP_Fato_saldodespesa', 'cmbUnidadeCP', '');
            } else {
                consultarDadosCP('UnidadeGestoraCP', 'cmbUnidadeGestora', 'txtDataInicial', 'txtDataFinal', 'CP_Fato_EmpenhoDespesa', 'CP_Fato_saldodespesa', 'cmbUnidadeCP', limpaCampo);
                //DRO - 353374 - 24/10/2018 - Fim
            };

        }
    }, 20);
}



function alteraAno() {
    //CP
    limparDados('cmbUnidadeCP');
    limparDados('cmbMesInicial');
    limparDados('cmbMesFinal');
    limparDados('txtDataInicial');
    limparDados('txtDataFinal');
    limparDados('cmbUnidadeGestora');
    limparDados('cmbCategoria');
    limparDados('cmbEstoqueUnidadeCM');




    consultarDados('ConsultarUnidadeCP', 'cmbUnidadeCP', 'cmbAno');
    alteraEntidade();
}

function retornaNomeAplicacaoDWS() {
    var url = window.location.href;

    var urls = url.split("/");

    for (var i = 0; i < urls.length; i++) {

        if (i == 3) {
            if (urls[i] === "index.asp") {
                nomeAplicacaoDWS = "pronimtb";
            } else {
                nomeAplicacaoDWS = urls[i];
                servidorUnico = true;
            }

        } else {
            if (!servidorUnico) {
                nomeAplicacaoDWS = "pronimtb";
            }
        }

    }
}

function PublicacoesCovid(pagina) {

    retornaNomeAplicacaoDWS();
    var meuHost = location.host;
    var meuprotocolo = location.protocol;

    if (pagina == "paginaprincipalcovid") {
        window.location.href = meuprotocolo + "//" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=21&item=1&visao=paginaprincipalcovid";
    }
    if (pagina == "publicacaocovid") {
        window.location.href = meuprotocolo + "//" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=21&item=1&visao=publicacaocovid";
    }
}

function LicitacoesCalamidadePublica() {

    retornaNomeAplicacaoDWS();
    var meuHost = location.host;
    var meuprotocolo = location.protocol;

    window.location.href = meuprotocolo + "//" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=1&item=91&visao=0";
}
function ContratosCalamidadePublica() {

    retornaNomeAplicacaoDWS()
    var meuHost = location.host;
    var meuprotocolo = location.protocol;

    window.location.href = meuprotocolo + "//" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=1&item=90&visao=0";
}
function DespesasCalamidadePublica() {

    retornaNomeAplicacaoDWS()
    var meuHost = location.host;
    var meuprotocolo = location.protocol;

    window.location.href = meuprotocolo + "//" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=3&item=92&visao=0";
}
function ReceitasCalamidadePublica() {

    retornaNomeAplicacaoDWS()
    var meuHost = location.host;
    var meuprotocolo = location.protocol;

    window.location.href = meuprotocolo + "//" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=3&item=94&visao=0";
}

function ReceitasXDespesasCalamidadePublica() {
    var meuHost = location.host;
    var meuprotocolo = location.protocol;
    window.location.href = meuprotocolo + "//" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=3&item=95&visao=0";
}


function PessoalCalamidadePublica() {

    retornaNomeAplicacaoDWS()
    var meuHost = location.host;
    var meuprotocolo = location.protocol;

    window.location.href = meuprotocolo + "//" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=4&item=93&visao=0";
}

function PatrimonioCalamidadePublica() {

    retornaNomeAplicacaoDWS()
    var meuHost = location.host;
    var meuprotocolo = location.protocol;

    window.location.href = meuprotocolo + "//" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=1&item=96&visao=0";
}

function ComprasDiretasCalamidadePublica() {
    retornaNomeAplicacaoDWS()
    var meuHost = location.host;
    var meuprotocolo = location.protocol;

    window.location.href = meuprotocolo + "//" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=3&item=97&visao=0";
}

function RedirecionaFiltroLicitacoes() {
    var meuHost = location.host;
    var meuprotocolo = location.protocol;
    window.location.href = meuprotocolo + "//" + meuHost + "/pronimtb/index.asp?acao=1&item=2&flagRedFiltroLicitacao=1";
}

function RetornaTemaCovid(idTema) {
    var meuHost = location.host;
    var meuprotocolo = location.protocol;
    window.location.href = meuprotocolo + "//" + meuHost + "/" + nomeAplicacaoDWS + "/index.asp?acao=21&item=1&visao=publicacaocalamidade&IdTema=" + idTema;

}

//Monta Mapa do site

function retornaTamanhoMenu(menuVetor) {
    if (menuVetor === 0) {
        tamanhoMenu = st_menus[0].bodys.length;
        return tamanhoMenu;
    } else {
        tamanhoMenu = (st_menus[0].bodys.length - 1);
        temSubMenu = true;
        return tamanhoMenu;
    }
}
var tamanhoMenu = 0;
var temSubMenu = false;

var objJSON = [];
var listaSubMenu = [];
var listaSubMenuFilho = [];
var subMenuJSON = "";
var subMenuFilhoJSON = "";
var jaPassou = false;
var retornogeradorMenu = false;

function montaMapaSite(st_menus) {
    var menus = st_menus;
    var html = "";
    var cont = 0;

    $("#home").css("display", "none");
    $("#conteudo").css("display", "none");
    $(".ClassForm").css("display", "none");
    $("#formulario").css("display", "none");
    $("#cmbRef").css("display", "none");
    $(".finalidade").css("display", "none");
    $("#mapaSite").css("display", "block");

    html += "<ul style='list-style-type: none;'>";
    tamanhoMenu = retornaTamanhoMenu(0);
    //Monta visão 0 do menu
    for (var i = 0; i < tamanhoMenu; i++) {
        subMenuJSON = "";
        if (menus[0].bodys[0].items[i] !== undefined) {
            if (menus[0].bodys[0].items[i].url === "") {
                html += "<li style='cursor: grab;'><strong>" + menus[0].bodys[0].items[i].text + "</strong></li>";

                if (menus[0].bodys[0].items[i].sub === null) {
                    cont = cont + 1;
                } else {
                    cont = menus[0].bodys[0].items[i].sub[1];
                }

                var subMenu = menus[0].bodys[cont].items;
                var temSubMenus = menus[0].bodys[cont].items.length;
                var sHbhtml = montaSubmenu(subMenu, i, "", false, temSubMenus);
                jaPassou = false;

                html += sHbhtml;
            } else {
                if (temSubMenu) {
                    cont = cont + 1;
                    html += "<li title='" + menus[0].bodys[0].items[i].text + "'><a href=" + montaURLDetalhamentoItemMapaSite(menus[0].bodys[0].items[i].url) + ">" + menus[0].bodys[0].items[i].text + "</a></li>";
                    objJSON.push({
                        "nome": menus[0].bodys[0].items[i].text,
                        "url": montaURLDetalhamentoItemMapaSite(menus[0].bodys[0].items[i].url),
                        "subMenu": ""
                    });
                    jaPassou = true;
                } else {
                    html += "<li title='" + menus[0].bodys[0].items[i].text + "'><a href=" + montaURLDetalhamentoItemMapaSite(menus[0].bodys[0].items[i].url) + ">" + menus[0].bodys[0].items[i].text + "</a></li>";

                    objJSON.push({
                        "nome": menus[0].bodys[0].items[i].text,
                        "url": montaURLDetalhamentoItemMapaSite(menus[0].bodys[0].items[i].url),
                        "subMenu": ""
                    });
                    jaPassou = true;
                }

            }

            if (temSubMenu && jaPassou === false) {
                objJSON.push({
                    "nome": menus[0].bodys[0].items[i].text,
                    "url": "",
                    "subMenu": JSON.parse(JSON.stringify(listaSubMenu))
                });
            } else if (temSubMenus > 0 && temSubMenu === false && jaPassou === false) {
                objJSON.push({
                    "nome": menus[0].bodys[0].items[i].text,
                    "url": "",
                    "subMenu": JSON.parse(JSON.stringify(listaSubMenu))
                });
            }

            listaSubMenu = [];

        }

    }
    html += "</ul>";
    document.getElementById('listaMenuMapaSite').innerHTML = html;
    retornogeradorMenu = false;
    //var url = window.location.href;
    //verificaChamadaGeraMenuJSON(url);
    //if (retornogeradorMenu === true) {
    //    montaObjItensMenuPeloMapaSite();
    //}

}

//Monta o submenu
var eSubMenuFilho = false;
function montaSubmenu(subMenu, iTitulo, titulo, temSubMenus) {
    var htm = "<ul style='list-style-type: none;'>";
    listaSubMenuFilho = [];
    subMenuFilhoJSON = "";
    subMenuJSON = "";
    var nivel;
    for (var x = 0; x < subMenu.length; x++) {
        subMenuJSON = "";
        subMenuFilhoJSON = "";
        if (subMenu[x].url !== "") {
            if (titulo !== "") {
                htm += "<li style='padding-top: 5px;' title='" + st_menus[0].bodys[0].items[iTitulo].text + " -> " + titulo + " -> " + subMenu[x].text + "'><a href=" + montaURLDetalhamentoItemMapaSite(subMenu[x].url) + ">" + subMenu[x].text + "</a></li>";
                if (eSubMenuFilho) {
                    subMenuFilhoJSON = {
                        "nome": subMenu[x].text,
                        "url": montaURLDetalhamentoItemMapaSite(subMenu[x].url),
                        "subMenu": []
                    };
                } else {
                    subMenuJSON = {
                        "nome": titulo,
                        "url": montaURLDetalhamentoItemMapaSite(subMenu[x].url),
                        "subMenu": []
                    };
                }

            } else {
                htm += "<li style='padding-top: 5px;' title='" + st_menus[0].bodys[0].items[iTitulo].text + " -> " + subMenu[x].text + "'><a href=" + montaURLDetalhamentoItemMapaSite(subMenu[x].url) + ">" + subMenu[x].text + "</a></li>";

                if (eSubMenuFilho) {
                    subMenuFilhoJSON = {
                        "nome": subMenu[x].text,
                        "url": montaURLDetalhamentoItemMapaSite(subMenu[x].url),
                        "subMenu": []
                    };
                } else {
                    subMenuJSON = {
                        "nome": subMenu[x].text,
                        "url": montaURLDetalhamentoItemMapaSite(subMenu[x].url),
                        "subMenu": []
                    };
                }

            }

        } else {
            htm += "<li style='cursor: grab;' id='box-toggle' title='" + st_menus[0].bodys[0].items[iTitulo].text + " -> " + subMenu[x].text + "'><strong>" + subMenu[x].text + "</strong></li>";

            if (eSubMenuFilho) {
                subMenuFilhoJSON = {
                    "nome": subMenu[x].text,
                    "url": "",
                    "subMenu": []
                };
            } else {
                subMenuJSON = {
                    "nome": subMenu[x].text,
                    "url": "",
                    "subMenu": []
                };
            }

            if (subMenu[x].url === "") {
                eSubMenuFilho = true;
                tamanhoMenu = retornaTamanhoMenu(-1);
                nivel = subMenu[x].sub[1];
                var xhtml = montaSubmenu(st_menus[0].bodys[nivel].items, iTitulo, subMenu[x].text);
                eSubMenuFilho = false;
                htm += xhtml;
            }

        }
        if (eSubMenuFilho) {
            listaSubMenuFilho.push(subMenuFilhoJSON);
            if (nivel !== undefined) {
                jaPassou = false;
            } else {
                jaPassou = true;
            }

        } else {
            if (subMenuJSON !== "" && (subMenuJSON.url === "'index.asp?acao=3&item=12'" || subMenuJSON.url === "'./Help_TB/TransparenciaBR_Receitas/index.htm'" || subMenuJSON.url === "'./Help_TB/TransparenciaBR_Despesas/index.htm'" || subMenuJSON.url === "'./Help_TB/TransparenciaBR_GestaodePessoas/index.htm'")) {
                listaSubMenu.push(subMenuJSON);
            }
            else if (listaSubMenuFilho.length < 1 && eSubMenuFilho === false && jaPassou === false) {
                listaSubMenu.push(subMenuJSON);
            } else if (temSubMenus > 0) {
                listaSubMenu.push(subMenuJSON);
            } else if (temSubMenus === false && eSubMenuFilho === false && listaSubMenuFilho.length < 1 && jaPassou && nivel === undefined) {
                listaSubMenu.push(subMenuJSON);
            }
        }


    }
    if (eSubMenuFilho) {
        subMenuJSON = {
            "nome": titulo,
            "url": "",
            "subMenu": JSON.parse(JSON.stringify(listaSubMenuFilho))
        };
        listaSubMenu.push(subMenuJSON);
        listaSubMenuFilho = [];
    }
    eSubMenuFilho = false;
    htm += "</ul>";
    return htm;
}

function montaURLDetalhamentoItemMapaSite(urlItem) {
    var link = urlItem.split("'");
    return "'" + link[1].replace("'", "") + "'";
}
//Fim Mapa do site

//Início: Monta um objeto JSON dos Itens de menu
function verificaChamadaGeraMenuJSON(url) {
    var urls = url.split('?');
    for (var i = 0; i < urls.length; i++) {
        if (urls[i] === "geradorMenu") {
            retornogeradorMenu = true;
        }
    }
}
function montaObjItensMenuPeloMapaSite() {
    montaMapaSite(st_menus);
    document.getElementById('listaMenuMapaSite').innerHTML = JSON.stringify(objJSON);
    downloadDiv("menu.json", "listaMenuMapaSite", "application/json");
}

function downloadDiv(nomeArquivo, elementoId, mimeType) {

    if ($('#listaMenuMapaSite').html() == "") {

        console.log("Erro!", "Menu está vazio.", "error");

    } else {

        var elementoHtml = document.getElementById(elementoId).innerHTML;
        var link = document.createElement('a');
        var file = new Blob([elementoHtml], { type: mimeType });

        link.setAttribute('download', nomeArquivo);
        link.href = URL.createObjectURL(file);
        link.click();

        console.log("Sucesso!", "Foi feito o download dos menus em JSON com sucesso!", "success");

    }

}

//Fim: Monta um objeto JSON dos Itens de menu

//Caminho Pecorrido da Paginas
function CaminhoPag(st_menus) {
    var CaminhoPagPec = st_menus;
    var tamanhoMenu = retornaTamanhoMenu(0);
    var url = window.location.href.replace(window.location.origin + '/', '');
    var count = 0;
    var nomeCaminho;
    // em caso de debug nomeAplicacaoDWS deverá ser = pronimtb
    url = url.replace(nomeAplicacaoDWS, '');
    url = url.replace('/', '');
    url = "javascript:limparCookies();location.href='" + url + "'";
    // em caso  de sub menu função obter mais submenu
    if (window.location.search.substring(0, 14) === '?acao=3&item=7') {
        nomeCaminho = "Início > Despesas > Função";
    }
    for (var i = 0; i < tamanhoMenu; i++) {
        if (nomeCaminho == undefined) {
            if (CaminhoPagPec[0].bodys[0].items[i] !== undefined) {
                if (CaminhoPagPec[0].bodys[0].items[i].url === "") {
                    if (CaminhoPagPec[0].bodys[0].items[i].sub === null) {
                        count = count + 1
                    } else {
                        count = CaminhoPagPec[0].bodys[0].items[i].sub[1];
                    }
                }
            }
            var CaminhoPagPecsubMenu = CaminhoPagPec[0].bodys[count].items;
            for (var x = 0; x < CaminhoPagPecsubMenu.length; x++) {
                var subMenu = "";
                if (CaminhoPagPecsubMenu[x].url === "" && url != 0) {
                    var nivel = CaminhoPagPecsubMenu[x].sub[1];
                    tamanhoMenu = retornaTamanhoMenu(-1);
                    subMenu = CaminhoPagPecsubMenu[x].text;
                    var subMenu2 = st_menus[0].bodys[nivel].items;
                    for (var y = 0; y < subMenu2.length; y++) {
                        if (subMenu2[y].url === url) {
                            nomeCaminho = "Início > " + CaminhoPagPec[0].bodys[0].items[i].text + " > " + subMenu + " > " + subMenu2[y].text;
                            subMenu = "";
                        }
                    }
                } else if (CaminhoPagPecsubMenu[x].url !== "" && url != "" && CaminhoPagPecsubMenu[x].url == url) {
                    if (CaminhoPagPecsubMenu[x].url == url && url != "" && nomeCaminho === undefined) {
                        nomeCaminho = "Início > " + CaminhoPagPec[0].bodys[0].items[i].text + " > " + CaminhoPagPecsubMenu[x].text;
                        url = 0;
                    }
                }
            }
        }
        if (nomeCaminho != undefined) {
            document.getElementById("caminhoPag").innerHTML = nomeCaminho;
        }
    }
}
