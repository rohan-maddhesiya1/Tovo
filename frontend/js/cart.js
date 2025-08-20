
const cartProducts = document.getElementById("products");
const productTitle = document.getElementById("productTitle");
const orderTitle = document.getElementById("orderTitle");
const pay = document.getElementById("pay");

let cartDetails = [];

productTitle.addEventListener("click", () => {
    window.location.href = "../html/products.html";
});

orderTitle.addEventListener("click", () => {
    window.location.href = "../html/orders.html";
});

fetchCartDetails();


async function fetchCartDetails() {
    try {
        const userId = sessionStorage.getItem('userId');
        const res = await fetch(`http://localhost:3000/api/carts/items/${userId}`)

        cartDetails = await res.json();
        renderProducts(cartDetails);
        console.log(cartDetails);
    } catch (error) {
        console.error("Error fetching cart details:", error);
    }
}


function renderProducts() {
    cartProducts.innerHTML = "";

    cartDetails.items.forEach(item => {
        cartProducts.innerHTML += `
         <div class="product">
            <img src="${item.image}" alt="Product Image" class="product-image">
            <div class="product-details">
                <p class="product-name">${item.name}</p>
                <p class="product-size">${item.size}</p>
                <div class="product-price">
                    <p class="discounted-price">₹${item.discountPrice}</p>
                    <p class="original-price">₹${item.actualPrice}</p>
                </div>

            </div>
            <div class="product-quantity">
                <button class="decrease">-</button>
                <p class="quantity-display">${item.quantity}</p>
                <button class="increase">+</button>
            </div>
        </div>
        `
    })

    cartProducts.innerHTML += `
        <div class="order-summary">
            <p class="title">Order Summary</p>
            <div class="item-total">
                <p>Item Total: </p>
                <p>₹${cartDetails.totalAmount}</p>
            </div>
            <div class="delivery">
                <p>Delivery Charge:</p>
                <p>₹50</p>
            </div>
            <div class="total">
                <p>Total:</p>
                <p>₹${cartDetails.totalAmount + 50}</p>
            </div>
        </div>
    `;
}


pay.addEventListener("click", async () => {
    cartDetails.time = new Date().toISOString();
    console.log(cartDetails);
    handlePayment();

});


async function handlePayment() {
    const data = {
        amount: cartDetails.totalAmount + 50, 
        currency: "INR",
    }

    try {

        const response = await fetch("http://localhost:3000/api/payments/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log("Payment created:", result);

        const options = {
            key: "rzp_test_R7TZ2q82t5gQhi",
            amount: result.amount,
            currency: result.currency,
            name: "TOVO",
            description: "Order Payment",
            image: "https://example.com/your-logo.jpg",
            order_id: result.id,
            handler: function (response) {
                alert("Payment successful!");
                console.log("Payment response:", response);
                createOrder(); // call after success
            },
            prefill: {
                name: "Customer",
                email: "rohan12@gmail.com",
                contact: "9999999999"
            },
            notes: {
                address: "Customer Address"
            },
            theme: {
                color: "#28a745"
            }
        };

        const rzp = new Razorpay(options);
        rzp.on("payment.failed", function (response) {
            alert("Payment failed! " + response.error.description);
            console.error("Payment failed:", response.error);
        });

        rzp.open();

    } catch (error) {
        alert("Error:", error);
    }

};

async function createOrder() {
    cartDetails.time = new Date().toISOString();
    try {
        const response = await fetch("http://localhost:3000/api/orders/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartDetails)
        });
        const result = await response.json();
        console.log("Order created:", result);

        if(response.status === 201) {
            deleteCart(cartDetails.cartId);
            window.location.href = "../html/orders.html"; 
        }
    } catch (error) {
        console.error("Error creating order:", error);
    }
}


async function deleteCart(cartId){
    try {
        const response = await fetch(`http://localhost:3000/api/carts/items/${cartId}`, {
            method: "DELETE"
        });
        const result = await response.json();
        console.log("Cart deleted:", result);
        fetchCartDetails();

    } catch (error) {
        console.error("Error deleting cart:", error);
    }
}



