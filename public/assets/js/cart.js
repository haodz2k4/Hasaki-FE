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

// Function to update free shipping progress
function updateFreeShippingProgress() {
    const freeShippingThreshold = 500000; // 500,000 VND
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const remainingAmount = Math.max(0, freeShippingThreshold - subtotal);
    const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

    const progressBar = document.getElementById('freeShippingProgress');
    progressBar.style.width = `${progress}%`;

    const progressText = progressBar.querySelector('.progress-text');
    if (remainingAmount > 0) {
        progressText.textContent = `Còn ${formatCurrency(remainingAmount)} nữa để được miễn phí vận chuyển`;
    } else {
        progressText.textContent = 'Bạn đã đủ điều kiện để được miễn phí vận chuyển!';
    }
}

// Function to render recently viewed products
function renderRecentlyViewedProducts() {
    const recentlyViewedContainer = document.getElementById('recentlyViewedProducts');
    recentlyViewedContainer.innerHTML = '';

    // Simulated recently viewed products (replace with actual data)
    const recentlyViewedProducts = [
        { id: 3, name: "Sản phẩm 3", image: "https://via.placeholder.com/150", price: 80000 },
        { id: 4, name: "Sản phẩm 4", image: "https://via.placeholder.com/150", price: 120000 },
        // Add more products as needed
    ];

    recentlyViewedProducts.forEach(product => {
        const template = document.getElementById('productCardTemplate');
        const productCard = template.content.cloneNode(true);

        productCard.querySelector('.product-image').src = product.image;
        productCard.querySelector('.product-name').textContent = product.name;
        productCard.querySelector('.product-price').textContent = formatCurrency(product.price);
        productCard.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product));

        recentlyViewedContainer.appendChild(productCard);
    });
}

// Function to render related products
function renderRelatedProducts() {
    const relatedProductsContainer = document.getElementById('relatedProducts');
    relatedProductsContainer.innerHTML = '';

    // Simulated related products (replace with actual data)
    const relatedProducts = [
        { id: 5, name: "Sản phẩm 5", image: "https://via.placeholder.com/150", price: 90000 },
        { id: 6, name: "Sản phẩm 6", image: "https://via.placeholder.com/150", price: 110000 },
        // Add more products as needed
    ];

    relatedProducts.forEach(product => {
        const template = document.getElementById('productCardTemplate');
        const productCard = template.content.cloneNode(true);

        productCard.querySelector('.product-image').src = product.image;
        productCard.querySelector('.product-name').textContent = product.name;
        productCard.querySelector('.product-price').textContent = formatCurrency(product.price);
        productCard.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product));

        relatedProductsContainer.appendChild(productCard);
    });
}

// Function to add a product to the cart
function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }
    renderCartItems();
    updateCartSummary();
    updateFreeShippingProgress();
    showAddToCartAnimation(product.name);
}

// Function to show add to cart animation
function showAddToCartAnimation(productName) {
    const notification = document.createElement('div');
    notification.className = 'add-to-cart-notification';
    notification.textContent = `${productName} đã được thêm vào giỏ hàng`;
    document.body.appendChild(notification);

    gsap.fromTo(notification,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    setTimeout(() => {
        gsap.to(notification, {
            y: -50, opacity: 0, duration: 0.5, ease: "power2.in",
            onComplete: () => notification.remove()
        });
    }, 2000);
}

// Event listener for gift wrap checkbox
document.getElementById('giftWrap').addEventListener('change', function () {
    updateCartSummary();
});

// Function to update cart summary
function updateCartSummary() {
    const summaryContainer = document.getElementById('cartSummary');
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = 30000; // Placeholder shipping cost
    const giftWrap = document.getElementById('giftWrap').checked ? 20000 : 0;
    const total = subtotal + shipping + giftWrap;

    summaryContainer.innerHTML = `
        <p>Tạm tính: ${formatCurrency(subtotal)}</p>
        <p>Phí vận chuyển: ${formatCurrency(shipping)}</p>
        ${giftWrap > 0 ? `<p>Phí gói quà: ${formatCurrency(giftWrap)}</p>` : ''}
        <h5>Tổng cộng: ${formatCurrency(total)}</h5>
    `;

    // Update cart item count in the header
    const cartItemCount = document.getElementById('cartItemCount');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartItemCount.textContent = totalItems;
}

// Initial render
renderCartItems();
updateCartSummary();
updateFreeShippingProgress();
renderRecentlyViewedProducts();
renderRelatedProducts();
