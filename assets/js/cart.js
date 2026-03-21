const Cart = (function () {
    const STORAGE_KEY = 'scent_aura_cart';
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
    function remove(productId) {
        const items = load().filter(i => i.id !== productId);
        save(items);
    }
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
    function getItems() {
        const raw = load();
        const allProducts = (typeof products !== 'undefined') ? products : [];
        return raw.map(item => ({
            ...item,
            product: allProducts.find(p => p.id === item.id) || null
        })).filter(item => item.product !== null);
    }
    function getCount() {
        return load().reduce((sum, i) => sum + i.qty, 0);
    }
    function getSubtotal() {
        return getItems().reduce((sum, item) => sum + item.product.price * item.qty, 0);
    }
    function clear() {
        save([]);
    }
    function updateBadge() {
        const count = getCount();
        document.querySelectorAll('[data-cart-badge]').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? '' : 'none';
        });
    }
    function showToast(productId, qty) {
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
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    function init() {
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
function addToCart(productId, qty = 1) {
    Cart.add(productId, qty);
}
