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

            // Tài khoản Admin Demo
            if (email === "admin@gmail.com" && password === "123456") {
                // Lưu vào localStorage thông tin admin
                localStorage.setItem("currentUser", JSON.stringify({
                    name: "Admin",
                    email: email,
                    role: "admin"
                }));
                localStorage.setItem("isLoggedIn", "true");

                // Hiển thị thông báo và chuyển hướng
                alert("Đăng nhập Admin thành công!");
                window.location.href = "admin/index.html"; // Chuyển đến trang dashboard admin
                return;
            }

            // Tài khoản User Demo
            if (email === "user@gmail.com" && password === "123456") {
                // Lưu vào localStorage thông tin user
                localStorage.setItem("currentUser", JSON.stringify({
                    name: "Khách hàng",
                    email: email,
                    role: "user"
                }));
                localStorage.setItem("isLoggedIn", "true");

                // Hiển thị thông báo và chuyển hướng
                alert("Đăng nhập User thành công!");
                window.location.href = "trangchu.html"; // Chuyển về trang chủ
                return;
            }

            // Trường hợp sai tài khoản
            alert("Email hoặc mật khẩu không chính xác.\\n(Gợi ý: admin@gmail.com hoặc user@gmail.com / Pass: 123456)");
        });
    }
});
