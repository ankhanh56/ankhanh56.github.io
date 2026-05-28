const slides = document.querySelectorAll(".slide_item");
let index = 0;

function showSlide(nextIndex) {
  const current = slides[index];
  const next = slides[nextIndex];

  // slide hiện tại fade out
  current.classList.remove("active");
  current.classList.add("exit");

  setTimeout(() => {
    current.classList.remove("exit");
  }, 1200);

  // slide mới fade in
  next.classList.add("active");

  index = nextIndex;
}

function nextSlide() {
  const nextIndex = (index + 1) % slides.length;
  showSlide(nextIndex);
}

setInterval(nextSlide, 5000);