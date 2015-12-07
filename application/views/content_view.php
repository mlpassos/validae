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
	<div id="modalInfo" class="modal fade" tabindex="-1" role="dialog">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">Modal title</h4>
	      </div>
	      <div class="modal-body">
	        <p>One fine body&hellip;</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	        <button type="button" class="btn btn-primary">Save changes</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	<div id="modalErro" class="modal fade" tabindex="-1" role="dialog">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">Modal title</h4>
	      </div>
	      <div class="modal-body">
	        <p>One fine body&hellip;</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	        <button type="button" class="btn btn-primary">Save changes</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
</div><!-- /.container -->