// Sample cart data (replace with actual data from your backend)
let cartItems = [
    { id: 1, name: "Sản phẩm 1", image: "https://via.placeholder.com/150", price: 100000, quantity: 1, variant: "Màu: Đỏ, Kích thước: M" },
    { id: 2, name: "Sản phẩm 2", image: "https://via.placeholder.com/150", price: 150000, quantity: 2, variant: "Màu: Xanh, Kích thước: L" },
];

// Function to render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const template = document.getElementById('cartItemTemplate');
        const cartItem = template.content.cloneNode(true);

        cartItem.querySelector('.product-image').src = item.image;
        cartItem.querySelector('.product-name').textContent = item.name;
        cartItem.querySelector('.product-variant').textContent = item.variant;
        cartItem.querySelector('.product-quantity').value = item.quantity;
        cartItem.querySelector('.product-price').textContent = formatCurrency(item.price * item.quantity);

        cartItem.querySelector('.decrease-quantity').addEventListener('click', () => updateQuantity(item.id, -1));
        cartItem.querySelector('.increase-quantity').addEventListener('click', () => updateQuantity(item.id, 1));
        cartItem.querySelector('.product-quantity').addEventListener('change', (e) => setQuantity(item.id, parseInt(e.target.value)));
        cartItem.querySelector('.remove-item').addEventListener('click', () => removeItem(item.id));
        cartItem.querySelector('.save-for-later').addEventListener('click', () => saveForLater(item.id));

        cartItemsContainer.appendChild(cartItem);
    });

    updateCartSummary();
    updateEmptyCartState();
}

// Function to update quantity
function updateQuantity(itemId, change) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        renderCartItems();
    }
}

// Function to set quantity directly
function setQuantity(itemId, newQuantity) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        renderCartItems();
    }
}

// Function to remove item
function removeItem(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    renderCartItems();
}

// Function to save item for later (placeholder)
function saveForLater(itemId) {
    alert(`Sản phẩm ${itemId} đã được lưu để mua sau.`);
}

// Function to update cart summary
function updateCartSummary() {
    const summaryContainer = document.getElementById('cartSummary');
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = 30000; // Placeholder shipping cost
    const total = subtotal + shipping;

    summaryContainer.innerHTML = `
        <p>Tạm tính: ${formatCurrency(subtotal)}</p>
        <p>Phí vận chuyển: ${formatCurrency(shipping)}</p>
        <h5>Tổng cộng: ${formatCurrency(total)}</h5>
    `;
}

// Function to update empty cart state
function updateEmptyCartState() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartContainer = document.getElementById('emptyCart');

    if (cartItems.length === 0) {
        cartItemsContainer.classList.add('d-none');
        emptyCartContainer.classList.remove('d-none');
    } else {
        cartItemsContainer.classList.remove('d-none');
        emptyCartContainer.classList.add('d-none');
    }
}

// Function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// Event listener for coupon application
document.getElementById('applyCoupon').addEventListener('click', () => {
    const couponCode = document.getElementById('couponCode').value;
    alert(`Mã giảm giá "${couponCode}" đã được áp dụng.`);
    // Implement actual coupon logic here
});

// Event listener for shipping calculation
document.getElementById('calculateShipping').addEventListener('click', () => {
    const zipCode = document.getElementById('zipCode').value;
    alert(`Phí vận chuyển cho mã bưu điện ${zipCode} đã được tính toán.`);
    // Implement actual shipping calculation logic here
});

// Initial render
renderCartItems();
