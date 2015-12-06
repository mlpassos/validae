<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Validar extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */


 
	public function index()	{
		$this->load->helper('dom_helper');
		// pega url do site
		$link = $this->input->post('url');
		// separa o domínio 
		$domain = str_replace('http://www.','',$link);
		// pega todos os links da página inicial
		$html = file_get_html($link);
		$rank = $html->find('a');
		$res = array ();
		foreach($rank as $element){
			// se no href dos links existir o domínio, ou seja, for um site interno (geralmente)
			if( strpos($element->href,$domain) !== false) {
				$resultado['url'] = $element->href;
				array_push($res,$resultado);
			}
		}
		echo json_encode($res);
		// $data['css']="estilos-validar.css";
		// $this->load->view('header_view',$data);
		// $this->load->view('content_validar_view');
		// $this->load->view('footer_view');		
	}
}
