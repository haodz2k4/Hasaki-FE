//Sự Kiện Click Trên Nút Xóa
document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function() {
        const row = this.closest('tr');
        row.remove();
        updateTotal();
    });
});

//Sự Kiện Thay Đổi Trên Ô Nhập Số Lượng
document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', updateTotal);
});

//Cập nhật tổng tiền
function updateTotal() {
    let total = 0;
    const rows = document.querySelectorAll('#cart-table tbody tr');
    rows.forEach(row => {
        const price = parseFloat(row.cells[1].innerText.replace('đ', '').replace('.', ''));
        const quantity = row.querySelector('.quantity-input').value;
        total += price * quantity;
    });
    document.getElementById('total-amount').innerText = total.toLocaleString('vi-VN') + 'đ';
}
