// Khởi tạo EmailJS
(function(){
  emailjs.init('mZ27dAG70sq09ZgWC'); // TODO: Thay YOUR_PUBLIC_KEY bằng public key của bạn
})();

// Xử lý gửi form
const form = document.getElementById('booking-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  formMessage.textContent = '';

  // Validate cơ bản
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const service = form.service.value;

  if (!name || !phone || !service) {
    formMessage.textContent = 'Vui lòng điền đầy đủ thông tin bắt buộc.';
    formMessage.style.color = 'red';
    return;
  }

  // Kiểm tra reCAPTCHA
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    formMessage.textContent = 'Vui lòng xác nhận bạn không phải là robot.';
    formMessage.style.color = 'red';
    return;
  }

  // Gửi qua EmailJS
  emailjs.send("service_s3viv02", "template_z7fouog", {
    name: name || "",
    email: form.email.value || "",
    phone: phone || "",
    service: service || "",
    note: form.note.value || "",
    time: new Date().toISOString()
  })
  .then(function(response) {
    formMessage.textContent = 'Gửi đăng ký thành công! Cô Vân sẽ liên hệ bạn sớm.';
    formMessage.style.color = 'green';
    form.reset();
    grecaptcha.reset(); // reset reCAPTCHA sau khi gửi thành công
  }, function(error) {
    formMessage.textContent = 'Có lỗi xảy ra, vui lòng thử lại.';
    formMessage.style.color = 'red';
  });
});

// Hướng dẫn:
// 1. Đăng nhập EmailJS, tạo template mới, lấy TEMPLATE_ID và PUBLIC_KEY.
// 2. Thay 'YOUR_TEMPLATE_ID' và 'YOUR_PUBLIC_KEY' trong file này.
// 3. Đảm bảo các trường trong template trùng với name, email, phone, service, note. 

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  answer.style.display = 'none';
  question.addEventListener('click', function() {
    const isOpen = answer.style.display === 'block';
    document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
    document.querySelectorAll('.faq-question i').forEach(i => i.className = 'fa-solid fa-plus');
    if (!isOpen) {
      answer.style.display = 'block';
      question.querySelector('i').className = 'fa-solid fa-minus';
    } else {
      answer.style.display = 'none';
      question.querySelector('i').className = 'fa-solid fa-plus';
    }
  });
});

// SwiperJS cho slider món ăn
var swiper = new Swiper('.foodSwiper', {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: true,
    autoplay: {
        delay: 2200,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        600: { slidesPerView: 2 },
        900: { slidesPerView: 3 }
    }
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Loading animation
window.addEventListener('load', function() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.display = 'none';
    }
});

// Scroll to top functionality
const scrollToTopBtn = document.createElement('div');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add loading animation
const loadingDiv = document.createElement('div');
loadingDiv.className = 'loading';
document.body.appendChild(loadingDiv);

// Remove loading after page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        loadingDiv.style.display = 'none';
    }, 500);
}); 