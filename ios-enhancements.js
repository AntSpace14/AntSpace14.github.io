// ===== iOS COMPATIBILITY ENHANCEMENTS =====

(function() {
    'use strict';
    
    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isIOS || isSafari) {
        document.body.classList.add('ios-device');
        
        // Fix iOS 100vh issue
        function setVH() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);
        
        // Prevent iOS bounce scroll
        let startY = 0;
        
        document.addEventListener('touchstart', function(e) {
            startY = e.touches[0].pageY;
        }, { passive: true });
        
        document.addEventListener('touchmove', function(e) {
            const scrollableElement = e.target.closest('.ai-chat-messages, .ai-topics-bar');
            
            if (!scrollableElement) {
                const currentY = e.touches[0].pageY;
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight;
                const clientHeight = document.documentElement.clientHeight;
                
                // Prevent overscroll at top
                if (scrollTop <= 0 && currentY > startY) {
                    e.preventDefault();
                }
                
                // Prevent overscroll at bottom
                if (scrollTop + clientHeight >= scrollHeight && currentY < startY) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
        
        // Fix iOS input focus zoom
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.fontSize = '16px';
            });
        });
        
        // iOS Keyboard handling for chat
        const aiChatInput = document.getElementById('aiChatInput');
        if (aiChatInput) {
            aiChatInput.addEventListener('focus', function() {
                setTimeout(() => {
                    const chatMessages = document.getElementById('aiChatMessages');
                    if (chatMessages) {
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }
                }, 300);
            });
            
            // Prevent zoom on input focus
            aiChatInput.addEventListener('touchstart', function(e) {
                e.stopPropagation();
            });
        }
        
        // iOS Smooth scroll polyfill
        if (!('scrollBehavior' in document.documentElement.style)) {
            const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
            smoothScrollLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const targetPosition = target.offsetTop - 80;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
        
        // iOS Active state for buttons
        const buttons = document.querySelectorAll('button, .btn, .ai-quick-btn, .ai-topic-chip');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.classList.add('ios-active');
            }, { passive: true });
            
            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('ios-active');
                }, 150);
            }, { passive: true });
        });
        
        // iOS Viewport height fix for chat
        const aiChatContainer = document.getElementById('aiChatContainer');
        if (aiChatContainer) {
            const updateChatHeight = () => {
                const vh = window.innerHeight * 0.01;
                aiChatContainer.style.maxHeight = `${vh * 90}px`;
            };
            
            updateChatHeight();
            window.addEventListener('resize', updateChatHeight);
            window.addEventListener('orientationchange', () => {
                setTimeout(updateChatHeight, 100);
            });
        }
        
        // iOS Prevent double-tap zoom
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
        
        // iOS Safe area detection
        const updateSafeArea = () => {
            const safeAreaTop = getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top');
            const safeAreaBottom = getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom');
            
            if (safeAreaTop || safeAreaBottom) {
                document.body.classList.add('has-notch');
            }
        };
        
        updateSafeArea();
        
        // iOS Momentum scrolling fix
        const scrollableElements = document.querySelectorAll('.ai-chat-messages, .ai-topics-bar, .projects-grid');
        scrollableElements.forEach(element => {
            element.style.webkitOverflowScrolling = 'touch';
        });
        
        // Voice input feature removed
        
        // iOS PWA Install Prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show install button if needed
            const installBtn = document.createElement('button');
            installBtn.textContent = '📱 Add to Home Screen';
            installBtn.className = 'ios-install-btn';
            installBtn.style.cssText = `
                position: fixed;
                bottom: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                font-weight: 600;
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                z-index: 9998;
                animation: slideInUp 0.5s ease;
            `;
            
            installBtn.addEventListener('click', async () => {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    const { outcome } = await deferredPrompt.userChoice;
                    deferredPrompt = null;
                    installBtn.remove();
                }
            });
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                if (installBtn.parentElement) {
                    installBtn.style.animation = 'slideOutDown 0.5s ease';
                    setTimeout(() => installBtn.remove(), 500);
                }
            }, 10000);
        });
        
        // iOS Orientation change handler
        window.addEventListener('orientationchange', () => {
            // Close chat on orientation change to prevent layout issues
            const aiChatContainer = document.getElementById('aiChatContainer');
            if (aiChatContainer && aiChatContainer.classList.contains('active')) {
                setTimeout(() => {
                    aiChatContainer.classList.remove('active');
                }, 100);
            }
        });
        
        // iOS Performance optimization
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                // Lazy load images
                const images = document.querySelectorAll('img[loading="lazy"]');
                images.forEach(img => {
                    if ('IntersectionObserver' in window) {
                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    const img = entry.target;
                                    img.src = img.dataset.src || img.src;
                                    observer.unobserve(img);
                                }
                            });
                        });
                        observer.observe(img);
                    }
                });
            });
        }
        
        // iOS Haptic feedback (if supported)
        const addHapticFeedback = (element) => {
            if ('vibrate' in navigator) {
                element.addEventListener('click', () => {
                    navigator.vibrate(10);
                }, { passive: true });
            }
        };
        
        // Add haptic to important buttons
        const importantButtons = document.querySelectorAll('.btn-primary, .ai-send-btn, .ai-chat-toggle');
        importantButtons.forEach(addHapticFeedback);
        
        console.log('iOS compatibility enhancements loaded');
    }
    
    // Add CSS for iOS active state
    const style = document.createElement('style');
    style.textContent = `
        .ios-active {
            opacity: 0.7 !important;
            transform: scale(0.95) !important;
        }
        
        @keyframes slideOutDown {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(100px);
            }
        }
    `;
    document.head.appendChild(style);
    
})();
