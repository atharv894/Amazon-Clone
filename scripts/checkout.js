import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
// import { formatCurrency } from "../scripts/utils/money.js";
//            OR
import { formatCurrency } from "./utils/money.js";
import { calculateQuantity } from "../data/cart.js";
import { updateQuantity } from "../data/cart.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

hello();
const today = dayjs();
console.log(today);
const deliveryDate = today.add(7, "days");
console.log(deliveryDate);
console.log(deliveryDate.format("dddd, MMMM D"));

let cartSummaryHTML = "";
let count = 0;

cart.forEach((cartItem) => {
  count += 1;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === cartItem.productId) matchingProduct = product;
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) deliveryOption = option;
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

  cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
           
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}" >
                    Update
                  </span>
                  <input class="quantity-input">
                  <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>
 
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                 ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>`;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    if (!deliveryOption) {
      console.error("Invalid delivery option for cart item:", cartItem);
      return;
    }
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    const priceString = deliveryOption.priceCents
      ? `$${deliveryOption.priceCents / 100}- `
      : "Free";

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `<div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}">
      <input
        type="radio"
        ${isChecked ? "checked" : ""}  
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}"
      />
      <div>
        <div class="delivery-option-date">${dateString}</div>
        <div class="delivery-option-price">${priceString} Shipping</div>
      </div>
    </div>`;
  });
  return html;
}

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    console.log(`${productId}`);
    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    document.querySelector(`.js-cart-item-container-${productId}`).remove();

    document.querySelector(".return-to-home-link").innerHTML =
      calculateQuantity();
  });
});

document.querySelectorAll(".save-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );

    const quantity = Number(document.querySelector(".quantity-input").value);

    document.querySelector(".quantity-label").innerHTML = quantity;

    updateQuantity(productId, quantity);

    container.classList.remove("is-editing-quantity");

    document.querySelector(".return-to-home-link").innerHTML =
      calculateQuantity();
  });
});

document.querySelector(".return-to-home-link").innerHTML = calculateQuantity();
document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    const { productId, deliveryOptionId } = element.dataset;
    //OR
    //const productId=element.dataset.productId;
    //const deliveryOptionId=element.dataset.productId;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});
