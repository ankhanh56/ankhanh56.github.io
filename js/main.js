function openQR() {
  document.getElementById("qrModal").classList.add("active");
}

function closeQR(event) {
  if (event.target.id === "qrModal") {
    document.getElementById("qrModal").classList.remove("active");
  }
}