document.addEventListener('DOMContentLoaded', function() {
    // Slide elements
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.slide-indicators');
    let currentSlide = 0;
    
    // Music player elements
    const audio = document.getElementById('romanticSong');
    const playBtn = document.getElementById('playBtn');
    let isPlaying = false;
    
    // Create slide indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('slide-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.slide-indicator');
    
    // Initialize slider
    function initSlider() {
        slides[0].classList.add('active');
        createStars();
        createBalloons();
        createMusicNotes();
        createHearts();
        attemptAutoplay(); // Try to autoplay when initializing
    }
    
    // Go to specific slide
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add(n > currentSlide ? 'next' : 'prev');
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        slides[currentSlide].classList.remove('prev', 'next');
        
        updateIndicators();
    }
    
    // Update indicators
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Create stars
    function createStars() {
        const starsContainer = document.getElementById('stars');
        const starCount = 100;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random properties
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;
            
            star.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${posX}px;
                top: ${posY}px;
                --duration: ${duration}s;
                animation-delay: ${delay}s;
            `;
            
            starsContainer.appendChild(star);
        }
    }
    
    // Create balloons
    function createBalloons() {
        const balloonsContainer = document.getElementById('balloons');
        const balloonCount = 15;
        const colors = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#a6c1ee', '#ffecd2', '#fcb69f'];
        
        for (let i = 0; i < balloonCount; i++) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            
            // Random properties
            const size = Math.random() * 30 + 20;
            const startX = Math.random() * window.innerWidth;
            const endX = startX + (Math.random() * 200 - 100);
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 15;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            balloon.style.cssText = `
                width: ${size}px;
                height: ${size * 1.5}px;
                background-color: ${color};
                --start-x: ${startX}px;
                --end-x: ${endX}px;
                --float-duration: ${duration}s;
                animation-delay: ${delay}s;
            `;
            
            balloonsContainer.appendChild(balloon);
        }
    }
    
    // Create floating music notes
    function createMusicNotes() {
        const notes = ['♪', '♫', '♩', '♬'];
        const container = document.querySelector('.slider-container');
        
        setInterval(() => {
            const note = document.createElement('div');
            note.classList.add('music-note');
            note.textContent = notes[Math.floor(Math.random() * notes.length)];
            note.style.cssText = `
                left: ${Math.random() * 80 + 10}%;
                bottom: 0;
                animation-duration: ${3 + Math.random() * 4}s;
            `;
            
            container.appendChild(note);
            
            setTimeout(() => note.remove(), 5000);
        }, 1000);
    }
    
    // Create floating hearts
    function createHearts() {
        const container = document.querySelector('.slider-container');
        
        setInterval(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤';
            heart.style.cssText = `
                position: absolute;
                font-size: ${15 + Math.random() * 20}px;
                color: rgba(212, 165, 154, ${0.5 + Math.random() * 0.5});
                left: ${Math.random() * 100}vw;
                top: 100vh;
                animation: float ${3 + Math.random() * 4}s linear forwards;
                pointer-events: none;
            `;
            
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 7000);
        }, 500);
    }
    
    // Audio control functions
    function attemptAutoplay() {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                playBtn.textContent = '⏸️ Pause Lagu';
            }).catch(error => {
                console.log('Autoplay blocked:', error);
                isPlaying = false;
                playBtn.textContent = '🎵 Putar Lagu';
            });
        }
    }
    
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playBtn.textContent = '🎵 Putar Lagu';
        } else {
            audio.play();
            playBtn.textContent = '⏸️ Pause Lagu';
        }
        isPlaying = !isPlaying;
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    playBtn.addEventListener('click', togglePlay);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        else if (e.key === 'ArrowLeft') prevSlide();
    });
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 8000);
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 8000);
    }
    
    // Reset interval when manually navigating
    nextBtn.addEventListener('click', resetInterval);
    prevBtn.addEventListener('click', resetInterval);
    indicators.forEach(indicator => {
        indicator.addEventListener('click', resetInterval);
    });
    
    // Initialize audio when user interacts
    document.addEventListener('click', function initAudio() {
        attemptAutoplay();
        document.removeEventListener('click', initAudio);
    }, { once: true });
    
    // Initialize everything
    initSlider();
});