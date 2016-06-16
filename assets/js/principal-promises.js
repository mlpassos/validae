(function ($) {
    "use strict";
    var fn = {
        Iniciar : function () {
            fn.App();
        },
        App : function () {
        	// cache? =] needs more implementation
        	$.ajaxSetup({ cache: true});
			// for escaping html text
			function escapeHtml(text) {
			  var map = {
			    '&': '&amp;',
			    '<': '&lt;',
			    '>': '&gt;',
			    '"': '&quot;',
			    "'": '&#039;'
			  };
			  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
			}
			// setting up modals (needs to solve bug)
			function modal(tipo, arrMensagem) {
				var element = "";
				if (tipo == "info") {
					element = $('#modalInfo');
				} else if (tipo == "erro") {
					element = $('#modalErro');
				}
				element.find('.modal-body').html('');
				arrMensagem.forEach(function(item,i){
						console.log(item);
						element.find('.modal-body').append("<div><a role='button' style='margin-bottom:5px;' class='btn btn-primary btn-xs' data-toggle='collapse' href='#collapseExample-" + item.type + item.lastLine + "' aria-expanded='false' aria-controls='collapseExample-" + item.type + item.lastLine + "'>" + item.lastLine + "</a></div>"
							// + "<p>" + item.subType + "</p>"
							+ "<div class='collapse' id='collapseExample-" + item.type + item.lastLine + "'>"
  							+ "<div class='well'>"
							// + "<p><strong>" + item.lastLine + "</strong></p>"
							+ "<p class='modal-bg-info bg-warning'>" + escapeHtml(item.extract) + "</p>"
							+ "<p class='modal-bg-info bg-info'>" + escapeHtml(item.message) + "</p>"
							+ "</div></div>");
				});
				return;
			}

    	$('body').delegate('.tabela-resultados-mensagem-botao','click',function(){
    		// todo
    	});
    	// horrible way of getting all the pages results (todo way better $deffering)
   	
    	// function getFile(el, url, cb) {
    	// 	url = encodeURIComponent(url);
    	// 	el.html('<img style="width:16px;height:16px;" src="http://localhost/validagit/validae//assets/images/ajaxloading.gif">');
    	// 	$.ajax({
	    //         type: "get",
	    //         url: 'https://validator.w3.org/nu/?doc=' + url + '&out=json&parser=html5',
	    //        	dataType: 'json'
     //    	}).done(cb);
    	// }

    	function getFile(file) {
    		console.log('getting file: ' + file);
    		var url = encodeURIComponent(file);
			return new Promise(function(resolve){
				$.ajax({
		            type: "get",
		            url: 'https://validator.w3.org/nu/?doc=' + url + '&out=json&parser=html5',
		           	dataType: 'json'
	        	}).done(resolve);
			});
		}
		function output(data) {
			// var urlComp = data.url;
			console.log(data);
			var arr = $('.tabela-resultados-corpo > tr > td > .verificar-url');
			data.forEach(function(item,i) {
				var atual = item.url;
				var mensagens = item.messages;
				console.log(mensagens);
				// arr.each(function(index,item){
	   //  			var el = $(this);
	   //  			var url = el.attr('data-url');
	   //  			if (url == atual) {
	   //  				if (jQuery.isEmptyObject(mensagens)) {
	   //  					el.text('w3c válido');
	   //       				el.parent().parent().addClass('bg-success');	
	   //  				}
	   //  			}
    // 			});
				// if (jQuery.isEmptyObject(item.messages)) {
				// 	console.log('válido');
				// }
			});
			// arr.each(function(index,item){
   //  			var el = $(this);
   //  			var url = el.attr('data-url');
   //  			if (url == urlComp) {
   //  				if (jQuery.isEmptyObject(data.messages)) {
   //  					el.text('w3c válido');
   //       				el.parent().parent().addClass('bg-success');	
   //  				}
   //  			}
   //  		});
			// console.log('ali output');
		}

    	$('body').delegate('.validar-todas','click',function(){
    		var arr = $('.tabela-resultados-corpo > tr > td > .verificar-url');
    		var arrUrls = new Array();
    		arr.each(function(index,item){
    			//var el = $(this);
    			var url = $(this).attr('data-url');
    			arrUrls.push(url);
    		});
    		// console.log(arrUrls);
    		arrUrls
    		.map(getFile)
			.reduce(
				function(chain,filePromise){
					return chain
						.then(function(){
							// console.log('aqui');
							return filePromise;
						})
						.then(output);
				},
				Promise.resolve() // fulfilled promise to start chain
			)
			.then(function() {
				output("Complete!");
			});

  			// arr.each(function(index,item){
    	// 		var el = $(this);
    	// 		var url = $(this).attr('data-url');
    	// 		getFile(el, url, function(data) {
    	// 			// console.log(Date.now());
    	// 			el.html('');
     //     		if (jQuery.isEmptyObject(data.messages)) {
     //     			el.text('w3c válido');
     //     			el.parent().parent().addClass('bg-success');
     //     		} else {
     //     			// search for errors and infos/warnings and store into array
     //     			var  arrErro = [];
     //     			var  arrInfo = [];
     //     			var  arrWarning = [];
     //     			el.parent().parent().addClass('bg-danger');
     //     			el.text('Erro').removeClass('btn-succcess').addClass('btn-danger');
     //       		data.messages.forEach(function(item,i) {
     //       			// console.log(item.type);
     //       			if (item.type=="error") {
     //       				arrErro.push(item);
     //       			} else if (item.type=="info") {
     //       				arrInfo.push(item);
     //       			} 
     //       		});
     //       		// set up modals with different arrays (todo way better)
					// 		if (arrInfo.length>0) {
					// 			el.parent().parent().next('.tabela-resultados-mensagem')
		   //       						.find('.panel-body').append('<button data-toggle="modal" data-target="#modalInfo" data-dados="' + arrInfo + '" type="button" class="btn btn-xs btn-info tabela-resultados-mensagem-botao">Info <span class="badge">' + arrInfo.length + '</span></button>');
		   //       					modal('ielnfo', arrInfo);
					// 		} 
					// 		if (arrErro.length>0) {
					// 			el.parent().parent().next('.tabela-resultados-mensagem')
		   //       						.find('.panel-body').append('<button data-toggle="modal" data-target="#modalErro" data-dados="' + arrErro + '" type="button" class="btn btn-xs btn-danger tabela-resultados-mensagem-botao">Errors <span class="badge">' + arrErro.length + '</span></button>');
					// 			modal('erro', arrErro);
					// 		}
					// 		el.parent().parent().next('.tabela-resultados-mensagem').slideToggle('slow');
     //     		}
    	// 		});
  			// });
    	});

    	// validate single url
    	$('body').delegate('.verificar-url', 'click', function(){
    		var url = encodeURIComponent($(this).attr('data-url'));
    		var botao = $(this);
    		botao.html('<img style="width:16px;height:16px;" src="http://localhost/validagit/validae//assets/images/ajaxloading.gif">');
    		$.ajax({
            type: "get",
            url: 'https://validator.w3.org/nu/?doc=' + url + '&out=json&parser=html5',
           	success: function(data) {
           		// console.log(typeof data.messages);
           		botao.html('');
           		if (jQuery.isEmptyObject(data.messages)) {
           			botao.text('w3c válido');
           			botao.parent().parent().addClass('bg-success');
           		} else {
           			// search for errors and infos/warnings and store into array
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
	           		// set up modals with different arrays (todo way better)
								if (arrInfo.length>0) {
									botao.parent().parent().next('.tabela-resultados-mensagem')
			         						.find('.panel-body').append('<button data-toggle="modal" data-target="#modalInfo" data-dados="' + arrInfo + '" type="button" class="btn btn-xs btn-info tabela-resultados-mensagem-botao">Info <span class="badge">' + arrInfo.length + '</span></button>');
			         					modal('info', arrInfo);
								} 
								if (arrErro.length>0) {
									botao.parent().parent().next('.tabela-resultados-mensagem')
			         						.find('.panel-body').append('<button data-toggle="modal" data-target="#modalErro" data-dados="' + arrErro + '" type="button" class="btn btn-xs btn-danger tabela-resultados-mensagem-botao">Errors <span class="badge">' + arrErro.length + '</span></button>');
									modal('erro', arrErro);
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
	// search pages in a website
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
		            success: function(data) {
			            	var urlsUnicas = [];
			            	data.forEach(function(item,i){
			            		if ($.inArray(item.url, urlsUnicas) === -1) {
							        urlsUnicas.push(item.url);
							    }
			            	});
			            	// console.log(urlsUnicas);
			            	urlsUnicas.forEach(function(item,i){
			            		$('.tabela-resultados-corpo').append('<tr><th scope="row">' + (parseInt(i)) + '</th>'
				                	+ '<td class="tabela-resultados-url">'+ item + '</td>'
				                	+ '<td><button class="btn btn-xs btn-success verificar-url" data-url="'+ item + '">verificar</button></td></tr>'
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
		      		//console.log(status);
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