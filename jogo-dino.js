class DinoRunner {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.scoreValue = document.getElementById("scoreValue");
        this.bestScoreValue = document.getElementById("bestScoreValue");
        this.speedValue = document.getElementById("speedValue");
        this.startOverlay = document.getElementById("startOverlay");
        this.gameOverOverlay = document.getElementById("gameOverOverlay");
        this.finalScoreText = document.getElementById("finalScoreText");
        this.startButton = document.getElementById("startButton");
        this.restartButton = document.getElementById("restartButton");
        this.jumpButton = document.getElementById("jumpButton");
        this.duckButton = document.getElementById("duckButton");
        this.soundToggle = document.getElementById("soundToggle");

        this.width = 900;
        this.height = 420;
        this.groundY = 330;
        this.gravity = 0.72;
        this.bestScore = Number(localStorage.getItem("dinoRunnerBestScore")) || 0;
        this.isMuted = localStorage.getItem("dinoRunnerMuted") === "true";
        this.audioContext = null;

        this.bindEvents();
        this.updateSoundIcon();
        this.resetGame();
        this.drawScene();
        this.updateHud();
    }

    bindEvents() {
        this.startButton.addEventListener("click", () => this.startGame());
        this.restartButton.addEventListener("click", () => this.startGame());
        this.soundToggle.addEventListener("click", () => this.toggleSound());

        this.canvas.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            if (this.state !== "playing") {
                this.startGame();
                return;
            }
            this.jump();
        });

        this.jumpButton.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            if (this.state !== "playing") {
                this.startGame();
                return;
            }
            this.jump();
        });

        this.duckButton.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            this.setDucking(true);
        });

        this.duckButton.addEventListener("pointerup", () => this.setDucking(false));
        this.duckButton.addEventListener("pointerleave", () => this.setDucking(false));
        this.duckButton.addEventListener("pointercancel", () => this.setDucking(false));

        window.addEventListener("keydown", (event) => {
            if (event.code === "Space" || event.code === "ArrowUp") {
                event.preventDefault();
                if (this.state !== "playing") {
                    this.startGame();
                    return;
                }
                this.jump();
            }

            if (event.code === "ArrowDown") {
                event.preventDefault();
                this.setDucking(true);
            }
        });

        window.addEventListener("keyup", (event) => {
            if (event.code === "ArrowDown") {
                this.setDucking(false);
            }
        });
    }

    resetGame() {
        this.state = "ready";
        this.score = 0;
        this.speed = 6.4;
        this.spawnTimer = 0;
        this.clouds = [
            { x: 120, y: 70, speed: 0.35, size: 1 },
            { x: 470, y: 102, speed: 0.26, size: 0.8 },
            { x: 760, y: 58, speed: 0.42, size: 1.15 }
        ];
        this.groundMarks = Array.from({ length: 18 }, (_, index) => ({
            x: index * 62,
            y: this.groundY + 22 + Math.random() * 38,
            width: 24 + Math.random() * 46
        }));
        this.obstacles = [];
        this.dino = {
            x: 95,
            y: this.groundY - 78,
            width: 68,
            height: 78,
            velocityY: 0,
            isOnGround: true,
            isDucking: false,
            blinkTimer: 0,
            stepTimer: 0
        };
    }

    startGame() {
        this.resetGame();
        this.state = "playing";
        this.startOverlay.classList.remove("show");
        this.gameOverOverlay.classList.remove("show");
        this.playTone(520, 0.08, "sine");
        this.lastFrameTime = performance.now();
        requestAnimationFrame((time) => this.loop(time));
    }

    loop(currentTime) {
        if (this.state !== "playing") {
            return;
        }

        const delta = Math.min((currentTime - this.lastFrameTime) / 16.67, 2);
        this.lastFrameTime = currentTime;

        this.update(delta);
        this.drawScene();

        requestAnimationFrame((time) => this.loop(time));
    }

    update(delta) {
        this.score += delta * 0.18 * this.speed;
        this.speed = Math.min(16, 6.4 + this.score / 180);
        this.spawnTimer -= delta * this.speed;

        if (this.spawnTimer <= 0) {
            this.spawnObstacle();
            this.spawnTimer = 280 + Math.random() * 260 - Math.min(this.score, 600) * 0.16;
        }

        this.updateDino(delta);
        this.updateObstacles(delta);
        this.updateBackground(delta);
        this.updateHud();

        if (this.obstacles.some((obstacle) => this.isColliding(this.getDinoHitbox(), obstacle.hitbox))) {
            this.endGame();
        }
    }

    updateDino(delta) {
        this.dino.velocityY += this.gravity * delta;
        this.dino.y += this.dino.velocityY * delta;
        this.dino.stepTimer += delta;
        this.dino.blinkTimer += delta;

        const dinoHeight = this.dino.isDucking && this.dino.isOnGround ? 50 : 78;
        const floorY = this.groundY - dinoHeight;

        if (this.dino.y >= floorY) {
            this.dino.y = floorY;
            this.dino.velocityY = 0;
            this.dino.isOnGround = true;
        } else {
            this.dino.isOnGround = false;
        }

        this.dino.height = dinoHeight;
        this.dino.width = this.dino.isDucking && this.dino.isOnGround ? 88 : 68;
    }

    updateObstacles(delta) {
        this.obstacles.forEach((obstacle) => {
            obstacle.x -= this.speed * delta;
            obstacle.phase += delta * 0.18;
            obstacle.hitbox.x = obstacle.x + obstacle.hitboxOffsetX;
            obstacle.hitbox.y = obstacle.y + obstacle.hitboxOffsetY + (obstacle.type === "bird" ? Math.sin(obstacle.phase) * 4 : 0);
        });

        this.obstacles = this.obstacles.filter((obstacle) => obstacle.x + obstacle.width > -40);
    }

    updateBackground(delta) {
        this.clouds.forEach((cloud) => {
            cloud.x -= cloud.speed * delta;
            if (cloud.x < -130) {
                cloud.x = this.width + Math.random() * 180;
                cloud.y = 52 + Math.random() * 82;
            }
        });

        this.groundMarks.forEach((mark) => {
            mark.x -= this.speed * delta;
            if (mark.x + mark.width < 0) {
                mark.x = this.width + Math.random() * 80;
                mark.y = this.groundY + 18 + Math.random() * 46;
                mark.width = 24 + Math.random() * 46;
            }
        });
    }

    spawnObstacle() {
        const canSpawnBird = this.score > 90;
        const type = canSpawnBird && Math.random() > 0.64 ? "bird" : "cactus";

        if (type === "bird") {
            const flyLow = Math.random() > 0.45;
            const y = flyLow ? this.groundY - 92 : this.groundY - 145;
            this.obstacles.push({
                type,
                x: this.width + 30,
                y,
                width: 72,
                height: 38,
                phase: 0,
                hitboxOffsetX: 8,
                hitboxOffsetY: 8,
                hitbox: { x: this.width + 38, y: y + 8, width: 54, height: 24 }
            });
            return;
        }

        const variant = Math.random();
        const width = variant > 0.7 ? 70 : variant > 0.35 ? 48 : 34;
        const height = variant > 0.7 ? 76 : variant > 0.35 ? 66 : 56;
        this.obstacles.push({
            type,
            x: this.width + 30,
            y: this.groundY - height,
            width,
            height,
            phase: 0,
            hitboxOffsetX: 7,
            hitboxOffsetY: 8,
            hitbox: { x: this.width + 37, y: this.groundY - height + 8, width: width - 14, height: height - 8 }
        });
    }

    jump() {
        if (!this.dino.isOnGround) {
            return;
        }

        this.dino.velocityY = -15.6;
        this.dino.isOnGround = false;
        this.dino.isDucking = false;
        this.playTone(660, 0.08, "square");
    }

    setDucking(isDucking) {
        if (this.state !== "playing") {
            return;
        }

        this.dino.isDucking = isDucking && this.dino.isOnGround;
    }

    getDinoHitbox() {
        if (this.dino.isDucking && this.dino.isOnGround) {
            return {
                x: this.dino.x + 10,
                y: this.dino.y + 12,
                width: this.dino.width - 16,
                height: this.dino.height - 16
            };
        }

        return {
            x: this.dino.x + 10,
            y: this.dino.y + 8,
            width: this.dino.width - 18,
            height: this.dino.height - 12
        };
    }

    isColliding(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    endGame() {
        this.state = "gameOver";
        const roundedScore = Math.floor(this.score);

        if (roundedScore > this.bestScore) {
            this.bestScore = roundedScore;
            localStorage.setItem("dinoRunnerBestScore", String(this.bestScore));
            this.finalScoreText.textContent = `Novo recorde: ${roundedScore} pontos!`;
        } else {
            this.finalScoreText.textContent = `Sua pontuação foi ${roundedScore}. Recorde: ${this.bestScore}.`;
        }

        this.playTone(160, 0.18, "sawtooth");
        this.gameOverOverlay.classList.add("show");
        this.updateHud();
    }

    updateHud() {
        this.scoreValue.textContent = String(Math.floor(this.score));
        this.bestScoreValue.textContent = String(this.bestScore);
        this.speedValue.textContent = `${Math.max(1, this.speed / 6.4).toFixed(1)}x`;
    }

    drawScene() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawSky();
        this.drawSun();
        this.clouds.forEach((cloud) => this.drawCloud(cloud));
        this.drawGround();
        this.obstacles.forEach((obstacle) => {
            if (obstacle.type === "bird") {
                this.drawBird(obstacle);
            } else {
                this.drawCactus(obstacle);
            }
        });
        this.drawDino();
    }

    drawSky() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "#92ddff");
        gradient.addColorStop(0.55, "#eafcff");
        gradient.addColorStop(0.56, "#f4cc83");
        gradient.addColorStop(1, "#d99445");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.fillStyle = "rgba(255,255,255,0.28)";
        for (let i = 0; i < 7; i++) {
            this.ctx.beginPath();
            this.ctx.arc(90 + i * 132, 190 + Math.sin(i) * 14, 3 + (i % 3), 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawSun() {
        const gradient = this.ctx.createRadialGradient(748, 78, 8, 748, 78, 58);
        gradient.addColorStop(0, "#fff8b8");
        gradient.addColorStop(1, "rgba(255, 188, 80, 0)");
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(748, 78, 58, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = "#ffd166";
        this.ctx.beginPath();
        this.ctx.arc(748, 78, 28, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawCloud(cloud) {
        this.ctx.save();
        this.ctx.translate(cloud.x, cloud.y);
        this.ctx.scale(cloud.size, cloud.size);
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.86)";
        this.ctx.beginPath();
        this.ctx.arc(24, 24, 20, 0, Math.PI * 2);
        this.ctx.arc(48, 17, 25, 0, Math.PI * 2);
        this.ctx.arc(76, 26, 18, 0, Math.PI * 2);
        this.ctx.fillRect(24, 25, 58, 22);
        this.ctx.fill();
        this.ctx.restore();
    }

    drawGround() {
        this.ctx.fillStyle = "#80512a";
        this.ctx.fillRect(0, this.groundY, this.width, 8);
        this.ctx.fillStyle = "#b9793b";
        this.ctx.fillRect(0, this.groundY + 8, this.width, this.height - this.groundY);

        this.ctx.strokeStyle = "rgba(84, 48, 18, 0.36)";
        this.ctx.lineWidth = 3;
        this.groundMarks.forEach((mark) => {
            this.ctx.beginPath();
            this.ctx.moveTo(mark.x, mark.y);
            this.ctx.lineTo(mark.x + mark.width, mark.y);
            this.ctx.stroke();
        });
    }

    drawDino() {
        const dino = this.dino;
        const isDucking = dino.isDucking && dino.isOnGround;
        const legFrame = Math.floor(dino.stepTimer / 7) % 2;

        this.ctx.save();
        this.ctx.translate(dino.x, dino.y);

        this.ctx.fillStyle = "#2d5a27";
        this.roundRect(8, isDucking ? 16 : 22, isDucking ? 64 : 44, isDucking ? 34 : 48, 10);
        this.ctx.fill();

        this.ctx.fillStyle = "#2d5a27";
        if (isDucking) {
            this.roundRect(50, 7, 40, 32, 10);
        } else {
            this.roundRect(34, 0, 38, 36, 10);
        }
        this.ctx.fill();

        this.ctx.fillStyle = "#1a3d1a";
        this.ctx.beginPath();
        this.ctx.moveTo(12, isDucking ? 28 : 42);
        this.ctx.lineTo(-14, isDucking ? 20 : 30);
        this.ctx.lineTo(10, isDucking ? 46 : 58);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.fillStyle = "#f7fff4";
        const eyeX = isDucking ? 78 : 58;
        const eyeY = isDucking ? 17 : 11;
        this.ctx.beginPath();
        this.ctx.arc(eyeX, eyeY, dino.blinkTimer % 120 > 114 ? 1 : 3.2, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = "#1a3d1a";
        this.ctx.fillRect(isDucking ? 86 : 69, isDucking ? 24 : 21, 9, 4);

        this.ctx.strokeStyle = "#1f451c";
        this.ctx.lineWidth = 6;
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(24, isDucking ? 48 : 64);
        this.ctx.lineTo(18 + legFrame * 12, 76);
        this.ctx.moveTo(48, isDucking ? 48 : 64);
        this.ctx.lineTo(60 - legFrame * 12, 76);
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawCactus(cactus) {
        this.ctx.save();
        this.ctx.translate(cactus.x, cactus.y);
        this.ctx.fillStyle = "#28784a";
        this.roundRect(cactus.width * 0.34, 0, cactus.width * 0.32, cactus.height, 9);
        this.ctx.fill();

        this.ctx.strokeStyle = "#28784a";
        this.ctx.lineWidth = Math.max(9, cactus.width * 0.2);
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(cactus.width * 0.35, cactus.height * 0.42);
        this.ctx.lineTo(cactus.width * 0.1, cactus.height * 0.42);
        this.ctx.lineTo(cactus.width * 0.1, cactus.height * 0.25);
        this.ctx.moveTo(cactus.width * 0.65, cactus.height * 0.55);
        this.ctx.lineTo(cactus.width * 0.92, cactus.height * 0.55);
        this.ctx.lineTo(cactus.width * 0.92, cactus.height * 0.35);
        this.ctx.stroke();

        this.ctx.strokeStyle = "rgba(255,255,255,0.24)";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(cactus.width * 0.46, 12);
        this.ctx.lineTo(cactus.width * 0.46, cactus.height - 10);
        this.ctx.stroke();
        this.ctx.restore();
    }

    drawBird(bird) {
        const flap = Math.sin(bird.phase) * 14;

        this.ctx.save();
        this.ctx.translate(bird.x, bird.y + Math.sin(bird.phase) * 4);
        this.ctx.fillStyle = "#e76f51";
        this.roundRect(20, 13, 36, 20, 10);
        this.ctx.fill();

        this.ctx.fillStyle = "#d95437";
        this.ctx.beginPath();
        this.ctx.moveTo(28, 18);
        this.ctx.quadraticCurveTo(5, 0 + flap, 0, 20);
        this.ctx.quadraticCurveTo(14, 18, 28, 26);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.moveTo(45, 18);
        this.ctx.quadraticCurveTo(74, 0 - flap, 72, 22);
        this.ctx.quadraticCurveTo(58, 20, 44, 27);
        this.ctx.fill();

        this.ctx.fillStyle = "#24343a";
        this.ctx.beginPath();
        this.ctx.arc(50, 19, 2.6, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }

    roundRect(x, y, width, height, radius) {
        const safeRadius = Math.min(radius, width / 2, height / 2);
        this.ctx.beginPath();
        this.ctx.moveTo(x + safeRadius, y);
        this.ctx.arcTo(x + width, y, x + width, y + height, safeRadius);
        this.ctx.arcTo(x + width, y + height, x, y + height, safeRadius);
        this.ctx.arcTo(x, y + height, x, y, safeRadius);
        this.ctx.arcTo(x, y, x + width, y, safeRadius);
        this.ctx.closePath();
    }

    toggleSound() {
        this.isMuted = !this.isMuted;
        localStorage.setItem("dinoRunnerMuted", String(this.isMuted));
        this.updateSoundIcon();
        this.playTone(420, 0.06, "sine");
    }

    updateSoundIcon() {
        this.soundToggle.classList.toggle("muted", this.isMuted);
        this.soundToggle.innerHTML = this.isMuted
            ? '<i class="fas fa-volume-xmark" aria-hidden="true"></i>'
            : '<i class="fas fa-volume-high" aria-hidden="true"></i>';
    }

    playTone(frequency, duration, waveType) {
        if (this.isMuted) {
            return;
        }

        try {
            this.audioContext = this.audioContext || new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            oscillator.type = waveType;
            oscillator.frequency.value = frequency;
            gain.gain.setValueAtTime(0.035, this.audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

            oscillator.connect(gain);
            gain.connect(this.audioContext.destination);
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (error) {
            this.isMuted = true;
            localStorage.setItem("dinoRunnerMuted", "true");
            this.updateSoundIcon();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new DinoRunner();
});
