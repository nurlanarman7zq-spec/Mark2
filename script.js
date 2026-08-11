/**
 * КОНФИГУРАЦИЯ ПРИГЛАШЕНИЯ
 * Вы можете легко изменять эти параметры под себя без правки остального кода.
 */
const invitationConfig = {
    name: "Анар",
    movie: "Человек-паук",
    date: "2026-06-15", // Формат YYYY-MM-DD
    time: "19:30",
    cinema: "Kinopark IMAX",
    address: "г. Алматы, пр. Аль-Фараби, 77 (Esentai Mall)",
    latitude: 43.2220,
    longitude: 76.9286,
    secretMessage: "Я так рад, что в моей жизни есть ты. Каждый момент с тобой — это настоящее приключение ❤️",
    personalMessage: "Иногда самые простые вечера становятся самыми особенными. Поэтому я хочу провести этот вечер именно с тобой. ❤️"
};

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 700);
    }, 600);

    document.getElementById('conf-movie').textContent = invitationConfig.movie;
    document.getElementById('conf-date').textContent = formatDate(invitationConfig.date);
    document.getElementById('conf-time').textContent = invitationConfig.time;
    document.getElementById('conf-cinema').textContent = invitationConfig.cinema;
    document.getElementById('conf-address').textContent = invitationConfig.address;
    document.getElementById('secret-message-text').textContent = invitationConfig.secretMessage;

    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('cursor-dot');
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function renderCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const openBtn = document.getElementById('open-btn');
    const openingScreen = document.getElementById('opening-screen');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('bg-audio');
    const audioBar = document.getElementById('audio-bar');

    openBtn.addEventListener('click', () => {
        openingScreen.style.opacity = '0';
        openingScreen.style.transform = 'scale(1.05)';
        setTimeout(() => {
            openingScreen.remove();
            mainContent.classList.remove('opacity-0', 'pointer-events-none');
            audioBar.classList.remove('translate-y-24');

            audio.play().then(() => {
                updatePlayState(true);
            }).catch(() => {
                console.log("Autoplay blocked by browser. User can use play button.");
            });

            initTypewriter();
        }, 700);
    });

    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuBtn.addEventListener('click', () => mobileMenu.classList.remove('translate-x-full'));
    mobileMenuClose.addEventListener('click', () => mobileMenu.classList.add('translate-x-full'));
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('translate-x-full'));
    });

    const playBtn = document.getElementById('player-play-btn');
    const miniToggle = document.getElementById('mini-music-toggle');
    const playIcon = document.getElementById('play-icon');
    const progressBar = document.getElementById('progress-bar');
    const volumeBar = document.getElementById('volume-bar');
    const timeDisplay = document.getElementById('time-display');
    const musicStateText = document.getElementById('music-state-text');

    let isPlaying = false;

    function updatePlayState(playing) {
        isPlaying = playing;
        if (playing) {
            playIcon.textContent = "❚❚";
            musicStateText.textContent = "Играет";
            audio.play().catch(() => {});
        } else {
            playIcon.textContent = "▶";
            musicStateText.textContent = "Пауза";
            audio.pause();
        }
    }

    playBtn.addEventListener('click', () => updatePlayState(!isPlaying));
    miniToggle.addEventListener('click', () => updatePlayState(!isPlaying));

    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.value = percent;
            const mins = Math.floor(audio.currentTime / 60);
            const secs = Math.floor(audio.currentTime % 60);
            timeDisplay.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
    });

    progressBar.addEventListener('input', (e) => {
        if (audio.duration) {
            audio.currentTime = (e.target.value / 100) * audio.duration;
        }
    });

    volumeBar.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });

    const targetDate = new Date(`${invitationConfig.date}T${invitationConfig.time}:00`).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            document.getElementById('countdown-timer').innerHTML = `
                <div class="col-span-4 p-4 text-center text-rose-400 font-serif font-bold text-xl">
                    Сегодня тот самый день ❤️
                </div>
            `;
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    document.getElementById('maps-btn').addEventListener('click', () => {
        const query = encodeURIComponent(`${invitationConfig.cinema}, ${invitationConfig.address}`);
        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    });

    document.getElementById('calendar-btn').addEventListener('click', () => {
        const title = encodeURIComponent(`Киновечер: ${invitationConfig.movie} с Анар ❤️`);
        const details = encodeURIComponent(`Наш романтический вечер кино в кинотеатре ${invitationConfig.cinema}.`);
        const location = encodeURIComponent(invitationConfig.address);

        const cleanDate = invitationConfig.date.replace(/-/g, '');
        const cleanTime = invitationConfig.time.replace(':', '');
        const startDateTime = `${cleanDate}T${cleanTime}00`;
        const endHour = String(parseInt(invitationConfig.time.split(':')[0]) + 2).padStart(2, '0');
        const endDateTime = `${cleanDate}T${endHour}${invitationConfig.time.split(':')[1]}00`;

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateTime}/${endDateTime}&details=${details}&location=${location}`;
        window.open(googleCalendarUrl, '_blank');
    });

    const yesBtn1 = document.getElementById('yes-btn-1');
    const yesBtn2 = document.getElementById('yes-btn-2');
    const successModal = document.getElementById('success-modal');
    const successCloseBtn = document.getElementById('success-close-btn');

    function handleYesResponse() {
        successModal.classList.remove('opacity-0', 'pointer-events-none');
        successModal.querySelector('div').classList.remove('scale-95');
        successModal.querySelector('div').classList.add('scale-100');
        createConfettiBurst();
    }

    yesBtn1.addEventListener('click', handleYesResponse);
    yesBtn2.addEventListener('click', handleYesResponse);
    successCloseBtn.addEventListener('click', () => {
        successModal.classList.add('opacity-0', 'pointer-events-none');
    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentPhotoIndex = 0;
    const photos = Array.from(galleryItems).map(item => item.querySelector('img').src);

    function openLightbox(index) {
        currentPhotoIndex = index;
        lightboxImg.src = photos[currentPhotoIndex];
        lightbox.classList.remove('opacity-0', 'pointer-events-none');
    }

    function closeLightbox() {
        lightbox.classList.add('opacity-0', 'pointer-events-none');
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    lightboxClose.addEventListener('click', closeLightbox);

    lightboxPrev.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        lightboxImg.src = photos[currentPhotoIndex];
    });

    lightboxNext.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        lightboxImg.src = photos[currentPhotoIndex];
    });

    window.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('pointer-events-none')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxPrev.click();
        if (e.key === 'ArrowRight') lightboxNext.click();
    });

    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) lightboxNext.click();
        if (touchEndX > touchStartX + 50) lightboxPrev.click();
    });

    function initTypewriter() {
        const textElement = document.getElementById('typewriter-text');
        const message = invitationConfig.personalMessage;
        let i = 0;
        textElement.textContent = "";

        function type() {
            if (i < message.length) {
                textElement.textContent += message.charAt(i);
                i++;
                setTimeout(type, 40);
            }
        }

        type();
    }

    const secretBtn = document.getElementById('secret-btn');
    const secretContent = document.getElementById('secret-content');

    secretBtn.addEventListener('click', () => {
        secretContent.classList.toggle('hidden');
    });

    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(244, 63, 94, 0.4)';
            ctx.fill();
        }
    }

    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateCanvas);
    }

    animateCanvas();
});

function formatDate(dateStr) {
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    const date = new Date(dateStr);
    return isNaN(date) ? dateStr : date.toLocaleDateString('ru-RU', options);
}

function createConfettiBurst() {
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');

        confetti.className = 'fixed z-50 pointer-events-none w-2.5 h-2.5 rounded-full';

        confetti.style.backgroundColor = [
            '#f43f5e',
            '#6366f1',
            '#ec4899',
            '#8b5cf6'
        ][Math.floor(Math.random() * 4)];

        confetti.style.left = '50vw';
        confetti.style.top = '50vh';

        document.body.appendChild(confetti);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 150 + 50;

        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        confetti.animate(
            [
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${tx}px, ${ty}px) scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            }
        ).onfinish = () => confetti.remove();
    }
}
