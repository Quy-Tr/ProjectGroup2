/**
 * search.js — Navbar search với autocomplete dropdown gợi ý
 * Dùng chung cho tất cả các trang.
 */
document.addEventListener('DOMContentLoaded', () => {
    const isProductsPage = window.location.pathname.endsWith('products.html');

    document.querySelectorAll('.search-wrapper').forEach(wrapper => {
        const input = wrapper.querySelector('.search-input');
        const icon = wrapper.querySelector('.search-icon');
        if (!input) return;

        // ── Tạo dropdown container ──────────────────────────────────
        const dropdown = document.createElement('div');
        dropdown.className = 'search-dropdown';
        wrapper.appendChild(dropdown);

        // ── Helpers ─────────────────────────────────────────────────
        // Phát hiện trang có nằm trong thư mục con không (user/, admin/...)
        const subDirs = ['/user/', '/admin/'];
        const inSubDir = subDirs.some(d => window.location.pathname.replace(/\\/g, '/').includes(d));
        const prefix = inSubDir ? '../' : '';

        function getPath(file) {
            return prefix + file;
        }

        function fmt(price) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        }

        function doSearch() {
            const q = input.value.trim();
            if (isProductsPage) {
                // Live filter trên trang products
                if (typeof currentFilters !== 'undefined' && typeof filterAndRender === 'function') {
                    currentFilters.search = q;
                    filterAndRender();
                }
            } else {
                if (q) window.location.href = getPath(`products.html?search=${encodeURIComponent(q)}`);
            }
            hideDropdown();
        }

        function showSuggestions(q) {
            if (!q || typeof products === 'undefined') { hideDropdown(); return; }

            const matches = products
                .filter(p =>
                    p.name.toLowerCase().includes(q.toLowerCase()) ||
                    p.brand.toLowerCase().includes(q.toLowerCase()) ||
                    (p.category && p.category.toLowerCase().includes(q.toLowerCase()))
                )
                .slice(0, 6);

            if (matches.length === 0) {
                dropdown.innerHTML = `<div class="sd-empty">Không tìm thấy sản phẩm nào</div>`;
            } else {
                dropdown.innerHTML = matches.map(p => `
                    <div class="sd-item" data-id="${p.id}" data-name="${p.name}">
                        <img src="${getPath(p.img)}" class="sd-img" alt="${p.name}"
                             onerror="this.src='https://via.placeholder.com/40x40?text=?'">
                        <div class="sd-info">
                            <div class="sd-name">${highlightMatch(p.name, q)}</div>
                            <div class="sd-meta">${p.brand} · ${p.category}</div>
                        </div>
                        <div class="sd-price">${fmt(p.price)}</div>
                    </div>
                `).join('');

                // Thêm dòng "Xem tất cả kết quả"
                dropdown.innerHTML += `
                    <div class="sd-all" data-q="${q}">
                        <i class="fa-solid fa-magnifying-glass me-2"></i>
                        Xem tất cả kết quả cho "<strong>${q}</strong>"
                    </div>`;

                // Click vào sản phẩm → product-detail.html
                dropdown.querySelectorAll('.sd-item').forEach(el => {
                    el.addEventListener('click', () => {
                        window.location.href = getPath(`product-detail.html?id=${el.dataset.id}`);
                    });
                });

                // Click "Xem tất cả"
                dropdown.querySelector('.sd-all')?.addEventListener('click', () => {
                    const q2 = dropdown.querySelector('.sd-all').dataset.q;
                    window.location.href = getPath(`products.html?search=${encodeURIComponent(q2)}`);
                });
            }

            dropdown.classList.add('open');
        }

        function highlightMatch(text, q) {
            const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            return text.replace(re, '<mark>$1</mark>');
        }

        function hideDropdown() {
            dropdown.classList.remove('open');
            dropdown.innerHTML = '';
        }

        // ── Events ───────────────────────────────────────────────────
        input.addEventListener('input', () => {
            const q = input.value.trim();
            showSuggestions(q);
            // Nếu trên products page: live filter luôn
            if (isProductsPage && typeof currentFilters !== 'undefined') {
                currentFilters.search = q;
                filterAndRender();
            }
        });

        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') { e.preventDefault(); doSearch(); }
            if (e.key === 'Escape') hideDropdown();
        });

        if (icon) {
            icon.style.cursor = 'pointer';
            icon.addEventListener('click', doSearch);
        }

        // Đóng dropdown khi click ngoài
        document.addEventListener('click', e => {
            if (!wrapper.contains(e.target)) hideDropdown();
        });
    });
});
