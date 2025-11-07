
document.addEventListener('DOMContentLoaded', function() {
    // Configuración del carousel
    const carousel = {
        contenedor: document.querySelector('.carousel-inner'),
        imagenes: [],
        actual: 0,
        intervalo: null
    };

    // Inicializar carousel solo si estamos en la página que lo contiene
    if (carousel.contenedor) {
        // Obtener todas las imágenes y guardarlas en el array
        carousel.imagenes = Array.from(carousel.contenedor.getElementsByTagName('img'));
        
        if (carousel.imagenes.length > 0) {
            // Configurar estilos iniciales del contenedor
            carousel.contenedor.style.position = 'relative';
            carousel.contenedor.style.overflow = 'hidden';
            
            // Ocultar todas las imágenes excepto la primera
            carousel.imagenes.forEach((img, index) => {
                img.style.position = 'absolute';
                img.style.top = '0';
                img.style.left = '0';
                img.style.width = '100%';
                img.style.opacity = index === 0 ? '1' : '0';
                img.style.transition = 'opacity 0.5s ease-in-out';
            });

            // Ajustar altura del contenedor según la primera imagen
            carousel.contenedor.style.height = carousel.imagenes[0].height + 'px';

            // Función para mostrar imagen específica
            function mostrarImagen(index) {
                // Ocultar imagen actual
                carousel.imagenes[carousel.actual].style.opacity = '0';
                // Actualizar índice de manera circular
                carousel.actual = index;
                if (carousel.actual >= carousel.imagenes.length) {
                    carousel.actual = 0;
                } else if (carousel.actual < 0) {
                    carousel.actual = carousel.imagenes.length - 1;
                }
                // Mostrar nueva imagen
                carousel.imagenes[carousel.actual].style.opacity = '1';
            }

            // Función para imagen siguiente
            function siguiente() {
                mostrarImagen(carousel.actual + 1);
            }

            // Función para imagen anterior
            function anterior() {
                mostrarImagen(carousel.actual - 1);
            }

            // Eventos de botones
            const btnAnterior = document.getElementById('antBtn');
            const btnSiguiente = document.getElementById('sigBtn');

            if (btnAnterior && btnSiguiente) {
                btnAnterior.addEventListener('click', function() {
                    anterior();
                    reiniciarAutoRotacion();
                });
                btnSiguiente.addEventListener('click', function() {
                    siguiente();
                    reiniciarAutoRotacion();
                });
            }

            // Eventos de teclado
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') {
                    anterior();
                    reiniciarAutoRotacion();
                } else if (e.key === 'ArrowRight') {
                    siguiente();
                    reiniciarAutoRotacion();
                }
            });

            // Auto-rotación
            function iniciarAutoRotacion() {
                if (carousel.intervalo) {
                    clearInterval(carousel.intervalo);
                }
                carousel.intervalo = setInterval(siguiente, 3000);
            }

            function reiniciarAutoRotacion() {
                clearInterval(carousel.intervalo);
                iniciarAutoRotacion();
            }

            // Pausar en hover
            carousel.contenedor.addEventListener('mouseenter', () => {
                clearInterval(carousel.intervalo);
            });

            carousel.contenedor.addEventListener('mouseleave', iniciarAutoRotacion);

            // Ajustar altura en cambio de tamaño de ventana
            window.addEventListener('resize', () => {
                carousel.contenedor.style.height = carousel.imagenes[carousel.actual].height + 'px';
            });

            // Iniciar auto-rotación
            iniciarAutoRotacion();
        }
    }
});

