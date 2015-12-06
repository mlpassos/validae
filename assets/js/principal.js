(function ($) {
    "use strict";
    var fn = {
        // Funcionalidades
        Iniciar : function () {
            fn.App();
        },
        App : function () {

        	$('body').delegate('.tabela-resultados-mensagem-botao','click',function(){
        		console.log($(this).attr('data-dados'));
        	});
        	$('body').delegate('.validar-todas','click',function(){
        		console.log($(this).attr('data-url'));
        	});

        	$('body').delegate('.verificar-url', 'click', function(){
        		var url = encodeURIComponent($(this).attr('data-url'));
        		var botao = $(this);
        		// console.log(url);
        		$.ajax({
		            type: "get",
		            url: 'https://html5.validator.nu/?doc=' + url + '&out=json&parser=html5',
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
			           			console.log(item.type);
			           			if (item.type=="error") {
			           				arrErro.push(item);
			           			} else if (item.type=="info") {
			           				arrInfo.push(item);
			           			} 
			           			// else if (item.type=="warning") {
			           			// 	arrWarning.push(item);
			           			// }
			           			//if (item.type=="error") {
			                          // botao.parent().append('<ul class="nav nav-pills" role="tablist">'
									  // + '<li role="presentation"><a href="#">Info <span class="badge">1</span></a></li>'
									  // + '<li role="presentation"><a href="#">Warning <span class="badge">2</span></a></li>'
									  // + '<li role="presentation"><a href="#">Errors <span class="badge">3</span></a></li>'
									  // + '</ul>');
		           					
		           					// botao.parent().parent().next('.tabela-resultados-mensagem')
		           					// 	.slideToggle('slow')
		           					// 	.find('.panel-body').append('<p>Linha: ' + item.lastLine + '</p><p>' + item.message + '</p>');

			           			//}
			           		});
							// var panel = false ;
							if (arrInfo.length>0) {
								botao.parent().parent().next('.tabela-resultados-mensagem')
	           						.find('.panel-body').append('<button data-dados="' + arrInfo + '" type="button" class="btn btn-xs btn-info tabela-resultados-mensagem-botao">Info <span class="badge">' + arrInfo.length + '</span></button>');
	           					console.log(arrInfo);
							} 
							// else if (arrWarning.length>0) {
							// 	botao.parent().parent().next('.tabela-resultados-mensagem')
	      //      						//.slideToggle('slow')
	      //      						.find('.panel-body').append('<button type="button" class="btn btn-xs btn-warning tabela-resultados-mensagem-botao">Warning <span class="badge">' + arrWarning.length + '</span></button>');
							// } 
							if (arrErro.length>0) {
								// if (!panel) {panel = true;};
								botao.parent().parent().next('.tabela-resultados-mensagem')
	           						//.slideToggle('slow')
	           						.find('.panel-body').append('<button data-dados="' + arrErro + '" type="button" class="btn btn-xs btn-danger tabela-resultados-mensagem-botao">Errors <span class="badge">' + arrErro.length + '</span></button>');
							}
							// if (panel) {
							botao.parent().parent().next('.tabela-resultados-mensagem').slideToggle('slow');
							// }
							// console.log(arrInfo);
							// console.log('Avisos:' + arrWarning.length);
							// console.log(arrErro);
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
        		$.ajax({
		            type: "post",
		            url: window.location.href + "/validar",
		            data: {
		            	"url":url
		           	},
		           	beforeSend: function() {
		           		if ($('.tabela-resultados').css('display')=="table") {
	        				$('.tabela-resultados').slideToggle('slow',function(){
	        					$('.resultados-total').fadeToggle('slow', function(){
	        						$('.tabela-resultados-corpo').html('');	
	        						$('.ajax-loading').show('slow');	
	        					});
	        				});
        				} else {
        					$('.ajax-loading').show('slow');
        				}
		           	},
		            success: function(data) {
		            	$('.ajax-loading').hide('slow', function(){
		            		//alert('fim');
			            	var urlsUnicas = [];
			            	// console.log(data);
			            	data.forEach(function(item,i){
			            		if ($.inArray(item.url, urlsUnicas) === -1) {
							        urlsUnicas.push(item.url);
							    }
			            	});
			            	urlsUnicas.forEach(function(item,i){
			            		$('.tabela-resultados-corpo').append('<tr><th scope="row">' + (parseInt(i)) + '</th>'
				                	+ '<td>'+ item + '</td>'
				                	+ '<td><button class="btn btn-xs btn-success verificar-url" data-url="'+ item + '">verificar</button></td></tr>'
				                	//+ '<tr class="tabela-resultados-mensagem"><td colspan="3">Mensagens</td></tr>'
				                	+ '<tr class="tabela-resultados-mensagem">'
				                	+ '<td colspan="3">'
				                	+ '<div class="panel panel-primary">'
				                	+ '<div class="panel-heading">'
				                	+ '<h3 class="panel-title">Mensagens</h3>'
				                	+ '</div>'
				                	+ '<div class="panel-body">'
				                	// + '...'
				                	+ '</div>'
				                	+ '</div>'
				                	+ '</td>'
				                	+ '</tr>');
			            	});
			            	$('.resultados-total span.resultados-numero').text(urlsUnicas.length);
			            	$('.resultados-total').append('<p><button data-url="' + urlsUnicas + '" type="button" class="validar-todas btn btn-xs btn-primary">Validar todas</button></p>').fadeToggle('slow');
			            });
		            },
		            error: function(error) {
		            	console.log(error);
		            	$('.ajax-loading').hide('slow');
		            },
		            dataType: 'json'
		        }).done(function(data,status){
		        	$('.ajax-loading').hide('slow', function(){
		        		if (status==="success") {
				        	$('.tabela-resultados').slideToggle('slow');
			        	} else {
			       			$('.principal').text('Deu bug... tente novamente? =]');
			        	}	
		        	});
		        });
        	});
		}
	}
    $(document).ready(function () {
        fn.Iniciar();
    });
})(jQuery);

			

