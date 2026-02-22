export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

export function addToCart(productId) {
  let matchingItem = 0;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity += Number(
        document.querySelector(`.js-quantity-selector-${productId}`).value,
      );
      matchingItem = 1;
    }
  });

  if (matchingItem === 0) {
    cart.push({
      productId: productId,
      quantity: Number(
        document.querySelector(`.js-quantity-selector-${productId}`).value,
      ),
    });
  }
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) newCart.push(cartItem);
  });

  cart = newCart;
}
