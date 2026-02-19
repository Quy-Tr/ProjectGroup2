/* assets/admin.js - Phiên bản Full Tính Năng (Products + Orders + Users) */

// --- 1. KHAI BÁO CÁC KHO LƯU TRỮ (DATABASE) ---
const PRODUCT_KEY = 'scent_aura_products';
const ORDER_KEY = 'scent_aura_orders';
const USER_KEY = 'scent_aura_users';

// --- 2. CÁC HÀM DÙNG CHUNG (HELPER) ---

// Lấy dữ liệu từ LocalStorage (Nếu chưa có thì trả về dữ liệu mẫu)
function getData(key, sampleData) {
    const data = localStorage.getItem(key);
    if (!data) {
        localStorage.setItem(key, JSON.stringify(sampleData));
        return sampleData;
    }
    return JSON.parse(data);
}

// Lưu dữ liệu xuống LocalStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Định dạng tiền tệ (VNĐ)
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// --- 3. LOGIC QUẢN LÝ SẢN PHẨM (PRODUCTS) ---

function renderProductTable() {
    const tbody = document.getElementById('product-table-body');
    if (!tbody) return; // Nếu không phải trang Product thì thoát

    const sampleProducts = [
        { id: 1, name: "Oud Wood", brand: "Tom Ford", price: 4500000, img: "https://product.hstatic.net/1000025647/product/122_a7da663bdae84710829d7fd57746c074.jpg" },
        { id: 2, name: "Bleu de Chanel", brand: "Chanel", price: 3800000, img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80" }
    ];
    const products = getData(PRODUCT_KEY, sampleProducts);

    tbody.innerHTML = products.map(p => `
        <tr>
            <td>#${p.id}</td>
            <td><img src="${p.img}" style="width:50px;height:50px;object-fit:cover;border-radius:5px"></td>
            <td><strong>${p.name}</strong></td>
            <td>${p.brand}</td>
            <td>${formatCurrency(p.price)}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct(${p.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// --- 4. LOGIC QUẢN LÝ ĐƠN HÀNG (ORDERS) ---

function renderOrderTable() {
    const tbody = document.getElementById('order-table-body');
    if (!tbody) return; // Nếu không phải trang Order thì thoát

    const sampleOrders = [
        { id: "DH01", customer: "Nguyễn Văn A", date: "2024-02-10", total: 4500000, status: "pending", items: "Tom Ford (x1)" },
        { id: "DH02", customer: "Trần Thị B", date: "2024-02-12", total: 3200000, status: "shipping", items: "Chanel (x1)" },
        { id: "DH03", customer: "Lê Văn C", date: "2024-02-14", total: 9500000, status: "completed", items: "Dior (x2)" }
    ];
    const orders = getData(ORDER_KEY, sampleOrders);

    tbody.innerHTML = orders.map(o => {
        let badgeClass = '';
        let statusText = '';
        switch (o.status) {
            case 'pending': badgeClass = 'badge-pending'; statusText = 'Đang xử lý'; break;
            case 'shipping': badgeClass = 'badge-shipping'; statusText = 'Đang giao'; break;
            case 'completed': badgeClass = 'badge-completed'; statusText = 'Đã giao'; break;
            case 'cancelled': badgeClass = 'badge-cancelled'; statusText = 'Đã hủy'; break;
        }

        return `
        <tr>
            <td><strong>#${o.id}</strong></td>
            <td>${o.customer}</td>
            <td>${o.date}</td>
            <td>${formatCurrency(o.total)}</td>
            <td><span class="badge ${badgeClass}">${statusText}</span></td>
            <td><button class="btn-view" onclick="openOrderModal('${o.id}')"><i class="fas fa-edit"></i> Cập nhật</button></td>
        </tr>`;
    }).join('');
}

// --- 5. LOGIC QUẢN LÝ NGƯỜI DÙNG (USERS) ---

function renderUserTable() {
    const tbody = document.getElementById('user-table-body');
    if (!tbody) return; // Nếu không phải trang User thì thoát

    const sampleUsers = [
        { id: 101, name: "Admin Quản Trị", email: "admin@scentaura.com", phone: "0909123456", role: "admin", status: "active" },
        { id: 102, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", phone: "0912345678", role: "user", status: "active" },
        { id: 103, name: "Trần Thị B", email: "tranthib@gmail.com", phone: "0987654321", role: "user", status: "locked" }
    ];
    const users = getData(USER_KEY, sampleUsers);

    tbody.innerHTML = users.map(u => {
        let roleBadge = u.role === 'admin' ? '<span class="badge-role role-admin">Quản trị viên</span>' : '<span class="badge-role role-user">Khách hàng</span>';
        let statusText = u.status === 'active' ? '<i class="fas fa-check-circle status-active"></i> Hoạt động' : '<i class="fas fa-lock status-locked"></i> Đã khóa';

        return `
        <tr>
            <td>#${u.id}</td>
            <td><strong>${u.name}</strong></td>
            <td>${u.email}</td>
            <td>${u.phone}</td>
            <td>${roleBadge}</td>
            <td>${statusText}</td>
            <td>
                <button class="action-btn delete-btn" onclick="deleteUser(${u.id})" title="Xóa người dùng">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>`;
    }).join('');
}

// --- 5.5. LOGIC DASHBOARD (TỔNG QUAN) ---

function renderDashboard() {
    // 1. Cập nhật Thống Kê
    const totalRevenueEl = document.getElementById('total-revenue');
    const totalOrdersEl = document.getElementById('total-orders');
    const totalProductsSoldEl = document.getElementById('total-products-sold');
    const recentOrdersBody = document.getElementById('recent-orders-body');

    if (!totalRevenueEl) return; // Không phải trang Dashboard thì thoát

    const orders = getData(ORDER_KEY, []);

    // Tính toán
    const totalRevenue = orders.reduce((sum, order) => sum + (order.status !== 'cancelled' ? order.total : 0), 0);
    const totalOrders = orders.length;

    // Tính sơ bộ số sản phẩm bán ra (dựa vào text "x1", "x2"...)
    let totalProducts = 0;
    orders.forEach(order => {
        if (order.status !== 'cancelled') {
            const matches = order.items.match(/x(\d+)/g);
            if (matches) {
                matches.forEach(m => {
                    totalProducts += parseInt(m.replace('x', ''));
                });
            } else {
                totalProducts += 1; // Mặc định là 1 nếu không ghi số lượng
            }
        }
    });

    // Hiển thị số liệu
    totalRevenueEl.innerText = formatCurrency(totalRevenue);
    totalOrdersEl.innerText = totalOrders;
    totalProductsSoldEl.innerText = totalProducts;

    // 2. Hiển thị Đơn hàng mới nhất (Lấy 5 đơn gần nhất)
    const recentOrders = [...orders].reverse().slice(0, 5);

    recentOrdersBody.innerHTML = recentOrders.map(o => {
        let badgeClass = '';
        let statusText = '';
        switch (o.status) {
            case 'pending': badgeClass = 'badge-pending'; statusText = 'Đang xử lý'; break;
            case 'shipping': badgeClass = 'badge-shipping'; statusText = 'Đang giao'; break;
            case 'completed': badgeClass = 'badge-completed'; statusText = 'Đã giao'; break;
            case 'cancelled': badgeClass = 'badge-cancelled'; statusText = 'Đã hủy'; break;
        }

        return `
            <tr>
                <td>#${o.id}</td>
                <td>${o.customer}</td>
                <td>${formatCurrency(o.total)}</td>
                <td><span class="badge ${badgeClass}">${statusText}</span></td>
                <td>${o.date}</td>
            </tr>
        `;
    }).join('');
}

// --- 6. KHỞI CHẠY KHI LOAD TRANG (MAIN) ---

document.addEventListener('DOMContentLoaded', function () {
    // Gọi cả 3 hàm render (Hàm nào thấy đúng trang của mình thì mới chạy)
    renderDashboard(); // <--- Thêm dòng này
    renderProductTable();
    renderOrderTable();
    renderUserTable();

    // A. Xử lý Form Sản Phẩm (Thêm / Sửa)
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const id = document.getElementById('productId').value;
            const name = document.getElementById('productName').value;
            const brand = document.getElementById('productBrand').value;
            const price = Number(document.getElementById('productPrice').value);
            const img = document.getElementById('productImage').value;

            let products = getData(PRODUCT_KEY, []);

            if (id) { // Sửa
                const index = products.findIndex(p => p.id == id);
                if (index !== -1) products[index] = { ...products[index], name, brand, price, img };
            } else { // Thêm mới
                products.push({ id: Date.now(), name, brand, price, img });
            }

            saveData(PRODUCT_KEY, products);
            renderProductTable();
            closeModal();
            alert("Lưu sản phẩm thành công!");
        });
    }

    // B. Xử lý Input Ảnh (Chuyển sang Base64)
    const imageInput = document.getElementById('imageInput');
    if (imageInput) {
        imageInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('imagePreview').src = e.target.result;
                    document.getElementById('imagePreview').style.display = 'block';
                    document.getElementById('productImage').value = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    }
});

// --- 7. CÁC HÀM TOÀN CỤC (GLOBAL FUNCTIONS) ---

// -- Product Modal --
const productModal = document.getElementById('productModal');
window.openModal = function () {
    if (productModal) {
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
        document.getElementById('imagePreview').style.display = 'none';
        productModal.style.display = 'block';
    }
}
window.closeModal = function () { if (productModal) productModal.style.display = 'none'; }

window.editProduct = function (id) {
    const products = getData(PRODUCT_KEY, []);
    const p = products.find(i => i.id == id);
    if (p && productModal) {
        document.getElementById('productId').value = p.id;
        document.getElementById('productName').value = p.name;
        document.getElementById('productBrand').value = p.brand;
        document.getElementById('productPrice').value = p.price;
        document.getElementById('productImage').value = p.img;
        document.getElementById('imagePreview').src = p.img;
        document.getElementById('imagePreview').style.display = 'block';
        productModal.style.display = 'block';
    }
}

window.deleteProduct = function (id) {
    if (confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
        let products = getData(PRODUCT_KEY, []);
        products = products.filter(p => p.id != id);
        saveData(PRODUCT_KEY, products);
        renderProductTable();
    }
}

// -- Order Modal --
const orderModal = document.getElementById('orderModal');
let currentOrderId = null;

window.openOrderModal = function (id) {
    const orders = getData(ORDER_KEY, []);
    const order = orders.find(o => o.id === id);
    if (order && orderModal) {
        currentOrderId = id;
        document.getElementById('modalOrderId').innerText = '#' + order.id;
        document.getElementById('modalCustomer').innerText = order.customer;
        document.getElementById('modalDate').innerText = order.date;
        document.getElementById('modalItems').innerText = order.items;
        document.getElementById('modalTotal').innerText = formatCurrency(order.total);
        document.getElementById('modalStatus').value = order.status;
        orderModal.style.display = 'block';
    }
}

window.saveOrderStatus = function () {
    const newStatus = document.getElementById('modalStatus').value;
    let orders = getData(ORDER_KEY, []);
    const index = orders.findIndex(o => o.id === currentOrderId);
    if (index !== -1) {
        orders[index].status = newStatus;
        saveData(ORDER_KEY, orders);
        renderOrderTable();
        closeOrderModal();
        alert("Cập nhật trạng thái thành công!");
    }
}
window.closeOrderModal = function () { if (orderModal) orderModal.style.display = 'none'; }

// -- User Actions --
window.deleteUser = function (id) {
    if (confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
        let users = getData(USER_KEY, []);
        users = users.filter(u => u.id !== id);
        saveData(USER_KEY, users);
        renderUserTable();
    }
}

// Đóng modal khi click ra ngoài
window.onclick = function (event) {
    if (event.target == productModal) window.closeModal();
    if (event.target == orderModal) window.closeOrderModal();
}