document.addEventListener('DOMContentLoaded', function () {
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
        window.location.href = '../login.html';
        return;
    }

    const ordersTableBody = document.getElementById('orders-table-body');
    if (!ordersTableBody) return;

    // Lấy dữ liệu từ localStorage
    let savedOrders = JSON.parse(localStorage.getItem('userOrders')) || [];

    // Tự động xóa những đơn hàng cũ (bị thiếu ảnh do code đợt trước) để dọn dẹp
    const oldLength = savedOrders.length;
    savedOrders = savedOrders.filter(order => order.firstItemImg && order.firstItemName);
    if (savedOrders.length !== oldLength) {
        localStorage.setItem('userOrders', JSON.stringify(savedOrders));
    }

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
        if (order.status === 'Processing') {
            statusBadge = '<span class="badge-status status-pending">Đơn hàng mới</span>';
        } else if (order.status === 'Completed') {
            statusBadge = '<span class="badge-status status-completed">Đã giao hàng</span>';
        } else {
            statusBadge = `<span class="badge-status">${order.status}</span>`;
        }

        return `
            <tr>
                <td><a href="#" class="order-id">${order.id}</a></td>
                <td>${order.date}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${(order.firstItemImg && order.firstItemImg.startsWith('http')) ? order.firstItemImg : (order.firstItemImg ? '../' + order.firstItemImg : 'https://via.placeholder.com/100?text=IMG')}"
                            class="rounded me-3" style="width: 40px; height: 40px; object-fit: cover; background: #f8f9fa;">
                        <div>
                            <div class="fw-bold text-dark" style="font-size: 0.9rem;">
                                ${order.firstItemName || 'Đơn hàng Scent Aura'}
                            </div>
                            <div class="text-muted small">
                                ${order.itemCount > 1 ? `(Và ${order.itemCount - 1} sản phẩm khác) - ` : ''}${order.payment}
                            </div>
                        </div>
                    </div>
                </td>
                <td class="order-total">${order.total}</td>
                <td>${statusBadge}</td>
            </tr>
        `;
    }).join('');
});
