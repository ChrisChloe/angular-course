$(document).ready(function() {

    document.getElementById('contact-form').onsubmit= function(e){
        e.preventDefault();

        

        // Get input field values of the contact form
        var user_email             = $('input[name=email-address]').val();
        var conheceuBusca          = $('select[name=conheceuBusca]').val();
        var tempoCliente           = $('select[name=tempoCliente]').val();
        var avlAtendimento         = $('select[name=avlatendimento]').val();
        var agiEmissao             = $('select[name=agi-emissao]').val();
        var qldAtendimento         = $('select[name=qldatendimento]').val();
        var frmPgmt                = $('select[name=frmpgmt]').val();
        var preco                  = $('select[name=preco]').val();
        var fncSite                = $('select[name=fncsite]').val();
        var emissaoAtend           = $('select[name=emissaoatend]').val();
        var comercialAtend         = $('select[name=comercialatend]').val();
        var financeiroAtend        = $('select[name=financeiro-atend]').val();
        var alteracaoAtend         = $('select[name=alteracaoatend]').val();
        var avlEquipeSimpatico     = $('select[name=avlequipesimpatico]').val();
        var avlEquipeAtencioso     = $('select[name=avlequipeatencioso]').val();
        var avlEquipeMateriais     = $('select[name=avlequipemateriais]').val();
        var avlequipeprofissional  = $('select[name=avlequipeprofissional]').val();
        var avlEquipeInformado     = $('select[name=avlequipeinformado]').val();
        var destacarComercial      = $('input[name=destacarComercial]').val();
        var destacarSetor          = $('input[name=destacarSetor]').val();
        var avlExperiencia         = $('select[name=avlexperiencia]').val();
        var rcmdBusca              = $('select[name=rcmdbusca]').val();
        var criticas               = $('input[name=criticas]').val();

        var informesReceber= [];
        $('input[name="check[]"]:checked').each(function() {
            informesReceber.push($(this).val());
        }); 


        post_data = '<!DOCTYPE html><html><head><title></title></head><body><div class="m_-5258102743783239414msg-quote" style="padding:0;margin:0"><table style="background:#edf3f8;width:100%" class="m_-5258102743783239414mce-item-table" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td style="padding-left:10px;padding-right:10px"><table style="text-align:center;font-family:Arial,Helvetica,sans-serif;margin:0 auto;width:540px" class="m_-5258102743783239414mce-item-table" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div style="margin:0 auto;padding-bottom:32px;padding-top:20px"></div></td></tr><tr><td><div class="a6S" dir="ltr" style="opacity: 0.01; left: 792.077px; top: 431.096px;"><div id=":ko" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Fazer o download do anexo " data-tooltip-class="a1V" data-tooltip="Fazer o download"><div class="aSK J-J5-Ji aYr"></div></div></div><div style="background:#fff;border-left:1px solid #e6ecf1;border-right:1px solid #e6ecf1;padding-left:30px;padding-right:30px"><h1 style="font-size:28px;color:#ff7519;text-align:center;margin:0;padding-top:40px;padding-left:30px;padding-right:30px;line-height:28px;font-family:arial-black,sans-serif">Pesquisa Busca Aéreo</h1><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Informe seu E-mail:</span></strong><br>R - '+ user_email +'</p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Primeiramente, conte-nos como você conheceu o Busca Aéreo:</span></strong><br>R - '+ conheceuBusca +'</p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Há quanto tempo você é cliente do Busca Aéreo?:</span></strong><br>R - '+ tempoCliente +'</p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Quão bem você é atendido quando entra em contato conosco para resolução de problemas:</span></strong><br>R - '+ avlAtendimento +'</p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Em comparação com os nossos concorrentes, avalie: </span></strong><br>Emissão: R- '+ agiEmissao +' <br/>Atendimento: R- '+ qldAtendimento +' <br/>Formas de pagamento: R- '+ frmPgmt +' <br/>Preço: R- '+ preco +' <br/>Funcionalidade do site: R- '+ fncSite +'<br/></p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Que tipo de notícias/informes você gostaria de receber do Busca Aéreo:</span></strong><br>R -'+ informesReceber +'</p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Avalie a eficiência dos nossos setores e responda: </span></strong><br>Emissão: R- '+ emissaoAtend +' <br/>Comercial: R- '+ comercialAtend +' <br/>Financeiro: R- '+ financeiroAtend +' <br/>Alteração: R- '+ alteracaoAtend +' <br/></p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Como você avalia a nossa equipe de vendas a respeito das seguintes afirmações: </span></strong><br>O agente de vendas foi simpático e prestativo: R- '+ avlEquipeSimpatico +'<br/>O agente de vendas é atencioso sempre que preciso de sua ajuda: R- '+ avlEquipeAtencioso +' <br/>O agente de vendas estava bem informado sobre os serviços oferecidos: R- '+ avlEquipeInformado +' <br/>O agente de vendas foi profissional: R- ' + avlequipeprofissional +'<br/>O agente de vendas forneceu os materiais informativos necessários: R- '+ avlEquipeMateriais +' <br/></p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Há algo que você gostaria de destacar sobre o setor comercial:</span></strong><br>R - '+ destacarComercial +'</p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Há algo que você gostaria de destacar algo sobre outro setor? Qual:</span></strong><br>R - ' + destacarSetor +'</p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Como você avalia a sua experiência com o Busca Aéreo:</span></strong><br>R - '+ avlExperiencia +'</p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Você recomendaria o Busca Aéreo para outras agências:</span></strong><br>R - '+ rcmdBusca +'</p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Deixe aqui críticas, elogios, comentários e sugestões:</span></strong><br>R - '+ criticas +'</p><div style="height:40px">&nbsp;</div></div></td></tr><tr><td valign="bottom"><table style="text-align:center;width:540px;margin-top:21px;margin-bottom:40px" class="m_-5258102743783239414mce-item-table" cellspacing="0" cellpadding="0" border="0"><tbody></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div></body></html>';

        // Ajax post data to server
        var settings = {
        	"async": true,
        	"crossDomain": true,
        	"url": "https://gateway.buscaaereo.com.br/api/landing/email",
        	"method": "POST",       
        	"mimeType": "multipart/form-data",
        	"data": {'post_data':post_data}
        }

        $.ajax(settings).done(function (response) {
            
        	if(response.type == 'error') {
        	} else {

                $('#modal-thanks').modal('show'); 

                $('.form-group input').val('');
                $('.form-group select').val('');
                $('#avaliation input').val('');
                $('#avaliation select').val('');
                $('input[name="check[]"]:checked').each(function() {
                    $(this).prop('checked', false);
                }); 


        		if(navigator.appCodeName !== 'Mozilla'){
        			var req = new XMLHttpRequest();
        			req.responseType = "blob";
        			req.onload = function (event) {
        				var blob = req.response;
                var link=document.createElement('a');
                link.href=window.URL.createObjectURL(blob);
                link.download="infografico_elomilhas.pdf";
                link.click();
            };
        }else{
        	console.log('false');
        }
        req.send();
        console.log('enviado com sucesso');

                // After, all the fields are reseted
                $('#contact-form input').val('');
                $('#contact-form textarea').val('');
                
            }
        });




    };

    // Reset and hide all messages on .keyup()
    $("#contact-form input, #contact-form textarea").keyup(function() {
    	$("#answer").fadeOut();
    });

});