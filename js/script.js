
document.addEventListener('DOMContentLoaded', function() {
    function encodePath(path) {
        return path.replace(/ /g, '%20');
    }

    function setupCarousel(container, images, prevSelector, nextSelector, intervalMs = 4000) {
        if (!container) return null;
        const inner = container.querySelector('.carousel-inner') || container.querySelector('#carousel-inner');
        if (!inner) return null;

        if (Array.isArray(images) && images.length) {
            inner.innerHTML = '';
            images.forEach((src, i) => {
                const img = document.createElement('img');
                img.src = encodePath(src);
                img.alt = `Slide ${i + 1}`;
                img.style.opacity = i === 0 ? '1' : '0';
                img.style.position = 'absolute';
                img.style.top = '0';
                img.style.left = '0';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                inner.appendChild(img);
            });
        }

        const slides = inner.querySelectorAll('img');
        if (!slides.length) return null;

        let current = 0;
        let transitioning = false;
        let interval = null;

        let prevBtn = null;
        let nextBtn = null;
        if (prevSelector) prevBtn = container.querySelector(prevSelector) || document.querySelector(prevSelector);
        if (nextSelector) nextBtn = container.querySelector(nextSelector) || document.querySelector(nextSelector);
        // alternativas comunes
        if (!prevBtn) prevBtn = container.querySelector('.ant-btn') || document.getElementById('antBtn');
        if (!nextBtn) nextBtn = container.querySelector('.sig-btn') || document.getElementById('sigBtn');

        function go(dir) {
            if (transitioning) return;
            transitioning = true;
            const next = (current + dir + slides.length) % slides.length;
            slides[current].style.opacity = '0';
            slides[next].style.opacity = '1';
            current = next;
            setTimeout(() => (transitioning = false), 500);
        }

        if (prevBtn) prevBtn.addEventListener('click', () => { go(-1); resetAuto(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { go(1); resetAuto(); });

        function startAuto() {
            stopAuto();
            interval = setInterval(() => go(1), intervalMs);
        }
        function stopAuto() { if (interval) { clearInterval(interval); interval = null; } }
        function resetAuto() { stopAuto(); startAuto(); }

        // pausa al hover
        container.addEventListener('mouseenter', stopAuto);
        container.addEventListener('mouseleave', startAuto);

        startAuto();

        return { go, startAuto, stopAuto };
    }

    const mainContainer = document.getElementById('main-carousel');
    if (mainContainer) {
        setupCarousel(mainContainer, [
            'img/adidas.carr2.jpg',
            'img/ADIH8605-6.jpeg',
            'img/adidas.air force.jpg',
            'img/adidas.car.jpg'
        ], '.ant-btn', '.sig-btn', 4500);
    }

    const productsContainer = document.getElementById('products-carousel');
    if (productsContainer) {
        setupCarousel(productsContainer, [
            'img/vans2.webp',
            'img/campus1.webp',
            'img/vans1.webp',
            'img/adidas444.jpg'
        ], '.ant-btn', '.sig-btn', 4500);
    }

   const adidasInner = document.getElementById('carousel-inner');
if (adidasInner) {
    const adidasContainer = adidasInner.closest('.carousel-container') || document.querySelector('.carousel-container');
    setupCarousel(adidasContainer, [
        'img/adidas.car.jpg',
        'img/carr.adidas.jpg',
        'img/adidas.carr2.jpg',
        'img/adidas car5.jpg'
    ], '#antBtn', '#sigBtn', 5000);
}

    //------------------------------------- Formulario de contacto -------------------------------------------------------

    const formContacto = document.getElementById('contactForm');
    if (formContacto) {
        const campos = {
            nombre: {
                regex: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\\s]{2,50}$/,
                error: 'El nombre debe contener solo letras y espacios (2-50 caracteres)'
            },
            telefono: {
                regex: /^[0-9]{10}$/,
                error: 'Ingrese un número de teléfono válido (10 dígitos)'
            },
            email: {
                regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$/,
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
                if (errorElement) errorElement.textContent = config.error;
                return false;
            } else {
                if (errorElement) errorElement.textContent = '';
                return true;
            }
        }

        Object.keys(campos).forEach(campo => {
            const input = document.getElementById(campo);
            if (input) input.addEventListener('input', function() { validarCampo(campo, this.value); });
        });

        formContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            Object.keys(campos).forEach(campo => {
                const input = document.getElementById(campo);
                if (input) if (!validarCampo(campo, input.value)) isValid = false;
            });

            if (isValid) {
                const datosEnviados = document.getElementById('datos-enviados');
                if (datosEnviados) datosEnviados.innerHTML = '';
                Object.keys(campos).forEach(campo => {
                    const input = document.getElementById(campo);
                    if (input && datosEnviados) {
                        const div = document.createElement('div');
                        div.className = 'campo-enviado';
                        const label = document.createElement('span');
                        label.className = 'campo-label';
                        label.textContent = input.previousElementSibling ? input.previousElementSibling.textContent : campo;
                        const valor = document.createElement('span');
                        valor.textContent = input.value;
                        div.appendChild(label);
                        div.appendChild(valor);
                        datosEnviados.appendChild(div);
                    }
                });
                const result = document.getElementById('result');
                if (result) result.classList.remove('hidden');
                formContacto.style.display = 'none';
            }
        });
    }
});


