// Stripe Integration for Checkout
const stripe = Stripe('pk_test_YOUR_STRIPE_KEY_HERE');
const elements = stripe.elements();
const cardElement = elements.create('card');

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Stripe card element if on checkout page
    const cardElementContainer = document.getElementById('card-element');
    if (cardElementContainer) {
        cardElement.mount('#card-element');
        setupCheckoutListeners();
        loadCheckoutSummary();
    }

    // Handle form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
});

function setupCheckoutListeners() {
    // Shipping method changes
    document.querySelectorAll('input[name="shipping"]').forEach(radio => {
        radio.addEventListener('change', updateCheckoutSummary);
    });

    // Handle form validation
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('phone').addEventListener('blur', validatePhone);
}

function loadCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const products = getDefaultProducts();

    let subtotal = 0;
    const orderItems = document.getElementById('order-items');
    
    if (!orderItems) return;

    orderItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;

        return `
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb;">
                <div>
                    <p style="margin: 0; font-weight: bold;">${product.name}</p>
                    <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Qty: ${item.quantity}</p>
                </div>
                <p style="margin: 0; font-weight: bold; color: #8b5cf6;">$${itemTotal.toFixed(2)}</p>
            </div>
        `;
    }).join('');

    document.getElementById('checkout-subtotal').textContent = '$' + subtotal.toFixed(2);
    updateCheckoutSummary();
}

function updateCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const products = getDefaultProducts();

    // Calculate subtotal
    let subtotal = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        subtotal += product.price * item.quantity;
    });

    // Get shipping cost
    const shippingMethod = document.querySelector('input[name="shipping"]:checked');
    let shipping = 0;

    if (shippingMethod) {
        if (shippingMethod.value === 'standard') shipping = 5.99;
        else if (shippingMethod.value === 'express') shipping = 12.99;
        else if (shippingMethod.value === 'overnight') shipping = 24.99;
    }

    // Free shipping on orders over $50
    if (subtotal > 50) {
        shipping = 0;
    }

    // Calculate tax (default 8%)
    const taxRate = 0.08;
    const tax = (subtotal + shipping) * taxRate;

    // Get discount
    const discount = parseFloat(localStorage.getItem('discount')) || 0;

    // Calculate total
    const total = subtotal + shipping + tax - discount;

    // Update display
    document.getElementById('checkout-subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('checkout-shipping').textContent = '$' + shipping.toFixed(2);
    document.getElementById('checkout-tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('checkout-total').textContent = '$' + total.toFixed(2);

    if (discount > 0) {
        document.getElementById('checkout-discount-row').style.display = 'flex';
        document.getElementById('checkout-discount').textContent = '-$' + discount.toFixed(2);
    }
}

async function handleCheckout(e) {
    e.preventDefault();

    // Validate form
    if (!validateCheckoutForm()) {
        return;
    }

    // Get card element
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
        showNotification('Payment error: ' + error.message);
        return;
    }

    // Show processing message
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;

    try {
        // Simulate payment processing
        // In production, you would send the token to your server
        const response = await simulatePaymentProcessing(token);

        if (response.success) {
            // Save order confirmation
            saveOrderConfirmation();

            // Show success message
            showNotification('Order placed successfully!');

            // Redirect to confirmation page
            setTimeout(() => {
                window.location.href = 'order-confirmation.html?order=' + response.orderId;
            }, 2000);
        } else {
            showNotification('Payment failed. Please try again.');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    } catch (error) {
        showNotification('Error: ' + error.message);
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

async function simulatePaymentProcessing(token) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                orderId: 'ORD-' + Date.now()
            });
        }, 2000);
    });
}

function validateCheckoutForm() {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const agreeTerms = document.getElementById('agree-terms').checked;

    if (!email || !phone || !firstName || !lastName || !address || !city || !state || !zip) {
        showNotification('Please fill in all required fields');
        return false;
    }

    if (!agreeTerms) {
        showNotification('Please agree to terms and conditions');
        return false;
    }

    return true;
}

function validateEmail(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        e.target.style.borderColor = '#ef4444';
        showNotification('Please enter a valid email');
    } else {
        e.target.style.borderColor = '#e5e7eb';
    }
}

function validatePhone(e) {
    const phone = e.target.value;
    const phoneRegex = /^[\d\-\+\(\)\s]{10,}$/;
    
    if (phone && !phoneRegex.test(phone)) {
        e.target.style.borderColor = '#ef4444';
        showNotification('Please enter a valid phone number');
    } else {
        e.target.style.borderColor = '#e5e7eb';
    }
}

function saveOrderConfirmation() {
    const order = {
        orderId: 'ORD-' + Date.now(),
        email: document.getElementById('email').value,
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        phone: document.getElementById('phone').value,
        shippingMethod: document.querySelector('input[name="shipping"]:checked').value,
        orderDate: new Date().toISOString(),
        items: JSON.parse(localStorage.getItem('cart')) || [],
        total: document.getElementById('checkout-total').textContent
    };

    localStorage.setItem('lastOrder', JSON.stringify(order));
    localStorage.removeItem('cart');
    localStorage.removeItem('discount');
}

// Handle card errors
cardElement.addEventListener('change', function(event) {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
        if (displayError) {
            displayError.textContent = event.error.message;
        }
    } else {
        if (displayError) {
            displayError.textContent = '';
        }
    }
});