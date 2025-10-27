// Variables globales para el canvas y las partículas
let canvas, ctx;
let animationId;
let centerX, centerY;
let planets = [];
let stars = [];
let spaceDust = [];
let sun;

// Mensajes de amor para la secuencia de texto
const loveMessages = [
    "Te amo",
    "Eres mi universo",
    "Mi estrella",
    "Para siempre",
    "Mi amor cósmico",
    "Eres mi sol",
    "Planeta perfecto",
    "Mi galaxia",
    "Te extraño",
    "Eres mi todo"
];

// Variables para la secuencia de texto
let currentMessageIndex = 0;
let textAnimationTimeout;

// Clase para el Sol romántico - AHORA ES UN CORAZÓN PULSANTE
class Sun {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 50;
        this.pulsePhase = 0;
        this.baseRadius = 50;
        this.pulseIntensity = 0.4;
        this.heartBeat = 0;
    }

    update() {
        this.pulsePhase += 0.03;
        this.heartBeat += 0.1;
        this.currentRadius = this.baseRadius + Math.sin(this.pulsePhase) * this.pulseIntensity * this.baseRadius;
    }

    draw() {
        // Efecto de brillo del sol romántico
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.currentRadius * 4);
        gradient.addColorStop(0, 'rgba(255, 150, 150, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 100, 100, 0.9)');
        gradient.addColorStop(0.4, 'rgba(255, 150, 200, 0.7)');
        gradient.addColorStop(0.6, 'rgba(255, 100, 150, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 50, 100, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.currentRadius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo del sol como corazón con latido
        const heartBeatScale = 1 + Math.sin(this.heartBeat) * 0.15;
        this.drawSunHeart(this.x, this.y, this.currentRadius * heartBeatScale);

        // Corona solar romántica como corazones orbitando
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + this.pulsePhase * 0.5;
            const heartX = this.x + Math.cos(angle) * (this.currentRadius * 2.8);
            const heartY = this.y + Math.sin(angle) * (this.currentRadius * 2.8);
            const heartSize = 6 + Math.sin(this.heartBeat + i) * 3;

            this.drawSmallHeart(heartX, heartY, heartSize);
        }

        // Anillo exterior de corazones más grandes
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2 + this.pulsePhase * 0.3;
            const heartX = this.x + Math.cos(angle) * (this.currentRadius * 3.5);
            const heartY = this.y + Math.sin(angle) * (this.currentRadius * 3.5);
            const heartSize = 4 + Math.sin(this.heartBeat + i * 0.5) * 2;

            this.drawSmallHeart(heartX, heartY, heartSize);
        }

        ctx.shadowBlur = 0;
    }

    drawSunHeart(x, y, size) {
        const halfSize = size / 2;

        // Núcleo del corazón solar - más definido
        ctx.shadowBlur = 60;
        ctx.shadowColor = '#ff6b9d';
        ctx.fillStyle = '#ff91a4';
        ctx.strokeStyle = '#ff6b9d';
        ctx.lineWidth = 4;

        ctx.beginPath();

        // Lado izquierdo del corazón (más curvo y realista)
        ctx.moveTo(x, y + halfSize * 0.35);
        ctx.bezierCurveTo(
            x, y - halfSize * 0.15,
            x - halfSize * 0.85, y - halfSize * 0.4,
            x - halfSize * 0.95, y + halfSize * 0.15
        );

        // Lado derecho del corazón
        ctx.bezierCurveTo(
            x - halfSize * 1.15, y + halfSize * 1.0,
            x, y + halfSize * 1.1,
            x, y + halfSize * 1.7
        );

        // Parte inferior izquierda
        ctx.bezierCurveTo(
            x, y + halfSize * 1.2,
            x + halfSize * 0.95, y + halfSize * 1.0,
            x + halfSize * 0.95, y + halfSize * 0.15
        );

        // Lado derecho superior
        ctx.bezierCurveTo(
            x + halfSize * 0.85, y - halfSize * 0.4,
            x, y - halfSize * 0.15,
            x, y + halfSize * 0.35
        );

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Brillo interior del corazón más intenso
        ctx.shadowBlur = 100;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(x, y, halfSize * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Brillo central más definido
        ctx.shadowBlur = 120;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(x, y, halfSize * 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
    }

    drawSmallHeart(x, y, size) {
        const halfSize = size / 2;
        ctx.fillStyle = this.color;
        ctx.beginPath();

        // Corazón pequeño más definido para el sol
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
}

// Clase para los Planetas mejorada
class Planet {
    constructor(name, distance, size, speed, color, angle = 0, hasRings = false, ringSize = 0) {
        this.name = name;
        this.distance = distance;
        this.size = size;
        this.speed = speed;
        this.color = color;
        this.angle = angle;
        this.trail = [];
        this.maxTrailLength = 100;
        this.hasRings = hasRings;
        this.ringSize = ringSize;
    }

    update() {
        this.angle += this.speed;

        // Calcular posición orbital
        this.x = centerX + Math.cos(this.angle) * this.distance;
        this.y = centerY + Math.sin(this.angle) * this.distance;

        // Actualizar rastro
        this.trail.push({x: this.x, y: this.y});
        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }
    }

    draw() {
        // Dibujar anillos primero (para planetas con anillos)
        if (this.hasRings) {
            ctx.strokeStyle = `rgba(255, 150, 200, 0.8)`;
            ctx.lineWidth = 3;
            ctx.setLineDash([8, 4]);
            ctx.beginPath();
            ctx.arc(centerX, centerY, this.distance, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);

            // Anillos adicionales con variación
            ctx.strokeStyle = `rgba(255, 100, 150, 0.6)`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, this.distance * 1.3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.strokeStyle = `rgba(255, 200, 150, 0.4)`;
            ctx.beginPath();
            ctx.arc(centerX, centerY, this.distance * 0.7, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Dibujar rastro orbital romántico
        if (this.trail.length > 1) {
            const gradient = ctx.createLinearGradient(
                this.trail[0].x, this.trail[0].y,
                this.trail[this.trail.length - 1].x, this.trail[this.trail.length - 1].y
            );
            gradient.addColorStop(0, `rgba(${this.getRgbFromColor()}, 0.6)`);
            gradient.addColorStop(0.5, `rgba(${this.getRgbFromColor()}, 0.3)`);
            gradient.addColorStop(1, `rgba(${this.getRgbFromColor()}, 0)`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.trail[0].x, this.trail[0].y);

            for (let i = 1; i < this.trail.length; i++) {
                ctx.lineTo(this.trail[i].x, this.trail[i].y);
            }
            ctx.stroke();
        }

        // Dibujar planeta con efectos románticos mejorados
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Brillo romántico adicional
        ctx.shadowBlur = 35;
        ctx.fillStyle = `rgba(${this.getRgbFromColor()}, 0.7)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo brillante
        ctx.shadowBlur = 50;
        ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        // Dibujar nombre del planeta con efectos
        if (this.name) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff6b9d';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(this.name, this.x, this.y - this.size - 20);

            // Resplandor del texto
            ctx.shadowBlur = 15;
            ctx.fillStyle = '#ff6b9d';
            ctx.font = 'bold 14px Arial';
            ctx.fillText(this.name, this.x, this.y - this.size - 20);
        }

        ctx.shadowBlur = 0;
    }

    getRgbFromColor() {
        // Convertir color hex a RGB
        const hex = this.color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        return `${r}, ${g}, ${b}`;
    }
}

// Clase para las Estrellas de fondo (ahora son corazones)
class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.brightness = Math.random() * 0.8 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.color = `hsl(${Math.random() * 60 + 320}, 70%, ${Math.random() * 30 + 50}%)`; // Tonos rosados
    }

    update() {
        this.twinklePhase += this.twinkleSpeed;
    }

    draw() {
        const currentBrightness = this.brightness + Math.sin(this.twinklePhase) * 0.3;
        const alpha = currentBrightness;

        // Dibujar corazón en lugar de punto
        this.drawHeart(this.x, this.y, this.size, alpha);
    }

    drawHeart(x, y, size, alpha) {
        const halfSize = size / 2;

        ctx.save();
        ctx.globalAlpha = alpha;

        // Corazón más definido usando curvas de Bézier mejoradas
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;

        ctx.beginPath();

        // Lado izquierdo del corazón (más curvo y definido)
        ctx.moveTo(x, y + halfSize * 0.4);
        ctx.bezierCurveTo(
            x, y - halfSize * 0.1,
            x - halfSize * 0.8, y - halfSize * 0.3,
            x - halfSize * 0.9, y + halfSize * 0.2
        );

        // Lado derecho del corazón
        ctx.bezierCurveTo(
            x - halfSize * 1.1, y + halfSize * 1.1,
            x, y + halfSize * 1.2,
            x, y + halfSize * 1.8
        );

        // Parte inferior izquierda
        ctx.bezierCurveTo(
            x, y + halfSize * 1.3,
            x + halfSize * 0.9, y + halfSize * 1.1,
            x + halfSize * 0.9, y + halfSize * 0.2
        );

        // Lado derecho superior
        ctx.bezierCurveTo(
            x + halfSize * 0.8, y - halfSize * 0.3,
            x, y - halfSize * 0.1,
            x, y + halfSize * 0.4
        );

        ctx.closePath();
        ctx.fill();

        // Brillo adicional para corazones más grandes
        if (this.size > 2) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.stroke();
        }

        ctx.restore();
        ctx.shadowBlur = 0;
    }
}

// Clase para el polvo espacial romántico
class SpaceDust {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.life = Math.random() * 100 + 50;
        this.maxLife = this.life;
        this.color = `hsl(${Math.random() * 60 + 320}, 70%, ${Math.random() * 40 + 60}%)`;
        this.type = Math.random() > 0.5 ? 'heart' : 'sparkle';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;

        // Reiniciar si sale de la pantalla o muere
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height || this.life <= 0) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.life = this.maxLife;
            this.color = `hsl(${Math.random() * 60 + 320}, 70%, ${Math.random() * 40 + 60}%)`;
            this.type = Math.random() > 0.5 ? 'heart' : 'sparkle';
        }
    }

    draw() {
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;

        if (this.type === 'heart') {
            this.drawSmallHeart(this.x, this.y, this.size);
        } else {
            this.drawSparkle(this.x, this.y, this.size);
        }

        ctx.restore();
    }

    drawSmallHeart(x, y, size) {
        const halfSize = size / 2;
        ctx.fillStyle = this.color;
        ctx.beginPath();

        // Corazón más definido para partículas espaciales
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

    drawSparkle(x, y, size) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Brillo de diamante
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

// Inicializar el sistema solar
function initSolarSystem() {
    console.log('Inicializando Corazón Solar...');
    canvas = document.getElementById('solarCanvas');

    if (!canvas) {
        console.error('ERROR: Canvas no encontrado');
        return;
    }

    ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('ERROR: No se pudo obtener el contexto 2D');
        return;
    }

    // Configurar antialiasing para mejor calidad visual
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    console.log('Canvas inicializado con alta calidad visual');
    resizeCanvas();

    // Crear el corazón solar
    createSun();

    // Crear planetas
    createPlanets();

    // Crear estrellas de fondo
    createStars();

    // Crear polvo espacial
    createSpaceDust();

    // Iniciar animación
    animate();
}

// Crear el sol central
function createSun() {
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    sun = new Sun(centerX, centerY);
    console.log('Corazón solar creado en:', centerX, centerY);
}

// Crear los planetas del sistema solar
function createPlanets() {
    planets = [];
    const planetData = [
        {name: "mi amor", distance: 80, size: 6, speed: 0.015, color: "#ff6b9d", hasRings: false},
        {name: "mi vida", distance: 110, size: 7, speed: 0.012, color: "#ff8fab", hasRings: false},
        {name: "mi princesa", distance: 140, size: 8, speed: 0.010, color: "#ffb3d9", hasRings: false},
        {name: "hermosa", distance: 170, size: 6, speed: 0.008, color: "#ffc0cb", hasRings: false},
        {name: "mi zarigüeya", distance: 220, size: 9, speed: 0.006, color: "#ff91a4", hasRings: false},
        {name: "mi todo", distance: 280, size: 10, speed: 0.005, color: "#ff99cc", hasRings: true},
        {name: "mi luz", distance: 340, size: 7, speed: 0.004, color: "#ff80bf", hasRings: false},
        {name: "mi reina", distance: 400, size: 8, speed: 0.003, color: "#ff6699", hasRings: false}
    ];

    planetData.forEach((data, index) => {
        planets.push(new Planet(data.name, data.distance, data.size, data.speed, data.color, index * 0.5, data.hasRings));
    });

    console.log('Planetas del amor creados:', planets.length);
}

// Crear estrellas de fondo
function createStars() {
    stars = [];
    const starCount = 400; // Más estrellas para más corazones románticos

    for (let i = 0; i < starCount; i++) {
        stars.push(new Star(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }

    console.log('Estrellas románticas mejoradas creadas:', starCount);
}

// Crear polvo espacial
function createSpaceDust() {
    spaceDust = [];
    const dustCount = 200; // Más partículas románticas mejoradas

    for (let i = 0; i < dustCount; i++) {
        spaceDust.push(new SpaceDust(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }

    console.log('Polvo espacial romántico mejorado creado:', dustCount);
}

// Redimensionar el canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    console.log('Canvas redimensionado a:', canvas.width, 'x', canvas.height);
}

// Bucle de animación principal
function animate() {
    // Limpiar el canvas con un fondo romántico espacial
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(canvas.width, canvas.height));
    bgGradient.addColorStop(0, 'rgba(10, 0, 20, 0.8)');
    bgGradient.addColorStop(0.5, 'rgba(5, 0, 15, 0.9)');
    bgGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Agregar nebulosa romántica de fondo
    drawNebula();

    // Actualizar y dibujar estrellas
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    // Actualizar y dibujar polvo espacial
    spaceDust.forEach(dust => {
        dust.update();
        dust.draw();
    });

    // Actualizar y dibujar sol
    sun.update();
    sun.draw();

    // Actualizar y dibujar planetas
    planets.forEach(planet => {
        planet.update();
        planet.draw();
    });

    // Continuar la animación
    animationId = requestAnimationFrame(animate);
}

function drawNebula() {
    // Dibujar nebulosa romántica de fondo
    const nebulaGradient = ctx.createRadialGradient(
        centerX + 200, centerY - 100, 0,
        centerX + 200, centerY - 100, 400
    );
    nebulaGradient.addColorStop(0, 'rgba(255, 100, 150, 0.1)');
    nebulaGradient.addColorStop(0.5, 'rgba(255, 150, 200, 0.05)');
    nebulaGradient.addColorStop(1, 'rgba(255, 100, 150, 0)');

    ctx.fillStyle = nebulaGradient;
    ctx.beginPath();
    ctx.arc(centerX + 200, centerY - 100, 400, 0, Math.PI * 2);
    ctx.fill();

    // Segunda nebulosa
    const nebulaGradient2 = ctx.createRadialGradient(
        centerX - 300, centerY + 150, 0,
        centerX - 300, centerY + 150, 350
    );
    nebulaGradient2.addColorStop(0, 'rgba(150, 100, 255, 0.08)');
    nebulaGradient2.addColorStop(0.5, 'rgba(200, 150, 255, 0.04)');
    nebulaGradient2.addColorStop(1, 'rgba(150, 100, 255, 0)');

    ctx.fillStyle = nebulaGradient2;
    ctx.beginPath();
    ctx.arc(centerX - 300, centerY + 150, 350, 0, Math.PI * 2);
    ctx.fill();
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
    textElement.classList.remove('text-in', 'text-out');

    // Forzar reflow
    textElement.offsetHeight;

    // Mostrar el texto
    setTimeout(() => {
        textElement.classList.add('text-in');
        console.log('Texto mostrado con animación cósmica');
    }, 100);

    // Programar el siguiente mensaje
    textAnimationTimeout = setTimeout(() => {
        textElement.classList.remove('text-in');
        textElement.classList.add('text-out');

        setTimeout(() => {
            currentMessageIndex = (currentMessageIndex + 1) % loveMessages.length;
            showNextMessage();
        }, 800);
    }, 3000);
}

// Manejo de eventos
window.addEventListener('load', () => {
    console.log('=== CORAZÓN SOLAR INICIADO ===');
    console.log('Iniciando universo romántico...');
    initSolarSystem();
    startTextSequence();
    setupNavigation();
});

// Configurar navegación al mensaje romántico
function setupNavigation() {
    const messageButton = document.getElementById('messageButton');
    if (messageButton) {
        messageButton.addEventListener('click', () => {
            console.log('Navegando al mensaje romántico...');
            window.location.href = 'message.html';
        });

        // Efectos visuales del botón
        messageButton.addEventListener('mouseenter', () => {
            messageButton.style.transform = 'translateY(-5px) scale(1.1)';
        });

        messageButton.addEventListener('mouseleave', () => {
            messageButton.style.transform = 'translateY(0) scale(1)';
        });
    } else {
        console.error('ERROR: Botón de mensaje no encontrado');
    }
}

window.addEventListener('resize', () => {
    resizeCanvas();
    // Recalcular posiciones de planetas
    planets.forEach(planet => {
        planet.x = centerX + Math.cos(planet.angle) * planet.distance;
        planet.y = centerY + Math.sin(planet.angle) * planet.distance;
        planet.trail = [];
    });
});

window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    if (textAnimationTimeout) {
        clearTimeout(textAnimationTimeout);
    }
});
