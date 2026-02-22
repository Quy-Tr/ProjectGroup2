/**
 * cart-page.js — SCENT AURA Cart Page Renderer
 * ================================================
 * Render giỏ hàng động từ Cart module (localStorage).
 * Yêu cầu: data.js + cart.js phải được load trước.
 */

/* =========================================================
   COUPON & SHIPPING STATE (dùng chung với checkout.js)
   ========================================================= */
let cartPageState = {
    shippingFee: 0,
    discount: 0,
    couponCode: '',
};

const CART_COUPONS = {
    'SCENT10': { type: 'percent', value: 10, label: 'Giảm 10%' },
    'AURA200': { type: 'flat', value: 200000, label: 'Giảm 200.000₫' },
    'WELCOME': { type: 'percent', value: 5, label: 'Giảm 5%' },
};

/* =========================================================
   FORMAT
   ========================================================= */
function fmtVND(n) {
    return n.toLocaleString('vi-VN') + '₫';
}

/* =========================================================
   MAIN RENDER
   ========================================================= */
function renderCartPage() {
    const container = document.getElementById('cart-content');
    if (!container) return;

    const items = Cart.getItems();

    if (items.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="cart-empty d-flex flex-column align-items-center justify-content-center">
                    <i class="fa-solid fa-cart-shopping mb-4" style="font-size:5rem; color:#f0f0f0;"></i>
                    <h4 class="brand-font mb-3">Giỏ hàng của bạn đang trống</h4>
                    <p class="text-muted mb-4">Hãy khám phá các sản phẩm nước hoa cao cấp của chúng tôi.</p>
                    <a href="products.html" class="btn px-5 py-3 fw-bold text-white rounded-pill" style="background-color: #c5a059;">
                        <i class="fa-solid fa-bag-shopping me-2"></i> Mua sắm ngay
                    </a>
                </div>
            </div>`;
        return;
    }

    const subtotal = Cart.getSubtotal();
    const total = Math.max(subtotal + cartPageState.shippingFee - cartPageState.discount, 0);

    container.innerHTML = `
        <!-- ===== DANH SÁCH GIỎ HÀNG ===== -->
        <div class="col-lg-8 mb-5 mb-lg-0">
            <div class="cart-items-list mb-4">
               ${renderCartRows(items)}
            </div>

            <!-- Coupon row -->
            <div class="bg-light p-4 rounded-4 mb-4">
                <p class="fw-bold mb-3 small text-uppercase" style="letter-spacing:1px;">Mã Ưu Đãi</p>
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div class="input-group coupon-wrapper" style="max-width:400px;">
                        <input type="text" id="coupon-input" class="form-control" style="border:1px solid #ddd; padding:0.75rem 1rem;"
                            placeholder="Nhập mã ưu đãi" value="${cartPageState.couponCode}" />
                        <button class="btn text-white px-4 fw-bold" style="background-color: #c5a059; border:none;" type="button" onclick="applyCoupon()">
                            Áp dụng
                        </button>
                    </div>
                    <div id="coupon-msg" style="font-size:0.85rem;" class="fw-bold mt-2 mt-md-0"></div>
                </div>
            </div>

            <!-- Back button -->
            <div class="d-flex justify-content-between mt-4">
                <a href="products.html" class="btn btn-outline-dark rounded-pill px-4 fw-bold py-2">
                    <i class="fa-solid fa-arrow-left me-2"></i>Tiếp tục mua sắm
                </a>
                <button class="btn btn-outline-danger rounded-pill px-4 fw-bold small py-2"
                    onclick="clearCartConfirm()">
                    <i class="fa-solid fa-trash me-1"></i>Xóa sạch giỏ hàng
                </button>
            </div>
        </div>

        <!-- ===== TÓM TẮT GIỎ HÀNG ===== -->
        <div class="col-lg-4">
            <div class="cart-summary bg-light p-4 rounded-4 position-sticky" style="top: 100px;">
                <h4 class="brand-font mb-4 pb-3 border-bottom">Tóm Tắt Đơn Hàng</h4>

                <div class="d-flex justify-content-between mb-3">
                    <span class="text-muted">Tạm tính</span>
                    <span class="fw-bold" id="cart-subtotal">${fmtVND(subtotal)}</span>
                </div>

                <div class="d-flex justify-content-between mb-3">
                    <span class="text-muted">Phí vận chuyển</span>
                    <span class="fw-bold text-success" id="cart-shipping">
                        ${cartPageState.shippingFee === 0 ? 'Miễn phí' : fmtVND(cartPageState.shippingFee)}
                    </span>
                </div>

                <div class="d-flex justify-content-between mb-3 pb-3 border-bottom">
                    <span class="text-muted">Giảm giá</span>
                    <span class="fw-bold text-success" id="cart-discount">
                        ${cartPageState.discount > 0 ? '−' + fmtVND(cartPageState.discount) : '—'}
                    </span>
                </div>

                <div class="d-flex justify-content-between mb-4 align-items-center">
                    <span class="fw-bold text-uppercase" style="letter-spacing:1px; font-size:1.1rem">Tổng cộng</span>
                    <span class="fw-bold" style="color: #c5a059; font-size: 1.5rem;" id="cart-total">${fmtVND(total)}</span>
                </div>
                
                <p class="small text-muted text-end mb-4">(Đã bao gồm VAT nếu có)</p>

                <a href="checkout.html" class="btn w-100 py-3 rounded-pill fw-bold text-white shadow-sm mb-3 text-decoration-none" style="background-color: #c5a059;">
                    <i class="fa-solid fa-lock me-2"></i> Tiến hành thanh toán
                </a>

                <!-- Payment icons -->
                <div class="text-center">
                    <p class="small text-muted mb-2">Chúng tôi chấp nhận:</p>
                    <div class="payment-icons fs-4 text-secondary d-flex justify-content-center gap-3">
                        <i class="fa-brands fa-cc-visa"></i>
                        <i class="fa-brands fa-cc-mastercard"></i>
                        <i class="fa-brands fa-cc-paypal"></i>
                        <i class="fa-solid fa-money-bill-wave"></i>
                    </div>
                </div>
            </div>
        </div>`;

    // Restore coupon msg nếu đã áp dụng
    if (cartPageState.couponCode) {
        const coupon = CART_COUPONS[cartPageState.couponCode];
        if (coupon) {
            const el = document.getElementById('coupon-msg');
            if (el) el.innerHTML = `<span class="text-success">✓ ${coupon.label}</span>`;
        }
    }
}

/* =========================================================
   RENDER ROWS
   ========================================================= */
function renderCartRows(items) {
    return items.map(({ id, qty, product }) => `
        <div class="cart-item-row d-flex align-items-center bg-white p-3 p-md-4 rounded-4 border mb-3 shadow-sm" id="cart-row-${id}" style="transition: all 0.3s ease;">
            <div class="cart-img-wrapper d-none d-sm-block" style="width: 100px; height: 100px; flex-shrink: 0; border: 1px solid #f0f0f0; border-radius: 12px; overflow: hidden; padding: 5px; margin-right: 20px;">
                <img src="${product.img}" alt="${product.name}" class="w-100 h-100 object-fit-contain"
                    onerror="this.src='https://via.placeholder.com/100?text=IMG'" />
            </div>
            
            <div class="flex-grow-1">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <a href="product-detail.html?id=${id}" class="text-dark text-decoration-none fw-bold fs-5 brand-font">
                            ${product.name}
                        </a>
                        <div class="text-muted small mt-1 text-uppercase" style="letter-spacing: 1px;">
                            ${product.brand}
                        </div>
                    </div>
                    <button class="btn btn-link text-danger p-0 ms-3 border-0 bg-transparent opacity-75" onclick="removeCartItem(${id})" title="Xóa">
                        <i class="fa-solid fa-xmark fs-5"></i>
                    </button>
                </div>
                
                <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
                    <div class="fw-bold fs-6" style="color: #555;">
                        ${fmtVND(product.price)}
                    </div>
                    
                    <div class="d-flex align-items-center gap-2">
                        <div class="qty-pill d-flex align-items-center bg-light rounded-pill px-2 border" style="height: 38px;">
                            <button class="btn btn-sm text-secondary px-2 border-0 bg-transparent" type="button" onclick="changeItemQty(${id}, -1)">
                                <i class="fa-solid fa-minus" style="font-size: 0.7rem;"></i>
                            </button>
                            <input type="text" class="form-control border-0 bg-transparent text-center fw-bold p-0" 
                                id="qty-${id}" value="${qty}" readonly style="width: 35px; height: 32px; font-size: 0.95rem; line-height: 1;" />
                            <button class="btn btn-sm text-secondary px-2 border-0 bg-transparent" type="button" onclick="changeItemQty(${id}, 1)">
                                <i class="fa-solid fa-plus" style="font-size: 0.7rem;"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="fw-bold fs-5 text-end" id="row-total-${id}" style="color: #c5a059; min-width: 100px;">
                        ${fmtVND(product.price * qty)}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

/* =========================================================
   ACTIONS
   ========================================================= */
function changeItemQty(productId, delta) {
    const items = Cart.getItems();
    const item = items.find(i => i.id === productId);
    if (!item) return;

    const newQty = item.qty + delta;
    Cart.updateQty(productId, newQty); // Nếu newQty <= 0, Cart.updateQty sẽ xóa item
    // Không cần re-render full; lắng nghe cart:updated là đủ
}

function removeCartItem(productId) {
    Cart.remove(productId);
}

function clearCartConfirm() {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?')) {
        cartPageState.discount = 0;
        cartPageState.couponCode = '';
        Cart.clear();
    }
}

/* =========================================================
   COUPON
   ========================================================= */
function applyCoupon() {
    const input = document.getElementById('coupon-input');
    const msgEl = document.getElementById('coupon-msg');
    if (!input || !msgEl) return;

    const code = input.value.trim().toUpperCase();
    cartPageState.couponCode = code;

    if (!code) {
        msgEl.innerHTML = '<span class="text-warning">Vui lòng nhập mã ưu đãi.</span>';
        return;
    }

    const coupon = CART_COUPONS[code];

    if (!coupon) {
        cartPageState.discount = 0;
        msgEl.innerHTML = '<span class="text-danger">Mã ưu đãi không hợp lệ.</span>';
        updateTotalsUI();
        return;
    }

    const subtotal = Cart.getSubtotal();
    cartPageState.discount = coupon.type === 'percent'
        ? Math.round(subtotal * coupon.value / 100)
        : coupon.value;

    msgEl.innerHTML = `<span class="text-success">✓ Áp dụng thành công: ${coupon.label}</span>`;
    updateTotalsUI();
}

/* =========================================================
   UPDATE TOTALS (partial re-render, không render lại toàn bộ)
   ========================================================= */
function updateTotalsUI() {
    const subtotal = Cart.getSubtotal();
    const total = Math.max(subtotal + cartPageState.shippingFee - cartPageState.discount, 0);

    const sub = document.getElementById('cart-subtotal');
    const disc = document.getElementById('cart-discount');
    const tot = document.getElementById('cart-total');

    if (sub) sub.textContent = fmtVND(subtotal);
    if (disc) disc.textContent = cartPageState.discount > 0 ? '−' + fmtVND(cartPageState.discount) : '—';
    if (tot) tot.textContent = fmtVND(total);
}

/* =========================================================
   LISTEN FOR CART CHANGES
   ========================================================= */
window.addEventListener('cart:updated', () => {
    renderCartPage();
});

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    renderCartPage();
});
