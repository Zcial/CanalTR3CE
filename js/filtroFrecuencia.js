	
	
	var arrayInfo= new Array();
	var operadorEnc;
	var ciudadEncontrada;

	
	$(document).ready(function(e) {
		realizarCarga();
	});

	//funcion que se encarga de obtener el listado de frecuencias de tipo json
	function realizarCarga(){
		$.getJSON("js/frecuencias.json",function (datos){
					$.each(datos,function (idx,dato){

							arrayInfo.push(dato);
						});
			}).done(function(){
				$('#ocultar').css("display","none");
			});
	}
	
	function buscarOperador(nombre,ciudad){
		buscarOperadorPorNombres(nombre);
		buscarCiudadOperador(ciudad);

	}
	
	function buscarOperadorPorNombres(nombre){
			for(var i=0;i<arrayInfo.length;i++){
				if(arrayInfo[i]['operador']==nombre){
					operadorEnc=arrayInfo[i];
					return;
				}
			}
	}
	
	
	function buscarCiudadOperador(ciudad){

		for(var i=0;i<operadorEnc['ciudades'].length;i++){
			var actual=operadorEnc['ciudades'][i];
				if(actual['nombre']==ciudad){
					ciudadEncontrada=actual;
					break;
				}
		}
		
		imprimirResultadoBusqueda();
	}
	
	function imprimirResultadoBusqueda(){
		var html="";		

		for(var i=0;i<ciudadEncontrada['canales'].length;i++){
			var canalActual=ciudadEncontrada['canales'][i];
			html+='<div class="block">'+
					'<div class="canal">'+
						canalActual+
					'</div>'+
					'<div class="operador">'+
						operadorEnc['operador']+
					'</div>'+
		    	'</div>';
		}

		$('.block').remove();
		$('.operador').remove();
		$('.canal').remove();
		$("#frecuencias").append(html);
	}
	
	
