const cartContainer = document.querySelector("#cart-container");
const cartQuantityTotal = document.querySelector("#cart-total p");
const cartSummary = document.querySelector("#cart-summary");

let cartItems = [
	{
		productID: "product-1",
		productImage:
			"https://ng.jumia.is/unsafe/fit-in/150x150/filters:fill(white)/product/50/397518/1.jpg?8885",
		productTitle: "Oraimo 1000mah Power-BankOraimo 1000mah Power-Bank",
		productPrice: 1000,
		productQuantity: 1,
		isLiked: false,
	},
	{
		productID: "product-2",
		productImage:
			"https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/71/851118/1.jpg?1702",
		productTitle: "Geneva Unisex Casual Watch",
		productPrice: 1000,
		productQuantity: 1,
		isLiked: false,
	},
	{
		productID: "product-3",
		productImage:
			"https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/92/049652/1.jpg?2694",
		productTitle: "Binatone 2L Electric Jug",
		productPrice: 1000,
		productQuantity: 1,
		isLiked: false,
	},
	{
		productID: "product-4",
		productImage:
			"https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/39/66398/1.jpg?8711",
		productTitle: "Binatone 1.7L Electric Jig",
		productPrice: 1000,
		productQuantity: 1,
		isLiked: false,
	},
];

document.addEventListener("DOMContentLoaded", () => {
	cartItems.forEach((item) => {
		const el = document.querySelector(`#${item.productID}`);
		if (item.productQuantity < 2) {
			el.setAttribute("disabled", true);
		}
	});
});

function displayCart() {
	if (cartItems.length) {
		cartContainer.innerHTML = cartItems
			.map((item) => displayCartItems(item))
			.join("");
		cartSummary.innerHTML = displaySummary(cartTotal());
	} else {
		cartContainer.innerHTML = `<div class="alert alert-danger h4" role="alert">No Item to display</div>`;
	}
}

function displaySummary(totalPrice) {
	return `
	<h3 class="cart-summary h5 border-0 border-bottom p-2">Cart Summary</h3>
	<div class="d-flex justify-content-between p-3 h6 border-bottom">
	<span>Subtotal</span> -
	<span>₦ ${totalPrice}</span>
</div>
<div class="d-grid">
	<button  class="btn btn-warning text-white">Proceed to Checkout</button>
</div>
`;
}

// Calculate the Cart total price
function cartTotal() {
	const subTotal = cartItems.reduce(
		(accumulator, cartItem) =>
			accumulator + cartItem.productQuantity * cartItem.productPrice,
		0
	);
	return `${Intl.NumberFormat("en-US").format(subTotal)}`;
}

// Display the total quantity in our Cart
function displayCartQuantityTotal() {
	const subTotal = cartItems.reduce(
		(accumulator, cartItem) => accumulator + cartItem.productQuantity,
		0
	);
	cartQuantityTotal.textContent = `${Intl.NumberFormat("en-US").format(
		subTotal
	)}`;
}

// Display A Single Cart Item
function displayCartItems(product) {
	const currencyDisplay = new Intl.NumberFormat("en-US");
	const productId = product.productID;
	return `
	<!-- A single product -->
			<div class="d-flex shadow-sm gap-3 px-4 py-3 mb-3 bg-white rounded-3">
				<!-- Product Image -->
				<div>
					<img
						src=${product.productImage}
						alt=${product.productTitle}
						class="img-thumbnails"
					/>
				</div>
				
				<!-- Product Info -->
				<div class="product-information flex-grow-1">
				<div class="d-flex justify-content-between align-items-center">
				<h1 class="h6 fs-6 text-primary  w-75">${product.productTitle}</h1>
					<div onclick=likeItem('${productId}') class="cursor-pointer d-flex align-items-center gap-2" >${
		product.isLiked
			? '<i class="bi bi-heart-fill text-danger fs-5" ></i> <span class="d-none d-xl-block fs-6">liked</span>'
			: '<i class="bi bi-heart fs-4 text-primary"></i>'
	}</div>
				</div>
						<p class="product-amount fs-5 h4">₦${currencyDisplay.format(
							product.productPrice
						)}</p>
						<!-- Product quantity -->
						<div class="d-flex flex-column flex-md-row justify-content-between align-items-lg-center align-items-start">
						<div class="text-danger cursor-pointer" onclick=removeItem('${
							product.productID
						}')><i class="bi bi-trash3-fill"></i>Remove
						</div>
						<div class="d-flex align-items-center gap-2">
						<button  class="btn btn-primary btn-custom" id=${productId} onclick=decreaseQuantity('${productId}')>-</button>
							<span class="h4 pt-1">${product.productQuantity}</span>
							<button  class="btn btn-primary btn-custom" onclick=increaseQuantity('${productId}')>+</button>
						</div>
						</div>
					</div>
				</div>
			</div>
	`;
}

// A function ot increase the quantity of a particular item.
function increaseQuantity(id) {
	const cartItemIndex = cartItems.findIndex((item) => item.productID === id);
	cartItems[cartItemIndex].productQuantity++;
	displayCartQuantityTotal();
	displayCart();
}

// A function ot decrease the quantity of a particular item.
function decreaseQuantity(id) {
	const el = document.querySelector(`#${id}`);
	const cartItemIndex = cartItems.findIndex((item) => item.productID === id);
	if (cartItems[cartItemIndex].productQuantity === 1) {
		el.setAttribute("disabled", true);
		return;
	}

	cartItems[cartItemIndex].productQuantity =
		cartItems[cartItemIndex].productQuantity - 1;

	displayCartQuantityTotal();
	displayCart();
}

// Function that remove Item from the Cart
function removeItem(id) {
	cartItems = cartItems.filter((item) => item.productID !== id);
	displayCart();
}

function likeItem(id) {
	const cartItemIndex = cartItems.findIndex((item) => item.productID === id);
	cartItems[cartItemIndex].isLiked = !cartItems[cartItemIndex].isLiked;
	console.log(cartItems);
	displayCart();
}

displayCartQuantityTotal();
displayCart();
