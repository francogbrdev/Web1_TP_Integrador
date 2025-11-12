document.addEventListener('DOMContentLoaded', function() {
    class Carousel {
        constructor(containerId, images) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;
            
            this.inner = this.container.querySelector('.carousel-inner');
            this.images = images;
            this.currentIndex = 0;
            this.interval = null;
            this.transitioning = false;

            this.init();
        }

        init() {
            // Cargar imágenes
            this.images.forEach((src, index) => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = `Slide ${index + 1}`;
                img.style.opacity = index === 0 ? '1' : '0';
                this.inner.appendChild(img);
            });

            const antBtn = this.container.querySelector('.ant-btn');
            const sigBtn = this.container.querySelector('.sig-btn');

            if (antBtn) antBtn.addEventListener('click', () => this.changeSlide(-1));
            if (sigBtn) sigBtn.addEventListener('click', () => this.changeSlide(1));

            // Iniciar autorotación
            this.startAutoRotation();
        }

        changeSlide(direction) {
            if (this.transitioning) return;
            this.transitioning = true;

            const slides = this.inner.querySelectorAll('img');
            const newIndex = this.calculateNextSlide(direction);

            slides[this.currentIndex].style.opacity = '0';
            
            slides[newIndex].style.opacity = '1';

            this.currentIndex = newIndex;

            setTimeout(() => {
                this.transitioning = false;
            }, 500);
        }

        calculateNextSlide(direction) {
            const total = this.images.length;
            let newIndex = this.currentIndex + direction;

            if (newIndex >= total) newIndex = 0;
            if (newIndex < 0) newIndex = total - 1;

            return newIndex;
        }

        startAutoRotation() {
            if (this.interval) clearInterval(this.interval);
            this.interval = setInterval(() => this.changeSlide(1), 5000);
        }

        pauseAutoRotation() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }

        resumeAutoRotation() {
            this.startAutoRotation();
        }
    }

const productsContainer = document.getElementById('products-carousel');
if (productsContainer){
    setupCarousel(productsContainer, [
        'img/vans2.webp',
        'img/campus1.webp',
        'img/vans1.webp',
        'img/adidas444.jpg',
        'img/adidas5.jpg'
    ], '.ant-btn', '.sig-btn', 4500);
}
       
});