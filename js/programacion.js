//$(document).on("ready", inicio);

var dia=0,mes=0,anio=0;
var seleccionado=0;
var miJson;

function inicio () 
{	
	$.get("http://freddymanrique.com/server/Controlador/cargarProgramacion.php",{},
				function(data){
					miJson=jQuery.parseJSON(data);
					finalizarCarga();
	});

}

function finalizarCarga(){

	seleccionarDiaActual();
	capturarJson();

	$("body").css("overflow", "hidden");
	/*$(".alarma").each(function(){
			$(this).on("click", transicion);
		}
	);*/
	$(".menu").each(function(){
			$(this).on("click", cambioMenu);
		}
	);
}

function cambioMenu (){
	var actCallOutDown = $(".menu calloutDown");
	$(this).append(actCallOutDownParent);
}

	function transicion (caja){	
		var cambiosCSS, actAlarma= document.getElementById(caja.id);
		var ancho = $(window).width();
			if(ancho>400){
				
			if($(actAlarma).data("desplegado")){
					$(actAlarma).data("desplegado", false);	
					cambiosCSS = {
						right: "-88%"
					};		
				}else{
					cambiosCSS = {
						right: "-20%"
					};		
					$(actAlarma).data("desplegado", true);
				}	
				$(actAlarma).css(cambiosCSS);
				
		}else{			
		if($(actAlarma).data("desplegado")){
					$(actAlarma).data("desplegado", false);
	
					cambiosCSS = {
						right: "-82.5%"
					};		
				}else{
					cambiosCSS = {
						right: "-20%"
					};		
					$(actAlarma).data("desplegado", true);
				}	
				$(actAlarma).css(cambiosCSS);

		}
			
	}

		function cargarFecha(miJson){
			
			var fecha=miJson.fecha;
			var info=fecha.split('-');
			anio=info[0];
			mes=info[1];
			dia=info[2];

		}
			function capturarJson(){

				//var texto=document.getElementById('entradaJson').innerHTML;
				//var miJson=jQuery.parseJSON(texto);
				cargarFecha(miJson);

				var programas=miJson.programas;
				var html="";				
 
				
				for(var i=0;i<programas.length;i++){
					var nombrePrograma=programas[i].nombre;
					var hora=programas[i].hora;
					var nombreSinEspacio=nombrePrograma.replace(/ /gi,"%20");					
					html+=concatenaHtml(nombrePrograma,hora,nombreSinEspacio);

				}

				SeleccionarDiaElegido();
				$('#programas').html(html);

			}
			
			//me colocar el selector en el dia especificado
			function SeleccionarDiaElegido(){
				limpiarSelectorOtrosDias()
				$("#div"+seleccionado).addClass('calloutDown');
				
			}
			
			//elimina el selector de otros enlaces en los que se encuentre
			function limpiarSelectorOtrosDias(){
				for(var i=0;i<7;i++){
					if(i!=seleccionado){
						if($('#div'+i).hasClass('calloutDown')){
						$("#div"+i).removeClass('calloutDown');
						}
					}
				}
			}
			
			function seleccionarDiaActual(){
				var fecha =new Date();
				seleccionado=fecha.getDay();
			}
			
			function crearAlarma(){
				
				transicion(this);
				var id=this.id;
				var datos=id.split('|');
				

				var json='{ "hora": "'+datos[0]+'","nombre":"'+datos[1]+'"}';
				var numAlarma=buscarNumeroAlarma();//busco el número de la alarma
				var key=dia+'/'+mes+'/'+anio+':'+numAlarma;;

				window.localStorage.setItem(key,json);
				
			}
			
			function buscarNumeroAlarma(){

				var key=dia+'/'+mes+'/'+anio+':1';
				var alarmaActual=window.localStorage.getItem(key);
				
				if(alarmaActual!=null){
					var index=2;
					while(alarmaActual!=null){
						key=dia+'/'+mes+'/'+anio+':'+index;
						alarmaActual=window.localStorage.getItem(key);
						index++;
					}//fin defin while

					index--;
					return (index);
					
					
				}//fin del if 

				return 1;
			}//fin del metodo
			
			
			function concatenaHtml(nombrePrograma,hora,nombreSinEspacio){
				
				var idAlarma=hora+'|'+nombrePrograma;//crear el id para generar la alarma
				
				return '<li class="programa">'+
					'<div class="hora horizontal">'+hora+'</div>'+
					'<div class="nombreprograma horizontal">'+nombrePrograma+'</div>'+
					'<div class="alarma horizontal" data-desplegado="false" id="'+idAlarma+
					'" onClick="crearAlarma.call(this);">'+
						'<div class="reloj horizontal"><img src="img/iconoreloj.png"></div>'+
						'<div class="compartir horizontal">Comparte esta alarma en...<div class="twitter">'+
                        '<a href="https://twitter.com/share?text='+
						nombreSinEspacio+
						'&hashtags=canal13">'+
						'<img class="twitter" src="img/hola.png"></a></div> </div>'+
					'</div>'+'</li>';
					
					
			}
			
			function recargar(){
				
				seleccionado=this.id;
				$.get("http://freddymanrique.com/server/Controlador/cargarProgramacion.php",{dia:seleccionado},
				function(data){
					miJson=jQuery.parseJSON(data);
					capturarJson();
	});
			}