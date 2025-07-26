// mobile-menu.js - التحكم في القائمة الجانبية للجوال
document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM الأساسية
    const btnMenu = document.getElementById('btnMenu');
    const navLinks = document.querySelector('.links');
    const langButtons = document.querySelectorAll('.lang-switcher button');
    const contactForm = document.querySelector('.contact-form');
    
    // 1. تبديل القائمة الجانبية للجوال
    btnMenu.addEventListener('click', function() {
        this.classList.toggle('fa-times');
        navLinks.classList.toggle('active');
    });
    
    // 2. تبديل اللغة بين العربية والإنجليزية
    function switchLanguage(lang) {
        const arElements = document.querySelectorAll('.ar-text');
        const enElements = document.querySelectorAll('.en-text');
        
        if (lang === 'ar') {
            // التبديل إلى العربية
            document.body.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
            
            arElements.forEach(el => el.style.display = 'block');
            enElements.forEach(el => el.style.display = 'none');
            
            langButtons[0].classList.add('active');
            langButtons[1].classList.remove('active');
        } else {
            // التبديل إلى الإنجليزية
            document.body.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', 'en');
            
            arElements.forEach(el => el.style.display = 'none');
            enElements.forEach(el => el.style.display = 'block');
            
            langButtons[0].classList.remove('active');
            langButtons[1].classList.add('active');
        }
        
        // إغلاق القائمة الجانبية إذا كانت مفتوحة
        if (navLinks.classList.contains('active')) {
            btnMenu.classList.remove('fa-times');
            navLinks.classList.remove('active');
        }
    }
    
    // 3. التمرير السلس عند النقر على روابط التنقل
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // تحديث حالة القائمة النشطة
                document.querySelectorAll('.links li').forEach(li => {
                    li.classList.remove('active');
                });
                this.parentElement.classList.add('active');
                
                // إغلاق القائمة الجانبية إذا كانت مفتوحة
                if (navLinks.classList.contains('active')) {
                    btnMenu.classList.remove('fa-times');
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // 4. تحديث سنة حقوق النشر تلقائياً
    function updateCopyrightYear() {
        const currentYear = new Date().getFullYear();
        document.getElementById('year').textContent = currentYear;
        document.getElementById('year-en').textContent = currentYear;
    }
    
    // 5. إرسال نموذج الاتصال
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const isArabic = document.querySelector('.ar-text').style.display !== 'none';
        const successMessage = isArabic 
            ? 'تم إرسال رسالتك بنجاح! سأتواصل معك قريبًا.' 
            : 'Your message has been sent successfully! I will contact you soon.';
        
        alert(successMessage);
        this.reset();
        
        // هنا يمكنك إضافة كود إرسال البيانات إلى الخادم
        // const formData = new FormData(this);
        // fetch('/send-message', { method: 'POST', body: formData })
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(error => console.error(error));
    }
    
    // 6. تغيير لون الهيدر عند التمرير
    function handleScroll() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.backgroundColor = '#2c3e50';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // تهيئة الأحداث
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.textContent.toLowerCase().includes('english') ? 'en' : 'ar';
            switchLanguage(lang);
        });
    });
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    window.addEventListener('scroll', handleScroll);
    updateCopyrightYear();
    
    // تحديد اللغة الافتراضية عند التحميل
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('ar')) {
        switchLanguage('ar');
    } else {
        switchLanguage('en');
    }
});

// animations.js - إضافة تأثيرات حركية
function initAnimations() {
    // 1. تأثير الظهور التدريجي للعناصر
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section, .project-card, .skill-category');
        
        elements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };
    
    // 2. تهيئة الأنيميشن الأولي
    document.querySelectorAll('.section, .project-card, .skill-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // 3. تشغيل الأنيميشن عند التحميل وعند التمرير
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // 4. تأثير تحويم على أزرار المشاريع
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-img img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-img img').style.transform = 'scale(1)';
        });
    });
}

// تهيئة الأنيميشن بعد تحميل الصفحة
window.addEventListener('DOMContentLoaded', initAnimations);