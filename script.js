document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else {
        alert("✅ Thank you! Your message has been sent.");
        form.reset();
      }
      form.classList.add("was-validated");
    });
  }
  updateCartCount();
  loadCart();
});

function addToCart(name, price) {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];

  var existingItem = null;
  var existingIndex = -1;

  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      existingItem = cart[i];
      existingIndex = i;
      break;
    }
  }

  if (existingItem !== null) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(name + " added to cart!");
}

function loadCart() {
  let cartItems = document.getElementById("cartItems");
  let cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartTotal) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = "";
  let total = 0;

  for (var i = 0; i < cart.length; i++) {
    let item = cart[i];
    let subtotal = item.price * item.quantity;
    total += subtotal;

    cartItems.innerHTML +=
      "<tr>" +
        "<td>" + item.name + "</td>" +
        "<td>₹" + item.price.toFixed(2) + "</td>" +
        "<td>" +
          "<input type='number' class='form-control' value='" + item.quantity + "' min='1' " +
          "onchange='updateQuantity(" + i + ", this.value)'>" +
        "</td>" +
        "<td>₹" + subtotal.toFixed(2) + "</td>" +
        "<td><button class='btn btn-danger btn-sm' onclick='removeItem(" + i + ")' style='font-family:cursive'>X</button></td>" +
      "</tr>";
  }
  cartTotal.textContent = total.toFixed(2);
}

function updateQuantity(index, newQuantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = parseInt(newQuantity);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let countElement = document.getElementById("cart-count");

  let totalQuantity = 0;

  for (let i = 0; i < cart.length; i++) {
    totalQuantity = totalQuantity + cart[i].quantity;
  }
  countElement.textContent = totalQuantity;
}
  function proceedToCheckout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("⚠️ Your cart is empty. Please add some items before checkout!");
    } else {
      alert("✅ Thank you for shopping with us! Redirecting to checkout...");
      window.location.href = "checkout.html";  
    }
  }