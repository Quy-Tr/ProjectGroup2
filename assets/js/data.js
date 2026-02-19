const products = [
    // 1. Armaf Club De Nuit Precieux
    {
        id: 1,
        sku: "AR-CDN-PRE-55",
        name: "Armaf Club De Nuit Precieux",
        brand: "Armaf",
        gender: "nam",
        capacity: "55ml",
        price: 1550000,
        img: "https://vuahanghieu.com/images/products/2024/09/16/nuoc-hoa-armaf-club-de-nuit-precieux-extrait-de-parfum-55ml-66e80b27af8bd-16092024172439.jpg",
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
        img: "https://product.hstatic.net/200000404397/product/armaf_odyssey_limoni_fresh_edp_100ml_a1459462d7c5417482834b9cfcf2da06_master.jpg",
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
        img: "https://product.hstatic.net/200000223113/product/nuoc-hoa-nam-armaf-odyssey-homme-edp-white-edition-100ml-1_2c9d1872146f4772b936d54c149eb552_master.jpg",
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
    // 4. Dior Homme Parfum 2025 (Dior Homme Parfum)
    {
        id: 4,
        sku: "DIOR-HOM-PAR-100",
        name: "Dior Homme Parfum",
        brand: "Dior",
        gender: "nam",
        capacity: "100ml",
        price: 3600000,
        img: "https://namperfume.net/wp-content/uploads/2020/06/Dior-Homme-Parfum-100ml.png",
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
        img: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?auto=format&fit=crop&w=500&q=80",
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
        img: "https://file.hstatic.net/1000340570/file/nuoc-hoa-chanel-allure-homme-sport-superleggera-edp-100ml-nam-tinh-manh-me-tuoi-mat_988bd372605e4c029288e1465d3d4b67.jpg",
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
        img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80",
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
        img: "https://www.sephora.com/productimages/sku/s2792695-main-zoom.jpg",
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
    // 9. YSL La Nuit de L’Homme Bleu Electrique EDT Intense
    {
        id: 9,
        sku: "YSL-LANUIT-BLEU-100",
        name: "YSL La Nuit de L’Homme Bleu Electrique",
        brand: "Yves Saint Laurent",
        gender: "nam",
        capacity: "100ml",
        price: 4000000,
        img: "https://product.hstatic.net/1000340570/product/nuoc-hoa-nam-yves-saint-laurent-la-nuit-de-l_homme-bleu-electrique-edt-intense_fc39922e4d0d4e9a80e1572c83315729_master.jpg",
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
        img: "https://images.unsplash.com/photo-1585864190802-bdj4d1a01e52?auto=format&fit=crop&w=500&q=80",
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
        img: "https://product.hstatic.net/1000025647/product/4_156158c3db074cc89369345700810137_master.jpg",
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
    // 12. Yves Saint Laurent Libre Vanille Couture (Libre Flowers & Flames / New 2024/2025)
    {
        id: 12,
        sku: "YSL-LIBRE-VAN-90",
        name: "YSL Libre Vanille Couture",
        brand: "Yves Saint Laurent",
        gender: "nu",
        capacity: "90ml",
        price: 4500000,
        img: "https://www.yslbeauty.co.uk/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw18b62c47/pdp/Fragrance/LIBRE/Libre_Flowers_Flames/WW-51200YSL_Libre_Flowers_Flames_30ml.jpg?sw=650&sh=650&sm=cut&sfrm=jpg&q=85",
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
    // 13. Dior Miss Dior Essence (Miss Dior Parfum 2024 / Essence de Parfum)
    {
        id: 13,
        sku: "DIOR-MISS-ESS-80",
        name: "Miss Dior Essence",
        brand: "Dior",
        gender: "nu",
        capacity: "80ml",
        price: 4800000,
        img: "https://www.dior.com/on/demandware.static/-/Sites-dior_international/default/dw83748281/makeup/2024/miss-dior-parfum/Y0997160/Y0997160_C099700947_E01_GHC.jpg",
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
        img: "https://product.hstatic.net/200000223113/product/nuoc-hoa-nu-versace-crystal-noir-parfum_b740510166d141e69512395632746401_master.jpg",
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
        img: "https://product.hstatic.net/1000025647/product/upload_9f5cb325b1284a0c86241b21c437651a_master.jpg",
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
        img: "https://vuahanghieu.com/images/products/2023/11/22/nuoc-hoa-nu-armaf-le-parfait-pour-femme-panache-edp-100ml-655db4db5d45d-22112023145403.jpg",
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
    // 17. Unisex Yves Saint Laurent Muse (Le Vestiaire des Parfums - New 2025)
    {
        id: 17,
        sku: "YSL-MUSE-125",
        name: "YSL Muse",
        brand: "Yves Saint Laurent",
        gender: "unisex",
        capacity: "125ml",
        price: 8500000,
        img: "https://www.yslbeautyus.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw1b465691/pdp/Fragrance/Le_Vestiaire_Des_Parfums/WW-51300YSL/3614274151703_Muse_125ml.jpg?sw=650&sh=650&sm=cut&sfrm=jpg&q=85",
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
        img: "https://www.yslbeauty.co.uk/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dwbf85078a/pdp/Fragrance/Le_Vestiaire_Des_Parfums/6_place_Saint_Sulpice/WW-50701YSL_6_place_Saint_Sulpice_125ml.jpg?sw=650&sh=650&sm=cut&sfrm=jpg&q=85",
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
