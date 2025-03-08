document.addEventListener("DOMContentLoaded", () => {
    // Year for copyright year
    const currentYear = document.getElementById('currentyear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Date/Time for last modification for website
    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
});
