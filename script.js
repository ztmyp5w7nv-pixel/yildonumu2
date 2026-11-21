document.addEventListener('DOMContentLoaded', () => {
    const petalsContainer = document.getElementById('petals-container');
    const introOverlay = document.getElementById('intro-overlay');
    const openBtn = document.getElementById('open-btn');
    const mainApp = document.getElementById('main-app');
    const celebrateBtn = document.getElementById('celebrate-btn');
    const bouquetTrigger = document.getElementById('bouquet-trigger');
    const replayAnimBtn = document.getElementById('replay-anim-btn');

    // 1. Sürekli Düşen Kırmızı Gül Yaprakları
    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        const size = Math.random() * 14 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size * 0.8}px`;
        petal.style.left = `${Math.random() * 100}vw`;

        const duration = Math.random() * 5 + 5;
        petal.style.animationDuration = `${duration}s`;

        petalsContainer.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }

    setInterval(createPetal, 350);

    // 2. Zarfı Açma Animasyonu
    openBtn.addEventListener('click', (e) => {
        burstHearts(e.clientX, e.clientY, 22);
        introOverlay.classList.add('fade-out');

        setTimeout(() => {
            introOverlay.style.display = 'none';
            mainApp.classList.remove('hidden');
            triggerReveal();
            animateCounters();
            startLoveStoryAnimation();
        }, 700);
    });

    // 3. Kaydırdıkça Ortaya Çıkan Kartlar
    function triggerReveal() {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(el => observer.observe(el));
    }

    // 4. 16 Yıllık Sayaç Animasyonu
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-num[data-target]');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1800;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = target.toLocaleString('tr-TR');
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.floor(current).toLocaleString('tr-TR');
                }
            }, stepTime);
        });
    }

    // 5. YENİ: 2D Evlilik & Sevgi Yolculuğu Canvas Animasyonu
    let animFrameId;
    function startLoveStoryAnimation() {
        const canvas = document.getElementById('love-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const storyText = document.getElementById('anim-story-text');

        // Retina / Mobil netlik ayarı
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const W = rect.width;
        const H = rect.height;
        const groundY = H - 34;

        let progress = 0; // 0 -> 1 arası yürüme ilerlemesi
        let frame = 0;
        let floatingHearts = [];
        let stars = Array.from({ length: 24 }, () => ({
            x: Math.random() * W,
            y: Math.random() * (groundY - 40),
            r: Math.random() * 1.6 + 0.5,
            phase: Math.random() * Math.PI * 2
        }));

        if (animFrameId) cancelAnimationFrame(animFrameId);

        function drawPerson(x, y, isWoman, walkCycle, joined) {
            ctx.save();
            ctx.translate(x, y);

            // Hafif yürüme zıplaması
            const bob = joined ? Math.sin(frame * 0.06) * 1.5 : Math.abs(Math.sin(walkCycle)) * 3;
            ctx.translate(0, -bob);

            // Parıltı halesi
            ctx.shadowColor = isWoman ? '#ff4d6d' : '#e5c17b';
            ctx.shadowBlur = 12;

            // Kafa
            ctx.fillStyle = '#fbe5b6';
            ctx.beginPath();
            ctx.arc(0, -48, 8.5, 0, Math.PI * 2);
            ctx.fill();

            if (isWoman) {
                // Uzun dalgalı saç (Sarı/Altın tonlu)
                ctx.fillStyle = '#e5c17b';
                ctx.beginPath();
                ctx.arc(0, -50, 9.5, Math.PI, 0);
                ctx.lineTo(11, -30);
                ctx.quadraticCurveTo(0, -34, -11, -30);
                ctx.closePath();
                ctx.fill();

                // Zarif gelinlik / elbise silüeti
                ctx.fillStyle = '#fff0f3';
                ctx.beginPath();
                ctx.moveTo(0, -38);
                ctx.lineTo(-14, -4);
                ctx.quadraticCurveTo(0, 0, 14, -4);
                ctx.closePath();
                ctx.fill();

                // Elindeki küçük kırmızı gül (buluşmadan önce)
                if (!joined) {
                    ctx.fillStyle = '#ff2a4b';
                    ctx.beginPath();
                    ctx.arc(-11, -24, 4, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else {
                // Damat / Takım elbise gövdesi
                ctx.fillStyle = '#1e1b24';
                ctx.strokeStyle = '#e5c17b';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(-8, -38, 16, 22, 4);
                ctx.fill();
                ctx.stroke();

                // Beyaz gömlek yakası
                ctx.fillStyle = '#fff5f6';
                ctx.beginPath();
                ctx.moveTo(-3, -38);
                ctx.lineTo(3, -38);
                ctx.lineTo(0, -29);
                ctx.closePath();
                ctx.fill();

                // Bacaklar
                const legSwing = joined ? 0 : Math.sin(walkCycle) * 5;
                ctx.strokeStyle = '#1e1b24';
                ctx.lineWidth = 4.5;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(-3, -16);
                ctx.lineTo(-3 + legSwing, 0);
                ctx.moveTo(3, -16);
                ctx.lineTo(3 - legSwing, 0);
                ctx.stroke();

                // Elindeki kırmızı gül buketi (buluşmadan önce)
                if (!joined) {
                    ctx.fillStyle = '#ff2a4b';
                    ctx.beginPath();
                    ctx.arc(12, -24, 5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        function render() {
            frame++;
            ctx.clearRect(0, 0, W, H);

            // Arka plan yıldızlar & parıltılar
            stars.forEach(s => {
                const alpha = 0.3 + Math.sin(frame * 0.05 + s.phase) * 0.5;
                ctx.fillStyle = `rgba(251, 229, 182, ${Math.max(0.1, alpha)})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
            });

            // Romantik zemin çizgisi ve altın yansıma
            const grad = ctx.createLinearGradient(0, groundY, W, groundY);
            grad.addColorStop(0, 'transparent');
            grad.addColorStop(0.5, '#e5c17b');
            grad.addColorStop(1, 'transparent');
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(20, groundY);
            ctx.lineTo(W - 20, groundY);
            ctx.stroke();

            // İlerleme hızı
            if (progress < 1) {
                progress += 0.0045;
                if (progress > 1) progress = 1;
            }

            const joined = progress >= 1;
            const centerX = W / 2;
            const startLeft = 36;
            const startRight = W - 36;
            const meetOffset = 15;

            const manX = startLeft + (centerX - meetOffset - startLeft) * progress;
            const womanX = startRight - (startRight - (centerX + meetOffset)) * progress;
            const walkCycle = frame * 0.14;

            // Hikaye altyazısı güncelleme
            if (progress < 0.45) {
                storyText.innerText = "İki ayrı yol, tek bir sevgiyle birbirine yürüdü...";
            } else if (progress < 1) {
                storyText.innerText = "Her adımda büyüyen güzel bir aşk...";
            } else {
                storyText.innerText = "Ve 16 yıldır el ele, sonsuz sevgiyle birlikteler! 💍❤️";
            }

            // Buluşma anı efektleri (İç içe geçmiş iki altın alyans + kalp)
            if (joined) {
                const pulse = 1 + Math.sin(frame * 0.08) * 0.08;

                // Arka altın hale
                const halo = ctx.createRadialGradient(centerX, groundY - 40, 5, centerX, groundY - 40, 65 * pulse);
                halo.addColorStop(0, 'rgba(255, 42, 75, 0.35)');
                halo.addColorStop(0.6, 'rgba(229, 193, 123, 0.15)');
                halo.addColorStop(1, 'transparent');
                ctx.fillStyle = halo;
                ctx.beginPath();
                ctx.arc(centerX, groundY - 40, 65 * pulse, 0, Math.PI * 2);
                ctx.fill();

                // El ele tutuşma çizgisi
                ctx.strokeStyle = '#fbe5b6';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(manX + 5, groundY - 25);
                ctx.lineTo(womanX - 5, groundY - 25);
                ctx.stroke();

                // Üstte parlayan iki alyans
                ctx.save();
                ctx.translate(centerX, groundY - 82);
                ctx.scale(pulse, pulse);
                ctx.strokeStyle = '#fbe5b6';
                ctx.lineWidth = 2.2;
                ctx.shadowColor = '#e5c17b';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(-6, 0, 8, 0, Math.PI * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(6, 0, 8, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();

                // Yukarı süzülen kalpler ve güller
                if (frame % 14 === 0) {
                    floatingHearts.push({
                        x: centerX + (Math.random() - 0.5) * 40,
                        y: groundY - 55,
                        vy: Math.random() * 1.1 + 0.6,
                        vx: (Math.random() - 0.5) * 0.8,
                        alpha: 1,
                        char: Math.random() > 0.35 ? '❤️' : '🌹',
                        size: Math.random() * 6 + 11
                    });
                }
            }

            // Karakterleri çiz
            drawPerson(manX, groundY, false, walkCycle, joined);
            drawPerson(womanX, groundY, true, walkCycle, joined);

            // Uçuşan kalpleri çiz
            floatingHearts.forEach((h, idx) => {
                h.y -= h.vy;
                h.x += h.vx;
                h.alpha -= 0.011;
                ctx.save();
                ctx.globalAlpha = Math.max(0, h.alpha);
                ctx.font = `${h.size}px serif`;
                ctx.fillText(h.char, h.x, h.y);
                ctx.restore();

                if (h.alpha <= 0) floatingHearts.splice(idx, 1);
            });

            animFrameId = requestAnimationFrame(render);
        }

        render();
    }

    if (replayAnimBtn) {
        replayAnimBtn.addEventListener('click', () => {
            startLoveStoryAnimation();
        });
    }

    // 6. Kalp & Gül Patlaması Efekti
    function burstHearts(x, y, count = 12) {
        const emojis = ['🌹', '❤️', '✨', '💖', '🥀'];
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('burst-particle');
            particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 140 + 40;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 40;

            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1400);
        }
    }

    // Büyük Gül Buketine Dokunma Etkileşimi
    if (bouquetTrigger) {
        bouquetTrigger.addEventListener('click', (e) => {
            burstHearts(e.clientX, e.clientY, 24);
            for (let i = 0; i < 12; i++) {
                setTimeout(createPetal, i * 70);
            }
        });
    }

    // Alt kısımdaki büyük kutlama butonu
    celebrateBtn.addEventListener('click', () => {
        const rect = celebrateBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top;
        burstHearts(centerX, centerY, 30);

        for (let i = 0; i < 20; i++) {
            setTimeout(createPetal, i * 80);
        }
    });
});

// 7. Fotoğraf Büyütme (Lightbox) Fonksiyonları
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightboxImg.src = src;
    lightboxCaption.innerText = caption;
    lightbox.classList.add('show');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('show');
}
