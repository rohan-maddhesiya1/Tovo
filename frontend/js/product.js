
const productContainer = document.getElementById("product-container");

import { products } from "../data/products.js";


function renderProducts(products){
    productContainer.innerHTML = "";
    products.forEach(product => {
        productContainer.innerHTML += `
            <div class = "product">
            <div class="image-container">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h3>${product.name}</h3>
            <span class="quantity">${product.quantity}</span>
            <div class="prices">
                <span class="discounted-price">₹${product.discountedPrice}</span>
                <span class="price">₹${product.price}</span>
                <button id="add-to-cart">+</button>
            </div>
            </div>
        `;
    });
}

renderProducts(products);