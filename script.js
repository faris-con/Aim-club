// ==========================
// 🌟 Aim Club Main Script
// ==========================

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  easing: 'ease-out-cubic'
});

// Create animated particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 20; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 15 + 's';
  particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
  particlesContainer?.appendChild(particle);
}

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const currentScroll = window.scrollY;

  if (currentScroll > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  lastScroll = currentScroll;
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', function() {
  if (window.scrollY > 400) scrollTopBtn?.classList.add('visible');
  else scrollTopBtn?.classList.remove('visible');
});

scrollTopBtn?.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show More Sponsors
document.getElementById('showMoreSponsors')?.addEventListener('click', () => {
  alert('More sponsors coming soon!');
});

// Card hover effect
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-15px) scale(1.02)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) hero.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
});

// Fade-in on load
window.addEventListener('load', function() {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Ripple effect for buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ESC closes modals
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.show').forEach(modal => {
      const bsModal = bootstrap.Modal.getInstance(modal);
      if (bsModal) bsModal.hide();
    });
  }
});

// Form validation
document.querySelectorAll('form').forEach(form => {
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() === '' && this.hasAttribute('required'))
        this.style.borderColor = '#f5576c';
      else if (this.value.trim() !== '')
        this.style.borderColor = '#38ef7d';
    });
    input.addEventListener('focus', () => input.style.borderColor = '#667eea');
  });
});

// Testimonials animation
const testimonials = document.querySelectorAll('.testimonial-card');
const testimonialObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.2 });
testimonials.forEach(t => {
  t.style.opacity = '0';
  t.style.transform = 'translateY(30px)';
  t.style.transition = 'all 0.6s ease';
  testimonialObserver.observe(t);
});

// ========================================
// ✅ (تم التعديل) Auto-close navbar on mobile
// ========================================
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');
navLinks.forEach(link => {
  // استخدمنا function() بدل () => عشان نقدر نستخدم 'this'
  link.addEventListener('click', function() { 
    
    // 💡 التعديل: لو اللينك ده بيفتح قايمة منسدلة، متعملش حاجة
    if (this.hasAttribute('data-bs-toggle') && this.getAttribute('data-bs-toggle') === 'dropdown') {
      return; // اخرج ومتكملش الكود
    }

    // لو هو لينك عادي (مش بيفتح قايمة)، اقفل النافبار
    if (window.innerWidth < 992 && navbarCollapse?.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  });
});
// ========================================
// (انتهاء التعديل)
// ========================================


// Section reveal animations
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });
sections.forEach(s => {
  s.style.opacity = '0';
  s.style.transform = 'translateY(20px)';
  s.style.transition = 'all 0.8s ease';
  sectionObserver.observe(s);
});

// Typing effect for hero subtitle
const heroSubtitle = document.querySelector('.hero p');
if (heroSubtitle) {
  const text = heroSubtitle.textContent;
  heroSubtitle.textContent = '';
  let i = 0;
  setTimeout(() => {
    const typeWriter = setInterval(() => {
      if (i < text.length) heroSubtitle.textContent += text.charAt(i++);
      else clearInterval(typeWriter);
    }, 50);
  }, 1500);
}

// Dynamic year in footer
const footerText = document.querySelector('footer p');
if (footerText && footerText.textContent.includes('2025'))
  footerText.textContent = footerText.textContent.replace('2025', new Date().getFullYear());

// Image loading effects
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', () => img.style.opacity = '1');
  if (!img.complete) {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
  }
});
if ('loading' in HTMLImageElement.prototype)
  document.querySelectorAll('img').forEach(img => img.loading = 'lazy');

// Console branding
console.log('%c🎯 Aim Club Website', 'color:#667eea;font-size:24px;font-weight:bold;');
console.log('%cDeveloped with ❤️ for Aim Club', 'color:#764ba2;font-size:14px;');
console.log('%cNew Salhia University', 'color:#ffc107;font-size:16px;font-weight:bold;');

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('⚡ Page Load Time:', Math.round(perfData.loadEventEnd - perfData.fetchStart) + 'ms');
  });
}

// Accessibility improvements
document.querySelectorAll('a, button').forEach(el => {
  if (!el.hasAttribute('aria-label') && el.textContent.trim())
    el.setAttribute('aria-label', el.textContent.trim());
});

// Smooth scrolling
if ('scrollBehavior' in document.documentElement.style)
  document.documentElement.style.scrollBehavior = 'smooth';

console.log('✅ All scripts loaded successfully!');

// ========================================
// ✅ Form Validation + Fetch Submit (No Reload)
// ========================================
document.querySelector("form")?.addEventListener("submit", async function(e) {
  e.preventDefault();
  const phoneInput = this.querySelector('input[type="number"], input[type="tel"]');
  const msg = document.getElementById("formMsg");

  if (phoneInput && phoneInput.value.length < 11) {
    msg.textContent = "❌ رقم التليفون لازم يكون 11 رقم";
    msg.classList.remove("text-success", "d-none");
    msg.classList.add("text-danger");
    return;
  }

  try {
    const formData = new FormData(this);
    const response = await fetch(this.action, {
      method: this.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      msg.textContent = "✅ !Message sent";
      msg.classList.remove("text-danger", "d-none");
      msg.classList.add("text-success");
      this.reset();
    } else {
      msg.textContent = "❌ حصل خطأ أثناء الإرسال، حاول تاني";
      msg.classList.remove("text-success", "d-none");
      msg.classList.add("text-danger");
    }
  } catch {
    msg.textContent = "❌ السيرفر مش شغال دلوقتي";
    msg.classList.remove("text-success", "d-none");
    msg.classList.add("text-danger");
  }
});

// ========================================
// ✅ Dynamic Year Selection Based on College
// ========================================
document.getElementById('college')?.addEventListener('change', function() {
  const college = this.value;
  const yearSelect = document.getElementById('year');
  if (!yearSelect) return;

  yearSelect.innerHTML = `
    <option value="" disabled selected>اختر الفرقة</option>
    ${college === 'computers' || college === 'business' ? `
      <option value="1">الفرقة الأولى</option>
      <option value="2">الفرقة الثانية</option>
      <option value="3">الفرقة الثالثة</option>
    ` : ''}
    ${college === 'physical_therapy' || college === 'pharmacy' ? `
      <option value="1">الفرقة الأولى</option>
      <option value="2">الفرقة الثانية</option>
      <option value="3">الفرقة الثالثة</option>
      <option value="4">الفرقة الرابعة</option>
    ` : ''}
    ${college === 'dentistry' ? `<option value="1">الفرقة الأولى</option>` : ''}
  `;
});

// ========================================
// ✅ Programming Competition Form
// ========================================
const showFormBtn = document.getElementById('showFormBtn');
const programmingForm = document.getElementById('programmingCompetitionForm');
const cancelBtn = document.getElementById('cancelBtn');

showFormBtn?.addEventListener('click', () => {
  programmingForm.classList.remove('d-none');
  showFormBtn.classList.add('d-none');
});

cancelBtn?.addEventListener('click', () => {
  programmingForm.classList.add('d-none');
  showFormBtn.classList.remove('d-none');
  programmingForm.reset();
});

programmingForm?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const nameInput = document.getElementById('name');
  const idInput = document.getElementById('id');
  const collegeSelect = document.getElementById('college');
  const yearSelect = document.getElementById('year');
  const phoneInput = document.getElementById('phone');

  if (!nameInput.value.trim() || !idInput.value.trim() || !collegeSelect.value || !yearSelect.value || !phoneInput.value.trim()) {
    alert('❌ من فضلك املأ جميع الحقول قبل الإرسال');
    return;
  }

  if (phoneInput.value.length < 11) {
    alert('❌ رقم التليفون لازم يكون 11 رقم');
    return;
  }

  try {
    const formData = new FormData(this);
    const response = await fetch(this.action, {
      method: this.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert('✅ تم تسجيلك بنجاح في مسابقة البرمجة!');
      const modal = bootstrap.Modal.getInstance(document.getElementById('eventModal3'));
      if (modal) modal.hide();
      this.reset();
      this.classList.add('d-none');
      showFormBtn.classList.remove('d-none');
    } else {
      const errorData = await response.json();
      alert(`❌ حصل خطأ أثناء الإرسال: ${errorData.error || 'غير معروف'}`);
    }
  } catch {
    alert('❌ فشل الاتصال بالسيرفر، تأكد من الإنترنت أو حاول لاحقًا');
  }
});

/* ✅ Firebase Example (Placeholder)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = { ... };
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/