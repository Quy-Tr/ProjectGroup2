document.addEventListener('DOMContentLoaded', function () {
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
        window.location.href = '../login.html';
        return;
    }
    const currentUser = JSON.parse(currentUserStr);
    const nameInput = document.getElementById('profileName');
    const emailInput = document.getElementById('profileEmail');
    const phoneInput = document.getElementById('profilePhone');
    if (nameInput) {
        nameInput.value = currentUser.name || "Khách hàng";
    }
    if (emailInput) {
        emailInput.value = currentUser.email || "";
    }
});
