// Página de Mensaje Romántico - Variables globales
let canvas, ctx;
let animationId;
let floatingParticles = [];

// Clase para partículas flotantes románticas
class FloatingParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.color = `hsl(${Math.random() * 60 + 320}, 80%, ${Math.random() * 30 + 60}%)`;
        this.type = Math.random() > 0.6 ? 'heart' : 'star';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reiniciar si sale de la pantalla
        if (this.x < -50 || this.x > canvas.width + 50 ||
            this.y < -50 || this.y > canvas.height + 50) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.color = `hsl(${Math.random() * 60 + 320}, 80%, ${Math.random() * 30 + 60}%)`;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        if (this.type === 'heart') {
            this.drawHeart(this.x, this.y, this.size);
        } else {
            this.drawStar(this.x, this.y, this.size);
        }

        ctx.restore();
    }

    drawHeart(x, y, size) {
        const halfSize = size / 2;
        ctx.fillStyle = this.color;
        ctx.beginPath();

        ctx.moveTo(x, y + halfSize * 0.35);
        ctx.bezierCurveTo(
            x, y - halfSize * 0.15,
            x - halfSize * 0.8, y - halfSize * 0.3,
            x - halfSize * 0.9, y + halfSize * 0.15
        );
        ctx.bezierCurveTo(
            x - halfSize * 1.1, y + halfSize * 1.0,
            x, y + halfSize * 1.1,
            x, y + halfSize * 1.7
        );
        ctx.bezierCurveTo(
            x, y + halfSize * 1.2,
            x + halfSize * 0.9, y + halfSize * 1.0,
            x + halfSize * 0.9, y + halfSize * 0.15
        );
        ctx.bezierCurveTo(
            x + halfSize * 0.8, y - halfSize * 0.3,
            x, y - halfSize * 0.15,
            x, y + halfSize * 0.35
        );

        ctx.closePath();
        ctx.fill();
    }

    drawStar(x, y, size) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Brillo de estrella
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - size * 1.5, y);
        ctx.lineTo(x + size * 1.5, y);
        ctx.moveTo(x, y - size * 1.5);
        ctx.lineTo(x, y + size * 1.5);
        ctx.stroke();
    }
}

// Inicializar la página de mensaje
function initMessagePage() {
    console.log('Inicializando página de mensaje romántico...');

    canvas = document.getElementById('messageCanvas');
    if (!canvas) {
        console.error('ERROR: Canvas de mensaje no encontrado');
        return;
    }

    ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('ERROR: No se pudo obtener el contexto 2D');
        return;
    }

    // Configurar antialiasing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    console.log('Canvas de mensaje inicializado correctamente');
    resizeMessageCanvas();
    createFloatingParticles();
    animateMessage();
    setupNavigation();
}

// Redimensionar el canvas del mensaje
function resizeMessageCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log('Canvas de mensaje redimensionado a:', canvas.width, 'x', canvas.height);
}

// Crear partículas flotantes románticas
function createFloatingParticles() {
    floatingParticles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        floatingParticles.push(new FloatingParticle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }

    console.log('Partículas románticas creadas:', particleCount);
}

// Animación del fondo del mensaje
function animateMessage() {
    // Limpiar con fondo romántico
    const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    bgGradient.addColorStop(0, 'rgba(15, 5, 25, 0.9)');
    bgGradient.addColorStop(0.5, 'rgba(10, 0, 20, 0.95)');
    bgGradient.addColorStop(1, 'rgba(5, 0, 10, 1)');

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Actualizar y dibujar partículas
    floatingParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Continuar animación
    animationId = requestAnimationFrame(animateMessage);
}

// Configurar navegación
function setupNavigation() {
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            console.log('Navegando de vuelta al corazón solar...');
            window.location.href = 'index-solar.html';
        });

        // Efectos del botón
        backButton.addEventListener('mouseenter', () => {
            backButton.style.transform = 'translateY(-3px) scale(1.05)';
        });

        backButton.addEventListener('mouseleave', () => {
            backButton.style.transform = 'translateY(0) scale(1)';
        });
    } else {
        console.error('ERROR: Botón de navegación no encontrado');
    }
}

// Manejo de eventos
window.addEventListener('load', () => {
    console.log('=== PÁGINA DE MENSAJE ROMÁNTICO CARGADA ===');
    initMessagePage();
});

window.addEventListener('resize', () => {
    resizeMessageCanvas();
});

// Detener animación cuando se salga de la página
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});
