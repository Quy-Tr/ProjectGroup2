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
            <div class="col-12">
                <div class="cart-empty">
                    <i class="fa-solid fa-cart-shopping d-block mb-4" style="font-size:4rem;color:#ddd;"></i>
                    <h4>Giỏ hàng của bạn đang trống</h4>
                    <p class="text-muted">Hãy khám phá các sản phẩm nước hoa cao cấp của chúng tôi.</p>
                    <a href="products.html" class="btn btn-dark rounded-pill px-5 py-3 fw-bold">
                        <i class="fa-solid fa-bag-shopping me-2"></i>Mua sắm ngay
                    </a>
                </div>
            </div>`;
        return;
    }

    const subtotal = Cart.getSubtotal();
    const total = Math.max(subtotal + cartPageState.shippingFee - cartPageState.discount, 0);

    container.innerHTML = `
        <!-- ===== BẢNG SẢN PHẨM ===== -->
        <div class="col-lg-8 mb-5 mb-lg-0">
            <div class="table-responsive">
                <table class="table cart-table align-middle">
                    <thead>
                        <tr>
                            <th class="ps-0">Tên sản phẩm</th>
                            <th>Giá</th>
                            <th class="text-center">Số lượng</th>
                            <th>Tạm tính</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="cart-tbody">
                        ${renderCartRows(items)}
                    </tbody>
                </table>
            </div>

            <!-- Coupon row -->
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 pt-3">
                <div class="input-group coupon-wrapper">
                    <input type="text" id="coupon-input" class="form-control rounded-start-pill border-dark"
                        placeholder="Nhập mã ưu đãi" value="${cartPageState.couponCode}" />
                    <button class="btn btn-dark rounded-end-pill px-4" type="button" onclick="applyCoupon()">
                        ÁP DỤNG
                    </button>
                </div>
                <div id="coupon-msg" style="font-size:0.82rem;"></div>
            </div>

            <!-- Back button -->
            <div class="d-flex justify-content-between mt-4">
                <a href="products.html" class="btn btn-outline-dark rounded-pill px-4 fw-bold">
                    <i class="fa-solid fa-arrow-left me-2"></i>Tiếp tục mua sắm
                </a>
                <button class="btn btn-outline-danger rounded-pill px-4 fw-bold small"
                    onclick="clearCartConfirm()">
                    <i class="fa-solid fa-trash me-1"></i>Xóa giỏ hàng
                </button>
            </div>
        </div>

        <!-- ===== TÓM TẮT GIỎ HÀNG ===== -->
        <div class="col-lg-4">
            <div class="cart-summary">
                <h4>Cộng Giỏ Hàng</h4>

                <div class="summary-row">
                    <span class="text-muted">Tạm tính</span>
                    <span class="fw-bold" id="cart-subtotal">${fmtVND(subtotal)}</span>
                </div>

                <div class="summary-row">
                    <span class="text-muted">Phí vận chuyển</span>
                    <span class="fw-bold text-success" id="cart-shipping">
                        ${cartPageState.shippingFee === 0 ? 'Miễn phí' : fmtVND(cartPageState.shippingFee)}
                    </span>
                </div>

                <div class="summary-row">
                    <span class="text-muted">Mã giảm giá</span>
                    <span class="fw-bold text-success" id="cart-discount">
                        ${cartPageState.discount > 0 ? '−' + fmtVND(cartPageState.discount) : '—'}
                    </span>
                </div>

                <div class="summary-row total">
                    <span class="label">Tổng cộng</span>
                    <span class="value" id="cart-total">${fmtVND(total)}</span>
                </div>

                <a href="checkout.html" class="btn-checkout mt-4 text-decoration-none">
                    <i class="fa-solid fa-lock"></i>
                    Tiến hành thanh toán
                </a>

                <!-- Payment icons -->
                <div class="mt-4 text-center">
                    <p class="small text-muted mb-2">Chúng tôi chấp nhận:</p>
                    <div class="payment-icons fs-4 text-secondary">
                        <i class="fa-brands fa-cc-visa me-2"></i>
                        <i class="fa-brands fa-cc-mastercard me-2"></i>
                        <i class="fa-brands fa-cc-paypal me-2"></i>
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
        <tr id="cart-row-${id}">
            <td class="ps-0">
                <div class="d-flex align-items-center gap-3">
                    <div class="cart-img-wrapper">
                        <img src="${product.img}" alt="${product.name}"
                            onerror="this.src='https://via.placeholder.com/75?text=IMG'" />
                    </div>
                    <div>
                        <div class="cart-product-title">
                            <a href="product-detail.html?id=${id}" class="text-dark text-decoration-none">
                                ${product.name}
                            </a>
                        </div>
                        <span class="text-muted small">${product.brand} · ${product.capacity}</span>
                    </div>
                </div>
            </td>

            <td class="text-accent fw-bold" style="white-space:nowrap;">
                ${fmtVND(product.price)}
            </td>

            <td>
                <div class="d-flex align-items-center gap-1 qty-group">
                    <button class="btn-qty" type="button" onclick="changeItemQty(${id}, -1)">−</button>
                    <input type="text" class="qty-input" id="qty-${id}" value="${qty}" readonly />
                    <button class="btn-qty" type="button" onclick="changeItemQty(${id}, 1)">+</button>
                </div>
            </td>

            <td class="fw-bold" id="row-total-${id}" style="white-space:nowrap;">
                ${fmtVND(product.price * qty)}
            </td>

            <td class="text-end">
                <button class="remove-btn" onclick="removeCartItem(${id})" title="Xóa">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>
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
