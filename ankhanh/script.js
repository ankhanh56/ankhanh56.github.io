const body = document.body;
const toggleButton = document.getElementById("toggle-mode");

// Kiểm tra nếu đã lưu chế độ trước đó
if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
}

// Xử lý khi bấm nút chuyển đổi
toggleButton.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    // Lưu trạng thái vào localStorage
    if (body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});


function openInNewTab(url) {
    window.open(url, '_blank');  // Mở trang trong tab mới
}
