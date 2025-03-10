// Thêm hiệu ứng đơn giản cho nút "Thêm vào giỏ"
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
    });
});

// Tìm kiếm (chỉ là demo, có thể mở rộng với backend)
const searchBar = document.querySelector('.search-bar');
searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        alert('Tìm kiếm: ' + searchBar.value);
    }
});



