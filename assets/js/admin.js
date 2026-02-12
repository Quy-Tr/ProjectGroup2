/* =========================================
   PHẦN QUẢN LÝ ĐƠN HÀNG (ORDERS)
   ========================================= */

const ORDER_KEY = 'scent_aura_orders';

// Dữ liệu mẫu đơn hàng (nếu chưa có)
const sampleOrders = [
    { 
        id: "DH001", 
        customer: "Nguyễn Văn A", 
        date: "2024-02-10", 
        total: 4500000, 
        status: "pending", 
        items: "Tom Ford Oud Wood (x1)" 
    },
    { 
        id: "DH002", 
        customer: "Trần Thị B", 
        date: "2024-02-11", 
        total: 3800000, 
        status: "shipping", 
        items: "Bleu de Chanel (x1)" 
    },
    { 
        id: "DH003", 
        customer: "Lê Văn C", 
        date: "2024-02-12", 
        total: 9300000, 
        status: "completed", 
        items: "Santal 33 (x1), Sauvage Elixir (x1)" 
    }
];

// Hàm lấy danh sách đơn hàng
function getOrders() {
    const data = localStorage.getItem(ORDER_KEY);
    if (data) return JSON.parse(data);
    
    localStorage.setItem(ORDER_KEY, JSON.stringify(sampleOrders));
    return sampleOrders;
}

// Hàm hiển thị bảng đơn hàng
function renderOrderTable() {
    const tbody = document.getElementById('order-table-body');
    if (!tbody) return; // Nếu không ở trang orders thì thoát

    const orders = getOrders();
    tbody.innerHTML = '';

    orders.forEach(order => {
        // Tạo nhãn màu sắc cho trạng thái
        let badgeClass = '';
        let statusText = '';
        
        switch(order.status) {
            case 'pending': badgeClass = 'badge-pending'; statusText = 'Đang xử lý'; break;
            case 'shipping': badgeClass = 'badge-shipping'; statusText = 'Đang giao'; break;
            case 'completed': badgeClass = 'badge-completed'; statusText = 'Đã giao'; break;
            case 'cancelled': badgeClass = 'badge-cancelled'; statusText = 'Đã hủy'; break;
        }

        const priceVND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>#${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.date}</td>
            <td>${priceVND}</td>
            <td><span class="badge ${badgeClass}">${statusText}</span></td>
            <td>
                <button class="btn-view" onclick="openOrderModal('${order.id}')">
                    <i class="fas fa-edit"></i> Cập nhật
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- XỬ LÝ MODAL CẬP NHẬT TRẠNG THÁI ---

let currentOrderId = null; // Biến tạm để nhớ đang sửa đơn nào

// Mở modal
function openOrderModal(id) {
    const orders = getOrders();
    const order = orders.find(o => o.id === id);
    
    if (order) {
        currentOrderId = id;
        document.getElementById('modalOrderId').innerText = '#' + order.id;
        document.getElementById('modalCustomer').innerText = order.customer;
        document.getElementById('modalDate').innerText = order.date;
        document.getElementById('modalItems').innerText = order.items;
        document.getElementById('modalTotal').innerText = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total);
        document.getElementById('modalStatus').value = order.status;

        document.getElementById('orderModal').style.display = 'block';
    }
}

// Đóng modal
function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
}

// Lưu trạng thái mới
function saveOrderStatus() {
    const newStatus = document.getElementById('modalStatus').value;
    
    let orders = getOrders();
    const index = orders.findIndex(o => o.id === currentOrderId);
    
    if (index !== -1) {
        orders[index].status = newStatus;
        localStorage.setItem(ORDER_KEY, JSON.stringify(orders)); // Lưu vào bộ nhớ
        
        renderOrderTable(); // Vẽ lại bảng
        closeOrderModal(); // Đóng modal
        alert("Cập nhật trạng thái thành công!");
    }
}

// Tự động chạy khi tải trang
document.addEventListener('DOMContentLoaded', function() {
    renderOrderTable();
});

// Đóng modal khi click ra ngoài
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target == modal) {
        closeOrderModal();
    }
    // Giữ lại logic đóng modal sản phẩm cũ nếu có
    const productModal = document.getElementById('productModal');
    if (productModal && event.target == productModal) {
        productModal.style.display = "none";
    }
}