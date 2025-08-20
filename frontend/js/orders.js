const ordersContainer = document.getElementById("orders-container");
const userId = sessionStorage.getItem('userId');
const productTitle = document.getElementById("productsTitle");
const cartIcon = document.getElementById("cart");


productTitle.addEventListener("click", () => {
    window.location.href = "../html/products.html";
});

cartIcon.addEventListener("click", () => {
    window.location.href = "../html/cart.html";
});

async function fetchOrders() {
    try{
        const res = await fetch(`http://localhost:3000/api/orders/${userId}`);
        const data = await res.json();
        console.log("Fetched orders:", data);
        renderOrders(data);

    } catch (error) {
        console.error("Error fetching orders:", error);
    }
}

function renderOrders(orders) {
    if (orders.length === 0) {
        ordersContainer.innerHTML = "<p>No orders found.</p>";
        return;
    }

    ordersContainer.innerHTML = "";
    let html = ""

    orders.forEach(order => {
        const orderTime = new Date(order.time).getTime();
        const now = Date.now();
        const expiry = orderTime + 20 * 60 * 1000; 
        const timeLeft = Math.max(0, expiry - now);
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);

        html = `
            <div class="order-card">
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Delivery Partner:</strong> ${order.deliveryPartner}</p>
            <p><strong>Total:</strong> ₹${order.totalAmount}</p>
            <p><strong>Time:</strong> ${new Date(order.time).toLocaleString()}</p>
            <p class="timer" data-order-id="${order._id}"><strong>Delivery:</strong> <span>${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</span></p>
            <div>
                <strong>Items:</strong>
                <ul>
                    ${order.items.map(item => `<li>${item.name} x ${item.quantity}</li>`).join("")}
                </ul>
            </div>
            </div>
        ` + html;
    });
    ordersContainer.innerHTML = html;

    // Start countdown timers for each order
    const timers = document.querySelectorAll('.timer');
    timers.forEach(timer => {
        const orderId = timer.getAttribute('data-order-id');
        const order = orders.find(o => o._id === orderId);
        if (!order) return;
        let expiry = new Date(order.time).getTime() + 20 * 60 * 1000;
        function updateTimer() {
            const now = Date.now();
            let timeLeft = Math.max(0, expiry - now);
            let minutes = Math.floor(timeLeft / 60000);
            let seconds = Math.floor((timeLeft % 60000) / 1000);
            timer.querySelector('span').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            if (timeLeft <= 0) {
                timer.textContent = 'Delivered';
                clearInterval(interval);
            }
        }
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
    });
}


fetchOrders();