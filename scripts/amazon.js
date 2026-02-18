import { cart } from "../data/cart.js";
//          OR
// import { cart as MyCart } from "../data/cart.js";
import { products } from "../data/products.js";
let productsHTML = "";
products.forEach((product) => {
  const html = `
    <div class="product-container">
            <div class="product-image-container">
              <img
                class="product-image"
                src="${product.image}"
              />
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img
                class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png"
              />
              <div class="product-rating-count link-primary">${product.rating.count}</div>
            </div>

            <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png" />
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
          </div>`;
  productsHTML += html;
});

document.querySelector(".products-grid").innerHTML = productsHTML;

let TimerId;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // console.log(button.dataset);
    // console.log(button.dataset.productName);

    const productId = button.dataset.productId;

    let matchingItem = 0;
    cart.forEach((item) => {
      if (item.productId === productId) {
        item.quantity += 1;
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

    let totalQuantity = 0;

    cart.forEach((item) => {
      totalQuantity += parseInt(item.quantity, 10);
    });
    document.querySelector(".js-cart-quantity").innerHTML = totalQuantity;
    // console.log(totalQuantity);
    // console.log(cart);

    const addedMessage = document.querySelector(
      `.js-added-to-cart-${productId}`,
    );

    addedMessage.classList.add("added-to-cart-visible");
    clearTimeout(TimerId);
    TimerId = setTimeout(() => {
      addedMessage.classList.remove("added-to-cart-visible");
    }, 2000);
  });
});
