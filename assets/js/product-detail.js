// ============================================================
// PRODUCT DETAIL PAGE - product-detail.js
// Yêu cầu: data.js đã load trước (products array phải tồn tại)
// ============================================================

(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId);

  if (!product) {
    document.querySelector('section.section-padding').innerHTML =
      '<div class="container py-5 text-center"><h3>Sản phẩm không tồn tại.</h3><a href="products.html" class="btn btn-dark mt-3">Quay lại danh sách</a></div>';
    return;
  }

  // --- Page title & breadcrumb ---
  document.getElementById('page-title').textContent = product.name + ' | SCENT AURA';
  document.getElementById('breadcrumb-name').textContent = product.name;

  // --- Images ---
  const images = [product.img, product.img2].filter(Boolean);
  let currentIndex = 0;

  function setMainImage(index) {
    currentIndex = index;
    document.getElementById('main-img').src = images[index];
    document.querySelectorAll('.thumb-box').forEach((box, i) => {
      box.classList.toggle('active', i === index);
    });
  }

  window.prevImage = function () {
    setMainImage((currentIndex - 1 + images.length) % images.length);
  };
  window.nextImage = function () {
    setMainImage((currentIndex + 1) % images.length);
  };

  const thumbContainer = document.getElementById('thumbnail-container');
  thumbContainer.innerHTML = images.map((src, i) => `
      <div class="thumb-box ${i === 0 ? 'active' : ''} bg-white border rounded-3 d-flex align-items-center justify-content-center p-2"
           onclick="setMainImage(${i})" style="cursor:pointer">
        <img src="${src}" class="img-fluid" style="max-height:80px;object-fit:contain" />
      </div>
    `).join('');

  setMainImage(0);

  // --- Product info ---
  document.getElementById('detail-name').textContent = product.name;
  document.getElementById('detail-brand').textContent = product.brand;
  document.getElementById('detail-sku').textContent = product.sku;
  document.getElementById('main-price').textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);

  // --- Specs ---
  const genderMap = { nam: 'Nam', nu: 'Nữ', unisex: 'Unisex' };
  document.getElementById('spec-brand').textContent = product.brand;
  document.getElementById('spec-concentration').textContent = product.concentration || 'N/A';
  document.getElementById('spec-sillage').textContent = product.sillage || 'N/A';
  document.getElementById('spec-longevity').textContent = product.longevity || 'N/A';
  document.getElementById('spec-gender').textContent = genderMap[product.gender] || product.gender;

  // --- Description ---
  document.getElementById('detail-desc').innerHTML = `<p>${product.desc}</p>`;

  // --- Scent Notes ---
  if (product.notes) {
    document.getElementById('notes-top').textContent = product.notes.top || 'N/A';
    document.getElementById('notes-middle').textContent = product.notes.middle || 'N/A';
    document.getElementById('notes-base').textContent = product.notes.base || 'N/A';
  }

  // --- Related Products (same gender, exclude current) ---
  const related = products.filter(p => p.id !== product.id && p.gender === product.gender).slice(0, 3);
  const relatedContainer = document.getElementById('related-products');
  if (related.length > 0) {
    relatedContainer.innerHTML = related.map(p => `
        <div class="col">
          <div class="product-card h-100">
            <div class="product-img-box">
              <img src="${p.img}" class="img-fluid w-100" alt="${p.name}" onerror="this.src='https://via.placeholder.com/300?text=No+Image'">
              <div class="product-actions">
                <button class="btn-action" onclick="Cart.add(${p.id})" title="Thêm vào giỏ"><i class="fa-solid fa-cart-plus"></i></button>
                <a href="product-detail.html?id=${p.id}" class="btn-action" title="Xem chi tiết"><i class="fa-regular fa-eye"></i></a>
              </div>
            </div>
            <div class="product-info mt-2">
              <span class="text-muted small text-uppercase">${p.brand}</span>
              <h6 class="fw-bold my-1"><a href="product-detail.html?id=${p.id}" class="text-dark text-decoration-none">${p.name}</a></h6>
              <div class="price">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price)}</div>
            </div>
          </div>
        </div>
      `).join('');
  } else {
    relatedContainer.innerHTML = '<div class="col-12 text-center text-muted">Không có sản phẩm liên quan.</div>';
  }

  // --- Gắn event cho nút "Thêm vào giỏ hàng" và "Mua ngay" ---
  document.querySelectorAll('.row.g-3 .btn').forEach(btn => {
    const text = btn.textContent.trim();
    if (text.includes('Thêm vào giỏ')) {
      btn.addEventListener('click', () => {
        const qty = parseInt(document.getElementById('qty')?.value) || 1;
        Cart.add(product.id, qty);
      });
    } else if (text.includes('Mua ngay')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const qty = parseInt(document.getElementById('qty')?.value) || 1;
        Cart.add(product.id, qty);
        window.location.href = 'checkout.html';
      });
    }
  });
})();

