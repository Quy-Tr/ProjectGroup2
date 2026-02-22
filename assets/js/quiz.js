/**
 * quiz.js — SCENT AURA Fragrance Quiz
 * =====================================
 * 6 câu hỏi, thuật toán scoring, gợi ý top 4 sản phẩm từ data.js
 */

/* =============================================================
   QUIZ DATA — 6 câu hỏi, mỗi câu có các lựa chọn với tags
   Tags dùng để match với category, gender, concentration, notes
============================================================= */
const QUESTIONS = [
    {
        id: 'gender',
        question: 'Bạn đang tìm nước hoa cho ai?',
        subtitle: 'Chọn giới tính phù hợp để chúng tôi tìm kiếm chính xác hơn.',
        options: [
            { icon: '👔', label: 'Cho Nam', desc: 'Mạnh mẽ, lịch lãm', tags: { gender: 'nam' } },
            { icon: '👗', label: 'Cho Nữ', desc: 'Tinh tế, quyến rũ', tags: { gender: 'nu' } },
            { icon: '✨', label: 'Unisex', desc: 'Dùng được cho mọi người', tags: { gender: 'unisex' } },
        ]
    },
    {
        id: 'occasion',
        question: 'Bạn thường dùng nước hoa vào dịp nào?',
        subtitle: 'Không gian và thời điểm ảnh hưởng nhiều đến lựa chọn mùi hương.',
        options: [
            { icon: '☀️', label: 'Hàng ngày', desc: 'Đi làm, gặp gỡ bạn bè', tags: { category: ['Cam Chanh', 'Hoa Cỏ', 'Thảo Mộc'] } },
            { icon: '🌙', label: 'Tối / Tiệc', desc: 'Dạ tiệc, hẹn hò', tags: { category: ['Gỗ Ấm', 'Phương Đông', 'Da Thuộc'] } },
            { icon: '💼', label: 'Công sở', desc: 'Chuyên nghiệp, lịch sự', tags: { category: ['Cam Chanh', 'Thảo Mộc', 'Hoa Cỏ'] } },
            { icon: '🏖️', label: 'Ngoài trời', desc: 'Du lịch, dạo phố', tags: { category: ['Cam Chanh', 'Hoa Cỏ'] } },
        ]
    },
    {
        id: 'scentFamily',
        question: 'Nhóm mùi hương nào hấp dẫn bạn nhất?',
        subtitle: 'Đây là bước quan trọng nhất để tìm đúng mùi hương của bạn.',
        options: [
            { icon: '🍋', label: 'Cam Chanh', desc: 'Tươi mát, sảng khoái', tags: { category: 'Cam Chanh' } },
            { icon: '🌸', label: 'Hoa Cỏ', desc: 'Nhẹ nhàng, lãng mạn', tags: { category: 'Hoa Cỏ' } },
            { icon: '🌲', label: 'Gỗ Ấm', desc: 'Sang trọng, ấm áp', tags: { category: 'Gỗ Ấm' } },
            { icon: '🧉', label: 'Phương Đông', desc: 'Bí ẩn, cuốn hút', tags: { category: 'Phương Đông' } },
            { icon: '🍃', label: 'Thảo Mộc', desc: 'Tự nhiên, trong lành', tags: { category: 'Thảo Mộc' } },
            { icon: '🎩', label: 'Da Thuộc', desc: 'Mạnh mẽ, cá tính', tags: { category: 'Da Thuộc' } },
            { icon: '🌿', label: 'Chypre', desc: 'Rêu sồi, tinh tế lạ', tags: { category: 'Chypre' } },
        ]
    },
    {
        id: 'personality',
        question: 'Bạn miêu tả bản thân như thế nào?',
        subtitle: 'Mùi hương thường phản ánh cá tính của người dùng.',
        options: [
            { icon: '🧊', label: 'Lịch lãm', desc: 'Chỉn chu, đúng mực', tags: { category: ['Cam Chanh', 'Hoa Cỏ'] } },
            { icon: '🔥', label: 'Táo bạo', desc: 'Nổi bật, mạnh mẽ', tags: { category: ['Gỗ Ấm', 'Da Thuộc'] } },
            { icon: '🌿', label: 'Tự nhiên', desc: 'Giản dị, gần gũi', tags: { category: ['Thảo Mộc', 'Cam Chanh'] } },
            { icon: '🌌', label: 'Bí ẩn', desc: 'Huyền bí, sâu lắng', tags: { category: ['Phương Đông', 'Gỗ Ấm'] } },
        ]
    },
    {
        id: 'longevity',
        question: 'Bạn muốn hương thơm kéo dài bao lâu?',
        subtitle: 'Nồng độ tinh dầu quyết định thời gian lưu hương trên da.',
        options: [
            { icon: '⚡', label: 'Nhẹ nhàng', desc: '2–4 giờ (EDT)', tags: { concentration: 'Eau De Toilette' } },
            { icon: '💫', label: 'Vừa phải', desc: '4–8 giờ (EDP)', tags: { concentration: 'Eau De Parfum' } },
            { icon: '♾️', label: 'Cả ngày', desc: 'Trên 10 giờ (Extrait)', tags: { concentration: ['Extrait De Parfum', 'Parfum'] } },
        ]
    },
    {
        id: 'budget',
        question: 'Ngân sách bạn dự kiến là bao nhiêu?',
        subtitle: 'Chúng tôi sẽ lọc những lựa chọn phù hợp nhất trong tầm giá của bạn.',
        options: [
            { icon: '💰', label: 'Dưới 1 triệu', desc: '< 1.000.000₫', tags: { priceMax: 1000000 } },
            { icon: '💎', label: '1 – 2 triệu', desc: '1.000.000₫ – 2.000.000₫', tags: { priceMin: 1000000, priceMax: 2000000 } },
            { icon: '👑', label: 'Trên 2 triệu', desc: '> 2.000.000₫', tags: { priceMin: 2000000 } },
        ]
    },
];

/* =============================================================
   STATE
============================================================= */
let currentStep = 0;
let answers = {}; // { questionId: option }

/* =============================================================
   INIT — ẩn quiz-container và results ngay khi trang load
============================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const qc = document.getElementById('quiz-container');
    const rc = document.getElementById('results-container');
    if (qc) qc.style.display = 'none';
    if (rc) rc.style.display = 'none';
});

/* =============================================================
   START QUIZ
============================================================= */
document.getElementById('btn-start').addEventListener('click', startQuiz);

function startQuiz() {
    document.getElementById('quiz-hero').style.display = 'none';
    const qc = document.getElementById('quiz-container');
    qc.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    currentStep = 0;
    answers = {};
    renderStep();
}

/* =============================================================
   RENDER STEP
============================================================= */
function renderStep() {
    const q = QUESTIONS[currentStep];
    const total = QUESTIONS.length;

    // Progress
    document.getElementById('progress-fill').style.width = ((currentStep / total) * 100) + '%';
    document.getElementById('step-label').textContent = `Câu ${currentStep + 1} / ${total}`;

    // Question
    document.getElementById('quiz-q').textContent = q.question;
    document.getElementById('quiz-sub').textContent = q.subtitle;

    // Options
    const grid = document.getElementById('options-grid');
    grid.innerHTML = q.options.map((opt, i) => {
        const isSelected = answers[q.id]?.label === opt.label;
        return `
            <div class="option-card ${isSelected ? 'selected' : ''}"
                 onclick="selectOption(${i})" id="opt-${i}"
                 style="border: 2px solid ${isSelected ? '#c5a059' : '#eaeaea'}; 
                        border-radius: 16px; padding: 25px 15px; cursor: pointer; 
                        transition: all 0.3s ease; 
                        background-color: ${isSelected ? '#fcf9f2' : '#ffffff'};
                        text-align: center; display: flex; flex-direction: column; 
                        align-items: center; justify-content: center; min-height: 180px; 
                        box-shadow: ${isSelected ? '0 8px 25px rgba(197,160,89,0.15)' : '0 4px 15px rgba(0,0,0,0.04)'};
                        transform: ${isSelected ? 'translateY(-3px)' : 'none'};">
                <span class="option-icon" style="font-size: 3rem; margin-bottom: 15px; display: block; filter: ${isSelected ? 'drop-shadow(0 4px 6px rgba(197,160,89,0.3))' : 'none'};">${opt.icon}</span>
                <div class="option-label" style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.15rem; margin-bottom: 8px; color: ${isSelected ? '#c5a059' : '#333'};">${opt.label}</div>
                <div class="option-desc" style="font-size: 0.9rem; color: #777; line-height: 1.4;">${opt.desc}</div>
            </div>
        `;
    }).join('');

    // Buttons
    const btnBack = document.getElementById('btn-back');
    const btnNext = document.getElementById('btn-next');

    btnBack.style.display = currentStep > 0 ? 'inline-flex' : 'none';

    const isLast = currentStep === total - 1;
    btnNext.innerHTML = isLast
        ? 'Xem kết quả <i class="fa-solid fa-wand-magic-sparkles ms-1"></i>'
        : 'Tiếp theo <i class="fa-solid fa-arrow-right ms-1"></i>';

    // Enable next if already answered
    btnNext.disabled = !answers[q.id];
}

/* =============================================================
   SELECT OPTION
============================================================= */
function selectOption(index) {
    const q = QUESTIONS[currentStep];
    answers[q.id] = q.options[index];

    renderStep();

    document.getElementById('btn-next').disabled = false;
}

/* =============================================================
   NAVIGATION
============================================================= */
function nextStep() {
    if (!answers[QUESTIONS[currentStep].id]) return;

    if (currentStep < QUESTIONS.length - 1) {
        currentStep++;
        renderStep();
        scrollToQuiz();
    } else {
        showResults();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
        scrollToQuiz();
    }
}

function scrollToQuiz() {
    document.getElementById('quiz-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* =============================================================
   SCORING ALGORITHM
   Budget = hard filter (loại hẳn nếu ngoài tầm giá).
   Các tiêu chí khác cộng điểm relative.
============================================================= */
function inBudget(product) {
    const ba = answers['budget'];
    if (!ba) return true;
    const { priceMin = 0, priceMax = Infinity } = ba.tags;
    return product.price >= priceMin && product.price <= priceMax;
}

function scoreProduct(product) {
    let score = 0;

    // Q1 — gender (trọng số cao nhất)
    const ga = answers['gender'];
    if (ga && ga.tags.gender) {
        if (product.gender === ga.tags.gender) score += 35;
        // unisex chọn nam/nữ: không phạt nặng
        else if (product.gender === 'unisex') score += 15;
        else score -= 30;
    }

    // Q2 — occasion (category preference)
    const oa = answers['occasion'];
    if (oa && oa.tags.category) {
        const cats = Array.isArray(oa.tags.category) ? oa.tags.category : [oa.tags.category];
        if (cats.includes(product.category)) score += 15;
    }

    // Q3 — scentFamily (tiêu chí chính)
    const sa = answers['scentFamily'];
    if (sa && sa.tags.category) {
        const cats = Array.isArray(sa.tags.category) ? sa.tags.category : [sa.tags.category];
        if (cats.includes(product.category)) score += 40;
        else score -= 10; // nhóm hương sai thì kém ưu tiên
    }

    // Q4 — personality
    const pa = answers['personality'];
    if (pa && pa.tags.category) {
        const cats = Array.isArray(pa.tags.category) ? pa.tags.category : [pa.tags.category];
        if (cats.includes(product.category)) score += 15;
    }

    // Q5 — longevity/concentration
    const la = answers['longevity'];
    if (la && la.tags.concentration) {
        const concs = Array.isArray(la.tags.concentration) ? la.tags.concentration : [la.tags.concentration];
        if (concs.some(c => product.concentration && product.concentration.includes(c))) score += 20;
    }

    return score;
}

/* =============================================================
   SHOW RESULTS
============================================================= */
function showResults() {
    document.getElementById('quiz-container').style.display = 'none';
    const rc = document.getElementById('results-container');
    rc.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 1. Hard filter: chỉ lấy sản phẩm trong ngân sách
    const inBudgetProducts = products.filter(p => inBudget(p));

    // 2. Score + sort
    const scored = inBudgetProducts.map(p => ({
        ...p,
        score: scoreProduct(p)
    })).sort((a, b) => b.score - a.score);

    // 3. Top 4 có điểm dương
    const top4 = scored.filter(p => p.score > 0).slice(0, 4);
    // Fallback: nếu ít hơn 2 kết quả, lấy top trong budget không phân biệt điểm
    const results = top4.length >= 2 ? top4 : scored.slice(0, 4);

    // 4. Điểm lý tưởng tuyệt đối = 35 + 15 + 40 + 15 + 20 = 125
    const IDEAL_SCORE = 125;

    // Scent profile
    const scentFamily = answers['scentFamily']?.label || 'Đa dạng';
    const genderLabel = answers['gender']?.label || 'Tất cả';
    document.getElementById('scent-profile-text').textContent = `${scentFamily} · ${genderLabel}`;

    document.getElementById('result-title').textContent = `Hương ${scentFamily} Là Của Bạn`;
    document.getElementById('result-desc').textContent =
        `Từ ${inBudgetProducts.length} sản phẩm trong tầm giá của bạn, chúng tôi chọn được ${results.length} gợi ý tốt nhất.`;

    // Render cards
    const labels = ['🥇 Phù hợp nhất', '🥈 Lựa chọn #2', '🥉 Lựa chọn #3', '✨ Gợi ý thêm'];
    const grid = document.getElementById('result-grid');

    if (results.length === 0) {
        grid.innerHTML = `<div class="col-12 text-center py-5">
            <i class="fa-solid fa-magnifying-glass fa-2x text-muted mb-3"></i>
            <p class="text-muted">Không tìm thấy sản phẩm phù hợp trong tầm giá này.<br>Hãy thử lại với ngân sách khác.</p>
        </div>`;
        return;
    }

    grid.innerHTML = results.map((p, i) => {
        // % tính từ điểm lý tưởng, giới hạn 30-98%
        const rawPct = Math.round((p.score / IDEAL_SCORE) * 100);
        const pct = Math.min(Math.max(rawPct, 30), 98);
        const tags = [p.category, p.concentration, p.capacity].filter(Boolean);
        return `
            <div class="col-sm-6 col-lg-3">
                <div class="result-card">
                    <div class="rank-badge">${labels[i] || `#${i + 1}`}</div>
                    <div class="match-pct">${pct}% phù hợp</div>
                    <img src="${p.img}"
                         class="result-card-img"
                         alt="${p.name}"
                         onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'" />
                    <div class="result-card-body">
                        <div class="result-card-brand">${p.brand}</div>
                        <div class="result-card-name">${p.name}</div>
                        <div class="result-card-price">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price)}</div>
                        <div class="result-card-tags">
                            ${tags.map(t => `<span class="result-tag">${t}</span>`).join('')}
                        </div>
                        <div class="result-card-actions">
                            <a href="product-detail.html?id=${p.id}" class="btn-view-detail">
                                <i class="fa-regular fa-eye me-1"></i>Chi tiết
                            </a>
                            <button class="btn-add-result" onclick="Cart.add(${p.id}, 1)">
                                <i class="fa-solid fa-cart-plus me-1"></i>Thêm giỏ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


/* =============================================================
   RESET
============================================================= */
function resetQuiz() {
    answers = {};
    currentStep = 0;
    document.getElementById('results-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-hero').style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
