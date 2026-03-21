document.addEventListener("DOMContentLoaded", () => {
  checkLoginStatus();
  const sliderEl = document.querySelector(".perfume-slider");
  if (sliderEl) {
    const swiper = new Swiper(".perfume-slider", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      speed: 600,
      coverflowEffect: {
        rotate: 0,
        stretch: 80,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        320: {
          effect: "slide",
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          effect: "coverflow",
          slidesPerView: "auto",
        },
      },
    });
  }
  const productSliderEl = document.querySelector(".product-slider");
  if (productSliderEl) {
    var productSwiper = new Swiper(".product-slider", {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        992: { slidesPerView: 3, spaceBetween: 30 },
        1200: { slidesPerView: 4, spaceBetween: 30 },
      },
    });
  }
});
function changeImage(element) {
  const mainImg = document.getElementById("main-img");
  const newImgSrc = element.querySelector("img").src;
  if (mainImg && newImgSrc) {
    mainImg.style.opacity = 0;
    setTimeout(() => {
      mainImg.src = newImgSrc;
      mainImg.style.opacity = 1;
    }, 200);
    document.querySelectorAll(".thumb-box").forEach((box) => {
      box.classList.remove("active");
    });
    element.classList.add("active");
  }
}
function updateQty(change) {
  const qtyInput = document.getElementById("qty");
  if (qtyInput) {
    let currentVal = parseInt(qtyInput.value);
    let newVal = currentVal + change;
    if (newVal < 1) newVal = 1;
    qtyInput.value = newVal;
  }
}
function selectCapacity(element, newPrice) {
  const allButtons = document.querySelectorAll(".cap-btn, .capacity-option");
  allButtons.forEach((btn) => btn.classList.remove("active"));
  element.classList.add("active");
  const mainPriceElement = document.getElementById("main-price");
  if (mainPriceElement && newPrice) {
    mainPriceElement.style.opacity = 0;
    setTimeout(() => {
      mainPriceElement.innerText = newPrice;
      mainPriceElement.style.opacity = 1;
    }, 200);
  }
}
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const icon = document.getElementById("togglePassword");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}
function checkLoginStatus() {
  const currentUser = localStorage.getItem('currentUser');
  const currentPath = window.location.pathname;
  const isUserPage = currentPath.includes('/user/');
  const loginPath = isUserPage ? '../login.html' : 'login.html';
  const profilePath = isUserPage ? 'profile.html' : 'user/profile.html';
  const ordersPath = isUserPage ? 'my-orders.html' : 'user/my-orders.html';
  const profileLinks = document.querySelectorAll('a[href*="profile.html"]');
  const ordersLinks = document.querySelectorAll('a[href*="my-orders.html"]');
  const loginLinks = document.querySelectorAll('a[href*="login.html"]');
  if (currentUser) {
    profileLinks.forEach(link => link.href = profilePath);
    ordersLinks.forEach(link => link.href = ordersPath);
    loginLinks.forEach(link => {
      const normalizedText = link.textContent.replace(/\s+/g, ' ').trim().toUpperCase();
      if (normalizedText.includes('ĐĂNG NHẬP')) {
        link.textContent = normalizedText === 'ĐĂNG NHẬP' ? 'ĐĂNG XUẤT' : 'Đăng xuất';
        link.href = "#";
        link.onclick = function (e) {
          e.preventDefault();
          logout();
        };
      }
    });
  } else {
    profileLinks.forEach(link => link.href = loginPath);
    ordersLinks.forEach(link => link.href = loginPath);
  }
}
function logout() {
  if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    const currentPath = window.location.pathname;
    const isUserPage = currentPath.includes('/user/');
    window.location.href = isUserPage ? '../login.html' : 'login.html';
  }
}
