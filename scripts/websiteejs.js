document.addEventListener("DOMContentLoaded", function () {
    
    /** Profile Picture */
    document.querySelector(".photo-container img").src = "Untitled design.png";

    /** Image Carousel Animation */
    const carousel = document.querySelector(".image-carousel");
    let scrollAmount = 0;
    
    function autoSlide() {
        scrollAmount = (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) ? 0 : scrollAmount + 1;
        carousel.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
    setInterval(autoSlide, 50);

    /** Fetch CEO Data from Backend */
    fetch("/api/ceo")
        .then(response => response.json())
        .then(data => {
            document.querySelector(".ceo-title a").textContent = data.name;
            document.querySelector(".ceo-text p").textContent = data.bio;
            document.querySelector(".ceo-photo img").src = data.imageSrc;
        });

    /** Fetch Projects from Backend */
    fetch("/api/projects")
        .then(response => response.json())
        .then(projects => {
            const projectContainer = document.querySelector(".projects-grid");
            projectContainer.innerHTML = ""; // Clear existing content
            projects.forEach(project => {
                const projectTile = document.createElement("div");
                projectTile.classList.add("project-tile");
                projectTile.textContent = project;
                projectContainer.appendChild(projectTile);
            });
        });

    /** Show Section Logic */
    const showData = { imageSrc: "show-image.jpg", videoSrc: "https://www.youtube.com/embed/YOUR_VIDEO_ID" };
    document.querySelector(".show-image-container img").src = showData.imageSrc;
    document.querySelector(".show-video-container iframe").src = showData.videoSrc;

    /** Alternate Show Data for Dynamic Updates */
    const alternateShowData = [
        { image: "show-image-2.jpg", video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_2" },
        { image: "show-image-3.jpg", video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_3" }
    ];

    let currentIndex = 0;
    setInterval(() => {
        const { image, video } = alternateShowData[currentIndex];
        document.querySelector(".show-image-container img").src = image;
        document.querySelector(".show-video-container iframe").src = video;
        currentIndex = (currentIndex + 1) % alternateShowData.length;
    }, 10000);
});
