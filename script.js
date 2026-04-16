document.addEventListener('DOMContentLoaded', () => {
    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    
    // Zooming variables
    let currentZoom = 1;
    let minZoom = 0.1;
    let maxZoom = 10;
    let isDragging = false;
    let startX, startY;
    let translateX = 0;
    let translateY = 0;
    let initialPinchDistance = null;

    if (lightbox && lightboxImg && closeBtn) {
        
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                if(img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    // Reset zoom state
                    currentZoom = 1;
                    translateX = 0;
                    translateY = 0;
                    updateImageTransform(false);
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightboxImg.src = '';
            }, 400);
            document.body.style.overflow = 'auto';
        };

        closeBtn.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', function(e) {
            if (e.target !== lightboxImg && !isDragging) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

        // Zoom capability (Wheel)
        lightbox.addEventListener('wheel', function(e) {
            if (lightbox.classList.contains('active')) {
                e.preventDefault();
                let zoomDelta = e.deltaY < 0 ? 0.1 : -0.1;
                currentZoom = Math.max(minZoom, Math.min(maxZoom, currentZoom + zoomDelta * currentZoom));
                updateImageTransform();
            }
        }, { passive: false });

        // Pan capability (Desktop Dragging)
        lightboxImg.addEventListener('mousedown', function(e) {
            e.preventDefault();
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                translateX = e.clientX - startX;
                translateY = e.clientY - startY;
                updateImageTransform();
            }
        });

        document.addEventListener('mouseup', function() {
            if (isDragging) {
                 setTimeout(() => { isDragging = false; }, 50);
            }
        });
        
        lightboxImg.addEventListener('dragstart', (e) => e.preventDefault());

        // Mobile Pinch to Zoom & Pan
        lightboxImg.addEventListener('touchstart', function(e) {
            if (e.touches.length === 2) {
                initialPinchDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
            } else if (e.touches.length === 1) {
                isDragging = true;
                startX = e.touches[0].clientX - translateX;
                startY = e.touches[0].clientY - translateY;
            }
        }, {passive: false});

        lightboxImg.addEventListener('touchmove', function(e) {
            if (e.touches.length === 2 && initialPinchDistance) {
                e.preventDefault();
                const currentDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                const ratio = currentDistance / initialPinchDistance;
                let newZoom = currentZoom * ratio;
                currentZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
                updateImageTransform();
                initialPinchDistance = currentDistance;
            } else if (e.touches.length === 1 && isDragging) {
                e.preventDefault();
                translateX = e.touches[0].clientX - startX;
                translateY = e.touches[0].clientY - startY;
                updateImageTransform();
            }
        }, {passive: false});

        lightboxImg.addEventListener('touchend', function(e) {
            if (e.touches.length < 2) {
                initialPinchDistance = null;
            }
            if (e.touches.length === 0) {
                 setTimeout(() => { isDragging = false; }, 50);
            }
        });

        function updateImageTransform(withTransition = false) {
            if(withTransition) {
                lightboxImg.style.transition = 'transform 0.1s linear';
            } else {
                lightboxImg.style.transition = 'none';
            }
            lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
        }
    }
});
