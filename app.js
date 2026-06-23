document.addEventListener('DOMContentLoaded', () => {
    // List of all packaging images
    const images = [
        "Mockup 3kg top buttom Sukkari.png",
        "Mockup 5kg Deglet Nour Processed.png",
        "Mockup 5kg top buttom Medjoul Premium 2026.png",
        "Mockup Ajwa 7 Butir 2026.png",
        "Mockup Ajwa 7 Butir Dus Master.png",
        "Mockup Ajwa Premium 1 kg 2026.png",
        "Mockup Ajwa Premium 250 gr 2026.png",
        "Mockup Ajwa Premium 5 kg 2026.png",
        "Mockup Ajwa Premium Dus Master.png",
        "Mockup Ajwa Signature 1 kg 2026 Dus Master.png",
        "Mockup Ajwa Signature 1 kg 2026.png",
        "Mockup Ajwa Signature 500 gr 2026.png",
        "Mockup Ajwa Signature Dus Master.png",
        "Mockup Bam Mazafati 600 gr 2026.png",
        "Mockup Black Raisins 10 Kg.png",
        "Mockup Black Raisins 250 Gram.png",
        "Mockup Black Raisins 500 Gram.png",
        "Mockup ChiaSeed 250 Gram.png",
        "Mockup ChiaSeed 500 Gram.png",
        "Mockup Chiaseed 25 Kg.png",
        "Mockup Chickpeas 500 Gram 1 Kg Dus Master.png",
        "Mockup Deglet Nour 5kg Signature.png",
        "Mockup Deglet Nour Branch 500 Gram Signature.png",
        "Mockup Deglet Nour Branch Tangkai 5 kg.png",
        "Mockup Deglet Nour Natural 250 Gram Signature.png",
        "Mockup Deglet Nour Natural 5kg.png",
        "Mockup Deglet Nour Natural Branch 500 Gram Signature.png",
        "Mockup Deglet Nour Processed 5 kg.png",
        "Mockup Golden Raisins 10 Kg.png",
        "Mockup Golden Raisins 250 Gram.png",
        "Mockup Himalayan Salt 250 Gram 500 Gram.png",
        "Mockup Macadamia 10 Kg.png",
        "Mockup Medjoul Premium 250gr 2026.png",
        "Mockup Medjoul Premium 500 gr 2026.png",
        "Mockup Medjoul Premium 500gr 2026.png",
        "Mockup Medjoul Signature 1kg 2026.png",
        "Mockup Medjoul Signature 500gr 2026.png",
        "Mockup Medjoul Signature Dus Master.png",
        "Mockup Palestininan Medjoul Dates 1 Kg.png",
        "Mockup Pistachios 10 Kg.png",
        "Mockup Premium Chickpeas 1 Kg.png",
        "Mockup Premium Chickpeas 500 Gram.png",
        "Mockup Premium Mazafati Dates Dus Master.png",
        "Mockup Ranuna Chickpeas Premium 500 Gram.png",
        "Mockup Roasted Almonds 10 Kg.png",
        "Mockup Roasted Almonds 250 Gram.png",
        "Mockup Roasted Almonds 500 Grams.png",
        "Mockup Roasted Cashew 10 Kg.png",
        "Mockup Roasted Cashew 250 Gram.png",
        "Mockup Roasted Cashew 500 Gram.png",
        "Mockup Ruthob 1 Kg Dus Master.png",
        "Mockup Ruthob 1 kg 2026.png",
        "Mockup Shoidi Dates 3 kg 2026.png",
        "Mockup Sukkari 1 kg 2026.png",
        "Mockup Sukkari 500 gr 2026.png",
        "Mockup Sukkari Ember 850 gr 2026.png",
        "Mockup Sukkari Premium Dates 500 Gram 1 Kg Dus Master.png",
        "Mockup Sukkari Premium Dates 850 GRAM.png",
        "Mockup gold raisins.png",
        "Mockup macadamia 250 Gram.png",
        "Mockup macadamia 500 Gram.png",
        "Mockup pistachio 250 Gram.png",
        "Mockup pistachio 500 Gram.png",
        "Mockup trail mix ver 5.png",
        "muesli versi 3 mockup.png"
    ];

    // Categories definition
    const categories = [
        { name: "Ajwa Dates", keywords: ["ajwa"] },
        { name: "Medjoul Dates", keywords: ["medjoul"] },
        { name: "Sukkari Dates", keywords: ["sukkari"] },
        { name: "Deglet Nour Dates", keywords: ["deglet nour"] },
        { name: "Other Dates (Mazafati, Shoidi, Ruthob)", keywords: ["mazafati", "shoidi", "ruthob"] },
        { name: "Raisins", keywords: ["raisin"] },
        { name: "Nuts (Almonds, Cashews, Macadamia, Pistachio)", keywords: ["almond", "cashew", "macadamia", "pistachio"] },
        { name: "Seeds & Grains", keywords: ["chia", "chickpea"] },
        { name: "Mixes & Others", keywords: ["salt", "trail mix", "muesli"] }
    ];

    // Group images by category
    const groupedImages = {};
    categories.forEach(cat => {
        groupedImages[cat.name] = [];
    });
    groupedImages["Uncategorized"] = [];

    images.forEach(filename => {
        const lowerName = filename.toLowerCase();
        let matched = false;

        for (const cat of categories) {
            if (cat.keywords.some(keyword => lowerName.includes(keyword))) {
                groupedImages[cat.name].push(filename);
                matched = true;
                break;
            }
        }

        if (!matched) {
            groupedImages["Uncategorized"].push(filename);
        }
    });

    // Rendering Logic
    const galleryContainer = document.getElementById('gallery-container');
    const backBtnContainer = document.getElementById('back-btn-container');

    function renderCategoryList() {
        galleryContainer.innerHTML = '';
        backBtnContainer.style.display = 'none';

        const grid = document.createElement('div');
        grid.className = 'category-grid';

        for (const [categoryName, categoryImages] of Object.entries(groupedImages)) {
            if (categoryImages.length === 0) continue;

            const thumbnailSrc = `All_SKU_PACKAGING_IMAGE/${categoryImages[0]}`;

            const card = document.createElement('div');
            card.className = 'category-card';
            
            card.innerHTML = `
                <div class="category-image-wrapper">
                    <img src="${thumbnailSrc}" alt="${categoryName}" class="category-img" loading="lazy">
                </div>
                <div class="category-info">
                    <h3 class="category-name">${categoryName}</h3>
                </div>
            `;

            card.addEventListener('click', () => renderCategoryGallery(categoryName, categoryImages));

            grid.appendChild(card);
        }

        galleryContainer.appendChild(grid);
    }

    function renderCategoryGallery(categoryName, categoryImages) {
        galleryContainer.innerHTML = '';
        backBtnContainer.style.display = 'block';

        const section = document.createElement('section');
        section.className = 'category-section';

        const title = document.createElement('h2');
        title.className = 'category-title';
        title.textContent = categoryName;
        section.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'product-grid';

        categoryImages.forEach(filename => {
            let displayName = filename.replace('.png', '').replace(/mockup/i, '').trim();

            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-image', `All_SKU_PACKAGING_IMAGE/${filename}`);
            card.setAttribute('data-title', displayName);

            card.innerHTML = `
                <div class="image-wrapper">
                    <img src="All_SKU_PACKAGING_IMAGE/${filename}" alt="${displayName}" class="product-img" loading="lazy">
                    <div class="view-icon"><i class="fas fa-search-plus"></i></div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${displayName}</h3>
                </div>
            `;

            card.addEventListener('click', () => openLightbox(`All_SKU_PACKAGING_IMAGE/${filename}`, displayName));

            grid.appendChild(card);
        });

        section.appendChild(grid);
        galleryContainer.appendChild(section);
    }

    document.getElementById('back-to-categories').addEventListener('click', renderCategoryList);

    // Initial render
    renderCategoryList();

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('close-lightbox');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');
    const zoomLevelDisplay = document.getElementById('zoom-level');
    const imageContainer = document.querySelector('.lightbox-image-container');

    let currentZoom = 1;
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;

    function openLightbox(imageSrc, title) {
        lightboxImg.src = imageSrc;
        lightboxCaption.textContent = title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        resetZoom();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    }

    function updateTransform() {
        lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
        zoomLevelDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
    }

    function resetZoom() {
        currentZoom = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
    }

    function zoomIn() {
        if (currentZoom < 5) {
            currentZoom += 0.25;
            updateTransform();
        }
    }

    function zoomOut() {
        if (currentZoom > 0.5) {
            currentZoom -= 0.25;
            updateTransform();
        }
    }

    // Event Listeners for Lightbox Controls
    closeBtn.addEventListener('click', closeLightbox);
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    zoomResetBtn.addEventListener('click', resetZoom);

    // Close on click outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === imageContainer) {
            closeLightbox();
        }
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === '+' || e.key === '=') zoomIn();
        if (e.key === '-') zoomOut();
        if (e.key === '0') resetZoom();
    });

    // Panning (Drag) Functionality for Zoomed Image
    imageContainer.addEventListener('mousedown', (e) => {
        if (currentZoom > 1) {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            imageContainer.style.cursor = 'grabbing';
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        imageContainer.style.cursor = 'grab';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
    });

    // Mouse wheel zoom
    imageContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    });
});
