import Cart from "../models/cart.js";
import Product from '../models/product.js';

export const addToCart= async (req, res) => {
    const { userId, products } = req.body;

    let totalPrice = 0;

    for (const product of products) {
        const currProduct = await Product.findOne({ _id: product.productId });
        if (!currProduct) {
            return res.status(404).json({ message: `Product not found: ${product.productId}` });
        }
        totalPrice += currProduct.discountPrice * product.quantity;
    }


    if (!userId || !products) {
        return res.status(400).json({ message: "All fields are required" });
    }


    try {
        let cart = await Cart.findOne({ userId })

        if (!cart) {
            cart = new Cart({ userId, items: products, totalAmount: totalPrice });
            await Cart.create(cart);
            return res.status(201).json(cart);
        }

        products.forEach(product => {
            const item = cart.items.find(
                item => item.productId.toString() === product.productId.toString()
            );

            if (item) {
                item.quantity += product.quantity;
            } else {
                cart.items.push(product);
            }
        });

        cart.totalAmount += totalPrice;
        await cart.save();
        return res.status(200).json(cart);

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const getCartItems = async (req, res)=>{
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const cart = await Cart.findOne({ userId });
        const detailedItems = [];
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        for (const item of cart.items) {
            const productDetail = await Product.findOne({ _id: item.productId });
            if (productDetail) {
                detailedItems.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    ...productDetail._doc
                });
            }
        }
        const cartDetails = {
            userId: cart.userId,
            items: detailedItems,
            totalAmount: cart.totalAmount
        }

        return res.status(200).json(cartDetails);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}