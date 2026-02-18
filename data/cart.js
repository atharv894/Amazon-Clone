export const cart = [];

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
