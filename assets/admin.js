// Khóa để lưu dữ liệu trong LocalStorage
const STORAGE_KEY = 'scent_aura_products';

// Dữ liệu mẫu ban đầu (nếu chưa có gì trong kho)
const sampleData = [
    { id: 1, name: "Oud Wood Intense", brand: "Tom Ford", price: 4500000, img: "https://product.hstatic.net/1000025647/product/122_a7da663bdae84710829d7fd57746c074.jpg" },
    { id: 2, name: "Bleu de Chanel", brand: "Chanel", price: 3800000, img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Sauvage Elixir", brand: "Dior", price: 4200000, img: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Santal 33", brand: "Le Labo", price: 5100000, img: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=600" }
];

// --- CÁC HÀM XỬ LÝ DỮ LIỆU ---

// Lấy danh sách sản phẩm từ LocalStorage
function getProducts() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        return JSON.parse(data);
    } else {
        // Nếu chưa có thì lưu dữ liệu mẫu vào và trả về
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
        return sampleData;
    }
}

// Lưu danh sách sản phẩm vào LocalStorage
function saveProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// --- CÁC HÀM GIAO DIỆN (UI) ---

// Hiển thị bảng sản phẩm
function renderTable(products = getProducts()) {
    const tbody = document.getElementById('product-table-body');
    tbody.innerHTML = ''; // Xóa nội dung cũ

    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${product.id}</td>
            <td><img src="${product.img}" alt="${product.name}"></td>
            <td><strong>${product.name}</strong></td>
            <td>${product.brand}</td>
            <td>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct(${product.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    // Cập nhật số liệu thống kê ở file index.html (nếu đang ở trang index)
    // Đoạn này để mở rộng sau
}

// --- CÁC CHỨC NĂNG THÊM / SỬA / XÓA ---

const modal = document.getElementById('productModal');
const productForm = document.getElementById('productForm');

// Mở modal thêm mới
function openModal() {
    productForm.reset(); // Xóa trắng form
    document.getElementById('productId').value = ''; // Xóa ID ẩn
    document.getElementById('modalTitle').innerText = 'Thêm Sản Phẩm Mới';
    document.getElementById('imagePreview').style.display = 'none';
    modal.style.display = 'block';
}

// Đóng modal
function closeModal() {
    modal.style.display = 'none';
}

// Xem trước ảnh khi nhập link
document.getElementById('productImage').addEventListener('input', function() {
    const imgPreview = document.getElementById('imagePreview');
    if(this.value) {
        imgPreview.src = this.value;
        imgPreview.style.display = 'block';
    } else {
        imgPreview.style.display = 'none';
    }
});

// Xử lý Submit Form (Thêm hoặc Sửa)
productForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Chặn load lại trang

    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const brand = document.getElementById('productBrand').value;
    const price = Number(document.getElementById('productPrice').value);
    const img = document.getElementById('productImage').value;

    let products = getProducts();

    if (id) {
        // Chế độ SỬA
        const index = products.findIndex(p => p.id == id);
        if (index !== -1) {
            products[index] = { ...products[index], name, brand, price, img };
            alert('Cập nhật thành công!');
        }
    } else {
        // Chế độ THÊM MỚI
        const newProduct = {
            id: Date.now(), // Tạo ID ngẫu nhiên theo thời gian
            name,
            brand,
            price,
            img
        };
        products.push(newProduct);
        alert('Thêm mới thành công!');
    }

    saveProducts(products); // Lưu vào LocalStorage
    renderTable(); // Vẽ lại bảng
    closeModal(); // Đóng form
});

// Chức năng Sửa (đổ dữ liệu vào form)
window.editProduct = function(id) {
    const products = getProducts();
    const product = products.find(p => p.id == id);
    
    if (product) {
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productBrand').value = product.brand;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productImage').value = product.img;
        
        // Hiển thị ảnh preview
        const imgPreview = document.getElementById('imagePreview');
        imgPreview.src = product.img;
        imgPreview.style.display = 'block';

        document.getElementById('modalTitle').innerText = 'Chỉnh Sửa Sản Phẩm';
        modal.style.display = 'block';
    }
}

// Chức năng Xóa
window.deleteProduct = function(id) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
        let products = getProducts();
        products = products.filter(p => p.id != id); // Lọc bỏ sản phẩm có id cần xóa
        saveProducts(products);
        renderTable();
    }
}

// Chức năng Tìm kiếm
window.searchProduct = function() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const products = getProducts();
    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(keyword) || 
        p.brand.toLowerCase().includes(keyword)
    );
    renderTable(filteredProducts);
}

// Khởi chạy khi trang load xong
document.addEventListener('DOMContentLoaded', function() {
    // Chỉ chạy renderTable nếu đang ở trang Products (có bảng)
    if(document.getElementById('product-table-body')) {
        renderTable();
    }
});

// Đóng modal khi click ra ngoài vùng modal
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
/* --- assets/js/main.js --- */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. HÀM TẢI SẢN PHẨM TỪ LOCAL STORAGE (Admin đã lưu)
    function loadProductsToHomepage() {
        const container = document.getElementById('new-products-container');
        
        // Nếu không tìm thấy chỗ chứa sản phẩm (ví dụ đang ở trang khác) thì dừng lại
        if (!container) return;

        // Lấy dữ liệu từ kho (giống bên Admin)
        const STORAGE_KEY = 'scent_aura_products';
        let products = JSON.parse(localStorage.getItem(STORAGE_KEY));

        // Nếu chưa có dữ liệu (người dùng chưa vào admin bao giờ), tạo dữ liệu mẫu
        if (!products || products.length === 0) {
            products = [
                { id: 1, name: "Oud Wood Intense", brand: "Tom Ford", price: 4500000, img: "https://product.hstatic.net/1000025647/product/122_a7da663bdae84710829d7fd57746c074.jpg" },
                { id: 2, name: "Bleu de Chanel", brand: "Chanel", price: 3800000, img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80" },
                { id: 3, name: "Sauvage Elixir", brand: "Dior", price: 4200000, img: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?auto=format&fit=crop&w=500&q=80" },
                { id: 4, name: "Santal 33", brand: "Le Labo", price: 5100000, img: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=600" }
            ];
            // Lưu lại để đồng bộ với Admin
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        }

        // Tạo HTML cho từng sản phẩm
        let htmlContent = '';
        products.forEach(p => {
            // Format giá tiền sang VND
            const priceVND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price);

            htmlContent += `
                <div class="swiper-slide">
                    <a href="product-detail.html?id=${p.id}" class="product-card bg-white h-100 d-block text-decoration-none text-dark">
                        <div class="product-img-box position-relative overflow-hidden">
                            <img src="${p.img}" alt="${p.name}" class="w-100" style="height: 300px; object-fit: cover;">
                        </div>
                        <div class="product-info p-3 text-center">
                            <span class="small text-muted text-uppercase">${p.brand}</span>
                            <h6 class="my-2 fw-bold">${p.name}</h6>
                            <span class="price text-danger fw-bold">${priceVND}</span>
                        </div>
                    </a>
                </div>
            `;
        });

        // Đổ HTML vào trang
        container.innerHTML = htmlContent;
    }

    // GỌI HÀM TẢI SẢN PHẨM TRƯỚC
    loadProductsToHomepage();

    // 2. KHỞI TẠO SWIPER SLIDER (Sau khi đã có dữ liệu HTML)
    
    // Slider cho Banner chính (Hero)
    var heroSwiper = new Swiper("#hero", {
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 5000,
        },
    });

    // Slider cho Bộ sưu tập (Collection)
    var collectionSwiper = new Swiper(".perfume-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
        },
    });

    // Slider cho Sản phẩm Mới (Product Slider) - QUAN TRỌNG
    var productSwiper = new Swiper(".product-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
        },
    });
});