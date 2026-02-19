// Biến toàn cục
let currentFilters = {
    brands: [],
    categories: [], // Nhóm mùi hương
    gender: null,
    priceMin: 0,
    priceMax: 10000000,
    search: ""
};

let currentPage = 1;
const productsPerPage = 9;
let filteredProducts = [];

// Khởi tạo
document.addEventListener("DOMContentLoaded", () => {
    renderBrandFilters();
    applyInitialUrlParams();
    setupPriceSlider();
    setupEventListeners();
    filterAndRender(); // Gọi lần đầu
});

function applyInitialUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const genderParam = urlParams.get('gender');

    // Reset filters
    currentFilters.gender = null;
    document.querySelectorAll('.gender-filter').forEach(cb => cb.checked = false);

    if (genderParam) {
        const genderCheckbox = document.querySelector(`.gender-filter[value="${genderParam}"]`);
        if (genderCheckbox) {
            genderCheckbox.checked = true;
            currentFilters.gender = genderParam;
        }
    }
}

// 1. Render Brand Filters
function renderBrandFilters() {
    const brandContainer = document.getElementById('brand-filters');
    if (!brandContainer) return;

    const brands = [...new Set(products.map(p => p.brand))].sort();

    brandContainer.innerHTML = brands.map((brand, index) => `
        <div class="form-check">
            <input class="form-check-input brand-filter" type="checkbox" value="${brand}" id="brand-${index}">
            <label class="form-check-label" for="brand-${index}">${brand}</label>
        </div>
    `).join('');
}

// Main logic: Filter -> Sort -> Pagination -> Render
function filterAndRender() {
    // 1. Filter
    filteredProducts = products.filter(p => {
        // Price
        if (p.price < currentFilters.priceMin || p.price > currentFilters.priceMax) return false;

        // Brand
        if (currentFilters.brands.length > 0 && !currentFilters.brands.includes(p.brand)) return false;

        // Category (Scent Group)
        if (currentFilters.categories.length > 0 && !currentFilters.categories.includes(p.category)) return false;

        // Gender
        // Nếu UI đang check nhiều gender, ta lấy danh sách đó. 
        // Biến currentFilters.gender chỉ là helper ban đầu.
        const checkedGenders = Array.from(document.querySelectorAll('.gender-filter:checked')).map(cb => cb.value);

        // Nếu không check gì => hiển thị hết (hoặc xử lý logic khác tùy business)
        // Nếu có check => sản phẩm phải nằm trong list đã check
        if (checkedGenders.length > 0 && !checkedGenders.includes(p.gender)) return false;

        // Search
        if (currentFilters.search && !p.name.toLowerCase().includes(currentFilters.search.toLowerCase())) return false;

        return true;
    });

    // 2. Sort
    const sortValue = document.getElementById('sort-select').value;
    if (sortValue === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    // Reset pagination to page 1 on new filter
    // Note: Nếu hàm này được gọi từ click chuyển trang thì không reset.
    // Tạm thời ta tách logic chuyển trang ra. 
    // Ở đây ta mặc định khi filter thay đổi thì về trang 1.
    // Để xử lý tốt hơn, ta cần biết là đang "filter" hay "paginate". 
    // Đơn giản nhất: gọi renderPagination(true) để reset.

    renderPagination(true);
}

function renderPagination(resetToFirstPage = false) {
    if (resetToFirstPage) currentPage = 1;

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginationEl = document.getElementById('pagination');
    const productGrid = document.getElementById('product-grid');
    const countLabel = document.getElementById('product-count');

    // Update count
    countLabel.innerText = filteredProducts.length;

    // Slice products for current page
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = filteredProducts.slice(start, end);

    // Render Products
    if (productsToShow.length === 0) {
        productGrid.innerHTML = `<div class="col-12 text-center py-5"><p>Không tìm thấy sản phẩm nào phù hợp.</p></div>`;
    } else {
        productGrid.innerHTML = productsToShow.map(product => `
            <div class="col">
                <div class="product-card h-100">
                    <div class="product-img-box">
                        <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
                        <div class="product-actions">
                            <button class="btn-action" onclick="addToCart(${product.id})" title="Thêm vào giỏ">
                                <i class="fa-solid fa-cart-plus"></i>
                            </button>
                            <a href="product-detail.html?id=${product.id}" class="btn-action" title="Xem chi tiết">
                                <i class="fa-regular fa-eye"></i>
                            </a>
                        </div>
                    </div>
                    <div class="product-info">
                        <span class="product-brand">${product.brand}</span>
                        <h6 class="product-name">
                            <a href="product-detail.html?id=${product.id}" class="text-dark text-decoration-none">${product.name}</a>
                        </h6>
                        <div class="product-sku text-muted small mb-1">SKU: ${product.sku || 'N/A'}</div>
                        <div class="product-price">${formatCurrency(product.price)}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render Pagination Controls
    if (totalPages <= 1) {
        paginationEl.innerHTML = '';
        return;
    }

    let html = '';

    // Prev
    html += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link border-0 text-dark" href="#" onclick="changePage(${currentPage - 1}); return false;">
                    <i class="fas fa-chevron-left"></i>
                </a>
             </li>`;

    // Pages
    for (let i = 1; i <= totalPages; i++) {
        html += `<li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link border-0 ${i === currentPage ? 'bg-dark text-white' : 'text-dark'} rounded-circle mx-1" 
                       href="#" onclick="changePage(${i}); return false;">${i}</a>
                 </li>`;
    }

    // Next
    html += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link border-0 text-dark" href="#" onclick="changePage(${currentPage + 1}); return false;">
                    <i class="fas fa-chevron-right"></i>
                </a>
             </li>`;

    paginationEl.innerHTML = html;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPagination(false); // Don't reset, just re-render grid & controls

    // Scroll to top of grid
    document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' });
}


// Setup Listeners
function setupEventListeners() {
    // Brand Checkboxes
    document.getElementById('brand-filters').addEventListener('change', () => {
        currentFilters.brands = Array.from(document.querySelectorAll('.brand-filter:checked')).map(cb => cb.value);
        filterAndRender();
    });

    // Category Checkboxes (Scent Groups)
    document.querySelectorAll('.category-filter').forEach(input => {
        input.addEventListener('change', () => {
            currentFilters.categories = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);
            filterAndRender();
        });
    });

    // Gender Checkboxes
    document.querySelectorAll('.gender-filter').forEach(input => {
        input.addEventListener('change', () => {
            filterAndRender();
        });
    });

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => filterAndRender());
    }

    // Search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilters.search = e.target.value;
            filterAndRender();
        });
    }
}

// Dual price slider using noUiSlider
function setupPriceSlider() {
    const slider = document.getElementById('price-slider');
    if (!slider || typeof noUiSlider === 'undefined') return;

    noUiSlider.create(slider, {
        start: [0, 10000000],
        connect: true,
        step: 100000,
        range: {
            'min': 0,
            'max': 10000000
        },
        format: {
            to: value => Math.round(value),
            from: value => Number(value)
        }
    });

    // Style the connect bar with accent color
    slider.querySelector('.noUi-connect').style.background = '#c5a059';

    slider.noUiSlider.on('update', (values) => {
        currentFilters.priceMin = parseInt(values[0]);
        currentFilters.priceMax = parseInt(values[1]);
        document.getElementById('price-min-display').textContent = formatCurrency(values[0]);
        document.getElementById('price-max-display').textContent = formatCurrency(values[1]);
    });

    slider.noUiSlider.on('change', () => {
        filterAndRender();
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function filterByGender(gender) {
    document.querySelectorAll('.gender-filter').forEach(cb => cb.checked = false);
    const target = document.querySelector(`.gender-filter[value="${gender}"]`);
    if (target) target.checked = true;
    filterAndRender();
}

function addToCart(productId) {
    alert(`Đã thêm sản phẩm ID ${productId} vào giỏ hàng!`);
}
