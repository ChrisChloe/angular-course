$(document).ready(function() {

    $('#indicate-btn').click(function(){
        if(!$(this).hasClass("done")){

            var name_partner    = $('#indicate-name').val();
            var email_partner   = $('#indicate-email').val();
            var name_indicated  = $('#indicate-name-indicated').val();
            var phone_indicated = $('#indicate-phone-indicated').val();
            var email_indicated = $('#indicate-email-indicated').val();

            var data = {
                "name_partner"    : name_partner, 
                "email_partner"   : email_partner,
                "name_indicated"  : name_indicated,
                "phone_indicated" : phone_indicated,
                "email_indicated" : email_indicated
            }

            if(
                name_partner    &&
                email_partner   &&
                name_indicated  &&
                phone_indicated &&
                email_indicated ){
                   
                    if(validationEmail('indicate') && validationCell('indicate')){
                        $('#indicate-btn').html("ENVIANDO");
                        sendEmail("Campanha | Indicação", data, emailConfirmData('indicate', email_partner));

                    }

            }else{
                $('#indicate-btn').addClass("animated shake");
                setTimeout(function(){$('#indicate-btn').removeClass("animated shake");},2000);
            }

        }
    });

    $('#indicated-btn').click(function(){
        if(!$(this).hasClass("done")){

            var name_partner    = $('#indicated-name').val();
            var email_partner   = $('#indicated-email').val();
            var name_indicated  = $('#indicated-name-indicated').val();
            var phone_indicated = $('#indicated-phone-indicated').val();
            var email_indicated = $('#indicated-email-indicated').val();

            var data = {
                "name_partner"    : name_partner, 
                "email_partner"   : email_partner,
                "name_indicated"  : name_indicated,
                "phone_indicated" : phone_indicated,
                "email_indicated" : email_indicated
            }

            if(
                name_partner    &&
                email_partner   &&
                name_indicated  &&
                phone_indicated &&
                email_indicated ){

                    if (validationEmail('indicated') && validationCell('indicated')) {
                        $('#indicated-btn').addClass("done");
                        $('#indicated-btn').html("ENVIANDO");
                        sendEmail("Campanha | Cadastro", data, emailConfirmData('indicated', email_partner));
                    }

            }else{

                $('#indicated-btn').addClass("animated shake");
                setTimeout(function(){$('#indicated-btn').removeClass("animated shake");},2000);
                
            }
        }
    });

    function notify (position) {

        if (position === 'left') {
            $('.notify').removeClass('right');
            $('.notify').addClass('left');
        } else{
            $('.notify').removeClass('left');
            $('.notify').addClass('right');
        }

        $('.notify').addClass('animated fadeInLeft');

        setTimeout(function(){
            $('.notify').addClass('animated fadeOutLeft');
            setTimeout(function(){
                $('.notify').css({"display":"none"});
                $('.notify').removeClass(position);
                $('.notify').removeClass('animated fadeOutLeft');
            },1000);
        },3000);
    }

    function doneIndicate () {
        $('#indicate-btn').html("ENVIAR");

        $('#indicate-name').val("");
        $('#indicate-email').val("");
        $('#indicate-name-indicated').val("");
        $('#indicate-phone-indicated').val("");
        $('#indicate-email-indicated').val("");

        notify('left');

    }

    function doneIndicated () {

        $('#indicated-btn').html("ENVIADO");

        $('#indicated-name').attr('disabled',true);
        $('#indicated-email').attr('disabled',true);
        $('#indicated-name-indicated').attr('disabled',true);
        $('#indicated-phone-indicated').attr('disabled',true);
        $('#indicated-email-indicated').attr('disabled',true);

        notify('right');

    }

    function sendEmail (subject, data, data_confirm) {

        var post_data = getPostData('marketing', data);

        var settings = {
        	"async"      : true,
        	"crossDomain": true,
            "url"     : "https://gateway.buscaaereo.com.br/api/landing/email",
            //"url"     : "http://10.1.1.103:8000/api/landing/email",
            "method"  : "POST",
        	"mimeType": "multipart/form-data",
        	"data":
                {
                    'post_data': post_data,
                    'subject'  : subject,
                    'post_data_confirm': data_confirm.post_data_confirm,
                    'subject_confirm'  : data_confirm.subject_confirm,
                    'to_email_confirm' : data_confirm.to_email_confirm
                }
        };

        $.ajax(settings).done(function (response) {
            if(subject == "Campanha | Cadastro"){
                doneIndicated();
            }else{
                doneIndicate();
            }
            
        });

    }

    function validationEmailStr (str) {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})/.test(str);
    }

    function validationEmail (type) {
        if(type == "indicate"){
            var validation = true;
            if(!validationEmailStr($('#indicate-email').val())){
                $('#indicate-email').css({'border-color':'#FF0000'})
                validation = false;
            }else{
                $('#indicate-email').css({'border-color':'rgb(238, 238, 238)'});
            }
            if(!validationEmailStr($('#indicate-email-indicated').val())){
                $('#indicate-email-indicated').css({'border-color':'#FF0000'});
                validation = false;

            }else{
                $('#indicate-email-indicated').css({'border-color':'rgb(238, 238, 238)'});
            }
            return validation
        }else{
            var validation = true;
            if(!validationEmailStr($('#indicated-email').val())){
                $('#indicated-email').css({'border-color':'#FF0000'});
                validation = false;

            }else{
                $('#indicated-email').css({'border-color':'rgb(238, 238, 238)'});        
            }
            if(!validationEmailStr($('#indicated-email-indicated').val())){
                $('#indicated-email-indicated').css({'border-color':'#FF0000'})
                validation = false;

            }else{
                $('#indicated-email-indicated').css({'border-color':'rgb(238, 238, 238)'});
            }  
            return validation
        } 
    }

    function validationCell (type) {
        if(type == "indicate"){
            var validation = true;
            if(validationCellStr($('#indicate-phone-indicated').val())){
                $('#indicate-phone-indicated').css({'border-color':'#FF0000'})
                validation = false;
            }else{
                $('#indicate-phone-indicated').css({'border-color':'rgb(238, 238, 238)'});
            }
            return validation
        }else{
            var validation = true;
            if(validationCellStr($('#indicated-phone-indicated').val())){
                $('#indicated-phone-indicated').css({'border-color':'#FF0000'});
                validation = false;

            }else{
                $('#indicated-phone-indicated').css({'border-color':'rgb(238, 238, 238)'});        
            } 
            return validation
        } 
    }

    function validationCellStr (cel) {
        return cel.length < 13;
    }

    function emailConfirmData (type, to_email_confirm) {
        var post_data_confirm;
        var subject_confirm;

        if(type == 'indicate'){
            post_data_confirm = getPostData('indicate_confirm');
            subject_confirm   = 'Obrigado pela indicação.';

        }else{
            post_data_confirm = getPostData('indicated_confirm');
            subject_confirm   = 'Seja bem vindo!';

        }

        return { 'post_data_confirm':post_data_confirm, 'subject_confirm':subject_confirm, 'to_email_confirm': to_email_confirm };
    }

    function getPostData (type, data = null) {
        if (type === 'marketing' && data) {
            return '<div class="m_-5258102743783239414msg-quote" style="padding:0;margin:0"><table style="background:#edf3f8;width:100%" class="m_-5258102743783239414mce-item-table" cellspacing="0" cellpadding="0" border="0"><tbody><tr> <td style="padding-left:10px;padding-right:10px"><table style="text-align:center;font-family:Arial,Helvetica,sans-serif;margin:0 auto;width:540px" class="m_-5258102743783239414mce-item-table" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div style="margin:0 auto;padding-bottom:32px;padding-top:20px"></div></td></tr><tr><td><div class="a6S" dir="ltr" style="opacity: 0.01; left: 792.077px; top: 431.096px;"><div id=":ko" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Fazer o download do anexo" data-tooltip-class="a1V" data-tooltip="Fazer o download"><div class="aSK J-J5-Ji aYr"></div></div></div> <div style="background:#fff;border-left:1px solid #e6ecf1;border-right:1px solid #e6ecf1;padding-left:30px;padding-right:30px"><h1 style="font-size:28px;color:#ff7519;text-align:center;margin:0;padding-top:40px;padding-left:30px;padding-right:30px;line-height:28px;font-family:arial-black,sans-serif">Campanha Indicação</h1><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:50px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553; font-size:22px;">Agência Indicada</span></strong></p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553;text-decoration:none!important;">Email Agência Indicada:</span></strong><br>R - '+ data.email_indicated +'</p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Nome Agência Indicada:</span> </strong><br>R - '+ data.name_indicated +'</p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Telefone Agência Indicada:</span> </strong><br>R - '+ data.phone_indicated +'</p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:50px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553; font-size:22px;">Agência Parceira</span></strong></p><p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553;text-decoration:none!important;">Email Agência Parceira:</span></strong><br>R - '+ data.email_partner +'</p> <p style="color:#7f8c8d;font-size:16px;text-align:center;line-height:22px;margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><strong style="font-weight:bold;font-size:18px;line-height:27px"><span style="color:#084553">Nome Agência Parceira: </span></strong><br>R - '+ data.name_partner +'</p></p><div style="height:40px">&nbsp;</div></div></td></tr><tr> <td valign="bottom"><table style="text-align:center;width:540px;margin-top:21px;margin-bottom:40px" class="m_-5258102743783239414mce-item-table" cellspacing="0" cellpadding="0" border="0"><tbody></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div>';
        }

        if (type === 'indicate_confirm') {
            return '<div id=":15a" class="a3s aXjCH m162061488d6c3898"><u></u><div style="height:100%;margin:0;padding:0;width:100%;background-color:#fafafa"><center><table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="m_-6355062645350785830bodyTable" style="border-collapse:collapse;height:100%;margin:0;padding:0;width:100%;background-color:#fafafa"><tbody><tr><td align="center" valign="top" id="m_-6355062645350785830bodyCell" style="height:100%;margin:0;padding:10px;width:100%;border-top:0"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="m_-6355062645350785830templateContainer" style="border-collapse:collapse;border:0;max-width:600px!important"><tbody><tr><td valign="top" id="m_-6355062645350785830templatePreheader" style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:9px;padding-bottom:9px"></td></tr><tr><td valign="top" id="m_-6355062645350785830templateHeader" style="background:#fff4e2 none no-repeat center/cover;background-color:#fff4e2;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:9px;padding-bottom:0"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="m_-6355062645350785830mcnImageBlock" style="min-width:100%;border-collapse:collapse"><tbody class="m_-6355062645350785830mcnImageBlockOuter"><tr><td valign="top" style="padding:9px" class="m_-6355062645350785830mcnImageBlockInner"><table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="m_-6355062645350785830mcnImageContentContainer" style="min-width:100%;border-collapse:collapse"><tbody><tr><td class="m_-6355062645350785830mcnImageContent" valign="top" style="padding-right:9px;padding-left:9px;padding-top:0;padding-bottom:0;text-align:center"><a href="https://buscaaereo.com.br/campanha/" title="" target="_blank" href="https://buscaaereo.com.br/campanha/"> <img align="center" alt="" src="https://elomilhas.com.br/wp-content/uploads/2017/12/BA_normal.png" width="165" style="max-width:165px;padding-bottom:0;display:inline!important;vertical-align:bottom;border:0;height:auto;outline:none;text-decoration:none" class="m_-6355062645350785830mcnImage CToWUd"> </a></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="m_-6355062645350785830mcnImageBlock" style="min-width:100%;border-collapse:collapse"><tbody class="m_-6355062645350785830mcnImageBlockOuter"><tr><td valign="top" style="padding:0px" class="m_-6355062645350785830mcnImageBlockInner"><table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="m_-6355062645350785830mcnImageContentContainer" style="min-width:100%;border-collapse:collapse"><tbody><tr><td class="m_-6355062645350785830mcnImageContent" valign="top" style="padding-right:0px;padding-left:0px;padding-top:0;padding-bottom:0;text-align:center"><a href="https://buscaaereo.com.br/campanha/" title="" target="_blank" href="https://buscaaereo.com.br/campanha/"> <img align="center" alt="" src="https://elomilhas.com.br/wp-content/uploads/2018/03/Imagem_Cabecalho_EmailMKT.png" width="600" style="max-width:1200px;padding-bottom:0;display:inline!important;vertical-align:bottom;border:0;height:auto;outline:none;text-decoration:none" class="m_-6355062645350785830mcnImage CToWUd"> </a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td valign="top" id="m_-6355062645350785830templateBody" style="background:#fff9f4 none no-repeat center/cover;background-color:#fff9f4;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:2px solid #eaeaea;padding-top:0;padding-bottom:9px"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="m_-6355062645350785830mcnTextBlock" style="min-width:100%;border-collapse:collapse"><tbody class="m_-6355062645350785830mcnTextBlockOuter"><tr><td valign="top" class="m_-6355062645350785830mcnTextBlockInner" style="padding-top:9px"><table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%;min-width:100%;border-collapse:collapse" width="100%" class="m_-6355062645350785830mcnTextContentContainer"><tbody><tr><td valign="top" class="m_-6355062645350785830mcnTextContent" style="padding:0px 18px 9px;color:#808285;font-size:14px;font-style:normal;font-weight:normal;text-align:left;word-break:break-word;font-family:Helvetica;line-height:150%"><p style="color:#808285;font-size:14px;font-style:normal;font-weight:normal;text-align:left;margin:10px 0;padding:0;font-family:Helvetica;line-height:150%"><br> <strong>Olá parceiro!</strong><br> <br> Sua indicação foi recebida com sucesso!&nbsp;<br> <br> Assim que a sua agência indicada realizar a primeira emissão, você receberá um voucher no valor de <strong>R$30,00</strong> para usar no Busca Aéreo :)<br> <br> <br> Aproveite para nos ajudar a melhorar nossos serviços! Entre em nosso site e realize nossa pesquisa de avaliação. Sua opinião é muito importante para nós.<br> <br> &nbsp;</p></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="m_-6355062645350785830mcnButtonBlock" style="min-width:100%;border-collapse:collapse"><tbody class="m_-6355062645350785830mcnButtonBlockOuter"><tr><td style="padding-top:0;padding-right:18px;padding-bottom:18px;padding-left:18px" valign="top" align="center" class="m_-6355062645350785830mcnButtonBlockInner"><table border="0" cellpadding="0" cellspacing="0" class="m_-6355062645350785830mcnButtonContentContainer" style="border-collapse:separate!important;border-radius:6px;background-color:#fb8a3f"><tbody><tr><td align="center" valign="middle" class="m_-6355062645350785830mcnButtonContent" style="font-family:Arial;font-size:16px;padding:15px"> <a class="m_-6355062645350785830mcnButton" title="Avalie Aqui" href="https://buscaaereo.com.br/avaliacao/" style="font-weight:bold;letter-spacing:normal;line-height:100%;text-align:center;text-decoration:none;color:#ffffff;display:block" target="_blank">Avalie Agora</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tbody><tr><td><br></td></tr><tr><td class="m_1233416192563189207footerContent" style="font-family:Helvetica,Arial,sans-serif;line-height:160%;background:#ffffff"><table border="0" cellpadding="0" cellspacing="0" width="100%" id="m_1233416192563189207templateFooter" style="border-collapse:collapse;background-color:#ffffff"><tbody><tr><td class="m_1233416192563189207social" style="font-family:Helvetica,Arial,sans-serif;line-height:160%;padding-bottom:16px;text-align:center;background:#f7f7f7;padding:10px 0px 40px 0px"> <a href="https://www.facebook.com/buscaaereo" style="color:#8d3dc8;font-weight:bold;text-decoration:none" target="_blank" href="https://www.facebook.com/buscaaereo"> <img alt="Facebook" src="https://ci4.googleusercontent.com/proxy/UN9SeDDNcLZfSursFNPQL5lvKK_d4SdqTVyE2GKS0btviixJMPfFQYonFrx_zhPCRp297E6oHjIf-8JYpdtwoniU49-wsrK5=s0-d-e1-ft#https://images.nubank.com.br/ico-facebook-grey.png" width="40" class="m_1233416192563189207icon CToWUd" style="border:0;height:auto;line-height:100%;outline:none;text-decoration:none"> </a> &nbsp;&nbsp; <a href="https://twitter.com/buscaaereo" style="color:#8d3dc8;font-weight:bold;text-decoration:none" target="_blank" href="https://twitter.com/buscaaereo"> <img alt="Twitter" src="https://ci3.googleusercontent.com/proxy/WPJskOidRWW3VPyRAJzYqwpcQH7E-UzPUl1_jiBPSXvT5nRBAWY4ZHHjCCiOe3skFupo0_KWky7wfalTCEULxdpfTFKNc8k=s0-d-e1-ft#https://images.nubank.com.br/ico-twitter-grey.png" width="40" class="m_1233416192563189207icon CToWUd" style="border:0;height:auto;line-height:100%;outline:none;text-decoration:none"> </a> &nbsp;&nbsp; <a href="https://www.youtube.com/channel/UC0rIxwJZGwQY9XkbwjPOu0Q" style="color:#8d3dc8;font-weight:bold;text-decoration:none" target="_blank" href="https://www.youtube.com/channel/UC0rIxwJZGwQY9XkbwjPOu0Q"> <img alt="YouTube" src="https://ci4.googleusercontent.com/proxy/0CSuVxRqOM37ArFbfl-NdS1sCBLhgQwyTyJN-kFuh0NFlqLKciEpk1u-gaz_lI1OdqDeOKqk2JBtsYVS_i7vAQ4hBcrGFng=s0-d-e1-ft#https://images.nubank.com.br/ico-youtube-grey.png" width="40" class="m_1233416192563189207icon CToWUd" style="border:0;height:auto;line-height:100%;outline:none;text-decoration:none"> </a> &nbsp;&nbsp; <a href="http://www.instagram.com/busca.aereo" style="color:#8d3dc8;font-weight:bold;text-decoration:none" target="_blank" href="https://www.instagram.com/busca.aereo"> <img alt="Instagram" src="https://ci6.googleusercontent.com/proxy/c3ucuxvVOSFbboRAIHvRE3FGMG2QRlYA333JL5NxfHW_-ZWAugLDIhPfoqk1LQsqTAkYlDacUvBHbp8C4OMwdAtyuzjIpMlGWA=s0-d-e1-ft#https://images.nubank.com.br/ico-instagram-grey.png" width="40" class="m_1233416192563189207icon CToWUd" style="border:0;height:auto;line-height:100%;outline:none;text-decoration:none"> </a> &nbsp;&nbsp; <a href="http://www.linkedin.com/company/buscaaereo" style="color:#8d3dc8;font-weight:bold;text-decoration:none" target="_blank" href="https://www.linkedin.com/company/buscaaereo"> <img alt="Twitter" src="https://ci6.googleusercontent.com/proxy/0Ek8Jw0PxaqHIOUCt7dJxiCwN1B7BUL0GkAdAIXrmVgoStqC7rSCDyt7t-LTV8MkeLpGzg0KDflMXRvnQdDAKkFhTxR_tweo=s0-d-e1-ft#https://images.nubank.com.br/ico-linkedin-grey.png" width="40" class="m_1233416192563189207icon CToWUd" style="border:0;height:auto;line-height:100%;outline:none;text-decoration:none"> </a></td></tr></tbody></table></td></tr></tbody></tbody></table></td></tr></tbody></table></center>';
        }

        if (type === 'indicated_confirm') {
            return '<div id=":15a" class="a3s aXjCH m162061488d6c3898"><u></u><div style="height:100%;margin:0;padding:0;width:100%;background-color:#fafafa"><center><table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="m_-6355062645350785830bodyTable" style="border-collapse:collapse;height:100%;margin:0;padding:0;width:100%;background-color:#fafafa"><tbody><tr><td align="center" valign="top" id="m_-6355062645350785830bodyCell" style="height:100%;margin:0;padding:10px;width:100%;border-top:0"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="m_-6355062645350785830templateContainer" style="border-collapse:collapse;border:0;max-width:600px!important"><tbody><tr><td valign="top" id="m_-6355062645350785830templatePreheader" style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:9px;padding-bottom:9px"></td></tr><tr><td valign="top" id="m_-6355062645350785830templateHeader" style="background:#fff4e2 none no-repeat center/cover;background-color:#fff4e2;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:9px;padding-bottom:0"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="m_-6355062645350785830mcnImageBlock" style="min-width:100%;border-collapse:collapse"><tbody class="m_-6355062645350785830mcnImageBlockOuter"><tr><td valign="top" style="padding:9px" class="m_-6355062645350785830mcnImageBlockInner"><table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="m_-6355062645350785830mcnImageContentContainer" style="min-width:100%;border-collapse:collapse"><tbody><tr><td class="m_-6355062645350785830mcnImageContent" valign="top" style="padding-right:9px;padding-left:9px;padding-top:0;padding-bottom:0;text-align:center"><a href="https://buscaaereo.com.br/campanha/" title="" target="_blank" href="https://buscaaereo.com.br/campanha/"> <img align="center" alt="" src="https://elomilhas.com.br/wp-content/uploads/2017/12/BA_normal.png" width="165" style="max-width:165px;padding-bottom:0;display:inline!important;vertical-align:bottom;border:0;height:auto;outline:none;text-decoration:none" class="m_-6355062645350785830mcnImage CToWUd"> </a></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="m_-6355062645350785830mcnImageBlock" style="min-width:100%;border-collapse:collapse"><tbody class="m_-6355062645350785830mcnImageBlockOuter"><tr><td valign="top" style="padding:0px" class="m_-6355062645350785830mcnImageBlockInner"><table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="m_-6355062645350785830mcnImageContentContainer" style="min-width:100%;border-collapse:collapse"><tbody><tr><td class="m_-6355062645350785830mcnImageContent" valign="top" style="padding-right:0px;padding-left:0px;padding-top:0;padding-bottom:0;text-align:center"><a href="https://buscaaereo.com.br/campanha/" title="" target="_blank" href="https://buscaaereo.com.br/campanha/"> <img align="center" alt="" src="https://elomilhas.com.br/wp-content/uploads/2018/03/Imagem_Cabecalho_EmailMKT.png" width="600" style="max-width:1200px;padding-bottom:0;display:inline!important;vertical-align:bottom;border:0;height:auto;outline:none;text-decoration:none" class="m_-6355062645350785830mcnImage CToWUd"> </a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td valign="top" id="m_-6355062645350785830templateBody" style="background:#fff9f4 none no-repeat center/cover;background-color:#fff9f4;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:2px solid #eaeaea;padding-top:0;padding-bottom:9px"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="m_-6355062645350785830mcnTextBlock" style="min-width:100%;border-collapse:collapse"><tbody class="m_-6355062645350785830mcnTextBlockOuter"><tr><td valign="top" class="m_-6355062645350785830mcnTextBlockInner" style="padding-top:9px"><table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%;min-width:100%;border-collapse:collapse" width="100%" class="m_-6355062645350785830mcnTextContentContainer"><tbody><tr><td valign="top" class="m_-6355062645350785830mcnTextContent" style="padding:0px 18px 9px;color:#808285;font-size:14px;font-style:normal;font-weight:normal;text-align:left;word-break:break-word;font-family:Helvetica;line-height:150%"><p style="color:#808285;font-size:14px;font-style:normal;font-weight:normal;text-align:left;margin:10px 0;padding:0;font-family:Helvetica;line-height:150%"><br> <strong>Olá parceiro!</strong><br> <br> Seja bem-vindo(a) ao Busca Aéreo!&nbsp;<br> <br> Seus dados foram recebidos com sucesso. Aguarde o contato do nosso setor comercial para finalizar o seu cadastro e resgatar um voucher no valor de <strong>R$50,00</strong> para usar na sua primeira emissão no Busca Aéreo :)<br> <br> Atenciosamente,<br><strong>Equipe Busca Aéreo.</strong></td></tr></tbody></table></td></tr></tbody></table></td></tr><tbody><tr><td><br></td></tr><tr><td class="m_1233416192563189207footerContent" style="font-family:Helvetica,Arial,sans-serif;line-height:160%;background:#ffffff"><table border="0" cellpadding="0" cellspacing="0" width="100%" id="m_1233416192563189207templateFooter" style="border-collapse:collapse;background-color:#ffffff"><tbody><tr><td class="m_1233416192563189207social" style="font-family:Helvetica,Arial,sans-serif;line-height:160%;padding-bottom:16px;text-align:center;background:#f7f7f7;padding:10px 0px 40px 0px"> <a href="https://www.facebook.com/buscaaereo" style="color:#8d3dc8;font-weight:bold;text-decoration:none" target="_blank" href="https://www.facebook.com/buscaaereo"> <img alt="Facebook" src="https://ci4.googleusercontent.com/proxy/UN9SeDDNcLZfSursFNPQL5lvKK_d4SdqTVyE2GKS0btviixJMPfFQYonFrx_zhPCRp297E6oHjIf-8JYpdtwoniU49-wsrK5=s0-d-e1-ft#https://images.nubank.com.br/ico-facebook-grey.png" width="40" class="m_1233416192563189207icon CToWUd" style="border:0;height:auto;line-height:100%;outline:none;text-decoration:none"> </a> &nbsp;&nbsp; <a href="https://twitter.com/buscaaereo" style="color:#8d3dc8;font-weight:bold;text-decoration:none" target="_blank" href="https://twitter.com/buscaaereo"> <img alt="Twitter" src="https://ci3.googleusercontent.com/proxy/WPJskOidRWW3VPyRAJzYqwpcQH7E-UzPUl1_jiBPSXvT5nRBAWY4ZHHjCCiOe3skFupo0_KWky7wfalTCEULxdpfTFKNc8k=s0-d-e1-ft#https://images.nubank.com.br/ico-twitter-grey.png" width="40" class="m_1233416192563189207icon CToWUd" style="border:0;height:auto;line-height:100%;outline:none;text-decoration:none"> </a> &nbsp;&nbsp; <a href="https://https://www.youtube.com/channel/UC0rIxwJZGwQY9XkbwjPOu0Q" style="color:#8d3dc8;font-weight:bold;text-decoration:none" target="_blank" href"www.youtube.com/channel/UC0rIxwJZGwQY9XkbwjPOu0Q"> <img alt="YouTube" src="https://ci4.googleusercontent.com/proxy/0CSuVxRqOM37ArFbfl-NdS1sCBLhgQwyTyJN-kFuh0NFlqLKciEpk1u-gaz_lI1OdqDeOKqk2JBtsYVS_i7vAQ4hBcrGFng=s0-d-e1-ft#https://images.nubank.com.br/ico-youtube-grey.png" width="40" class="m_1233416192563189207icon CToWUd" style="border:0;height:auto;line-height:100%;outline:none;text-decoration:none"> </a> &nbsp;&nbsp; <a href="http://www.instagram.com/busca.aereo" style="color:#8d3dc8;font-weight:bold;text-decoration:none" target="_blank" href="https://www.instagram.com/busca.aereo"> <img alt="Instagram" src="https://ci6.googleusercontent.com/proxy/c3ucuxvVOSFbboRAIHvRE3FGMG2QRlYA333JL5NxfHW_-ZWAugLDIhPfoqk1LQsqTAkYlDacUvBHbp8C4OMwdAtyuzjIpMlGWA=s0-d-e1-ft#https://images.nubank.com.br/ico-instagram-grey.png" width="40" class="m_1233416192563189207icon CToWUd" style="border:0;height:auto;line-height:100%;outline:none;text-decoration:none"> </a> &nbsp;&nbsp; <a href="http://www.linkedin.com/company/buscaaereo" style="color:#8d3dc8;font-weight:bold;text-decoration:none" target="_blank" href="https://www.linkedin.com/company/buscaaereo"> <img alt="Twitter" src="https://ci6.googleusercontent.com/proxy/0Ek8Jw0PxaqHIOUCt7dJxiCwN1B7BUL0GkAdAIXrmVgoStqC7rSCDyt7t-LTV8MkeLpGzg0KDflMXRvnQdDAKkFhTxR_tweo=s0-d-e1-ft#https://images.nubank.com.br/ico-linkedin-grey.png" width="40" class="m_1233416192563189207icon CToWUd" style="border:0;height:auto;line-height:100%;outline:none;text-decoration:none"> </a></td></tr></tbody></table></td></tr></tbody></tbody></table></td></tr></tbody></table></center>';
        }
    }

});