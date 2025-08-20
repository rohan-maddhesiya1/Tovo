
const productContainer = document.getElementById("product-container");
const cartIcon = document.getElementById("cart");

// import { products } from "../data/products.js";

let cart = [];


async function getProducts() {
  try {
    const res = await fetch('http://localhost:3000/api/products');
    const products = await res.json();
    renderProducts(products);
  }
  catch (err) {
    console.log(err);
  }
}

function renderProducts(products) {
  productContainer.innerHTML = "";
  products.forEach(product => {
    productContainer.innerHTML += `
            <div class = "product">
            <div class="image-container">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h3>${product.name}</h3>
            <span class="quantity">${product.size}</span>
            <div class="prices">
                <span class="discounted-price" data-discounted-price="${product.discountPrice}">₹${product.discountPrice}</span>
                <span class="price">₹${product.actualPrice}</span>
                <div class="cart-counter">
                    <button class="add-to-cart" data-product-id="${product._id}">Add</button>
                </div>
                
            </div>
            </div>
        `;
  });
}


productContainer.addEventListener("click", (e) => {

  if (e.target.classList.contains("add-to-cart")) {
    const productId = e.target.getAttribute("data-product-id");
    const cartCounter = e.target.closest(".cart-counter");

    cart.push({
      productId: productId,
      quantity: 1,
    })
    cartCounter.classList.add("active");

    cartCounter.innerHTML = `
        <button class="decrement" data-product-id="${productId}">-</button>
        <span class="count" data-product-id="${productId}">1</span>
        <button class="increment" data-product-id="${productId}">+</button>
    `;
  }

  if (e.target.classList.contains("increment") || e.target.classList.contains('decrement')) {
    
    const productId = e.target.getAttribute("data-product-id");
    const countElement = document.querySelector(`.count[data-product-id="${productId}"]`);
    const cartItem = cart.find(item => item.productId === productId);

    let count = parseInt(countElement.textContent);

    if (e.target.classList.contains("increment")) {
      count++;
      countElement.textContent = count;

    }
    else if (e.target.classList.contains("decrement") && count > 1) {
      count--;
      countElement.textContent = count;
    }
    else if (e.target.classList.contains("decrement") && count === 1) {
      cart = cart.filter(item => item.productId !== productId);
      const cartCounter = e.target.closest(".cart-counter");
      cartCounter.classList.remove("active");
      cartCounter.innerHTML = `
          <button class="add-to-cart" data-product-id="${productId}">Add</button>
      `;
    }

    //Updating cart value
    if (cartItem) {
      cartItem.quantity = count;
    }
  }

})



async function addToCart(data){
  try{
    const respone = await fetch('http://localhost:3000/api/carts/add',{
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await respone.json();
    if(respone.status === 200 || respone.status === 201) {
    window.location.href = "/html/cart.html"
    }else{
      console.log(result.message);
    }
    
  }catch(err){
    console.log(err);
  }
} 


cartIcon.addEventListener("click",()=>{
  console.log("Cart clicked");
  const userId = sessionStorage.getItem('userId');
  const data = {
    userId,
    products: cart
  }

  addToCart(data);
})


getProducts();