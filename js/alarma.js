
// JavaScript Document
	
	//Metodo que encarga de buscar todas las alarmas existentes en el dispositivo
	function buscarAlarmas(){
			
			var cadenaFechaActual=getFechaActual(); 			
			
			var key=cadenaFechaActual+':'+"1";
			var alarmaActualBusqueda= window.localStorage.getItem(key);		
			if(alarmaActualBusqueda!=null){
				
				var index=2;				
				while(alarmaActualBusqueda!=null){				
	
					var json=jQuery.parseJSON(alarmaActualBusqueda);
					//alert(json.hora+"\n"+json.nombre);
					//limpiarMemoria(json.hora,key);
					activarAlarma(json.hora,json.nombre);					
					key=cadenaFechaActual+':'+index;
					alarmaActualBusqueda= window.localStorage.getItem(key);
					index++;

				}//fin del while
			}
		}
		
		//metodo que se encarga de validar si se debe activar la alar y de ser así activarla alarma
		function activarAlarma(hora,nombrePrograma){
	
			var horaPrograma=hora.split(':');
			var horaActual=getHoraActual();

			
			
			if(horaActual[0]==horaPrograma[0]){				
				var diferencia=horaPrograma[1]-horaActual[1];
												
				if(diferencia>=0){
					if(diferencia==15 || diferencia==10 || diferencia==5 || diferencia==0){
						var mensaje='faltan '+ diferencia+' minutos para que inicie'+
						'el programa '+ nombrePrograma +'\nHora de inicio del programa: '+hora;
						
						 navigator.notification.alert(
							 mensaje,  
							'Canal 13', 
							'Cerrar' );
							
							navigator.notification.beep(2);

					}//si no faltan 15, 10 o 5 minutos
				}
			}//si la hora no es la misma, no haga nada
		}
		
		
		function buscarAlarmasDelDia(){
			var cadenaFechaActual=getFechaActual();
			
			var index=1;
			
			var key=cadenaFechaActual+':'+index;
			var alarma= window.localStorage.getItem(key);

			while(alarma!=null){
				var json=jQuery.parseJSON(alarma);
				alert('recuerda que debes ver el programa: '+json.nombre+
				"\n que empieza a la hora: "+json.hora);
				index++;
				key=cadenaFechaActual+':'+index;
				alarma= window.localStorage.getItem(key);
			}
			
		}
		
		function limpiarMemoria(hora,keyPrograma){
			var horaActual=getHoraActual();

			var horaPrograma=hora.split(':');
			
			if(horaActual[0]>horaPrograma[0]){
				window.localStorage.removeItem(keyPrograma);
				return;
			}
			if(horaActual[0]==horaPrograma[0] && 
			 horaActual[1]>horaPrograma[1]){
				 window.localStorage.removeItem(keyPrograma);
				return;
			 }
		}
		
		//	obtiene la hora del dispositivo
	//  retorna un vector en el cual la primera posición sera la hora y la segunda los minutos
	function getHoraActual(){
		var fecha=new Date();
		var hora=[fecha.getHours(),fecha.getMinutes()];
		return hora;
	}
	
	//obtiene la fecha del dispositivo
	function getFechaActual(){
		var  fecha= new Date();//obtengo la fecha del dispositivo
		
		var mes=parseInt(fecha.getMonth())+1;
		var cadenaFecha= fecha.getDate()+'/'+mes+'/'+ fecha.getFullYear();
		return cadenaFecha;
	}
	
		
	