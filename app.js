// Get all navbar links
const navbarLinks = document.querySelectorAll("nav ul li a");

// Add click event listener to each link
navbarLinks.forEach(link => {
  link.addEventListener("click", e => {
    // Prevent default behavior of link
    e.preventDefault();

    // Get section to scroll to
    const sectionId = link.getAttribute("href");
    const section = document.querySelector(sectionId);

    // Calculate position of section
    const sectionTop = section.offsetTop;

    // Scroll to section
    window.scrollTo({
      top: sectionTop,
      behavior: "smooth"
    });
  });
});
