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
		// load dom_helper
		$this->load->helper('dom_helper');
		// get site url
		$link = $this->input->post('url');
		// strip out domain 
		$domain = str_replace('http://www.','',$link);
		// get all links in the page
		$html = file_get_html($link);
		$rank = $html->find('a');
		$res = array();
		foreach($rank as $element){
			// if the href attribute of the link is in the same domain, save it to an array
			if( strpos($element->href,$domain) !== false) {
				$resultado['url'] = $element->href;
				array_push($res,$resultado);
			}
		}
		// return the json data with the urls in the same domain
		echo json_encode($res);
	}
}
