/* =========================================
   1. KHỞI TẠO SLIDER (CHẠY KHI DOM LOAD XONG)
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  
  // --- A. SLIDER BỘ SƯU TẬP (3D COVERFLOW) ---
  const sliderEl = document.querySelector(".perfume-slider");
  if (sliderEl) {
    const swiper = new Swiper(".perfume-slider", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      speed: 600,
      
      // Hiệu ứng 3D
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

      // Responsive
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

  // --- B. SLIDER SẢN PHẨM MỚI ---
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


/* =========================================
   2. CÁC HÀM XỬ LÝ SỰ KIỆN (GLOBAL)
   ========================================= */

/**
 * Hàm 1: Đổi ảnh chính khi bấm vào ảnh nhỏ (Thumbnail)
 * Sử dụng tại: Product Detail Page
 */
function changeImage(element) {
  const mainImg = document.getElementById("main-img");
  const newImgSrc = element.querySelector("img").src;

  if (mainImg && newImgSrc) {
    // 1. Đổi ảnh lớn
    mainImg.style.opacity = 0; // Hiệu ứng mờ nhẹ
    setTimeout(() => {
        mainImg.src = newImgSrc;
        mainImg.style.opacity = 1;
    }, 200);

    // 2. Xử lý viền đen (active) cho thumbnail
    document.querySelectorAll(".thumb-box").forEach((box) => {
      box.classList.remove("active");
    });
    element.classList.add("active");
  }
}

/**
 * Hàm 2: Tăng giảm số lượng mua hàng
 * Sử dụng tại: Product Detail Page
 */
function updateQty(change) {
  const qtyInput = document.getElementById("qty");
  if (qtyInput) {
    let currentVal = parseInt(qtyInput.value);
    let newVal = currentVal + change;

    // Không cho số lượng nhỏ hơn 1
    if (newVal < 1) newVal = 1;
    
    qtyInput.value = newVal;
  }
}

/**
 * Hàm 3: Chọn dung tích và cập nhật giá tiền
 * (Đã gộp 3 hàm cũ selectCapacity, changeCapacity, selectSize thành 1)
 * * Cách dùng trong HTML: 
 * <div class="cap-btn" onclick="selectCapacity(this, '1.350.000 ₫')">...</div>
 */
function selectCapacity(element, newPrice) {
  // 1. Tìm tất cả các nút dung tích (.cap-btn hoặc .capacity-option)
  // Để an toàn, ta tìm cả 2 class phòng trường hợp bạn chưa sửa hết HTML
  const allButtons = document.querySelectorAll(".cap-btn, .capacity-option");
  
  // 2. Xóa class active cũ
  allButtons.forEach((btn) => btn.classList.remove("active"));

  // 3. Thêm class active cho nút vừa bấm
  element.classList.add("active");

  // 4. Cập nhật giá tiền (nếu có tham số newPrice)
  const mainPriceElement = document.getElementById("main-price"); // ID giá ở trang Product Detail
  
  if (mainPriceElement && newPrice) {
    // Hiệu ứng nháy giá
    mainPriceElement.style.opacity = 0;
    setTimeout(() => {
      mainPriceElement.innerText = newPrice;
      mainPriceElement.style.opacity = 1;
    }, 200);
  }
}