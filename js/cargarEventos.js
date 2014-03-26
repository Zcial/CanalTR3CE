// JavaScript Document

$(document).ready(function(){ // Script del Navegador
			  $("#caja").click(function(){
			  $("#dropmenu").css("display","block");
			  });
			  $("ul.subnavegador").hide();  
			  $("a.desplegable").toggle(
			  function() { 
			  $(this).parent().find("ul.subnavegador").slideDown('fast'); 
			  },
			  function() { 
			  $(this).parent().find("ul.subnavegador").slideUp('fast'); 
			  }  
			  );  
			 });