// Hàm format tiền tệ
const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

// 1. Lấy dữ liệu đơn hàng từ LocalStorage
let orders = JSON.parse(localStorage.getItem('adminOrders')) || [];

function loadDashboard() {
    // 2. Tính toán thống kê
    let totalRevenue = 0;
    let totalProductsSold = 0;

    orders.forEach(order => {
        totalRevenue += order.totalPrice;
        // Giả sử mỗi đơn hàng có thuộc tính cartItems chứa danh sách sản phẩm
        order.cartItems.forEach(item => {
            totalProductsSold += item.quantity;
        });
    });

    // 3. Hiển thị lên giao diện
    document.getElementById('total-revenue').innerText = formatter.format(totalRevenue);
    document.getElementById('total-orders').innerText = orders.length;
    document.getElementById('total-products-sold').innerText = totalProductsSold;

    // 4. Hiển thị bảng đơn hàng mới nhất (Lấy 5 đơn cuối cùng)
    const tbody = document.getElementById('recent-orders-body');
    tbody.innerHTML = '';
    
    // Đảo ngược mảng để đơn mới nhất lên đầu, lấy 5 cái
    const recentOrders = [...orders].reverse().slice(0, 5);

    recentOrders.forEach(order => {
        let row = `
            <tr>
                <td>#${order.id}</td>
                <td>${order.customerName}</td>
                <td><strong>${formatter.format(order.totalPrice)}</strong></td>
                <td><span style="color:green; font-weight:bold;">Hoàn thành</span></td>
                <td>${order.date}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Chạy hàm khi trang tải xong
document.addEventListener('DOMContentLoaded', loadDashboard);
