// ===== MOBILE TOUCH EFFECTS (Replaces Custom Cursor) =====

(function() {
    'use strict';
    
    // Detect if device is mobile/touch
    const isTouchDevice = ('ontouchstart' in window) || 
                         (navigator.maxTouchPoints > 0) || 
                         (navigator.msMaxTouchPoints > 0);
    
    if (!isTouchDevice) {
        console.log('Not a touch device, skipping mobile effects');
        return;
    }
    
    console.log('Touch device detected, enabling mobile effects');
    
    // Add touch ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.touches ? event.touches[0].clientX - rect.left - size / 2 : event.clientX - rect.left - size / 2;
        const y = event.touches ? event.touches[0].clientY - rect.top - size / 2 : event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('touch-ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple to interactive elements
    const rippleElements = document.querySelectorAll(
        '.btn, button, .project-card, .skill-category, .tech-skill-card, ' +
        '.ai-quick-btn, .ai-topic-chip, .social-links a, .nav-links a'
    );
    
    rippleElements.forEach(element => {
        element.addEventListener('touchstart', createRipple, { passive: true });
    });
    
    // Touch feedback vibration (if supported)
    function addHapticFeedback(element) {
        if ('vibrate' in navigator) {
            element.addEventListener('touchstart', () => {
                navigator.vibrate(10); // 10ms vibration
            }, { passive: true });
        }
    }
    
    // Add haptic to important elements
    const hapticElements = document.querySelectorAll(
        '.btn-primary, .ai-chat-toggle, .theme-toggle, #aiSendBtn'
    );
    
    hapticElements.forEach(addHapticFeedback);
    
    // Touch trail effect (alternative to cursor trail)
    let touchTrail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        
        // Create trail dot
        const dot = document.createElement('div');
        dot.className = 'touch-trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            left: ${touch.clientX - 4}px;
            top: ${touch.clientY - 4}px;
            opacity: 0.6;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(dot);
        touchTrail.push(dot);
        
        // Fade out
        setTimeout(() => {
            dot.style.opacity = '0';
        }, 100);
        
        // Remove after animation
        setTimeout(() => {
            dot.remove();
        }, 600);
        
        // Limit trail length
        if (touchTrail.length > maxTrailLength) {
            const oldDot = touchTrail.shift();
            if (oldDot && oldDot.parentNode) {
                oldDot.remove();
            }
        }
    }, { passive: true });
    
    // Clear trail on touch end
    document.addEventListener('touchend', () => {
        touchTrail.forEach(dot => {
            if (dot && dot.parentNode) {
                dot.style.opacity = '0';
                setTimeout(() => dot.remove(), 300);
            }
        });
        touchTrail = [];
    }, { passive: true });
    
    // Long press effect
    let longPressTimer;
    
    document.addEventListener('touchstart', (e) => {
        const target = e.target.closest('.project-card, .skill-category, .tech-skill-card');
        
        if (target) {
            longPressTimer = setTimeout(() => {
                // Add glow effect on long press
                target.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.6)';
                target.style.transform = 'scale(1.05)';
                
                // Vibrate if supported
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
                
                setTimeout(() => {
                    target.style.boxShadow = '';
                    target.style.transform = '';
                }, 500);
            }, 500);
        }
    }, { passive: true });
    
    document.addEventListener('touchend', () => {
        clearTimeout(longPressTimer);
    }, { passive: true });
    
    document.addEventListener('touchmove', () => {
        clearTimeout(longPressTimer);
    }, { passive: true });
    
    // Smooth scroll enhancement for mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('touchend', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                    
                    // Close mobile menu if open
                    const navLinks = document.querySelector('.nav-links');
                    if (navLinks) {
                        navLinks.classList.remove('active');
                    }
                }
            }
        }, { passive: false });
    });
    
    // Add touch feedback class to body
    document.body.classList.add('touch-device');
    
    console.log('Mobile touch effects initialized');
    
})();
