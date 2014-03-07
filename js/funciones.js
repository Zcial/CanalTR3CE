
	// Espere a que PhoneGap inicie
    document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap esta listo
    function onDeviceReady() {
		FastClick.attach(document.body);
		setInterval('buscarAlarmas();',40000);

    }
	
	//obtiene la fecha del dispositivo
	function getFechaActual(){
		var  fecha= new Date();//obtengo la fecha del dispositivo
		
		var mes=parseInt(fecha.getMonth())+1;
		var cadenaFecha= fecha.getDate()+'/'+mes+'/'+ fecha.getFullYear();
		return cadenaFecha;
	}
	
	

    // procesa el resultado del cuadro de confirmación
    function onConfirm(button) {
        //var evento = window.localStorage.getItem("evento1");	
		//alert('Eliminado: ' + evento);
    }

    // Muestra un cuadro de dialogo personalizado
    function showAlert() {
		navigator.notification.confirm(
		'El dia de hoy tienes un evento programado',// mensaje (message)
		 onConfirm,      
		'Alerta Programada', // titulo (title)
		'Cerrar' // nombre del botón (buttonName)
    );
	navigator.notification.beep(1);
	
    }
	

	// Comienza Jquery Ready
    $(document).ready(function(){

		  // Detectar Sistema Operativo para librerias
		 var dispositivo = navigator.userAgent.toLowerCase();

		 var os = document.getElementById('os');
		 
		  if( dispositivo.search(/android/) > -1 ){
		  		// Es Android				

				// Crear Caja para Streaming Android
				$("#caja").append(
					'<a href="rtsp://cdns840stu1021.multistream.net/canaltr3celive/live-300" >'+
					'<img src="img/vivo.png" class="escala_img"/>'+//modificada anterior img/vivo.png
					'</a>');
		  }else{
			    // Es iOS

				// Crear Caja para Streaming iOS
				$("#caja").append(
				     '<video class="escala_img"'+
					 'src="http://cdns840stu1021.multistream.net/canaltr3celive/amlst:live/playlist.m3u8"'+
                     'poster="img/vivo.png" '+
                     'controls="" '+
                     'autoplay="false" '+
                     'tabindex="0">'+
                     '</video>');	
			}
			
			
    });// cierra ready
	
	
	
		// Menu Izquierdo - Ver Versión		
		function verVersion(){
			  alert( "Aldea TIC - Versión 1.0" );
		}

		// Menu Izquierdo - Salir	
		function Salir(){
			if(navigator.app){
				navigator.app.exitApp();
			}else if(navigator.device){
				navigator.device.exitApp();
			}
		}
		
		
				
		$(document).one('mobileinit', function () {

             $.mobile.defaultPageTransition = 'none';
			 $.mobile.allowCrossDomainPages = true;
			 $.mobile.phonegapNavigationEnabled = true
 
        });

