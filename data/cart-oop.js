function Cart(loaclStorageKey){
    const cart ={
        cartItems: undefined,

        loadFromStorage: function() //loadFromStorage(){} 
        {
            this.cartItems== JSON.parse(localStorage.getItem(loaclStorageKey));
            
            if (!this.cartItems) 
            {
                this.cartItems = [
                    {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryOptionId: "1",
                    },
                    {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryOptionId: "2",
                    },
                ];
            }
        },

        saveToStorage() 
        {
        localStorage.setItem(loaclStorageKey, JSON.stringify(this.cartItems));
        },

        addToCart(productId) 
        {
            let matchingItem = 0;
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                cartItem.quantity += Number(
                    document.querySelector(`.js-quantity-selector-${productId}`).value
                );
                matchingItem = 1;
                }
            });

            if (matchingItem === 0) 
            {
                this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: "1",
                });
            }
                this.saveToStorage();
        },

        removeFromCart(productId) 
        {
            const newCart = [];

            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId !== productId) newCart.push(cartItem);
            });

            this.cartItems = newCart;

            this.saveToStorage();
        },

        updateDeliveryOption(productId, deliveryOptionId) 
        {
            let matchingItem;

            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                matchingItem = cartItem;
                }
            });
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }
    };

    return cart;
}

const cart=Cart('cart-oop');
const businessCart=Cart('cart-business');

console.log(cart);
console.log(businessCart)


cart.loadFromStorage();
businessCart.loadFromStorage();

// console.log(cart);

// cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');




// export function calculateQuantity() 
// {
//   let totalQuantity = 0;

//   cart.forEach((cartItem) => {
//     totalQuantity += parseInt(cartItem.quantity, 10);
//   });

//   return totalQuantity;
// }



// export function updateQuantity(productId, quantity) {
//   cart.forEach((cartItem) => {
//     if (cartItem.productId === productId) {
//       cartItem.quantity = quantity;
//     }
//   });
//   saveToStorage();
// }