document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("regEmail").value.trim();
            const password = document.getElementById("regPassword").value;
            const confirm = document.getElementById("regConfirm").value;

            if (password !== confirm) {
                alert("Mật khẩu nhập lại không khớp!");
                return;
            }

            // Lấy danh sách users
            let users = JSON.parse(localStorage.getItem('scent_aura_users')) || [];

            // Kiểm tra trùng email
            if (users.some(u => u.email === email)) {
                alert("Email này đã được sử dụng!");
                return;
            }

            // Tạo user mới
            const newUser = {
                id: Date.now(), // Random ID
                name: "Thành viên mới",
                email: email,
                phone: "",
                role: "user",
                status: "active",
                password: password
            };

            users.push(newUser);
            localStorage.setItem('scent_aura_users', JSON.stringify(users));

            alert("Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...");
            window.location.href = "login.html";
        });
    }
});
