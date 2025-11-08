
document.addEventListener('DOMContentLoaded', function() {
    // Configuración de los carousels
    const carousels = [
        {
            id: 'main-carousel',
            contenedor: document.querySelector('#main-carousel .carousel-inner'),
            imagenes: [
                'img/fondo5.avif',
                'img/fondo6.avif',
                'img/prueba11.jpg'
            ]
        },
        {
            id: 'products-carousel',
            contenedor: document.querySelector('#products-carousel .carousel-inner'),
            imagenes: [
                'img/vans2.webp',
                'img/campus1.webp',
                'img/vans1.webp',
                'img/adidas444.jpg',
                'img/adidas5.jpg'
            ]
        }
    ].map(config => ({
        ...config,
        actual: 0,
        intervalo: null,
        transicionando: false
    }));

    function inicializarCarousel() {
        if (!carousel.contenedor) return;
        //pa cargar las imgs 
        carousel.imagenes.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Slide ${index + 1}`;
            img.style.opacity = index === 0 ? '1' : '0';
            carousel.contenedor.appendChild(img);
        });
        //botones
        const antBtn = document.getElementById('antBtn');
        const sigBtn = document.getElementById('sigBtn');

        if (antBtn) antBtn.addEventListener('click', () => cambiarSlide(-1));
        if (sigBtn) sigBtn.addEventListener('click', () => cambiarSlide(1));

        iniciarAutoRotacion();
    }

    function cambiarSlide(direccion) {
        if (carousel.transicionando) return;
        carousel.transicionando = true;

        const imagenes = carousel.contenedor.querySelectorAll('img');
        const nuevaActual = calcularSiguienteSlide(direccion);

        imagenes[carousel.actual].style.opacity = '0';
        
        imagenes[nuevaActual].style.opacity = '1';

        carousel.actual = nuevaActual;

        setTimeout(() => {
            carousel.transicionando = false;
        }, 500);
    }

    function calcularSiguienteSlide(direccion) {
        const total = carousel.imagenes.length;
        let nueva = carousel.actual + direccion;

        if (nueva >= total) nueva = 0;
        if (nueva < 0) nueva = total - 1;

        return nueva;
    }

    function iniciarAutoRotacion() {
        if (carousel.intervalo) clearInterval(carousel.intervalo);
        carousel.intervalo = setInterval(() => cambiarSlide(1), 5000);
    }

    function pausarAutoRotacion() {
        if (carousel.intervalo) {
            clearInterval(carousel.intervalo);
            carousel.intervalo = null;
        }
    }

    function reanudarAutoRotacion() {
        iniciarAutoRotacion();
    }

    inicializarCarousel();

    //------------------------------------- Formulario de contacto -------------------------------------------------------

    const formContacto = document.getElementById('contactForm');
    if (formContacto) {
        const campos = {
            nombre: {
                regex: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{2,50}$/,
                error: 'El nombre debe contener solo letras y espacios (2-50 caracteres)'
            },
            telefono: {
                regex: /^[0-9]{10}$/,
                error: 'Ingrese un número de teléfono válido (10 dígitos)'
            },
            email: {
                regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                error: 'Ingrese un email válido'
            },
            mensaje: {
                regex: /^.{10,500}$/,
                error: 'El mensaje debe tener entre 10 y 500 caracteres'
            }
        };

        function validarCampo(campo, valor) {
            const config = campos[campo];
            const errorElement = document.getElementById(`${campo}-error`);
            
            if (!config.regex.test(valor)) {
                errorElement.textContent = config.error;
                return false;
            } else {
                errorElement.textContent = '';
                return true;
            }
        }

        Object.keys(campos).forEach(campo => {
            const input = document.getElementById(campo);
            if (input) {
                input.addEventListener('input', function() {
                    validarCampo(campo, this.value);
                });
            }
        });

        formContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            Object.keys(campos).forEach(campo => {
                const input = document.getElementById(campo);
                if (input) {
                    if (!validarCampo(campo, input.value)) {
                        isValid = false;
                    }
                }
            });

            if (isValid) {
                const datosEnviados = document.getElementById('datos-enviados');
                datosEnviados.innerHTML = ''; // Esto es para limpar Cami
                
                Object.keys(campos).forEach(campo => {
                    const input = document.getElementById(campo);
                    if (input) {
                        const div = document.createElement('div');
                        div.className = 'campo-enviado';
                        
                        const label = document.createElement('span');
                        label.className = 'campo-label';
                        label.textContent = input.previousElementSibling.textContent;
                        
                        const valor = document.createElement('span');
                        valor.textContent = input.value;
                        
                        div.appendChild(label);
                        div.appendChild(valor);
                        datosEnviados.appendChild(div);
                    }
                });

                // y aca muestra
                document.getElementById('result').classList.remove('hidden');
                formContacto.style.display = 'none';
            }
        });
    }
});

