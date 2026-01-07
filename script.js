document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('egg-trigger');
    const overlay = document.getElementById('terminal-overlay');
    const content = document.getElementById('terminal-content');
    const closeBtn = document.getElementById('close-btn');
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');

    let isRunning = false;
    let matrixInterval = null;

    // ===== MISSATGES DE LA TERMINAL =====
    const logLines = [
        { text: "$ sudo access reality.core", delay: 800 },
        { text: "[sudo] password for truth: ********", delay: 600 },
        { text: "", delay: 300 },
        { text: "Initializing system diagnostics...", delay: 500 },
        { text: "> Scanning: Marketing narratives... ", class: "warning", delay: 700 },
        { text: "  └─ Found: 'Revolutionary AI', 'Disruptive Innovation', 'Game-changer'", delay: 600 },
        { text: "  └─ Status: [BYPASSED]", class: "success", delay: 500 },
        { text: "", delay: 300 },
        { text: "> Searching: Magic algorithms...", delay: 600 },
        { text: "  └─ Searching in /usr/lib/hype/...", delay: 500 },
        { text: "  └─ Searching in /opt/buzzwords/...", delay: 500 },
        { text: "  └─ Status: [NOT FOUND]", class: "error", delay: 600 },
        { text: "", delay: 400 },
        { text: "> Loading REAL components:", delay: 600 },
        { text: "  ├─ linear_algebra.so ████████████ 100%", delay: 400 },
        { text: "  ├─ statistics.so ████████████ 100%", delay: 400 },
        { text: "  ├─ calculus.so ████████████ 100%", delay: 400 },
        { text: "  └─ optimization.so ████████████ 100%", delay: 500 },
        { text: "", delay: 400 },
        { text: "Compiling reality matrix...", delay: 800 },
        { text: "Deconstructing hype layer...", class: "glitch", delay: 700 },
        { text: "Extracting core truth...", delay: 900 },
        { text: "", delay: 500 },
        { text: "================================", delay: 300 },
        { text: " SYSTEM ANALYSIS COMPLETE", class: "success", delay: 600 },
        { text: "================================", delay: 300 },
        { text: "", delay: 400 },
        { text: "FINDINGS:", delay: 500 },
        { text: "  • Intelligence: NOT FOUND", class: "error", delay: 400 },
        { text: "  • Magic: NOT FOUND", class: "error", delay: 400 },
        { text: "  • Disruption: TEMPORARY STATE", class: "warning", delay: 400 },
        { text: "", delay: 300 },
        { text: "CONCLUSION:", delay: 600 },
        { text: "  └─ It's just linear algebra", delay: 500 },
        { text: "  └─ It's just matrix multiplication", delay: 500 },
        { text: "  └─ It's just calculus", delay: 500 },
        { text: "", delay: 400 },
        { text: "  └─ It's just software.", class: "success", delay: 800 },
        { text: "", delay: 500 },
        { text: "root@reality:~/truth/revealed# _", delay: 0 }
    ];

    // ===== EFECTE MATRIX DE FONS =====
    function initMatrix() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "01アイウエオカキクケコサシスセソタチツテト";
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        matrixInterval = setInterval(() => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff88';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }, 50);
    }

    // ===== OBRIR TERMINAL =====
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        if (isRunning) return;
        openTerminal();
    });

    function openTerminal() {
        overlay.classList.remove('hidden');
        overlay.setAttribute('aria-hidden', 'false');
        content.innerHTML = '';
        isRunning = true;
        initMatrix();
        typeLines(0);
    }

    // ===== TANCAR TERMINAL =====
    function closeTerminal() {
        overlay.classList.add('hidden');
        overlay.setAttribute('aria-hidden', 'true');
        isRunning = false;
        if (matrixInterval) {
            clearInterval(matrixInterval);
            matrixInterval = null;
        }
    }

    closeBtn.addEventListener('click', closeTerminal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeTerminal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && !overlay.classList.contains('hidden')) {
            closeTerminal();
        }
    });

    // ===== ESCRIURE LÍNIES AMB EFECTE TYPEWRITER =====
    function typeLines(index) {
        if (!isRunning || index >= logLines.length) {
            if (isRunning && index >= logLines.length) {
                content.innerHTML += '<span class="cursor"></span>';
            }
            return;
        }

        const line = logLines[index];
        const lineDiv = document.createElement('div');
        lineDiv.className = 'terminal-line' + (line.class ? ' ' + line.class : '');
        content.appendChild(lineDiv);

        let charIndex = 0;
        const typeChar = () => {
            if (!isRunning) return;
            
            if (charIndex < line.text.length) {
                lineDiv.textContent += line.text[charIndex];
                charIndex++;
                content.scrollTop = content.scrollHeight;
                setTimeout(typeChar, 20 + Math.random() * 30); // Velocitat variable
            } else {
                setTimeout(() => typeLines(index + 1), line.delay);
            }
        };

        typeChar();
    }

    // Responsive canvas
    window.addEventListener('resize', () => {
        if (!overlay.classList.contains('hidden')) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
});
