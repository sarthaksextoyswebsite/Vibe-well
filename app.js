// Default Products
function getDefaultProducts() {
    return [
        {
            id: 1,
            name: "Premium Vibration Massager",
            category: "massagers",
            price: 49.99,
            rating: 4.9,
            reviews: 248,
            image: "images/product1.jpg",
            description: "High-quality vibration massager with multiple settings and rechargeable battery."
        },
        {
            id: 2,
            name: "Luxury Wand Massager",
            category: "luxury",
            price: 79.99,
            rating: 4.8,
            reviews: 312,
            image: "images/product2.jpg",
            description: "Premium wand massager with powerful motor and ergonomic design."
        },
        {
            id: 3,
            name: "Travel Massager",
            category: "massagers",
            price: 39.99,
            rating: 4.6,
            reviews: 156,
            image: "images/product3.jpg",
            description: "Compact travel-friendly massager perfect for on-the-go relaxation."
        },
        {
            id: 4,
            name: "Premium Couples Set",
            category: "couples",
            price: 119.99,
            rating: 4.7,
            reviews: 189,
            image: "images/product4.jpg",
            description: "Complete couples collection designed for enhanced intimacy and pleasure."
        },
        {
            id: 5,
            name: "Deluxe Accessory Kit",
            category: "accessories",
            price: 29.99,
            rating: 4.5,
            reviews: 98,
            image: "images/product5.jpg",
            description: "Complete accessory kit with premium quality materials and storage case."
        },
        {
            id: 6,
            name: "Ultra-Luxury Collection",
            category: "luxury",
            price: 149.99,
            rating: 5.0,
            reviews: 267,
            image: "images/product6.jpg",
            description: "Our finest product - handcrafted with premium materials and advanced technology."
        }
    ];
}

// Display Products
function displayProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
            </div>
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <div class="rating">★★★★★ (${product.reviews} reviews)</div>
            <p class="product-description">${product.description}</p>
            <button class="btn btn-secondary" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = getDefaultProducts().find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

// Display Cart
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const products = getDefaultProducts();
    const container = document.getElementById('cart-items-container');

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <p>Your cart is empty</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }

    container.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                <div class="item-details">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                </div>
                <div class="item-quantity">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <div class="item-total">$${(product.price * item.quantity).toFixed(2)}</div>
                <button class="btn btn-delete" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    }).join('');

    updateCartSummary();
}

// Update Quantity
function updateQuantity(productId, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = Math.max(1, parseInt(quantity));
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

// Increase Quantity
function increaseQuantity(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

// Decrease Quantity
function decreaseQuantity(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Update Cart Summary
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const products = getDefaultProducts();

    let subtotal = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        subtotal += product.price * item.quantity;
    });

    // Get shipping cost
    const shippingMethod = document.querySelector('input[name="cart-shipping"]:checked');
    let shipping = 0;
    if (shippingMethod) {
        if (shippingMethod.value === 'standard') shipping = 5.99;
        else if (shippingMethod.value === 'express') shipping = 12.99;
        else if (shippingMethod.value === 'overnight') shipping = 24.99;
    }

    // Free shipping on orders over $50
    if (subtotal > 50) shipping = 0;

    const tax = (subtotal + shipping) * 0.08;
    const discount = parseFloat(localStorage.getItem('discount')) || 0;
    const total = subtotal + shipping + tax - discount;

    if (document.getElementById('cart-subtotal')) {
        document.getElementById('cart-subtotal').textContent = '$' + subtotal.toFixed(2);
    }
    if (document.getElementById('cart-shipping')) {
        document.getElementById('cart-shipping').textContent = '$' + shipping.toFixed(2);
    }
    if (document.getElementById('cart-tax')) {
        document.getElementById('cart-tax').textContent = '$' + tax.toFixed(2);
    }
    if (document.getElementById('cart-total')) {
        document.getElementById('cart-total').textContent = '$' + total.toFixed(2);
    }
    if (discount > 0 && document.getElementById('cart-discount-row')) {
        document.getElementById('cart-discount-row').style.display = 'flex';
        document.getElementById('cart-discount').textContent = '-$' + discount.toFixed(2);
    }
}

// Apply Promo Code
function applyPromoCode() {
    const promoCode = document.getElementById('promo-code').value.toUpperCase();
    const promoCodes = {
        'SAVE10': 0.10,
        'SAVE20': 0.20,
        'WELCOME5': 0.05
    };

    if (promoCodes[promoCode]) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const products = getDefaultProducts();
        let subtotal = 0;

        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            subtotal += product.price * item.quantity;
        });

        const discount = subtotal * promoCodes[promoCode];
        localStorage.setItem('discount', discount.toString());
        updateCartSummary();
        showNotification('Promo code applied! Save $' + discount.toFixed(2));
    } else {
        showNotification('Invalid promo code');
    }
}

// Filter Products
function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const products = getDefaultProducts();
    const filtered = category ? products.filter(p => p.category === category) : products;
    displayProducts(filtered);
}

// Sort Products
function sortProducts() {
    const sortBy = document.getElementById('sort-filter').value;
    const products = getDefaultProducts();
    let sorted = [...products];

    if (sortBy === 'price-low') {
        sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        sorted.sort((a, b) => b.rating - a.rating);
    }

    displayProducts(sorted);
}

// Validate Checkout
function validateCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return false;
    }
    return true;
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});