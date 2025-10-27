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
        // Posición inicial lejana (simulando profundidad)
        this.z = Math.random() * 1000 + 500;
        this.x = (Math.random() - 0.5) * 2000;
        this.y = (Math.random() - 0.5) * 2000;

        // Velocidad de movimiento
        this.speed = Math.random() * 2 + 1;

        // Tamaño base
        this.baseSize = Math.random() * 15 + 10;

        // Color con variación
        const hue = Math.random() * 30 + 15; // Tonos naranjas a rojos
        this.color = `hsl(${hue}, 80%, 60%)`;
    }

    update() {
        // Mover la partícula hacia el espectador (reducir z)
        this.z -= this.speed;

        // Si la partícula está demasiado cerca, reiniciarla
        if (this.z < 50) {
            this.reset();
        }
    }

    draw() {
        // Calcular perspectiva (cuanto más cerca, más grande)
        const perspective = 800 / this.z;
        const size = this.baseSize * perspective;
        const x = canvas.width / 2 + this.x * perspective;
        const y = canvas.height / 2 + this.y * perspective;

        // Solo dibujar si está visible en pantalla
        if (x > -size && x < canvas.width + size &&
            y > -size && y < canvas.height + size) {

            ctx.save();

            // Configurar sombra para el efecto de brillo
            ctx.shadowBlur = 20 * perspective;
            ctx.shadowColor = this.color;

            // Dibujar el corazón
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

        // Corazón usando curvas de Bézier
        const topCurveHeight = halfSize * 0.3;

        // Lado izquierdo del corazón
        ctx.moveTo(x, y + topCurveHeight);
        ctx.bezierCurveTo(
            x, y,
            x - halfSize, y,
            x - halfSize, y + topCurveHeight
        );

        // Lado derecho del corazón
        ctx.bezierCurveTo(
            x - halfSize, y + topCurveHeight + halfSize,
            x, y + topCurveHeight + halfSize,
            x, y + halfSize * 2
        );

        // Parte inferior izquierda
        ctx.bezierCurveTo(
            x, y + topCurveHeight + halfSize,
            x + halfSize, y + topCurveHeight + halfSize,
            x + halfSize, y + topCurveHeight
        );

        // Lado derecho superior
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
    canvas = document.getElementById('heartCanvas');

    if (!canvas) {
        console.error('Canvas no encontrado');
        return;
    }

    ctx = canvas.getContext('2d');

    if (!ctx) {
        console.error('No se pudo obtener el contexto 2D');
        return;
    }

    console.log('Canvas inicializado correctamente');

    // Ajustar el tamaño del canvas
    resizeCanvas();

    // Crear partículas iniciales
    createParticles();

    // Iniciar la animación
    animate();
}

// Redimensionar el canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Crear partículas de corazón
function createParticles() {
    particles = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000); // Densidad adaptativa

    for (let i = 0; i < particleCount; i++) {
        particles.push(new HeartParticle());
    }
}

// Bucle de animación principal
function animate() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Actualizar y dibujar todas las partículas
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Continuar la animación
    animationId = requestAnimationFrame(animate);
}

// Funciones para la secuencia de texto
function startTextSequence() {
    showNextMessage();
}

function showNextMessage() {
    const textElement = document.getElementById('animatedText');

    // Verificar que el elemento existe
    if (!textElement) {
        console.error('Elemento animatedText no encontrado');
        return;
    }

    const currentMessage = loveMessages[currentMessageIndex];
    console.log('Mostrando mensaje:', currentMessage, 'Index:', currentMessageIndex);

    // Establecer el texto
    textElement.textContent = currentMessage;

    // Remover clases anteriores
    textElement.classList.remove('text-in', 'text-out');

    // Forzar reflow para reiniciar la transición
    textElement.offsetHeight;

    // Agregar clase de entrada
    setTimeout(() => {
        textElement.classList.add('text-in');
        console.log('Clase text-in agregada');
    }, 50);

    // Programar la salida
    textAnimationTimeout = setTimeout(() => {
        textElement.classList.remove('text-in');
        textElement.classList.add('text-out');
        console.log('Clase text-out agregada');

        // Preparar el siguiente mensaje
        setTimeout(() => {
            currentMessageIndex = (currentMessageIndex + 1) % loveMessages.length;
            showNextMessage();
        }, 500);
    }, 2500);
}

// Manejo de eventos
window.addEventListener('load', () => {
    console.log('Página cargada, inicializando...');
    initCanvas();
    startTextSequence();
});

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles(); // Recalcular partículas para el nuevo tamaño
});

// Detener la animación cuando la página se cierre
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    if (textAnimationTimeout) {
        clearTimeout(textAnimationTimeout);
    }
});
