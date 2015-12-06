<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="<?php echo base_url(); ?>/assets/favicon.ico">

    <title>Validaê v1.0a</title>

    <!-- Bootstrap core CSS -->
    <link href="<?php echo base_url(); ?>/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    
    <link href="<?php echo base_url(); ?>/assets/estilos/<?php echo $css; ?>" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="<?php echo base_url(); ?>">Validaê</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse navbar-right">
          <div class="formSiteUrl-container navbar-left">
            <form id="formSiteUrl" class="navbar-form" role="search">
              <div class="input-group">
                <input id="strPesquisar" type="text" class="form-control formSiteUrl-pesquisar" placeholder="Search">
                <span class="input-group-btn">
                    <button type="submit" class="btn btn-default">
                      <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                      <span class="sr-only">Procurar</span>
                    </button>
                  </span>
              </div>
            </form>
          </div>
          <ul class="nav navbar-nav">
            <li><a href="<?php echo base_url(); ?>ranking">Ranking</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
  