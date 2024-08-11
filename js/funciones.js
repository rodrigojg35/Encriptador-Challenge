/*

var seccionDefault = document.getElementById('seccion-default')



*/
var rectangulo = document.getElementById('rectangulo');
var seccionDefault = document.querySelectorAll('.seccion-default');
var seccionTraduccion = document.querySelectorAll('.seccion-traduccion');

var botonEncriptar = document.getElementById('boton-encriptar');
var botonDesEncriptar = document.getElementById('boton-desencriptar');

var botonCopiar = document.getElementById('boton-copiar');
var botonCopiarExpandido = document.getElementById('boton-copiar-expandido');

var input = document.getElementById('input');
var mensajeTraduccion = document.getElementById('mensaje-traduccion');

var mensajeCopiable = '';

botonEncriptar.addEventListener('click', function() {

    if(validarInput()){  // Si se cumplen todas las validaciones

        var valorInput = input.value;

        var mensajeEncriptado = '';
        for (var i = 0; i < valorInput.length; i++) {
            switch (valorInput[i]) {
                case 'a':
                    mensajeEncriptado += 'ai';
                    break;
                case 'e':
                    mensajeEncriptado += 'enter';
                    break;
                case 'i':
                    mensajeEncriptado += 'imes';
                    break;
                case 'o':
                    mensajeEncriptado += 'ober';
                    break;
                case 'u':
                    mensajeEncriptado += 'ufat';
                    break;
                default:
                    mensajeEncriptado += valorInput[i];
                    break;
            }
        }
            mensajeTraduccion.innerHTML = mensajeEncriptado;
            mensajeCopiable = mensajeEncriptado;
            cambiarASeccionTraduccion();
    }
    
})

botonDesEncriptar.addEventListener('click', function() {

    if(validarInput()){  // Si se cumplen todas las validaciones

        var valorInput = input.value;

        var reemplazar = {
            'ai': 'a',
            'enter': 'e',
            'imes': 'i',
            'ober': 'o',
            'ufat': 'u'
        };

        var mensajeDesEncriptado = valorInput;

        for(var clave in reemplazar) {
            var regex = new RegExp(clave, 'g');
            mensajeDesEncriptado = mensajeDesEncriptado.replace(regex, reemplazar[clave]);
        }

        mensajeTraduccion.innerHTML = mensajeDesEncriptado;
        mensajeCopiable = mensajeDesEncriptado;
        cambiarASeccionTraduccion();
    

    }

})

function validarInput() {

    var valorInput = input.value;

    if(valorInput.trim() !== ""){  // Validar que no esté vacio

        if (/^[a-z\s]+$/.test(valorInput)) {  // Validar que sean letras y minusculas (CON ESPACIOS)
            return true;
        }else{
            mostrarMensajeEmergente('Solo se permiten letras y deben ser minusculas');
        }

    }else{
        mostrarMensajeEmergente('Debe ingresar algo primero');
    }
    
    return false;
}

function cambiarASeccionDefault() {

    seccionDefault.forEach(elemento => {
        elemento.style.display = 'flex';
    });

    seccionTraduccion.forEach(elemento => {
        elemento.style.display = 'none';
    });

    rectangulo.style.justifyContent = 'center';

    botonCopiarExpandido.classList.remove('boton-visible');
    botonCopiarExpandido.classList.add('boton-oculto');
    
}

function cambiarASeccionTraduccion() {

    seccionDefault.forEach(elemento => {
        elemento.style.display = 'none';
    });

    seccionTraduccion.forEach(elemento => {
        elemento.style.display = 'flex';
    });

    rectangulo.style.justifyContent = 'space-between';

    botonCopiarExpandido.classList.add('boton-visible');
    botonCopiarExpandido.classList.remove('boton-oculto');
    
}

function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(function() {  // Api de portapapeles. Validamos
        mostrarMensajeEmergente('Copiado al portapapeles');
    }, function(err) {
        mostrarMensajeEmergente('Error al copiar el texto');
    });
}

function mostrarMensajeEmergente(mensaje) {

    var mensajeEmergente = document.getElementById('mensaje-emergente');

    mensajeEmergente.textContent = mensaje;
    mensajeEmergente.classList.remove('oculto');
    mensajeEmergente.classList.add('visible');

    setTimeout(function() {
        mensajeEmergente.classList.remove('visible');
        mensajeEmergente.classList.add('oculto');
    }, 2000);

}

botonCopiar.addEventListener('click', function() {
    copiarAlPortapapeles(mensajeCopiable);
});

botonCopiarExpandido.addEventListener('click', function() {
    copiarAlPortapapeles(mensajeCopiable);
});

cambiarASeccionDefault();
//cambiarASeccionTraduccion();
