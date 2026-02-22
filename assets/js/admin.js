/* assets/js/admin.js — Admin Panel Full Interactive */

// --- 1. KEYS ---
const PRODUCT_KEY = 'scent_aura_products';
const ORDER_KEY = 'userOrders';
const USER_KEY = 'scent_aura_users';

// --- 2. AUTH GUARD ---
// Kiểm tra quyền admin trước khi làm bất cứ điều gì
(function checkAdminAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'admin') {
        window.location.href = '../login.html';
    }
})();

// --- 3. HELPERS ---
function getData(key, fallback = []) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
        return fallback;
    }
}

function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        if (e.name === 'QuotaExceededError' || e.code === 22) {
            alert('⚠️ Lỗi: LocalStorage đầy!\n\nKhông thể lưu dữ liệu do không gian lưu trữ của trình duyệt đã đầy.\n\nGợi ý: Tránh dùng ảnh quá lớn (Base64). Hãy dùng đường dẫn URL ảnh thay thế.');
        } else {
            console.error('saveData error:', e);
        }
    }
}

const fmt = (n) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

function getAdminUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || { name: 'Admin', email: '' };
}

// Hiển thị tên admin ở header
function renderAdminHeader() {
    const admin = getAdminUser();
    document.querySelectorAll('.admin-name-display').forEach(el => el.textContent = admin.name || 'Admin');
    const initials = (admin.name || 'AD').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    document.querySelectorAll('.admin-avatar-initials').forEach(el => el.textContent = initials);
}

// --- 4. DASHBOARD ---
function renderDashboard() {
    const revenueEl = document.getElementById('total-revenue');
    const ordersEl = document.getElementById('total-orders');
    const productsSoldEl = document.getElementById('total-products-sold');
    const totalUsersEl = document.getElementById('total-users');
    const recentOrdersBody = document.getElementById('recent-orders-body');

    if (!revenueEl) return; // Không phải trang Dashboard

    const orders = getData(ORDER_KEY, []);
    const users = getData(USER_KEY, []);

    // Chỉ tính doanh thu từ đơn hàng đã giao (completed)
    // Dùng hàm parseMoney để xử lý cả số lẫn string dạng "2.000.000 ₫"
    const parseMoney = (val) => {
        if (typeof val === 'number') return val;
        // Xóa tất cả ký tự không phải số → VND không có phần thập phân
        const digits = String(val).replace(/\D/g, '');
        return parseInt(digits, 10) || 0;
    };
    const totalRevenue = orders.reduce((sum, o) => {
        return o.status === 'completed' ? sum + parseMoney(o.total) : sum;
    }, 0);
    const totalOrders = orders.length;

    let totalSold = 0;
    orders.forEach(o => {
        if (o.status !== 'cancelled') {
            const matches = (o.items || '').match(/x(\d+)/gi);
            if (matches) {
                matches.forEach(m => { totalSold += parseInt(m.replace(/x/i, '')); });
            } else {
                totalSold += 1;
            }
        }
    });

    revenueEl.textContent = fmt(totalRevenue);
    ordersEl.textContent = totalOrders;
    productsSoldEl.textContent = totalSold;
    if (totalUsersEl) totalUsersEl.textContent = users.filter(u => u.role !== 'admin').length;

    if (recentOrdersBody) {
        const recent = [...orders].reverse().slice(0, 5);
        recentOrdersBody.innerHTML = recent.length === 0
            ? `<tr><td colspan="5" class="text-center text-muted py-4">Chưa có đơn hàng nào.</td></tr>`
            : recent.map(o => {
                const { cls, label } = statusInfo(o.status);
                const customer = o.customer || o.name || 'Khách';
                const total = typeof o.total === 'number' ? fmt(o.total) : (o.total || '—');
                return `<tr>
                    <td><strong>#${o.id}</strong></td>
                    <td>${customer}</td>
                    <td>${total}</td>
                    <td><span class="badge ${cls}">${label}</span></td>
                    <td>${o.date || '—'}</td>
                </tr>`;
            }).join('');
    }
}

function statusInfo(status) {
    const map = {
        pending: { cls: 'badge-pending', label: 'Đang xử lý' },
        shipping: { cls: 'badge-shipping', label: 'Đang giao' },
        completed: { cls: 'badge-completed', label: 'Đã giao' },
        cancelled: { cls: 'badge-cancelled', label: 'Đã hủy' },
    };
    return map[status] || { cls: '', label: status };
}

// --- 5. PRODUCTS ---
function renderProductTable() {
    const tbody = document.getElementById('product-table-body');
    if (!tbody) return;

    const products = getData(PRODUCT_KEY, []);

    if (products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">Chưa có sản phẩm nào.</td></tr>`;
        return;
    }

    const genderLabel = { nam: 'Nam', nu: 'Nữ', unisex: 'Unisex' };

    tbody.innerHTML = products.map(p => `
        <tr>
            <td><span class="text-muted small">#${p.id}</span></td>
            <td><img src="${p.img ? (p.img.startsWith('data:') || p.img.startsWith('http') ? p.img : '../' + p.img) : ''}"
                     style="width:50px;height:50px;object-fit:cover;border-radius:6px;background:#f5f5f5"
                     onerror="this.src='https://via.placeholder.com/50?text=IMG'"></td>
            <td><strong>${p.name}</strong><br><span class="text-muted small">${p.sku || ''}</span></td>
            <td>${p.brand || '—'}</td>
            <td>${genderLabel[p.gender] || p.gender || '—'}</td>
            <td>${fmt(p.price)}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct(${p.id})" title="Sửa">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${p.id})" title="Xóa">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// --- 6. ORDERS ---
function renderOrderTable() {
    const tbody = document.getElementById('order-table-body');
    if (!tbody) return;

    const orders = getData(ORDER_KEY, []);

    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">Chưa có đơn hàng nào.</td></tr>`;
        return;
    }

    tbody.innerHTML = orders.map(o => {
        const { cls, label } = statusInfo(o.status);
        const customer = o.customer || o.name || 'Khách';
        const total = typeof o.total === 'number' ? fmt(o.total) : (o.total || '—');
        return `<tr>
            <td><strong>#${o.id}</strong></td>
            <td>${customer}</td>
            <td>${o.date || '—'}</td>
            <td>${total}</td>
            <td><span class="badge ${cls}">${label}</span></td>
            <td>
                <button class="btn-view" onclick="openOrderModal('${o.id}')">
                    <i class="fas fa-edit"></i> Cập nhật
                </button>
            </td>
        </tr>`;
    }).join('');
}

// --- 7. USERS ---
function renderUserTable() {
    const tbody = document.getElementById('user-table-body');
    if (!tbody) return;

    const users = getData(USER_KEY, []);
    const admin = getAdminUser();

    if (users.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">Chưa có người dùng.</td></tr>`;
        return;
    }

    tbody.innerHTML = users.map(u => {
        const isSelf = u.email === admin.email;
        const roleBadge = u.role === 'admin'
            ? `<span class="badge-role role-admin">Quản trị viên</span>`
            : `<span class="badge-role role-user">Khách hàng</span>`;

        const statusBadge = u.status === 'locked'
            ? `<span class="text-danger"><i class="fas fa-lock"></i> Đã khóa</span>`
            : `<span class="text-success"><i class="fas fa-check-circle"></i> Hoạt động</span>`;

        // Nút khóa / mở khóa
        const lockBtn = u.role !== 'admin'
            ? (u.status === 'locked'
                ? `<button class="action-btn edit-btn" onclick="toggleLockUser(${u.id})" title="Mở khóa"><i class="fas fa-unlock"></i></button>`
                : `<button class="action-btn" style="background:#fff4de;color:#ffa800;" onclick="toggleLockUser(${u.id})" title="Khóa tài khoản"><i class="fas fa-lock"></i></button>`)
            : '';

        const deleteBtn = !isSelf && u.role !== 'admin'
            ? `<button class="action-btn delete-btn" onclick="deleteUser(${u.id})" title="Xóa"><i class="fas fa-trash"></i></button>`
            : '';

        return `<tr>
            <td>#${u.id}</td>
            <td><strong>${u.name}</strong>${isSelf ? ' <span class="text-muted small">(bạn)</span>' : ''}</td>
            <td>${u.email}</td>
            <td>${u.phone || '—'}</td>
            <td>${roleBadge}</td>
            <td>${statusBadge}</td>
            <td>${lockBtn} ${deleteBtn}</td>
        </tr>`;
    }).join('');
}

// --- 8. KHỞI CHẠY KHI LOAD TRANG ---
document.addEventListener('DOMContentLoaded', function () {
    renderAdminHeader();
    renderDashboard();
    renderProductTable();
    renderOrderTable();
    renderUserTable();

    // A. PRODUCT FORM - SUBMIT
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const id = document.getElementById('pId').value;
            const name = document.getElementById('pName').value.trim();
            const brand = document.getElementById('pBrand').value.trim();
            const gender = document.getElementById('pGender').value;
            const capacity = document.getElementById('pCapacity').value.trim();
            const price = Number(document.getElementById('pPrice').value);
            const category = document.getElementById('pCategory').value.trim();
            const desc = document.getElementById('pDesc').value.trim();
            const img = document.getElementById('pImage').value;
            const img2 = document.getElementById('pImage2') ? document.getElementById('pImage2').value : '';

            if (!name || !brand || !price) {
                alert('Vui lòng điền ít nhất Tên, Thương hiệu và Giá!');
                return;
            }

            let products = getData(PRODUCT_KEY, []);

            if (id) {
                // Sửa — giữ nguyên các trường không có trong form
                const idx = products.findIndex(p => p.id == id);
                if (idx !== -1) {
                    products[idx] = {
                        ...products[idx],
                        name, brand, gender, capacity, price, category, desc,
                        ...(img ? { img } : {}),
                        ...(img2 ? { img2 } : {})
                    };
                }
            } else {
                // Thêm mới
                const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                products.push({
                    id: newId,
                    sku: `SA-${newId}`,
                    name, brand, gender, capacity, price, category, desc,
                    img: img || '',
                    img2: img2 || '',
                    notes: { top: '', middle: '', base: '' },
                    concentration: '',
                    longevity: '',
                    sillage: ''
                });
            }

            saveData(PRODUCT_KEY, products);
            renderProductTable();
            closeProductModal();
            alert(id ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!');
        });
    }

    // B. UPLOAD ẢNH CHÍNH (img)
    const imageInput = document.getElementById('imageInput');
    if (imageInput) {
        imageInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function (ev) {
                document.getElementById('imagePreview').src = ev.target.result;
                document.getElementById('imagePreview').style.display = 'block';
                document.getElementById('pImage').value = ev.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    // C. UPLOAD ẢNH PHỤ (img2)
    const imageInput2 = document.getElementById('imageInput2');
    if (imageInput2) {
        imageInput2.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function (ev) {
                document.getElementById('imagePreview2').src = ev.target.result;
                document.getElementById('imagePreview2').style.display = 'block';
                document.getElementById('pImage2').value = ev.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
});

// --- 9. GLOBAL FUNCTIONS ---

// -- Product Modal --
const _getProductModal = () => document.getElementById('productModal');

window.openModal = function () {
    const modal = _getProductModal();
    if (!modal) return;
    document.getElementById('productForm').reset();
    document.getElementById('pId').value = '';
    document.getElementById('pImage').value = '';
    document.getElementById('imagePreview').style.display = 'none';
    if (document.getElementById('pImage2')) document.getElementById('pImage2').value = '';
    if (document.getElementById('imagePreview2')) document.getElementById('imagePreview2').style.display = 'none';
    document.getElementById('modalTitle').textContent = 'Thêm Sản Phẩm Mới';
    modal.style.display = 'block';
};

window.closeProductModal =
    window.closeModal = function () {
        const modal = _getProductModal();
        if (modal) modal.style.display = 'none';
    };

window.editProduct = function (id) {
    const products = getData(PRODUCT_KEY, []);
    const p = products.find(x => x.id == id);
    const modal = _getProductModal();
    if (!p || !modal) return;

    document.getElementById('pId').value = p.id;
    document.getElementById('pName').value = p.name || '';
    document.getElementById('pBrand').value = p.brand || '';
    document.getElementById('pGender').value = p.gender || 'unisex';
    document.getElementById('pCapacity').value = p.capacity || '';
    document.getElementById('pPrice').value = p.price || '';
    document.getElementById('pCategory').value = p.category || '';
    document.getElementById('pDesc').value = p.desc || '';
    document.getElementById('pImage').value = p.img || '';
    if (document.getElementById('pImage2')) document.getElementById('pImage2').value = p.img2 || '';

    const preview = document.getElementById('imagePreview');
    if (p.img) {
        preview.src = p.img.startsWith('data:') || p.img.startsWith('http') ? p.img : '../' + p.img;
        preview.style.display = 'block';
    } else {
        preview.style.display = 'none';
    }

    const preview2 = document.getElementById('imagePreview2');
    if (preview2) {
        if (p.img2) {
            preview2.src = p.img2.startsWith('data:') || p.img2.startsWith('http') ? p.img2 : '../' + p.img2;
            preview2.style.display = 'block';
        } else {
            preview2.style.display = 'none';
        }
    }

    document.getElementById('modalTitle').textContent = 'Chỉnh Sửa Sản Phẩm';
    modal.style.display = 'block';
};

window.deleteProduct = function (id) {
    if (!confirm('Bạn chắc chắn muốn xóa sản phẩm này?\nHành động này không thể hoàn tác!')) return;
    let products = getData(PRODUCT_KEY, []);
    products = products.filter(p => p.id != id);
    saveData(PRODUCT_KEY, products);
    renderProductTable();
};

// -- Order Modal --
const _getOrderModal = () => document.getElementById('orderModal');
let _currentOrderId = null;

window.openOrderModal = function (id) {
    const orders = getData(ORDER_KEY, []);
    const order = orders.find(o => o.id === id);
    const modal = _getOrderModal();
    if (!order || !modal) return;

    _currentOrderId = id;
    document.getElementById('modalOrderId').textContent = '#' + order.id;
    document.getElementById('modalCustomer').textContent = order.customer || order.name || 'Khách';
    document.getElementById('modalDate').textContent = order.date || '—';
    document.getElementById('modalItems').textContent = order.items || '—';
    document.getElementById('modalTotal').textContent = typeof order.total === 'number' ? fmt(order.total) : (order.total || '—');
    document.getElementById('modalAddress').textContent = order.address || '—';
    document.getElementById('modalPayment').textContent = order.payment || '—';
    document.getElementById('modalStatus').value = order.status || 'pending';
    modal.style.display = 'block';
};

window.saveOrderStatus = function () {
    const newStatus = document.getElementById('modalStatus').value;
    let orders = getData(ORDER_KEY, []);
    const idx = orders.findIndex(o => o.id === _currentOrderId);
    if (idx !== -1) {
        orders[idx].status = newStatus;
        saveData(ORDER_KEY, orders);
        renderOrderTable();
        closeOrderModal();
        alert('Cập nhật trạng thái đơn hàng thành công!');
    }
};

window.closeOrderModal = function () {
    const modal = _getOrderModal();
    if (modal) modal.style.display = 'none';
};

// -- User Actions --
window.toggleLockUser = function (id) {
    let users = getData(USER_KEY, []);
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return;

    const user = users[idx];
    const newStatus = user.status === 'locked' ? 'active' : 'locked';
    const action = newStatus === 'locked' ? 'khóa' : 'mở khóa';

    if (!confirm(`Bạn có chắc muốn ${action} tài khoản "${user.name}" không?`)) return;

    users[idx].status = newStatus;
    saveData(USER_KEY, users);
    renderUserTable();
};

window.deleteUser = function (id) {
    const admin = getAdminUser();
    let users = getData(USER_KEY, []);
    const user = users.find(u => u.id === id);
    if (!user) return;
    if (user.email === admin.email) { alert('Không thể xóa tài khoản Admin đang đăng nhập!'); return; }
    if (user.role === 'admin') { alert('Không thể xóa tài khoản Quản trị viên!'); return; }
    if (!confirm(`Xóa tài khoản của "${user.name}"? Hành động này không thể hoàn tác!`)) return;

    users = users.filter(u => u.id !== id);
    saveData(USER_KEY, users);
    renderUserTable();
};

// -- Khôi phục sản phẩm mặc định --
window.resetToDefaultProducts = function () {
    if (!confirm('Khôi phục tất cả 18 sản phẩm mặc định?\n\nCác sản phẩm bạn đã thêm sẽ KHÔNG bị xóa — chỉ bổ sung các sản phẩm mặc định bị thiếu.')) return;

    if (typeof PRELOADED_PRODUCTS === 'undefined') {
        alert('Không tìm thấy danh sách sản phẩm mặc định. Vui lòng tải lại trang.');
        return;
    }

    let current = getData(PRODUCT_KEY, []);
    const currentIds = new Set(current.map(p => p.id));
    const toAdd = PRELOADED_PRODUCTS.filter(p => !currentIds.has(p.id));

    if (toAdd.length === 0) {
        alert('Tất cả sản phẩm mặc định đã tồn tại, không cần khôi phục!');
        return;
    }

    const merged = [...toAdd, ...current];
    saveData(PRODUCT_KEY, merged);
    renderProductTable();
    alert(`✅ Đã khôi phục ${toAdd.length} sản phẩm mặc định bị thiếu!`);
};

// -- Đăng xuất --
window.adminLogout = function () {
    if (!confirm('Bạn có chắc muốn đăng xuất không?')) return;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '../login.html';
};

// -- Đóng modal khi click ngoài --
window.addEventListener('click', function (e) {
    const pm = _getProductModal();
    const om = _getOrderModal();
    if (pm && e.target === pm) closeProductModal();
    if (om && e.target === om) closeOrderModal();
});