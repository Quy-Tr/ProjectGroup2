document.addEventListener('DOMContentLoaded', function () {
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
        // Nếu chưa đăng nhập, đá về trang login
        window.location.href = '../login.html';
        return;
    }

    const currentUser = JSON.parse(currentUserStr);

    const nameInput = document.getElementById('profileName');
    const emailInput = document.getElementById('profileEmail');
    const phoneInput = document.getElementById('profilePhone');

    // Cập nhật tên theo localStorage, nếu không có lấy "Khách hàng"
    if (nameInput) {
        nameInput.value = currentUser.name || "Khách hàng";
    }

    // Cập nhật email theo localStorage
    if (emailInput) {
        emailInput.value = currentUser.email || "";
    }
});
