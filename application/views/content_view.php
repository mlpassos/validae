<div class="container">
	<div class="row">
	    <div class="cold-md-12 col-lg-12 col-sm-12">
			<!-- <img src="https://static.wiliam.com.au/2014/10/ajax-loader.gif" class="ajaxmessage" alt="imagem mostra que o sistema está trabalhando..."> -->
			
			<div class="principal">
				<img class="ajax-loading" src="<?php echo base_url(); ?>/assets/images/ajaxloading.gif">
				<div class="resultados-total well">
		      	<!-- total -->
		      		Foram encontradas <span class="resultados-numero badge"></span> páginas no site.
		      		<p><button data-url="" type="button" class="validar-todas btn btn-xs btn-primary">Validar todas</button></p>
		      	</div>
				<table class="tabela-resultados table table-hover">
		        <thead>
		          <tr>
		            <th>#</th>
					<th>Página (url)</th>
		            <th>Status</th>
		          </tr>
		        </thead>
		        <tbody class="tabela-resultados-corpo">
		          <!-- adiciona colunas aqui -->
		        </tbody>
		      </table>
		      
			</div>
		</div>
	</div>
</div><!-- /.container -->