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
    aiButton.textContent = '🤖 IA';
    aiButton.title = 'Activer / desactiver le bot IA';
    aiButton.style.cssText = `
        margin-left: 10px;
        padding: 8px 18px;
        border-radius: 8px;
        border: 2px solid #8AD1B8;
        background: transparent;
        color: #8AD1B8;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s ease, color 0.2s ease;
    `;

    // Injection CSS animation rainbow
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        @keyframes rainbowBorderDino {
            0%   { border-color: #ff4e50; box-shadow: 0 0 6px #ff4e50; }
            17%  { border-color: #f9a825; box-shadow: 0 0 6px #f9a825; }
            33%  { border-color: #66bb6a; box-shadow: 0 0 6px #66bb6a; }
            50%  { border-color: #26c6da; box-shadow: 0 0 6px #26c6da; }
            67%  { border-color: #8AD1B8; box-shadow: 0 0 6px #8AD1B8; }
            83%  { border-color: #ab47bc; box-shadow: 0 0 6px #ab47bc; }
            100% { border-color: #ff4e50; box-shadow: 0 0 6px #ff4e50; }
        }
        #ai-button.ai-on {
            animation: rainbowBorderDino 1.4s linear infinite;
        }
    `;
    document.head.appendChild(styleTag);
    actionButton.parentNode.insertBefore(aiButton, actionButton.nextSibling);

    let aiEnabled = false;

    function updateAiButtonStyle() {
        if (aiEnabled) {
            aiButton.style.background = '#8AD1B8';
            aiButton.style.color = '#1F2937';
            aiButton.textContent = 'IA (ON)';
            aiButton.classList.add('ai-on');
        } else {
            aiButton.style.background = 'transparent';
            aiButton.style.color = '#8AD1B8';
            aiButton.style.boxShadow = 'none';
            aiButton.style.borderColor = '#8AD1B8';
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
    let speed = 5;
    let maxSpeed = 15;
    let speedIncreaseInterval = 300;
    let animationFrameId;
    let lastTimestamp = null;
    const TARGET_FPS = 60;
    const MAX_DELTA = 1000 / 20;

    // Dino
    const dino = {
        x: 50,
        y: canvas.height - 50,
        width: 30,
        height: 20,
        velocityY: 0,
        gravity: 0.8,
        jumpStrength: -12,
        isJumping: false,

        draw: function() {
            ctx.fillStyle = '#8AD1B8';
            const radius = 5;
            const x = this.x;
            const y = this.y;
            const w = this.width;
            const h = this.height;

            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + w - radius, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
            ctx.lineTo(x + w, y + h - radius);
            ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
            ctx.lineTo(x + radius, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x, y + h * 0.6);
            ctx.lineTo(x - w * 0.4, y + h * 0.8);
            ctx.lineTo(x + 10, y + h);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#A9E5D3';
            const headSize = w * 0.5;
            ctx.fillRect(x + w * 0.7, y - headSize * 0.6, headSize, headSize);

            ctx.fillStyle = '#1F2937';
            ctx.beginPath();
            ctx.arc(x + w * 0.85, y - headSize * 0.3, 3, 0, Math.PI * 2);
            ctx.fill();
        },

        update: function(dt) {
            if (this.isJumping) {
                this.velocityY += this.gravity * dt;
                this.y += this.velocityY * dt;

                if (this.y >= canvas.height - this.height - ground.height) {
                    this.y = canvas.height - this.height - ground.height;
                    this.isJumping = false;
                    this.velocityY = 0;
                }
            }
        },

        jump: function() {
            if (!this.isJumping) {
                this.velocityY = this.jumpStrength;
                this.isJumping = true;
            }
        },

        reset: function() {
            this.y = canvas.height - this.height - ground.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
    };

    // Obstacles (Arbres)
    const obstacles = {
        position: [],
        minGap: 400,
        maxGap: 800,
        minHeight: 40,
        maxHeight: 70,
        minWidth: 25,
        maxWidth: 40,

        draw: function() {
            for (let i = 0; i < this.position.length; i++) {
                let o = this.position[i];
                ctx.fillStyle = '#D7C2B7';
                const trunkWidth = o.width * 0.5;
                const trunkHeight = o.height * 0.5;
                ctx.fillRect(o.x + (o.width - trunkWidth) / 2,
                            canvas.height - ground.height - trunkHeight,
                            trunkWidth, trunkHeight);

                ctx.fillStyle = '#BEE3DB';
                ctx.beginPath();
                ctx.arc(o.x + o.width / 2,
                        canvas.height - ground.height - trunkHeight + 10 - o.height * 0.3,
                        o.width * 0.6, 0, Math.PI * 2);
                ctx.fill();

                ctx.beginPath();
                ctx.arc(o.x + o.width / 2 - o.width * 0.2,
                        canvas.height - ground.height - trunkHeight + 10 - o.height * 0.4,
                        o.width * 0.4, 0, Math.PI * 2);
                ctx.fill();

                ctx.beginPath();
                ctx.arc(o.x + o.width / 2 + o.width * 0.2,
                        canvas.height - ground.height - trunkHeight + 10 - o.height * 0.4,
                        o.width * 0.4, 0, Math.PI * 2);
                ctx.fill();

                ctx.beginPath();
                ctx.arc(o.x + o.width / 2,
                        canvas.height - ground.height - trunkHeight + 10 - o.height * 0.5,
                        o.width * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
        },

        update: function(dt) {
            if (gameRunning) {
                if (frames === 1 || (this.position.length > 0 && canvas.width - this.position[this.position.length - 1].x > Math.random() * (this.maxGap - this.minGap) + this.minGap)) {
                    const width = Math.random() * (this.maxWidth - this.minWidth) + this.minWidth;
                    const height = Math.random() * (this.maxHeight - this.minHeight) + this.minHeight;
                    this.position.push({ x: canvas.width, width: width, height: height });
                }

                for (let i = 0; i < this.position.length; i++) {
                    let o = this.position[i];
                    o.x -= speed * dt;

                    const dinoLeft = dino.x;
                    const dinoRight = dino.x + dino.width;
                    const dinoTop = dino.y;
                    const dinoBottom = dino.y + dino.height;

                    const trunkWidth = o.width * 0.4;
                    const trunkX = o.x + (o.width - trunkWidth) / 2;
                    const trunkTop = canvas.height - ground.height - (o.height * 0.4);
                    const trunkBottom = canvas.height - ground.height;

                    const hitTrunk = (dinoRight > trunkX && dinoLeft < trunkX + trunkWidth && dinoBottom > trunkTop && dinoTop < trunkBottom);

                    const foliageWidth = o.width * 0.8;
                    const foliageX = o.x + (o.width - foliageWidth) / 2;
                    const foliageTop = canvas.height - ground.height - (o.height * 0.9);
                    const foliageBottom = canvas.height - ground.height - (o.height * 0.35);

                    const hitFoliage = (dinoRight > foliageX && dinoLeft < foliageX + foliageWidth && dinoBottom > foliageTop && dinoTop < foliageBottom);

                    if (hitTrunk || hitFoliage) {
                        gameOver();
                        return;
                    }

                    if (o.x + o.width <= 0) {
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

    // Sol
    const ground = {
        height: 30,
        draw: function() {}
    };

    // Arriere-plan
    function drawBackground() {
        const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        skyGradient.addColorStop(0, '#B8D4FF');
        skyGradient.addColorStop(1, '#EBF3FE');
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath(); ctx.arc(100, 80, 30, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(130, 70, 35, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(160, 85, 25, 0, Math.PI * 2); ctx.fill();

        ctx.beginPath(); ctx.arc(canvas.width - 100, 120, 40, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(canvas.width - 130, 110, 35, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(canvas.width - 160, 125, 30, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#E2D9D5';
        ctx.fillRect(0, canvas.height - 30, canvas.width, 30);

        ctx.fillStyle = '#BEE3DB';
        ctx.fillRect(0, canvas.height - 30, canvas.width, 5);
    }

    // Bot IA Dino
    function runAI() {
        if (!aiEnabled || !gameRunning) return;

        let nearest = null;
        let minDist = Infinity;
        for (let o of obstacles.position) {
            const dist = o.x - (dino.x + dino.width);
            if (dist > -dino.width && dist < minDist) {
                minDist = dist;
                nearest = o;
            }
        }

        if (nearest && !dino.isJumping) {
            // Hauteur a franchir (bord sup du feuillage)
            const groundY = canvas.height - ground.height;
            const dinoBaseY = groundY - dino.height;
            const foliageTopY = groundY - nearest.height * 0.9;
            const clearance = dinoBaseY - foliageTopY;

            // Resoudre physiquement : t_up = frames pour depasser le feuillage
            // Formule continue, mais la simulation montre un ecart de ~1 frame
            // => on ajoute 1.5 frame + 15px de buffer fixe pour fiabilite
            const g = dino.gravity;
            const j = Math.abs(dino.jumpStrength);
            const discriminant = j * j - 2 * g * clearance;

            if (discriminant >= 0) {
                const tUp = (j - Math.sqrt(discriminant)) / g;
                const jumpDist = speed * (tUp + 1.5) + 15;

                if (minDist <= jumpDist) {
                    dino.jump();
                }
            }
        }
    }

    // Boucle de jeu avec delta-time
    function gameLoop(timestamp) {
        if (!gameRunning) return;

        if (lastTimestamp === null) lastTimestamp = timestamp;
        let rawDelta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        // Clamp pour eviter les gros sauts si le tab etait inactif
        rawDelta = Math.min(rawDelta, MAX_DELTA);
        // dt normalise: 1.0 = une frame a 60fps
        const dt = rawDelta / (1000 / TARGET_FPS);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();

        runAI();

        dino.update(dt);
        dino.draw();

        obstacles.update(dt);
        obstacles.draw();

        if (gameRunning) {
            frames++;
            score = Math.floor(frames / 10);
            scoreElement.textContent = score;

            if (frames % speedIncreaseInterval === 0 && speed < maxSpeed) {
                speed += 0.5;
            }
        }

        if (gameRunning) {
            animationFrameId = requestAnimationFrame(gameLoop);
        }
    }

    // Demarrer le jeu
    function startGame() {
        gameRunning = true;
        score = 0;
        frames = 0;
        speed = 5;
        lastTimestamp = null;
        scoreElement.textContent = score;

        dino.reset();
        obstacles.reset();

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
        if (gameRunning) dino.jump();
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            if (!gameRunning && startScreen.classList.contains('hidden')) {
                startGame();
            } else if (gameRunning) {
                dino.jump();
            }
            e.preventDefault();
        }
    });

    canvas.addEventListener('click', () => {
        if (gameRunning) dino.jump();
    });

    canvas.addEventListener('touchstart', (e) => {
        if (gameRunning) {
            dino.jump();
            e.preventDefault();
        }
    });
});
