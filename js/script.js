document.addEventListener('DOMContentLoaded', () => {
    // Load nav and footer
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
            const hamburger = document.querySelector('.hamburger');
            if (hamburger) {
                hamburger.addEventListener('click', () => {
                    document.querySelector('.nav-menu').classList.toggle('active');
                });
            }
            updateNavLanguage();
        });
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            updateLanguage();
        });

    let currentLang = localStorage.getItem('lang') || 'en';
    updateLanguage();

    function updateLanguage() {
        document.querySelectorAll('[data-en], [data-ar]').forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
            if (el.tagName === 'TITLE') document.title = el.textContent;
            if (el.tagName === 'OPTION' && el.value === '') {
                el.textContent = el.getAttribute(`data-${currentLang}`);
            }
        });
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.textContent = currentLang === 'en' ? 'Switch to Arabic' : 'تبديل إلى الإنجليزية';
        }
    }

    function updateNavLanguage() {
        document.querySelectorAll('nav [data-en], nav [data-ar]').forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });
    }

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ar' : 'en';
            localStorage.setItem('lang', currentLang);
            updateLanguage();
            updateNavLanguage();
        });
    }

    // Sort blog posts by date
    const blogPosts = document.getElementById('blog-posts');
    if (blogPosts) {
        const posts = Array.from(blogPosts.querySelectorAll('article'));
        posts.sort((a, b) => new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date')));
        blogPosts.innerHTML = '';
        posts.forEach(post => blogPosts.appendChild(post));
    }

    // Form validation and submission
    const form = document.getElementById('appointment-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\+?\d{10,15}$/;

            form.querySelectorAll('.form-group').forEach(group => {
                const input = group.querySelector('input, textarea, select');
                group.classList.remove('error');
                if (!input.value) {
                    group.classList.add('error');
                    isValid = false;
                } else if (input.type === 'email' && !emailRegex.test(input.value)) {
                    group.classList.add('error');
                    isValid = false;
                } else if (input.type === 'tel' && !phoneRegex.test(input.value)) {
                    group.classList.add('error');
                    isValid = false;
                } else if (input.tagName === 'SELECT' && !input.value) {
                    group.classList.add('error');
                    isValid = false;
                }
            });

            if (isValid) {
                const submitButton = form.querySelector('button[type="submit"]');
                submitButton.classList.add('loading');
                setTimeout(() => {
                    submitButton.classList.remove('loading');
                    alert(currentLang === 'en' ? 'Appointment booked successfully!' : 'تم حجز الموعد بنجاح!');
                    form.reset();
                }, 1500);
            }
        });
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openChat() {
    alert('Live chat support is opening...');
}