document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const finalScoreElement = document.getElementById('final-score');
    const startScreen = document.getElementById('start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const actionButton = document.getElementById('action-button');

    // Bouton IA
    const aiButton = document.createElement('button');
    aiButton.id = 'ai-button';
    aiButton.textContent = 'IA';
    aiButton.title = 'Activer / desactiver le bot IA';
    aiButton.style.cssText = `
        margin-left: 10px;
        padding: 8px 18px;
        border-radius: 8px;
        border: 2px solid #7DA8FF;
        background: transparent;
        color: #7DA8FF;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s ease, color 0.2s ease;
        position: relative;
    `;

    // Injection CSS animation rainbow
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        @keyframes rainbowBorder {
            0%   { border-color: #ff4e50; box-shadow: 0 0 6px #ff4e50; }
            17%  { border-color: #f9a825; box-shadow: 0 0 6px #f9a825; }
            33%  { border-color: #66bb6a; box-shadow: 0 0 6px #66bb6a; }
            50%  { border-color: #26c6da; box-shadow: 0 0 6px #26c6da; }
            67%  { border-color: #7DA8FF; box-shadow: 0 0 6px #7DA8FF; }
            83%  { border-color: #ab47bc; box-shadow: 0 0 6px #ab47bc; }
            100% { border-color: #ff4e50; box-shadow: 0 0 6px #ff4e50; }
        }
        #ai-button.ai-on {
            animation: rainbowBorder 1.4s linear infinite;
        }
    `;
    document.head.appendChild(styleTag);
    actionButton.parentNode.insertBefore(aiButton, actionButton.nextSibling);

    let aiEnabled = false;

    function updateAiButtonStyle() {
        if (aiEnabled) {
            aiButton.style.background = '#7DA8FF';
            aiButton.style.color = '#1F2937';
            aiButton.textContent = 'IA (ON)';
            aiButton.classList.add('ai-on');
        } else {
            aiButton.style.background = 'transparent';
            aiButton.style.color = '#7DA8FF';
            aiButton.style.boxShadow = 'none';
            aiButton.style.borderColor = '#7DA8FF';
            aiButton.textContent = 'IA';
            aiButton.classList.remove('ai-on');
        }
    }
    updateAiButtonStyle();

    aiButton.addEventListener('click', () => {
        aiEnabled = !aiEnabled;
        updateAiButtonStyle();
        if (aiEnabled && !gameRunning) {
            startGame();
        }
    });

    // Ajuster la taille du canvas
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Variables du jeu
    let gameRunning = false;
    let score = 0;
    let frames = 0;
    let animationFrameId;
    let lastTimestamp = null;
    const TARGET_FPS = 60;
    const MAX_DELTA = 1000 / 20;

    // Physique de base a 60fps
    const GRAVITY = 0.5;
    const JUMP_FORCE = -8;
    const PIPE_SPEED = 2;

    // Oiseau
    const bird = {
        x: 50,
        y: canvas.height / 2,
        width: 34,
        height: 24,
        velocity: 0,

        draw: function() {
            ctx.fillStyle = '#FFF4B8';
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.width/2, this.height/2, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#FFB3B3';
            ctx.beginPath();
            ctx.moveTo(this.x + this.width/2 + 10, this.y);
            ctx.lineTo(this.x - this.width/2 + 30, this.y + 5);
            ctx.lineTo(this.x - this.width/2 + 30, this.y - 5);
            ctx.fill();

            ctx.fillStyle = '#1F2937';
            ctx.beginPath();
            ctx.arc(this.x + 5, this.y - 5, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(this.x + 6, this.y - 6, 1.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#FFE082';
            ctx.beginPath();
            ctx.ellipse(this.x - 5, this.y + 2, 10, 8, Math.PI/4, 0, Math.PI * 2);
            ctx.fill();
        },

        update: function(dt) {
            this.velocity += GRAVITY * dt;
            this.y += this.velocity * dt;

            if (this.y >= canvas.height - this.height/2) {
                this.y = canvas.height - this.height/2;
                gameOver();
            }

            if (this.y <= this.height/2) {
                this.y = this.height/2;
                this.velocity = 0;
            }
        },

        flap: function() {
            this.velocity = JUMP_FORCE;
        },

        reset: function() {
            this.y = canvas.height / 2;
            this.velocity = 0;
        }
    };

    // Tuyaux
    const pipes = {
        position: [],
        width: 60,
        gap: 170,
        minYPos: 80,
        maxYPos: 300,
        minSpacing: 320, // distance minimale en px entre deux tuyaux

        draw: function() {
            for (let i = 0; i < this.position.length; i++) {
                let p = this.position[i];

                ctx.fillStyle = '#7DA8FF';
                ctx.fillRect(p.x, 0, this.width, p.y);
                let bY = p.y + this.gap;
                ctx.fillRect(p.x, bY, this.width, canvas.height - bY);

                ctx.fillStyle = '#A2C2FF';
                ctx.fillRect(p.x - 2, 0, 4, p.y);
                ctx.fillRect(p.x - 2, bY, 4, canvas.height - bY);

                ctx.fillRect(p.x, p.y - 15, this.width, 15);
                ctx.fillRect(p.x, bY, this.width, 15);
            }
        },

        update: function(dt) {
            if (gameRunning) {
                // Spawn si aucun tuyau, ou si le dernier est assez loin du bord droit
                const lastPipe = this.position[this.position.length - 1];
                const shouldSpawn = this.position.length === 0 ||
                    (canvas.width - lastPipe.x) >= this.minSpacing;
                if (shouldSpawn) {
                    const minGapFromTop = this.minYPos;
                    const maxGapFromTop = Math.min(this.maxYPos, canvas.height - this.gap - 50);
                    const randomY = Math.floor(Math.random() * (maxGapFromTop - minGapFromTop + 1)) + minGapFromTop;
                    this.position.push({ x: canvas.width, y: randomY, passed: false });
                }

                for (let i = 0; i < this.position.length; i++) {
                    let p = this.position[i];
                    p.x -= PIPE_SPEED * dt;

                    if (p.x + this.width < bird.x && !p.passed) {
                        score++;
                        scoreElement.textContent = score;
                        p.passed = true;
                    }

                    const birdTop = bird.y - bird.height/2;
                    const birdBottom = bird.y + bird.height/2;
                    const birdLeft = bird.x - bird.width/2;
                    const birdRight = bird.x + bird.width/2;

                    const pipeRight = p.x + this.width;
                    const gapTop = p.y;
                    const gapBottom = p.y + this.gap;

                    const horizontalCollision = birdRight > p.x && birdLeft < pipeRight;
                    const verticalCollision = birdTop < gapTop || birdBottom > gapBottom;

                    if (horizontalCollision && verticalCollision) {
                        gameOver();
                        return;
                    }

                    if (p.x + this.width <= 0) {
                        this.position.splice(i, 1);
                        i--;
                    }
                }
            }
        },

        reset: function() {
            this.position = [];
        }
    };

    // Arriere-plan
    function drawBackground() {
        const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        skyGradient.addColorStop(0, '#EBF3FE');
        skyGradient.addColorStop(1, '#FAFCFF');
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath(); ctx.arc(100, 80, 30, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(130, 70, 35, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(160, 85, 25, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(canvas.width - 100, 120, 40, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(canvas.width - 130, 110, 35, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(canvas.width - 160, 125, 30, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#E5D4CD';
        ctx.fillRect(0, canvas.height - 30, canvas.width, 30);

        ctx.fillStyle = '#BEE3DB';
        ctx.fillRect(0, canvas.height - 30, canvas.width, 5);
    }

    // Bot IA Flappy Bird
    function runAI() {
        if (!aiEnabled || !gameRunning) return;

        // Trouver le prochain tuyau (pas encore passe)
        let nextPipe = null;
        for (let p of pipes.position) {
            if (p.x + pipes.width > bird.x - bird.width/2) {
                nextPipe = p;
                break;
            }
        }

        if (nextPipe) {
            // Cible legerement en dessous du centre pour eviter de froler le tuyau du haut
            const gapCenter = nextPipe.y + pipes.gap / 2 + 22;
            const margin = 28;

            // Flapper seulement si on est en dessous de la cible et qu'on tombe (ou tombe vite)
            if (bird.y > gapCenter && bird.velocity >= -1) {
                bird.flap();
            }
        }
    }

    // Boucle de jeu avec delta-time
    function gameLoop(timestamp) {
        if (!gameRunning) return;

        if (lastTimestamp === null) lastTimestamp = timestamp;
        let rawDelta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        rawDelta = Math.min(rawDelta, MAX_DELTA);
        const dt = rawDelta / (1000 / TARGET_FPS);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();

        pipes.update(dt);
        pipes.draw();

        runAI();

        bird.update(dt);
        bird.draw();

        frames++;

        if (gameRunning) {
            animationFrameId = requestAnimationFrame(gameLoop);
        }
    }

    // Demarrer le jeu
    function startGame() {
        gameRunning = true;
        score = 0;
        frames = 0;
        lastTimestamp = null;
        scoreElement.textContent = score;

        bird.reset();
        pipes.reset();

        startScreen.classList.add('hidden');
        gameOverScreen.classList.add('hidden');

        animationFrameId = requestAnimationFrame(gameLoop);
    }

    // Game over
    function gameOver() {
        gameRunning = false;
        cancelAnimationFrame(animationFrameId);
        finalScoreElement.textContent = score;
        gameOverScreen.classList.remove('hidden');

        if (aiEnabled) {
            setTimeout(startGame, 800);
        }
    }

    // Evenements
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
    actionButton.addEventListener('click', () => {
        if (gameRunning) bird.flap();
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            if (!gameRunning && startScreen.classList.contains('hidden')) {
                startGame();
            } else if (gameRunning) {
                bird.flap();
            }
            e.preventDefault();
        }
    });

    canvas.addEventListener('click', () => {
        if (gameRunning) bird.flap();
    });

    canvas.addEventListener('touchstart', (e) => {
        if (gameRunning) {
            bird.flap();
            e.preventDefault();
        }
    });
});
