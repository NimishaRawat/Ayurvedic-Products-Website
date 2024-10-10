const products = [
    {
        name: "Ayurvedic Face Wash",
        description: "with Neem | Reduces acne and control excess oil",
        price: 199.00,
        image: "products/face-wash.webp"
    },
    {
        name: "Kumkumadi Glow Boosting Face Serum",
        description: "Saffron & 24K Gold | Reduces Dullness & Pigmentation",
        price: 599.00,
        image: "products/glow-boosting.webp"
    },
    {
        name: "Methi Shampoo",
        description: "with Methi & Amla | Reduces Dandruff & Flakes",
        price: 399.00,
        image: "products/shampoo.webp"
    },
    {
        name: "Glow Oil",
        description: "with Peepal & Curcumin | Glow and Brighting",
        price: 499.00,
        image: "products/glow-oil.webp"
    },
    // Add more products as needed
];

function displayProducts() {
    const productsContainer = document.querySelector('.products-container');

    products.forEach((product, index) => {  // Use index to create unique identifiers
        const productElement = document.createElement('div');
        productElement.className = 'product-container';
        
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <h1 class="product-name">${product.name}</h1>
                <p class="product-description">${product.description}</p>
                <p class="product-price">Rs. ${product.price.toFixed(2)}</p>
                
                <div class="quantity-selector">
                    <label for="quantity-${index}">Quantity:</label>
                    <input type="number" id="quantity-${index}" placeholder="Enter quantity" min="1">
                </div>
                <button class="add-to-cart" onclick="addToCart('${product.name}', ${product.price}, 'quantity-${index}')">Add to Cart</button>
            </div>
        `;
        
        productsContainer.appendChild(productElement);
    });
}

// Initialize an empty cart array to store cart items
let cartItems = [];

// Function to add items to the cart
function addToCart(productName, productPrice, quantityInputId) {
    // Get the quantity input from the user using the unique id
    const quantityInput = document.getElementById(quantityInputId);
    const quantity = parseInt(quantityInput.value);

    // Check if the quantity is valid
    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return; // Exit the function if quantity is not valid
    }

    // Calculate the total price for the current item
    const totalPrice = (quantity * productPrice).toFixed(2);

    // Add the product to the cartItems array
    const existingItem = cartItems.find(item => item.name === productName);

    if (existingItem) {
        // If the product already exists in the cart, update its quantity
        existingItem.quantity += quantity;
        existingItem.totalPrice = (existingItem.quantity * productPrice).toFixed(2);
    } else {
        // If the product doesn't exist, add a new entry to the cart
        cartItems.push({
            name: productName,
            quantity: quantity,
            totalPrice: totalPrice
        });
    }

    // Update the cart summary display
    updateCartSummary();
}

// Function to update the cart summary display
function updateCartSummary() {
    // Reset cart summary text
    let cartItemText = "Products:\n";
    let totalQuantity = 0;
    let totalCartPrice = 0;

    // Loop through each item in the cartItems array and create a summary string
    cartItems.forEach(item => {
        cartItemText += `${item.name} - Quantity: ${item.quantity} - Total Price: Rs. ${item.totalPrice}\n`;
        totalQuantity += item.quantity;
        totalCartPrice += parseFloat(item.totalPrice);
    });

    // Update the cart summary display
    document.getElementById('cart-item').innerText = cartItemText || "Products: None"; // Show None if cart is empty
    document.getElementById('cart-quantity').innerText = `Total Quantity: ${totalQuantity}`;
    document.getElementById('cart-total').innerText = `Total Price: Rs. ${totalCartPrice.toFixed(2)}`;
}

function clearCart() {
    cartItems = []; // Reset the cartItems array
    updateCartSummary(); // Update the summary to reflect the cleared cart
    alert("Your cart has been cleared!"); // Optional: Notify the user
}

// Display products on page load
displayProducts();
