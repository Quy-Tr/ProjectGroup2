/* File xử lý chức năng đăng nhập demo */
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Ngăn trình duyệt reload trang

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            if (!email || !password) {
                alert("Vui lòng nhập đầy đủ Email và Mật khẩu!");
                return;
            }

            // Khởi tạo DB người dùng nếu chưa có
            let users = JSON.parse(localStorage.getItem('scent_aura_users')) || [];

            // Đảm bảo tạo tài khoản mặc định nếu chưa có
            let isModified = false;
            if (!users.some(u => u.email === "admin@gmail.com")) {
                users.push({ id: 101, name: "Admin Quản Trị", email: "admin@gmail.com", phone: "0909123456", role: "admin", status: "active", password: "123456" });
                isModified = true;
            }
            if (!users.some(u => u.email === "user@gmail.com")) {
                users.push({ id: 102, name: "Khách hàng", email: "user@gmail.com", phone: "0912345678", role: "user", status: "active", password: "123456" });
                isModified = true;
            }

            if (isModified) {
                localStorage.setItem('scent_aura_users', JSON.stringify(users));
            }

            const foundUser = users.find(u => u.email === email && u.password === password);

            if (foundUser) {
                if (foundUser.status === 'locked') {
                    alert("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin!");
                    return;
                }

                // Lưu vào localStorage thông tin người dùng đang truy cập
                localStorage.setItem("currentUser", JSON.stringify({
                    id: foundUser.id,
                    name: foundUser.name,
                    email: foundUser.email,
                    phone: foundUser.phone,
                    role: foundUser.role
                }));
                localStorage.setItem("isLoggedIn", "true");

                // Phân quyền chuyển hướng
                if (foundUser.role === 'admin') {
                    alert("Đăng nhập Admin thành công!");
                    window.location.href = "admin/index.html";
                } else {
                    alert("Đăng nhập thành công!");
                    window.location.href = "trangchu.html";
                }
                return;
            }

            // Trường hợp sai tài khoản
            alert("Email hoặc mật khẩu không chính xác.\\n(Gợi ý: admin@gmail.com hoặc user@gmail.com / Pass: 123456)");
        });
    }
});
