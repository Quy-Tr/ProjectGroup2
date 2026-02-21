/**
 * checkout.js — SCENT AURA Checkout Page Script
 * Reads cart data from Cart module (localStorage via cart.js).
 * Handles: payment/shipping selection, form validation,
 *          coupon codes, order total calc, and order placement.
 */

/* =========================================================
   STATE
   ========================================================= */
const state = {
    shippingFee: 0,
    discount: 0,
    selectedPayment: 'cod',
    selectedShipping: 'standard',
};

/* =========================================================
   COUPONS
   ========================================================= */
const COUPONS = {
    'SCENT10': { type: 'percent', value: 10, label: 'Giảm 10%' },
    'AURA200': { type: 'flat', value: 200000, label: 'Giảm 200.000₫' },
    'WELCOME': { type: 'percent', value: 5, label: 'Giảm 5%' },
};

/* =========================================================
   FORMAT HELPERS
   ========================================================= */
function formatVND(amount) {
    return amount.toLocaleString('vi-VN') + '₫';
}

/* =========================================================
   RENDER ORDER SUMMARY từ Cart thực
   ========================================================= */
function renderOrderSummary() {
    const items = Cart.getItems();
    const listEl = document.getElementById('order-items-list');
    const countEl = document.getElementById('summary-count');

    if (!listEl) return;

    if (items.length === 0) {
        listEl.innerHTML = `
            <div class="text-center text-muted py-4" style="font-size:0.9rem;">
                <i class="fa-solid fa-cart-shopping mb-2 d-block" style="font-size:2rem;color:#ddd;"></i>
                Giỏ hàng trống.<br>
                <a href="products.html" class="text-accent fw-bold">Tiếp tục mua sắm →</a>
            </div>`;
        if (countEl) countEl.textContent = '0';
        updateGrandTotal();
        return;
    }

    const totalQty = Cart.getCount();
    if (countEl) countEl.textContent = totalQty;

    listEl.innerHTML = items.map(({ id, qty, product }) => `
        <div class="order-item">
            <img src="${product.img}" alt="${product.name}" class="order-item-img"
                onerror="this.src='https://via.placeholder.com/60?text=IMG'" />
            <div class="order-item-info">
                <div class="order-item-name">${product.name}</div>
                <div class="order-item-variant">${product.capacity} · x${qty}</div>
            </div>
            <div>
                <div class="order-item-price">${formatVND(product.price * qty)}</div>
            </div>
        </div>
    `).join('');

    updateGrandTotal();
}

/* =========================================================
   SELECT SHIPPING
   ========================================================= */
function selectShipping(el) {
    document.querySelectorAll('#shipping-options .payment-method-item')
        .forEach(item => item.classList.remove('selected'));
    el.classList.add('selected');

    const method = el.dataset.shipping;
    state.selectedShipping = method;

    if (method === 'express') {
        state.shippingFee = 30000;
        document.getElementById('shipping-fee').textContent = formatVND(30000);
        document.getElementById('shipping-fee').classList.remove('text-success');
    } else {
        state.shippingFee = 0;
        document.getElementById('shipping-fee').textContent = 'Miễn phí';
        document.getElementById('shipping-fee').classList.add('text-success');
    }

    updateGrandTotal();
}

/* =========================================================
   SELECT PAYMENT
   ========================================================= */
function selectPayment(el) {
    document.querySelectorAll('#payment-methods .payment-method-item')
        .forEach(item => item.classList.remove('selected'));
    el.classList.add('selected');

    const method = el.dataset.method;
    state.selectedPayment = method;

    document.getElementById('bank-detail-box').classList.remove('show');
    document.getElementById('card-form-box').style.display = 'none';
    document.getElementById('momo-box').style.display = 'none';

    if (method === 'bank') {
        document.getElementById('bank-detail-box').classList.add('show');
        updateTransferContent();
    } else if (method === 'card') {
        document.getElementById('card-form-box').style.display = 'block';
    } else if (method === 'momo') {
        document.getElementById('momo-box').style.display = 'block';
    }
}

function updateTransferContent() {
    const phone = document.getElementById('phone').value.trim();
    const content = phone ? `SA${phone}` : 'SA + [Số điện thoại]';
    const el = document.getElementById('transfer-content');
    if (el) el.textContent = content;
}

document.addEventListener('DOMContentLoaded', () => {
    // Init order summary từ cart thực
    renderOrderSummary();

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            if (state.selectedPayment === 'bank') updateTransferContent();
        });
    }
});

/* =========================================================
   COUPON
   ========================================================= */
function applyCoupon() {
    const input = document.getElementById('coupon-input');
    const msgEl = document.getElementById('coupon-message');
    const code = input.value.trim().toUpperCase();

    if (!code) {
        showCouponMsg('Vui lòng nhập mã ưu đãi.', 'warning');
        return;
    }

    const coupon = COUPONS[code];

    if (!coupon) {
        state.discount = 0;
        showCouponMsg('Mã ưu đãi không hợp lệ.', 'danger');
        document.getElementById('discount-val').textContent = '—';
        updateGrandTotal();
        return;
    }

    const subtotal = Cart.getSubtotal();
    state.discount = coupon.type === 'percent'
        ? Math.round(subtotal * coupon.value / 100)
        : coupon.value;

    showCouponMsg(`✓ Áp dụng thành công: ${coupon.label}`, 'success');
    document.getElementById('discount-val').textContent = '−' + formatVND(state.discount);
    updateGrandTotal();
}

function showCouponMsg(msg, type) {
    const el = document.getElementById('coupon-message');
    if (el) el.innerHTML = `<span class="text-${type}">${msg}</span>`;
}

/* =========================================================
   GRAND TOTAL
   ========================================================= */
function updateGrandTotal() {
    const subtotal = Cart.getSubtotal();
    const total = Math.max(subtotal + state.shippingFee - state.discount, 0);

    const subEl = document.getElementById('subtotal');
    const totEl = document.getElementById('grand-total');
    if (subEl) subEl.textContent = formatVND(subtotal);
    if (totEl) totEl.textContent = formatVND(total);
}

/* =========================================================
   CARD NUMBER FORMAT
   ========================================================= */
function formatCardNumber(input) {
    let v = input.value.replace(/\D/g, '').substring(0, 16);
    input.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiry(input) {
    let v = input.value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 2) v = v.substring(0, 2) + ' / ' + v.substring(2);
    input.value = v;
}

/* =========================================================
   FORM VALIDATION
   ========================================================= */
function validateForm() {
    const form = document.getElementById('checkout-form');
    form.classList.add('was-validated');

    if (!form.checkValidity()) return false;

    // Kiểm tra giỏ hàng không trống
    if (Cart.getCount() === 0) {
        alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.');
        return false;
    }

    if (state.selectedPayment === 'card') {
        const cardNum = document.getElementById('card-number').value.replace(/\s/g, '');
        if (cardNum.length < 16) {
            alert('Vui lòng nhập đầy đủ số thẻ (16 chữ số).');
            return false;
        }
    }

    return true;
}

/* =========================================================
   PLACE ORDER
   ========================================================= */
function placeOrder() {
    if (!validateForm()) return;

    const btn = document.getElementById('btn-place-order');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Đang xử lý...';

    setTimeout(() => {
        showSuccessModal();
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-lock"></i> Đặt hàng ngay';
    }, 1500);
}

/* =========================================================
   SUCCESS MODAL
   ========================================================= */
function showSuccessModal() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const province = document.getElementById('province').value;
    const district = document.getElementById('district').value.trim();

    const fullName = firstName + ' ' + lastName;
    const fullAddress = address + ', ' + district + ', ' + province;

    const paymentLabels = {
        cod: 'Thanh toán khi nhận hàng (COD)',
        bank: 'Chuyển khoản ngân hàng',
        card: 'Thẻ Visa / Mastercard',
        momo: 'Ví MoMo',
    };

    const orderId = '#SA' + new Date().getFullYear() +
        '-' + String(Math.floor(Math.random() * 9000) + 1000);

    const orderTotal = Math.max(Cart.getSubtotal() + state.shippingFee - state.discount, 0);

    // Lưu vào list Order cá nhân
    const ordersItemCount = Cart.getItems().reduce((total, item) => total + item.qty, 0); // Tính tổng số lượng thay vì đếm số dòng
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
        // Lấy danh sách sản phẩm hiện tại để lấy ảnh và tên item đầu
        const items = Cart.getItems();
        let firstItemImg = 'https://via.placeholder.com/100?text=Scent+Aura';
        let firstItemName = 'Đơn hàng Scent Aura';

        if (items.length > 0 && items[0].product) {
            firstItemImg = items[0].product.img;
            firstItemName = items[0].product.name;
        }

        const orderData = {
            id: orderId,
            date: new Date().toLocaleDateString('vi-VN'),
            total: formatVND(orderTotal),
            status: 'Processing',
            itemCount: ordersItemCount,
            address: fullAddress,
            payment: paymentLabels[state.selectedPayment],
            firstItemImg: firstItemImg,
            firstItemName: firstItemName
        };

        const existingOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
        existingOrders.unshift(orderData); // Them vao dau tien
        localStorage.setItem('userOrders', JSON.stringify(existingOrders));
    }

    document.getElementById('modal-order-id').textContent = orderId;
    document.getElementById('modal-customer-name').textContent = fullName;
    document.getElementById('modal-customer-phone').textContent = phone;
    document.getElementById('modal-address').textContent = fullAddress;
    document.getElementById('modal-payment-method').textContent = paymentLabels[state.selectedPayment];
    document.getElementById('modal-total').textContent = formatVND(orderTotal);
    document.getElementById('modal-email').textContent = email;

    // Xóa giỏ hàng sau khi đặt hàng thành công
    Cart.clear();

    const modalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
    modal.show();
}
