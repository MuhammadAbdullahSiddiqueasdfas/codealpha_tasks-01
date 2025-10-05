// Show tab content on hover
function showContent(id) {
  const lists = document.querySelectorAll('.list');
  lists.forEach(list => list.style.display = 'none');
  const current = document.getElementById(id);
  if (current) current.style.display = 'block';
}

// Scroll animation effect for sections
const sections = document.querySelectorAll(".section, .Aboutme, .myservices, #portfolio, .contact-section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(50px)";
  section.style.transition = "opacity 1s ease, transform 1s ease";
  observer.observe(section);
});

// Scroll-to-top button
const topBtn = document.createElement("button");
topBtn.innerText = "↑";
topBtn.style.position = "fixed";
topBtn.style.bottom = "30px";
topBtn.style.right = "30px";
topBtn.style.padding = "10px 15px";
topBtn.style.fontSize = "20px";
topBtn.style.backgroundColor = "#e91e63";
topBtn.style.color = "#fff";
topBtn.style.border = "none";
topBtn.style.borderRadius = "5px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = 1000;
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact form submission to Google Sheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbzFdu5jXlN4i28Tj_1-_p0iLs63NOkcHK4a33DtXdsMImTDX3cFk-wpDyAx1mjiwBc_/exec';
const form = document.getElementById('contact-form');
const msg = document.getElementById('response-msg');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(scriptURL, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      msg.innerText = "✅ Message sent successfully!";
      form.reset();
    })
    .catch(error => {
      msg.innerText = "❌ Failed to send message.";
      console.error("Error!", error.message);
    });
  });
}
