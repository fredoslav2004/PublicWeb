document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            } else {
                entry.target.classList.remove("is-visible");
            }
        });
    }, {
        rootMargin: "0px",
        threshold: 0.1 // Adjust this value based on when you want the animation to start
    });

    // Observe all sections
    document.querySelectorAll("section").forEach((section) => {
        observer.observe(section);
    });
});
