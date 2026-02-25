// ======== PROJECT LIGHTBOX (MULTI-IMAGE + ARROW BUTTONS + SMOOTH FADE) ========

class ProjectLightbox {
    constructor() {
        this.projects = [];
        this.currentProject = null;
        this.currentImageIndex = 0;

        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;

        this.init();
    }

    init() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach((card) => {
            const screenshots = Array.from(
                card.querySelectorAll('.project-screenshot')
            ).map(img => ({
                src: img.src,
                alt: img.alt || ""
            }));

            this.projects.push({
                card,
                images: screenshots
            });
        });

        this.createLightbox();
        this.attachEvents();
    }

    createLightbox() {
        const lightbox = document.createElement("div");
        lightbox.id = "project-lightbox";
        lightbox.className = "project-lightbox";

        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>

            <div class="lightbox-container">
                <button class="lightbox-close"><i class="fas fa-times"></i></button>

                <div class="lightbox-image-wrapper">

                    <button class="img-nav img-prev"><i class="fas fa-chevron-left"></i></button>

                    <img class="lightbox-image fade-in" src="">
                    <div class="lightbox-loader">
                        <div class="loader-spinner"></div>
                    </div>

                    <button class="img-nav img-next"><i class="fas fa-chevron-right"></i></button>
                </div>

                <div class="lightbox-controls">
                    <button class="lightbox-control" id="zoomIn"><i class="fas fa-search-plus"></i></button>
                    <button class="lightbox-control" id="zoomOut"><i class="fas fa-search-minus"></i></button>
                    <button class="lightbox-control" id="resetZoom"><i class="fas fa-compress"></i></button>
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);

        this.lightbox = lightbox;
        this.imageElement = lightbox.querySelector(".lightbox-image");
        this.wrapper = lightbox.querySelector(".lightbox-image-wrapper");

        // Buttons
        this.prevBtn = lightbox.querySelector(".img-prev");
        this.nextBtn = lightbox.querySelector(".img-next");
    }

    attachEvents() {
        // Open lightbox
        document.querySelectorAll(".view-image").forEach((btn, index) => {
            btn.addEventListener("click", () => this.open(index));
        });

        // Close
        this.lightbox.querySelector(".lightbox-close").onclick = () => this.close();
        this.lightbox.querySelector(".lightbox-overlay").onclick = () => this.close();

        // Zoom controls
        document.getElementById("zoomIn").onclick = () => this.zoomIn();
        document.getElementById("zoomOut").onclick = () => this.zoomOut();
        document.getElementById("resetZoom").onclick = () => this.resetZoom();

        // Scroll zoom
        this.wrapper.addEventListener("wheel", (e) => {
            e.preventDefault();
            e.deltaY < 0 ? this.zoomIn() : this.zoomOut();
        }, { passive: false });

        // Dragging (mouse)
        this.imageElement.addEventListener("mousedown", e => this.startDrag(e));
        document.addEventListener("mousemove", e => this.drag(e));
        document.addEventListener("mouseup", () => this.endDrag());

        // Dragging (touch)
        this.imageElement.addEventListener("touchstart", e => this.startDrag(e.touches[0]));
        document.addEventListener("touchmove", e => {
            if (this.isDragging) {
                e.preventDefault();
                this.drag(e.touches[0]);
            }
        }, { passive: false });
        document.addEventListener("touchend", () => this.endDrag());

        // NEW — arrow buttons
        this.prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.prevImage();
        });

        this.nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.nextImage();
        });
    }

    // NEW — Hide/show arrows depending on number of images
    updateArrowVisibility() {
        const count = this.currentProject.images.length;

        if (count <= 1) {
            this.prevBtn.style.display = "none";
            this.nextBtn.style.display = "none";
        } else {
            this.prevBtn.style.display = "flex";
            this.nextBtn.style.display = "flex";
        }
    }

    open(projectIndex) {
        this.currentProject = this.projects[projectIndex];
        this.currentImageIndex = 0;

        this.lightbox.classList.add("active");
        document.body.style.overflow = "hidden";

        this.updateArrowVisibility();   // <-- NEW
        this.loadImage(this.currentProject.images[0].src, true);
        this.resetZoom();
    }

    close() {
        this.lightbox.classList.remove("active");
        document.body.style.overflow = "";
        this.resetZoom();
    }

    loadImage(src, instant = false) {
        const img = this.imageElement;
        const loader = this.lightbox.querySelector(".lightbox-loader");

        if (!instant) {
            img.classList.remove("fade-in");
            img.classList.add("fade-out");
        }

        loader.style.display = "flex";

        const temp = new Image();
        temp.onload = () => {
            img.src = src;
            loader.style.display = "none";

            img.classList.remove("fade-out");
            img.classList.add("fade-in");
        };
        temp.src = src;
    }

    nextImage() {
        const imgs = this.currentProject.images;
        this.currentImageIndex = (this.currentImageIndex + 1) % imgs.length;

        this.updateArrowVisibility();   // <-- NEW
        this.loadImage(imgs[this.currentImageIndex].src);
        this.resetZoom();
    }

    prevImage() {
        const imgs = this.currentProject.images;
        this.currentImageIndex =
            (this.currentImageIndex - 1 + imgs.length) % imgs.length;

        this.updateArrowVisibility();   // <-- NEW
        this.loadImage(imgs[this.currentImageIndex].src);
        this.resetZoom();
    }

    // ===== ZOOM / PAN =====

    zoomIn() {
        this.scale = Math.min(this.scale + 0.25, 4);
        this.updateTransform();
    }

    zoomOut() {
        this.scale = Math.max(this.scale - 0.25, 1);
        if (this.scale === 1) {
            this.translateX = 0;
            this.translateY = 0;
        }
        this.updateTransform();
    }

    resetZoom() {
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
    }

    updateTransform() {
        this.imageElement.style.transform =
            `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;

        this.imageElement.style.cursor = this.scale > 1 ? "grab" : "default";
    }

    startDrag(e) {
        if (this.scale <= 1) return;

        this.isDragging = true;
        this.startX = e.clientX - this.translateX;
        this.startY = e.clientY - this.translateY;

        this.imageElement.style.cursor = "grabbing";
    }

    drag(e) {
        if (!this.isDragging) return;

        this.translateX = e.clientX - this.startX;
        this.translateY = e.clientY - this.startY;

        this.updateTransform();
    }

    endDrag() {
        this.isDragging = false;

        if (this.scale > 1) {
            this.imageElement.style.cursor = "grab";
        }
    }
}

// Init when DOM ready
document.addEventListener("DOMContentLoaded", () => {
    new ProjectLightbox();
});
