// Variables globales para el canvas y las partículas
let canvas, ctx;
let particles = [];
let animationId;

// Mensajes de amor para la secuencia de texto
const loveMessages = [
    "Te amo",
    "Eres mi vida",
    "Mi princesa",
    "Para siempre",
    "Mi amor",
    "Te extraño",
    "Eres perfecta",
    "Mi todo",
    "Te quiero",
    "Por siempre"
];

// Variables para la secuencia de texto
let currentMessageIndex = 0;
let textAnimationTimeout;

// Clase para las partículas de corazón
class HeartParticle {
    constructor() {
        this.reset();
    }

    reset() {
        this.z = Math.random() * 1000 + 500;
        this.x = (Math.random() - 0.5) * 2000;
        this.y = (Math.random() - 0.5) * 2000;
        this.speed = Math.random() * 2 + 1;
        this.baseSize = Math.random() * 15 + 10;
        const hue = Math.random() * 30 + 15;
        this.color = `hsl(${hue}, 80%, 60%)`;
    }

    update() {
        this.z -= this.speed;
        if (this.z < 50) {
            this.reset();
        }
    }

    draw() {
        const perspective = 800 / this.z;
        const size = this.baseSize * perspective;
        const x = canvas.width / 2 + this.x * perspective;
        const y = canvas.height / 2 + this.y * perspective;

        if (x > -size && x < canvas.width + size &&
            y > -size && y < canvas.height + size) {

            ctx.save();
            ctx.shadowBlur = 20 * perspective;
            ctx.shadowColor = this.color;
            this.drawHeart(x, y, size);
            ctx.restore();
        }
    }

    drawHeart(x, y, size) {
        const halfSize = size / 2;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2 * (800 / this.z);
        ctx.beginPath();

        const topCurveHeight = halfSize * 0.3;
        ctx.moveTo(x, y + topCurveHeight);
        ctx.bezierCurveTo(
            x, y,
            x - halfSize, y,
            x - halfSize, y + topCurveHeight
        );
        ctx.bezierCurveTo(
            x - halfSize, y + topCurveHeight + halfSize,
            x, y + topCurveHeight + halfSize,
            x, y + halfSize * 2
        );
        ctx.bezierCurveTo(
            x, y + topCurveHeight + halfSize,
            x + halfSize, y + topCurveHeight + halfSize,
            x + halfSize, y + topCurveHeight
        );
        ctx.bezierCurveTo(
            x + halfSize, y,
            x, y,
            x, y + topCurveHeight
        );

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

// Inicializar el canvas y el contexto
function initCanvas() {
    console.log('Inicializando canvas...');
    canvas = document.getElementById('heartCanvas');

    if (!canvas) {
        console.error('ERROR: Canvas no encontrado');
        return;
    }

    ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('ERROR: No se pudo obtener el contexto 2D');
        return;
    }

    console.log('Canvas inicializado correctamente');
    resizeCanvas();
    createParticles();
    animate();
}

// Redimensionar el canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log('Canvas redimensionado a:', canvas.width, 'x', canvas.height);
}

// Crear partículas de corazón
function createParticles() {
    particles = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    console.log('Creando', particleCount, 'partículas');

    for (let i = 0; i < particleCount; i++) {
        particles.push(new HeartParticle());
    }
}

// Bucle de animación principal
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    animationId = requestAnimationFrame(animate);
}

// Funciones para la secuencia de texto
function startTextSequence() {
    console.log('Iniciando secuencia de texto...');
    showNextMessage();
}

function showNextMessage() {
    const textElement = document.getElementById('animatedText');
    if (!textElement) {
        console.error('ERROR: Elemento animatedText no encontrado');
        return;
    }

    const currentMessage = loveMessages[currentMessageIndex];
    console.log('Mostrando mensaje:', currentMessage, '(Index:', currentMessageIndex + ')');

    // Establecer el texto
    textElement.textContent = currentMessage;
    textElement.style.opacity = '0';
    textElement.classList.remove('text-in', 'text-out');

    // Forzar reflow
    textElement.offsetHeight;

    // Mostrar el texto
    setTimeout(() => {
        textElement.style.opacity = '1';
        textElement.classList.add('text-in');
        console.log('Texto mostrado con opacidad 1');
    }, 100);

    // Programar el siguiente mensaje
    textAnimationTimeout = setTimeout(() => {
        textElement.classList.remove('text-in');
        textElement.classList.add('text-out');
        textElement.style.opacity = '0';
        console.log('Texto ocultado');

        setTimeout(() => {
            currentMessageIndex = (currentMessageIndex + 1) % loveMessages.length;
            showNextMessage();
        }, 800);
    }, 3000);
}

// Manejo de eventos
window.addEventListener('load', () => {
    console.log('=== PÁGINA CARGADA ===');
    console.log('Iniciando animación...');
    initCanvas();
    startTextSequence();
});

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    if (textAnimationTimeout) {
        clearTimeout(textAnimationTimeout);
    }
});
