// ============================================================
// TRANG CHỦ - trangchu.js
// Yêu cầu: bootstrap.bundle.min.js và data.js đã load trước
// ============================================================

// 1. Khởi tạo hero carousel với tốc độ 5000ms
(function () {
    var heroEl = document.getElementById('hero');
    if (!heroEl) return;

    new bootstrap.Carousel(heroEl, {
        interval: 3000,
        ride: 'carousel',
        wrap: true
    });
})();

// 2. Render section "Sản Phẩm Mới" từ data.js
(function () {
    var wrapper = document.getElementById('new-products-wrapper');
    if (!wrapper || typeof products === 'undefined') return;

    var toShow = products.slice(0, 6);
    wrapper.innerHTML = toShow.map(function (p) {
        var price = p.price ? p.price.toLocaleString('vi-VN') + ' VNĐ' : '';
        return '<div class="swiper-slide">' +
            '<a href="product-detail.html?id=' + p.id + '" class="product-card bg-white h-100">' +
            '<div class="product-img-box">' +
            '<img src="' + p.img + '" alt="' + p.name + '" onerror="this.src=\'https://via.placeholder.com/300x300?text=No+Image\'">' +
            '</div>' +
            '<div class="product-info p-3">' +
            '<span class="small text-muted text-uppercase">' + (p.brand || '') + '</span>' +
            '<h6 class="my-2">' + p.name + '</h6>' +
            '<span class="price">' + price + '</span>' +
            '</div>' +
            '</a>' +
            '</div>';
    }).join('');
})();
