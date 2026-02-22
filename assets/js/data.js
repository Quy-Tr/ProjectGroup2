const PRELOADED_PRODUCTS = [
    // 1. Armaf Club De Nuit Precieux
    {
        id: 1,
        sku: "AR-CDN-PRE-55",
        name: "Armaf Club De Nuit Precieux",
        brand: "Armaf",
        gender: "nam",
        capacity: "55ml",
        price: 1550000,
        img: "assets/images/Armaf-Club-De-Nuit-Precieux-1-Extrait-De-Parfum-01.jpg",
        img2: "assets/images/Armaf-Club-De-Nuit-Precieux-1-Extrait-De-Parfum-02.jpg.webp",
        desc: "Hương Chypre Amber sang trọng với dứa, tiêu hồng và gỗ ấm.",
        category: "Gỗ Ấm",
        notes: {
            top: "Cam Bergamot, Chanh, Tiêu hồng, Dứa, Lê",
            middle: "Hoa nhài, Hoa huệ tây, Gỗ trắng, Rêu sồi",
            base: "Hổ phách, Gỗ tuyết tùng, Da thuộc, Hoắc hương, Vani"
        },
        concentration: "Extrait De Parfum",
        longevity: "Rất lâu - Trên 12 giờ",
        sillage: "Xa - Toả hương trong vòng 2m"
    },
    // 2. Armaf Odyssey Limoni Fresh Edition EDP
    {
        id: 2,
        sku: "AR-ODY-LIM-100",
        name: "Armaf Odyssey Limoni Fresh Edition",
        brand: "Armaf",
        gender: "unisex",
        capacity: "100ml",
        price: 1100000,
        img: "assets/images/Armaf-Odyssey-Limoni-Fresh-Edition-EDP-01.jpg",
        img2: "assets/images/Armaf-Odyssey-Limoni-Fresh-Edition-EDP-02.jpg",
        desc: "Hương chanh tươi mát, sảng khoái như ly trà chanh đá ngày hè.",
        category: "Cam Chanh",
        notes: {
            top: "Chanh vàng, Cam ngọt, Quýt hồng, Cam Bergamot",
            middle: "Hoa cam, Hương biển (Marine), Gừng",
            base: "Trà, Xạ hương, Hổ phách"
        },
        concentration: "Eau De Parfum (EDP)",
        longevity: "Tạm ổn - Từ 6 đến 8 giờ",
        sillage: "Gần - Toả hương trong vòng 1 cánh tay"
    },
    // 3. Armaf Odyssey Homme EDP
    {
        id: 3,
        sku: "AR-ODY-HOM-100",
        name: "Armaf Odyssey Homme",
        brand: "Armaf",
        gender: "nam",
        capacity: "100ml",
        price: 950000,
        img: "assets/images/Armaf-Odyssey-Homme-EDP-01.webp",
        img2: "assets/images/Armaf-Odyssey-Homme-EDP-02.webp",
        desc: "Hương thơm ngọt ngào, ấm áp của Vani và Hổ phách, bản dupe hoàn hảo của TF Noir Extreme.",
        category: "Gỗ Ấm",
        notes: {
            top: "Vani, Hổ phách",
            middle: "Hương phương đông, Gia vị, Hoa diên vĩ (Iris)",
            base: "Vani, Da thuộc, Hoa nhài"
        },
        concentration: "Eau De Parfum (EDP)",
        longevity: "Lâu - Từ 7 đến 12 giờ",
        sillage: "Xa - Toả hương trong vòng 2m"
    },
    // 4. Dior Homme Parfum
    {
        id: 4,
        sku: "DIOR-HOM-PAR-100",
        name: "Dior Homme Parfum",
        brand: "Dior",
        gender: "nam",
        capacity: "100ml",
        price: 3600000,
        img: "assets/images/Dior-Homme-Parfum-2025-01.png.webp",
        img2: "assets/images/Dior-Homme-Parfum-2025-apa-niche-02.png",
        desc: "Đỉnh cao của sự lịch lãm với hoa diên vĩ Tuscan và da thuộc đậm đà.",
        category: "Da Thuộc",
        notes: {
            top: "Cam Ý, Hoa diên vĩ Tuscan",
            middle: "Hoa hồng, Da thuộc",
            base: "Gỗ trần hương (Oud), Gỗ đàn hương, Gỗ tuyết tùng"
        },
        concentration: "Parfum",
        longevity: "Rất lâu - Trên 12 giờ",
        sillage: "Rất xa - Toả hương hơn 2m"
    },
    // 5. Christian Dior Sauvage Elixir
    {
        id: 5,
        sku: "DIOR-SAU-ELI-60",
        name: "Dior Sauvage Elixir",
        brand: "Dior",
        gender: "nam",
        capacity: "60ml",
        price: 4200000,
        img: "assets/images/sauvage-elixir-01.jpg",
        img2: "assets/images/sauvage-elixir-02.jpg",
        desc: "Hương thơm nồng nàn, quyến rũ và đầy bản lĩnh với nồng độ tinh dầu cao.",
        category: "Thảo Mộc",
        notes: {
            top: "Quế, Bạch đậu khấu, Nhục đậu khấu, Bưởi",
            middle: "Hoa oải hương",
            base: "Gỗ đàn hương, Cam thảo, Hổ phách, Hoắc hương"
        },
        concentration: "Elixir (Parfum Concentre)",
        longevity: "Rất lâu - Trên 12 giờ",
        sillage: "Rất xa - Toả hương hơn 2m"
    },
    // 6. Chanel Allure Homme Sport Superleggera EDP
    {
        id: 6,
        sku: "CHA-AHS-SUP-100",
        name: "Chanel Allure Homme Sport Superleggera",
        brand: "Chanel",
        gender: "nam",
        capacity: "100ml",
        price: 4500000,
        img: "assets/images/chanel-allure-homme-sport-superleggera-01.webp",
        img2: "assets/images/chanel-allure-homme-sport-superleggera-edp-02.webp",
        desc: "Phiên bản giới hạn 2024, tái định nghĩa sự tươi mát và tốc độ.",
        category: "Gỗ Ấm",
        notes: {
            top: "Hương cam chanh, Quýt hồng, Bưởi",
            middle: "Hương gỗ, Gỗ tuyết tùng",
            base: "Xạ hương trắng, Hổ phách, Hoắc hương, Gỗ đàn hương"
        },
        concentration: "Eau De Parfum (EDP)",
        longevity: "Tạm ổn - Từ 6 đến 8 giờ",
        sillage: "Gần - Toả hương trong vòng 1 cánh tay"
    },
    // 7. Chanel Bleu de Chanel EDT
    {
        id: 7,
        sku: "CHA-BLEU-EDT-100",
        name: "Bleu de Chanel EDT",
        brand: "Chanel",
        gender: "nam",
        capacity: "100ml",
        price: 3200000,
        img: "assets/images/chanel-bleu-de-chanel-edt-100ml-01.webp",
        img2: "assets/images/chanel-bleu-de-chanel-edt-100ml-02.webp",
        desc: "Mùi hương gỗ thơm kinh điển, nam tính và tự do.",
        category: "Cam Chanh",
        notes: {
            top: "Chanh vàng, Bạc hà, Tiêu hồng, Bưởi",
            middle: "Gừng, Nhục đậu khấu, Hoa nhài",
            base: "Gỗ đàn hương, Hoắc hương, Tuyết tùng, Hương bài"
        },
        concentration: "Eau De Toilette (EDT)",
        longevity: "Tạm ổn - Từ 4 đến 6 giờ",
        sillage: "Gần - Toả hương trong vòng 1 cánh tay"
    },
    // 8. Yves Saint Laurent MYSLF Le Parfum
    {
        id: 8,
        sku: "YSL-MYSLF-PAR-100",
        name: "YSL MYSLF Le Parfum",
        brand: "Yves Saint Laurent",
        gender: "nam",
        capacity: "100ml",
        price: 3800000,
        img: "assets/images/yves-saint-laurent-ysl-myslf-le-parfum-01.png.webp",
        img2: "assets/images/yves-saint-laurent-ysl-myslf-le-parfum-02.png",
        desc: "Hương hoa cam và gỗ đậm đà, khẳng định cái tôi hiện đại.",
        category: "Hoa Cỏ",
        notes: {
            top: "Tiêu đen",
            middle: "Hoa cam Tunisia",
            base: "Vani Bourbon, Hổ phách, Hương gỗ, Hoắc hương"
        },
        concentration: "Le Parfum (Parfum)",
        longevity: "Lâu - Từ 7 đến 12 giờ",
        sillage: "Xa - Toả hương trong vòng 2m"
    },
    // 9. YSL La Nuit de L'Homme Bleu Electrique EDT Intense
    {
        id: 9,
        sku: "YSL-LANUIT-BLEU-100",
        name: "YSL La Nuit de L'Homme Bleu Electrique",
        brand: "Yves Saint Laurent",
        gender: "nam",
        capacity: "100ml",
        price: 4000000,
        img: "assets/images/ysl-bleu-electrique-01.jpg",
        img2: "assets/images/ysl-bleu-electrique-02.jpg",
        desc: "Phiên bản 'Điện' đầy mê hoặc với gừng, bạch đậu khấu và oải hương.",
        category: "Thảo Mộc",
        notes: {
            top: "Bạch đậu khấu, Gừng, Cam Bergamot",
            middle: "Hoa oải hương, Hoa phong lữ",
            base: "Gỗ tuyết tùng, Cỏ hương bài"
        },
        concentration: "Eau De Toilette Intense",
        longevity: "Lâu - Từ 7 đến 12 giờ",
        sillage: "Xa - Toả hương trong vòng 2m"
    },
    // 10. Yves Saint Laurent YSL Black Opium EDP
    {
        id: 10,
        sku: "YSL-BLK-OPI-90",
        name: "YSL Black Opium EDP",
        brand: "Yves Saint Laurent",
        gender: "nu",
        capacity: "90ml",
        price: 3500000,
        img: "assets/images/nuoc-hoa-nu-yves-saint-laurent-ysl-black-opium-eau-de-parfum-150ml-01.webp",
        img2: "assets/images/nuoc-hoa-nu-yves-saint-laurent-ysl-black-opium-eau-de-parfum-150ml-02.webp",
        desc: "Hương cà phê đen gây nghiện kết hợp với hoa trắng nữ tính.",
        category: "Phương Đông",
        notes: {
            top: "Quả lê, Tiêu hồng, Hoa cam",
            middle: "Cà phê, Hoa nhài, Hạnh nhân đắng",
            base: "Vani, Hoắc hương, Gỗ tuyết tùng"
        },
        concentration: "Eau De Parfum (EDP)",
        longevity: "Lâu - Từ 7 đến 12 giờ",
        sillage: "Xa - Toả hương trong vòng 2m"
    },
    // 11. Yves Saint Laurent YSL Libre EDP
    {
        id: 11,
        sku: "YSL-LIBRE-EDP-90",
        name: "YSL Libre EDP",
        brand: "Yves Saint Laurent",
        gender: "nu",
        capacity: "90ml",
        price: 3600000,
        img: "assets/images/nuoc-hoa-nu-yves-saint-laurent-ysl-libre-edp-90ml-01.webp",
        img2: "assets/images/nuoc-hoa-nu-yves-saint-laurent-ysl-libre-edp-90ml-02.webp",
        desc: "Sự tự do quyến rũ với hoa oải hương Pháp và hoa cam Morocco.",
        category: "Hoa Cỏ",
        notes: {
            top: "Hoa oải hương, Quýt hồng, Nho đen",
            middle: "Hoa cam, Hoa nhài",
            base: "Vani Madagascar, Xạ hương, Gỗ tuyết tùng"
        },
        concentration: "Eau De Parfum (EDP)",
        longevity: "Lâu - Từ 7 đến 12 giờ",
        sillage: "Xa - Toả hương trong vòng 2m"
    },
    // 12. Yves Saint Laurent Libre Vanille Couture
    {
        id: 12,
        sku: "YSL-LIBRE-VAN-90",
        name: "YSL Libre Vanille Couture",
        brand: "Yves Saint Laurent",
        gender: "nu",
        capacity: "90ml",
        price: 4500000,
        img: "assets/images/YSL-Libre-Vanille-Couture-EDP-50ml-01.jpg",
        img2: "assets/images/YSL-Libre-Vanille-Couture-EDP-50ml-02.jpg",
        desc: "Phiên bản cao cấp 2025 với Vani Bourbon đen và hương hoa rực rỡ.",
        category: "Hoa Cỏ",
        notes: {
            top: "Hoa oải hương Pháp, Hoa cam Morocco",
            middle: "Hoa ly, Hoa ngọc lan tây, Hoa cọ",
            base: "Vani Bourbon, Tinh chất rượu Rum"
        },
        concentration: "Eau De Parfum (EDP)",
        longevity: "Lâu - Từ 7 đến 12 giờ",
        sillage: "Xa - Toả hương trong vòng 2m"
    },
    // 13. Dior Miss Dior Essence
    {
        id: 13,
        sku: "DIOR-MISS-ESS-80",
        name: "Miss Dior Essence",
        brand: "Dior",
        gender: "nu",
        capacity: "80ml",
        price: 4800000,
        img: "assets/images/miss-dior-essence-80ml-01.webp",
        img2: "assets/images/miss-dior-essence-80ml-02.webp",
        desc: "Hương hoa Chypre đậm đà, tinh tế và sang trọng bậc nhất của Dior.",
        category: "Hoa Cỏ",
        notes: {
            top: "Quả mâm xôi đen, Hoa cơm cháy",
            middle: "Hoa nhài Sambac, Tinh chất hoa nhài",
            base: "Gỗ sồi, Hương gỗ, Hoắc hương"
        },
        concentration: "Essence De Parfum",
        longevity: "Rất lâu - Trên 12 giờ",
        sillage: "Xa - Toả hương trong vòng 2m"
    },
    // 14. Versace Crystal Noir Parfum
    {
        id: 14,
        sku: "VER-CRY-NOIR-90",
        name: "Versace Crystal Noir Parfum",
        brand: "Versace",
        gender: "nu",
        capacity: "90ml",
        price: 2800000,
        img: "assets/images/versace-crystal-noir-2024-parfum-90ml-01.webp",
        img2: "assets/images/versace-crystal-noir-2024-parfum-90ml-02.webp",
        desc: "Hương thơm huyền bí, gợi cảm với gừng, dừa và hoa cam.",
        category: "Phương Đông",
        notes: {
            top: "Gia vị, Tiêu hồng, Quả lý chua đen",
            middle: "Hoa huệ, Caramel, Hoa linh lan",
            base: "Hổ phách, Gỗ đàn hương, Vani, Hoa lan"
        },
        concentration: "Parfum",
        longevity: "Lâu - Từ 7 đến 12 giờ",
        sillage: "Xa - Toả hương trong vòng 2m"
    },
    // 15. Tom Ford Black Orchid EDT
    {
        id: 15,
        sku: "TF-BLK-ORCH-100",
        name: "Tom Ford Black Orchid EDT",
        brand: "Tom Ford",
        gender: "unisex",
        capacity: "100ml",
        price: 3200000,
        img: "assets/images/black-orchid-01.jpg",
        img2: "assets/images/black-orchid-02.jpg",
        desc: "Mạnh mẽ và quyến rũ với phong lan đen, gia vị và hắc hương.",
        category: "Phương Đông",
        notes: {
            top: "Nấm cục (Truffle), Quả lý chua đen, Cam Bergamot",
            middle: "Phong lan đen, Gia vị, Hương trái cây",
            base: "Hoắc hương, Vani, Sô cô la, Hổ phách, Gỗ đàn hương"
        },
        concentration: "Eau De Toilette (EDT)",
        longevity: "Tạm ổn - Từ 4 đến 6 giờ",
        sillage: "Gần - Toả hương trong vòng 1 cánh tay"
    },
    // 16. Armaf Le Parfait Opus Pour Femme EDP
    {
        id: 16,
        sku: "AR-LE-PAR-100",
        name: "Armaf Le Parfait Opus Pour Femme",
        brand: "Armaf",
        gender: "nu",
        capacity: "100ml",
        price: 850000,
        img: "assets/images/Armaf-Le-Parfait-Opus-Pour-Femme-EDP-100ml-01.jpg",
        img2: "assets/images/Armaf-Le-Parfait-Opus-Pour-Femme-EDP-100ml-02.jpg",
        desc: "Sự pha trộn tinh tế của hoa cỏ và trái cây, ngọt ngào và thanh lịch.",
        category: "Hoa Cỏ",
        notes: {
            top: "Quýt hồng, Nho đen, Oải hương",
            middle: "Hoa cam, Hoa nhài, Hoa huệ",
            base: "Vani, Tuyết tùng, Hổ phách, Hoắc hương"
        },
        concentration: "Eau De Parfum (EDP)",
        longevity: "Tạm ổn - Từ 6 đến 8 giờ",
        sillage: "Gần - Toả hương trong vòng 1 cánh tay"
    },
    // 17. Unisex Yves Saint Laurent Muse
    {
        id: 17,
        sku: "YSL-MUSE-125",
        name: "YSL Muse",
        brand: "Yves Saint Laurent",
        gender: "unisex",
        capacity: "125ml",
        price: 8500000,
        img: "assets/images/Unisex-Yves-Saint-Laurent-Muse-01.avif",
        img2: "assets/images/Unisex-Yves-Saint-Laurent-Muse-02.avif",
        desc: "Hương thơm nghệ thuật với hợp hương Mực và Gỗ, độc đáo và lôi cuốn.",
        category: "Gỗ Ấm",
        notes: {
            top: "Hoa oải hương, Hương nhang (Incense)",
            middle: "Hoa diên vĩ (Orris), Vani Bourbon, Cây vông vang",
            base: "Mực (Ink Accord), Gỗ hổ phách"
        },
        concentration: "Eau De Parfum (EDP)",
        longevity: "Lâu - Từ 7 đến 12 giờ",
        sillage: "Xa - Toả hương trong vòng 2m"
    },
    // 18. Unisex Yves Saint Laurent 6 place Saint Sulpice
    {
        id: 18,
        sku: "YSL-6PSS-125",
        name: "YSL 6 Place Saint Sulpice",
        brand: "Yves Saint Laurent",
        gender: "unisex",
        capacity: "125ml",
        price: 8500000,
        img: "assets/images/Unisex-Yves-Saint-Laurent-6-place-Saint-Sulpice-01.png",
        img2: "assets/images/Unisex-Yves-Saint-Laurent-6-place-Saint-Sulpice-02.png",
        desc: "Hương da thuộc và khói ấm áp, gợi nhớ về cửa hàng Couture lịch sử.",
        category: "Da Thuộc",
        notes: {
            top: "Cam Bergamot, Hoa oải hương, Xô thơm",
            middle: "Nhụy hoa nghệ tây (Saffron), Ngò thơm, Nhục đậu khấu",
            base: "Da thuộc, Hương Labdanum, Đậu Tonka"
        },
        concentration: "Eau De Parfum (EDP)",
        longevity: "Rất lâu - Trên 12 giờ",
        sillage: "Xa - Toả hương trong vòng 2m"
    }
];

// Đọc dữ liệu từ Admin hoặc dùng danh sách mặc định
let products = [];
(function () {
    try {
        const stored = localStorage.getItem('scent_aura_products');
        if (stored) {
            const parsed = JSON.parse(stored);

            if (Array.isArray(parsed) && parsed.length > 0) {
                // Kiểm tra xem có sản phẩm mặc định nào bị mất không
                // (có thể do vô tình xóa khi test admin)
                const storedIds = new Set(parsed.map(p => p.id));
                const missingPreloaded = PRELOADED_PRODUCTS.filter(p => !storedIds.has(p.id));

                if (missingPreloaded.length > 0) {
                    // Ghép sản phẩm còn thiếu vào — đặt trước để giữ thứ tự
                    products = [...missingPreloaded, ...parsed];
                    try {
                        localStorage.setItem('scent_aura_products', JSON.stringify(products));
                    } catch (e) {
                        console.warn('Could not save merged products:', e);
                    }
                } else {
                    products = parsed;
                }
            } else {
                // Mảng rỗng hoặc không hợp lệ — khôi phục mặc định
                products = [...PRELOADED_PRODUCTS];
                try {
                    localStorage.setItem('scent_aura_products', JSON.stringify(products));
                } catch (e) { /* ignore */ }
            }
        } else {
            // Chưa có data — khởi tạo từ danh sách mặc định
            products = [...PRELOADED_PRODUCTS];
            try {
                localStorage.setItem('scent_aura_products', JSON.stringify(products));
            } catch (quotaErr) {
                console.warn('localStorage quota exceeded, using in-memory products.');
            }
        }
    } catch (e) {
        // Lỗi parse JSON — dùng danh sách mặc định
        products = [...PRELOADED_PRODUCTS];
        console.warn('Failed to parse scent_aura_products from localStorage:', e);
    }
})();

