

var Json;
var html_complete;

          function inicio(){
			  cargarJson();					
          }

		  
		  function configurarEventos(){			 
			  $("#dropmenu").css("display","block");
			  $("ul.subnavegador").hide();  
			  $("a.desplegable").toggle(
			  function() { 
			  $(this).parent().find("ul.subnavegador").slideDown('fast'); 
			  },
			  function() { 
			  $(this).parent().find("ul.subnavegador").slideUp('fast'); 
			  }  
			  ); 
		  }
		  
          function aparecer(){
			 crearComponentesFaltantes();
            var cambioCSS=
            {
            	display: "block"
            };
            $("#dropmenu").css(cambioCSS);
          }
		  
		  function crearComponentesFaltantes(){
		  $('#cargador').html('<div id="dropmenu"><ul id="primary-nav"> </ul></div>');
		   $('#primary-nav').html(html_complete);
		   configurarEventos();
		  }
		  
		  
		  function cargarJson(){

				$('#ocultar').css("display","block");
				$("#entradaJson").load(	"http://freddymanrique.com/server/Controlador/cargarFrecuencias.php",
				function(){
					$('#ocultar').css("display","none");
					capturarJson();
			});
		  }
			
			function capturarJson(){	
				
				var texto=document.getElementById('entradaJson').innerHTML;
				var miJson=jQuery.parseJSON(texto);
				Json=miJson;
				var html='';
				for(var i=0;i<miJson.length;i++){
					var operador=miJson[i].nombre;					
					var ciudades=miJson[i].ciudades;
					html+='<li><a href="#" class="desplegable"><h2>'+operador+'</h2></a>'+
					'<ul class="subnavegador">';
					for(var j=0;j<ciudades.length;j++){
						  var id=operador+'_'+ciudades[j]['nombre'];
						  
                   	html+='<li><a href="#" id="'+id+'" onClick="mostrarCanales.call(this)">'+
					ciudades[j]['nombre']+'</a></li>';                  
					}
					html+='</ul></li>'
				}
				html_complete=html;
//				$('#primary-nav').html(html); esta linea es definitiva
			}
			
			function mostrarCanales(){
				var id=this.id;
				$("#dropmenu").css("display","none");
				var info=id.split('_');
				if(info.lenght<1){
					alert('error');
					return;
				}

				getCanales(info[0],info[1]);
			}
			
			function getCanales(operador,ciudad){
				var html="";
												
					var indexOperador=buscarIndiceOperador(operador);

					var indexCiudad=buscarIndiceCiudad_Operador(ciudad,indexOperador);

					
					var operador=Json[indexOperador].nombre;
					var canales=Json[indexOperador].ciudades[indexCiudad].canales;
					

					for(var k=0;k<canales.length;k++){

						html+='<div class="block">'+
					    '<div class="canal">'+canales[k]+'</div>'+
					    '<div class="operador"><p>'+operador+'</p></div>'+
						'</div>';
					}//fin del for K
				$('#frecuencias').html(html);
			}
			
			function buscarIndiceOperador(operador){
				for(var i=0;i<Json.length;i++){
					if(Json[i].nombre==operador){	
						return i;
					}
				}
			}
			
			function buscarIndiceCiudad_Operador(ciudad, indexOperador){
				var ciudades=Json[indexOperador].ciudades;				

				for(var i=0;i<ciudades.length;i++){
					if(ciudades[i].nombre==ciudad){
						return i;
					}
				}
			}