/**
 * cart.js — SCENT AURA Cart Manager
 * ===================================
 * Quản lý giỏ hàng toàn trang thông qua localStorage.
 * Load file này TRƯỚC data.js nếu cần, hoặc sau.
 *
 * API công khai:
 *   Cart.add(productId, qty)
 *   Cart.remove(productId)
 *   Cart.updateQty(productId, newQty)
 *   Cart.getItems()          → [{id, qty, product}]
 *   Cart.getCount()          → số lượng tất cả sản phẩm
 *   Cart.getSubtotal()       → tổng tiền (number)
 *   Cart.clear()
 *
 * Events phát ra khi giỏ hàng thay đổi:
 *   window.dispatchEvent(new Event('cart:updated'))
 */

const Cart = (function () {
    const STORAGE_KEY = 'scent_aura_cart';

    /* ---------- STORAGE HELPERS ---------- */
    function load() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function save(items) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        window.dispatchEvent(new Event('cart:updated'));
    }

    /* ---------- PUBLIC API ---------- */

    /** Thêm sản phẩm. qty mặc định là 1. Nếu đã tồn tại thì cộng dồn. */
    function add(productId, qty = 1) {
        const items = load();
        const existing = items.find(i => i.id === productId);

        if (existing) {
            existing.qty += qty;
        } else {
            items.push({ id: productId, qty });
        }

        save(items);
        showToast(productId, qty);
    }

    /** Xóa sản phẩm theo id */
    function remove(productId) {
        const items = load().filter(i => i.id !== productId);
        save(items);
    }

    /** Cập nhật số lượng. Nếu qty <= 0 thì xóa. */
    function updateQty(productId, newQty) {
        if (newQty <= 0) {
            remove(productId);
            return;
        }
        const items = load();
        const item = items.find(i => i.id === productId);
        if (item) {
            item.qty = newQty;
            save(items);
        }
    }

    /**
     * Trả về mảng các item đã join với dữ liệu sản phẩm.
     * Yêu cầu: biến `products` (từ data.js) phải tồn tại.
     */
    function getItems() {
        const raw = load();
        const allProducts = (typeof products !== 'undefined') ? products : [];
        return raw.map(item => ({
            ...item,
            product: allProducts.find(p => p.id === item.id) || null
        })).filter(item => item.product !== null);
    }

    /** Tổng số lượng sản phẩm trong giỏ */
    function getCount() {
        return load().reduce((sum, i) => sum + i.qty, 0);
    }

    /** Tổng tiền */
    function getSubtotal() {
        return getItems().reduce((sum, item) => sum + item.product.price * item.qty, 0);
    }

    /** Xóa toàn bộ giỏ hàng */
    function clear() {
        save([]);
    }

    /* ---------- BADGE UPDATE ---------- */
    function updateBadge() {
        const count = getCount();
        document.querySelectorAll('[data-cart-badge]').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? '' : 'none';
        });
    }

    /* ---------- TOAST NOTIFICATION ---------- */
    function showToast(productId, qty) {
        // Kiểm tra nếu đã có toast container
        let toastContainer = document.getElementById('cart-toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'cart-toast-container';
            toastContainer.style.cssText = `
                position: fixed; bottom: 24px; right: 24px;
                z-index: 9999; display: flex; flex-direction: column; gap: 10px;
            `;
            document.body.appendChild(toastContainer);
        }

        const allProducts = (typeof products !== 'undefined') ? products : [];
        const product = allProducts.find(p => p.id === productId);
        const name = product ? product.name : 'Sản phẩm';

        const toast = document.createElement('div');
        toast.style.cssText = `
            background: #111; color: #fff; padding: 12px 20px;
            border-radius: 10px; font-size: 0.88rem; box-shadow: 0 6px 20px rgba(0,0,0,0.25);
            display: flex; align-items: center; gap: 12px;
            animation: slideInRight 0.3s ease;
            min-width: 260px; max-width: 320px;
        `;

        toast.innerHTML = `
            <div style="width:34px;height:34px;border-radius:50%;background:rgba(197,160,89,0.2);
                        border:1.5px solid #c5a059;display:flex;align-items:center;
                        justify-content:center;flex-shrink:0;">
                <i class="fa-solid fa-cart-plus" style="color:#c5a059;font-size:0.85rem;"></i>
            </div>
            <div style="flex:1;min-width:0;">
                <div style="font-weight:700;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${name}</div>
                <div style="color:#aaa;font-size:0.78rem;">Đã thêm × ${qty} vào giỏ hàng</div>
            </div>
            <a href="cart.html" style="color:#c5a059;font-size:0.78rem;white-space:nowrap;text-decoration:none;font-weight:600;">
                Xem giỏ →
            </a>
        `;

        toastContainer.appendChild(toast);

        // Auto remove
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    /* ---------- INIT: auto update badge on load & on cart:updated ---------- */
    function init() {
        // Thêm CSS animation cho toast
        if (!document.getElementById('cart-toast-style')) {
            const style = document.createElement('style');
            style.id = 'cart-toast-style';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to   { transform: translateX(0);    opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        updateBadge();
        window.addEventListener('cart:updated', updateBadge);
    }

    document.addEventListener('DOMContentLoaded', init);

    return { add, remove, updateQty, getItems, getCount, getSubtotal, clear };
})();

/* ============================================================
   LEGACY COMPAT: hàm addToCart() toàn cục (dùng trong products.js)
   ============================================================ */
function addToCart(productId, qty = 1) {
    Cart.add(productId, qty);
}
