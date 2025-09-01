// Presentation State Management
class PresentationController {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 9;
    this.slides = document.querySelectorAll('.slide');
    this.vanillaCount = 0;

    this.initializePresentation();
    this.bindEvents();
    this.updateProgress();
  }

  initializePresentation() {
    // Initialize slide visibility
    this.slides.forEach((slide, index) => {
      if (index === 0) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update counter display
    this.updateSlideCounter();

    // Add fade-in animation to first slide
    setTimeout(() => {
      this.slides[0].classList.add('fade-in');
    }, 100);
  }

  bindEvents() {
    // Navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.addEventListener('click', () => this.previousSlide());
    nextBtn.addEventListener('click', () => this.nextSlide());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Touch/swipe navigation for mobile
    let startX = 0;
    let endX = 0;

    document.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });

    // Close modal when clicking outside
    document.getElementById('code-modal').addEventListener('click', (e) => {
      if (e.target.id === 'code-modal') {
        this.closeModal();
      }
    });
  }

  handleKeyboard(e) {
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        this.previousSlide();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
        e.preventDefault();
        this.nextSlide();
        break;
      case 'Escape':
        this.closeModal();
        break;
      case 'Home':
        e.preventDefault();
        this.goToSlide(1);
        break;
      case 'End':
        e.preventDefault();
        this.goToSlide(this.totalSlides);
        break;
    }
  }

  handleSwipe(startX, endX) {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.previousSlide();
      }
    }
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.goToSlide(this.currentSlide + 1);
    }
  }

  previousSlide() {
    if (this.currentSlide > 1) {
      this.goToSlide(this.currentSlide - 1);
    }
  }

  goToSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > this.totalSlides) return;

    const currentSlideElement = this.slides[this.currentSlide - 1];
    const targetSlideElement = this.slides[slideNumber - 1];

    // Remove active class from current slide
    currentSlideElement.classList.remove('active');

    // Add prev class for animation direction
    if (slideNumber < this.currentSlide) {
      currentSlideElement.classList.add('prev');
      setTimeout(() => currentSlideElement.classList.remove('prev'), 600);
    }

    // Update current slide
    this.currentSlide = slideNumber;

    // Activate target slide
    setTimeout(() => {
      targetSlideElement.classList.add('active');
      targetSlideElement.classList.add('slide-in-right');

      // Remove animation class after animation completes
      setTimeout(() => {
        targetSlideElement.classList.remove('slide-in-right');
      }, 600);
    }, 100);

    this.updateSlideCounter();
    this.updateProgress();
    this.updateNavigationButtons();

    // Highlight syntax in code blocks for all slides
    setTimeout(() => {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }, 200);
  }

  updateSlideCounter() {
    document.getElementById('current-slide').textContent = this.currentSlide;
    document.getElementById('total-slides').textContent = this.totalSlides;
  }

  updateProgress() {
    const progress = (this.currentSlide / this.totalSlides) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
  }

  updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.disabled = this.currentSlide === 1;
    nextBtn.disabled = this.currentSlide === this.totalSlides;
  }

  // Method removed - no longer needed for new presentation structure

  closeModal() {
    document.getElementById('code-modal').style.display = 'none';
  }
}

// Demo functions removed - new presentation focuses on code examples in slides

// Global function to navigate to specific slide (used by TOC links)
function goToSlide(slideNumber) {
  if (window.presentation) {
    window.presentation.goToSlide(slideNumber);
  }
}

// Global function to close modal
function closeModal() {
  if (window.presentation) {
    window.presentation.closeModal();
  }
}

// Interactive Features for Learning
class InteractiveFeatures {
  constructor() {
    this.setupClickableElements();
    this.addTooltips();
  }

  setupClickableElements() {
    // Add click effects to bullet points
    document.querySelectorAll('.bullet-points li').forEach(li => {
      li.addEventListener('click', () => {
        li.style.transform = 'scale(1.02)';
        li.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
        li.style.borderRadius = '8px';
        li.style.padding = '0.5rem 2rem 0.5rem 2rem';

        setTimeout(() => {
          li.style.transform = 'scale(1)';
          li.style.backgroundColor = 'transparent';
          li.style.padding = '0 2rem 0 2rem';
        }, 200);
      });
    });

    // Add hover effects to sections
    document.querySelectorAll('.section').forEach(section => {
      section.addEventListener('mouseenter', () => {
        section.style.borderColor = 'rgba(76, 175, 80, 0.5)';
        section.style.boxShadow = '0 10px 30px rgba(76, 175, 80, 0.2)';
      });

      section.addEventListener('mouseleave', () => {
        section.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        section.style.boxShadow = 'none';
      });
    });
  }

  addTooltips() {
    // Add educational tooltips
    const tooltipData = {
      'JSX': 'JSX allows you to write HTML-like syntax in JavaScript, making component creation more intuitive.',
      'Virtual DOM': 'A JavaScript representation of the actual DOM that React uses to optimize updates.',
      'Components': 'Reusable pieces of UI that can accept props and manage their own state.',
      'Hooks': 'Functions that let you use state and other React features in functional components.'
    };

    Object.keys(tooltipData).forEach(term => {
      document.querySelectorAll('.bullet-points li').forEach(li => {
        if (li.textContent.includes(term)) {
          li.title = tooltipData[term];
          li.style.cursor = 'help';
        }
      });
    });
  }
}

// Performance Monitoring
class PresentationAnalytics {
  constructor() {
    this.slideStartTimes = {};
    this.currentSlideStartTime = Date.now();
    this.slideViewDurations = {};
  }

  onSlideChange(slideNumber) {
    const now = Date.now();

    // Record time spent on previous slide
    if (this.currentSlideStartTime) {
      const duration = now - this.currentSlideStartTime;
      this.slideViewDurations[slideNumber - 1] = duration;
    }

    this.currentSlideStartTime = now;
    this.slideStartTimes[slideNumber] = now;
  }

  getAnalytics() {
    return {
      slideViewDurations: this.slideViewDurations,
      totalPresentationTime: Date.now() - (this.slideStartTimes[1] || Date.now())
    };
  }
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.presentation = new PresentationController();
  window.interactiveFeatures = new InteractiveFeatures();
  window.analytics = new PresentationAnalytics();

  // Override goToSlide to include analytics
  const originalGoToSlide = window.presentation.goToSlide.bind(window.presentation);
  window.presentation.goToSlide = function (slideNumber) {
    window.analytics.onSlideChange(slideNumber);
    originalGoToSlide(slideNumber);
  };

  console.log('🎯 Interactive Frontend Presentation Loaded!');
  console.log('💡 Navigation: Use arrow keys, click buttons, or swipe on mobile');
  console.log('📱 Mobile-friendly: Touch gestures supported');
  console.log('⌨️  Keyboard shortcuts: Home (first slide), End (last slide), Esc (close modal)');
});

// Accessibility Features
document.addEventListener('DOMContentLoaded', () => {
  // Add ARIA labels for screen readers
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, index) => {
    slide.setAttribute('aria-label', `Slide ${index + 1} of ${slides.length}`);
    slide.setAttribute('role', 'tabpanel');
  });

  // Add focus management
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const activeSlide = document.querySelector('.slide.active');
      const focusableElements = activeSlide.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');

      if (focusableElements.length > 0) {
        e.preventDefault();
        focusableElements[0].focus();
      }
    }
  });
});

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.code);

  if (konamiCode.length > konamiSequence.length) {
    konamiCode = konamiCode.slice(-konamiSequence.length);
  }

  if (konamiCode.length === konamiSequence.length &&
    konamiCode.every((code, index) => code === konamiSequence[index])) {

    // Activate easter egg
    document.body.style.animation = 'rainbow 2s infinite';

    // Add rainbow keyframes if not exists
    if (!document.querySelector('#rainbow-keyframes')) {
      const style = document.createElement('style');
      style.id = 'rainbow-keyframes';
      style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
      document.head.appendChild(style);
    }

    setTimeout(() => {
      document.body.style.animation = '';
    }, 4000);

    console.log('🌈 Rainbow mode activated! You found the easter egg!');
    konamiCode = [];
  }
});
