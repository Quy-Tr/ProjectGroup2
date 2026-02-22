document.addEventListener('DOMContentLoaded', function () {
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
        window.location.href = '../login.html';
        return;
    }

    const ordersTableBody = document.getElementById('orders-table-body');
    if (!ordersTableBody) return;

    // Lấy tất cả đơn hàng từ localStorage
    let savedOrders = JSON.parse(localStorage.getItem('userOrders')) || [];

    if (savedOrders.length === 0) {
        ordersTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-4 text-muted">
                    <i class="fa-solid fa-box-open fs-1 mb-3 d-block"></i>
                    Bạn chưa có đơn hàng nào.<br>
                    <a href="../products.html" class="btn btn-dark btn-sm mt-3">Mua sắm ngay</a>
                </td>
            </tr>
        `;
        return;
    }

    // Render danh sách đơn hàng
    ordersTableBody.innerHTML = savedOrders.map(order => {
        let statusBadge = '';
        if (order.status === 'pending') {
            statusBadge = '<span class="badge-status status-pending">Đơn hàng mới</span>';
        } else if (order.status === 'shipping') {
            statusBadge = '<span class="badge-status status-shipping">Đang giao hàng</span>';
        } else if (order.status === 'completed') {
            statusBadge = '<span class="badge-status status-completed">Đã giao hàng</span>';
        } else if (order.status === 'cancelled') {
            statusBadge = '<span class="badge-status status-cancelled">Đã hủy</span>';
        } else {
            statusBadge = `<span class="badge-status">${order.status || 'Không xác định'}</span>`;
        }

        const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
        const itemCount = order.itemCount || 1;
        const payment = order.payment || 'Không xác định';
        const imgSrc = order.firstItemImg
            ? (order.firstItemImg.startsWith('http') || order.firstItemImg.startsWith('data:')
                ? order.firstItemImg
                : '../' + order.firstItemImg)
            : 'https://via.placeholder.com/100?text=IMG';

        return `
            <tr>
                <td><a href="#" class="order-id">#${order.id}</a></td>
                <td>${order.date || '—'}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${imgSrc}"
                            class="rounded me-3" style="width: 40px; height: 40px; object-fit: cover; background: #f8f9fa;"
                            onerror="this.src='https://via.placeholder.com/40?text=IMG'">
                        <div>
                            <div class="fw-bold text-dark" style="font-size: 0.9rem;">
                                ${order.firstItemName || 'Đơn hàng Scent Aura'}
                            </div>
                            <div class="text-muted small">
                                ${itemCount > 1 ? `(Và ${itemCount - 1} sản phẩm khác) — ` : ''}${payment}
                            </div>
                        </div>
                    </div>
                </td>
                <td class="order-total">${typeof order.total === 'number' ? formatter.format(order.total) : (order.total || '—')}</td>
                <td>${statusBadge}</td>
            </tr>
        `;
    }).join('');
});
