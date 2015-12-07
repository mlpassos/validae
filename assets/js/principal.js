(function ($) {
    "use strict";
    var fn = {
        // Funcionalidades
        Iniciar : function () {
            fn.App();
        },
        App : function () {
        	function sleep(milliseconds) {
			  var start = new Date().getTime();
			  for (var i = 0; i < 1e7; i++) {
			    if ((new Date().getTime() - start) > milliseconds){
			      break;
			    }
			  }
			}
			function modal(arrMensagem) {
				console.log(arrMensagem);
				return;
			}
        	$('body').delegate('.tabela-resultados-mensagem-botao','click',function(){
        		//console.log($(this).attr('data-dados'));
        	});
        	$('body').delegate('.validar-todas','click',function(){
        		// var urls = $(this).attr('data-url');
        		// console.log(urls);
        		var tempo = 500;
        		$('.tabela-resultados-corpo > tr > td > .verificar-url').each(function(index,item){
        			var linha = $(this);//.find('.verificar-url');
					// sleep(tempo);
					linha.delay(tempo).fadeToggle(tempo, function(){
						$(this).trigger('click');
					});
					tempo += 500;
					
        		});
        	});
        	$('body').delegate('.verificar-url', 'click', function(){
        		var url = encodeURIComponent($(this).attr('data-url'));
        		var botao = $(this);
        		$.ajax({
		            type: "get",
		            url: 'https://validator.w3.org/nu/?doc=' + url + '&out=json&parser=html5',
		           	success: function(data) {
		           		// console.log(typeof data.messages);
		           		if (jQuery.isEmptyObject(data.messages)) {
		           			// console.log('válido');
		           			botao.text('w3c válido');
		           			botao.parent().parent().addClass('bg-success');
		           		} else {
		           			var  arrErro = [];
		           			var  arrInfo = [];
		           			var  arrWarning = [];
		           			botao.parent().parent().addClass('bg-danger');
		           			botao.text('Erro').removeClass('btn-succcess').addClass('btn-danger');
			           		data.messages.forEach(function(item,i) {
			           			// console.log(item.type);
			           			if (item.type=="error") {
			           				arrErro.push(item);
			           			} else if (item.type=="info") {
			           				arrInfo.push(item);
			           			} 
			           		});
							if (arrInfo.length>0) {
								botao.parent().parent().next('.tabela-resultados-mensagem')
	           						.find('.panel-body').append('<button data-dados="' + arrInfo + '" type="button" class="btn btn-xs btn-info tabela-resultados-mensagem-botao">Info <span class="badge">' + arrInfo.length + '</span></button>');
	           					modal(arrInfo);
	           					// console.log(arrInfo);
							} 
							if (arrErro.length>0) {
								// if (!panel) {panel = true;};
								botao.parent().parent().next('.tabela-resultados-mensagem')
	           						//.slideToggle('slow')
	           						.find('.panel-body').append('<button data-dados="' + arrErro + '" type="button" class="btn btn-xs btn-danger tabela-resultados-mensagem-botao">Errors <span class="badge">' + arrErro.length + '</span></button>');
								modal(arrErro);
							}
							botao.parent().parent().next('.tabela-resultados-mensagem').slideToggle('slow');
		           		}
		           	},
		           	error: function(error) {
		           		console.log(error);
		           	},
		           	dataType: 'json'
		        }).done(function(data, status){
		        	// done
		        	// console.log('terminou: ' + status);
		        });
        	});
        	$('#formSiteUrl').submit(function(e) {
        		e.preventDefault();
        		var url = $('#strPesquisar').val();
        		var total = "";
        		if ($('.tabela-resultados').css('display')=="table") {
    				$('.tabela-resultados').slideToggle('slow','linear', function(){
    					$('.tabela-resultados-corpo').html('');	
    					$('.resultados-total').slideToggle('slow', 'linear', function(){
    						$('.ajax-loading').show();	
    					});
    				});
				} else {
					$('.ajax-loading').show();
				}
        		$.ajax({
		            type: "post",
		            url: window.location.href + "/validar",
		            data: {
		            	"url":url
		           	},
		           	beforeSend: function() {
		           		//
		           	},
		            success: function(data) {
			            	var urlsUnicas = [];
			            	data.forEach(function(item,i){
			            		if ($.inArray(item.url, urlsUnicas) === -1) {
							        urlsUnicas.push(item);
							    }
			            	});
			            	urlsUnicas.forEach(function(item,i){
			            		$('.tabela-resultados-corpo').append('<tr><th scope="row">' + (parseInt(i)) + '</th>'
				                	+ '<td class="tabela-resultados-url">'+ item.url + '</td>'
				                	+ '<td><button class="btn btn-xs btn-success verificar-url" data-url="'+ item.url + '">verificar</button></td></tr>'
				                	+ '<tr class="tabela-resultados-mensagem">'
				                	+ '<td colspan="3">'
				                	+ '<div class="panel panel-primary">'
				                	+ '<div class="panel-heading">'
				                	+ '<h3 class="panel-title">Mensagens</h3>'
				                	+ '</div>'
				                	+ '<div class="panel-body">'
				                	+ '</div>'
				                	+ '</div>'
				                	+ '</td>'
				                	+ '</tr>');
			            	});
			            	$('.resultados-total span.resultados-numero').text(urlsUnicas.length);
			            	$('.validar-todas').attr('data-url', urlsUnicas);//append('<p><button data-url="' + urlsUnicas + '" type="button" class="validar-todas btn btn-xs btn-primary">Validar todas</button></p>');
		            },
		            error: function(error) {
		            	console.log(error);
		            	alert('erro, verifique o console...');
		            	$('.ajax-loading').hide('slow');
		            },
		            dataType: 'json'
		        }).done(function(data,status){
		        	$('.ajax-loading').hide();
	        		console.log(status);
	        		if (status=="success") {
			        	$('.resultados-total').slideToggle('slow', function(){
			        		$('.tabela-resultados').slideToggle('slow');	
			        	});
		        	} else {
		       			$('.principal').text('Deu bug... tente novamente? =]');
		        	}	
		        });
        	});
		}
	}
    $(document).ready(function () {
        fn.Iniciar();
    });
})(jQuery);

			

