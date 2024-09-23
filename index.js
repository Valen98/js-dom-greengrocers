const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

// select the element
const itemListUL = document.querySelector(".store--item-list")

const cartListUL = document.querySelector(".cart--item-list")


// render the items on screen
function renderItems() {
  itemListUL.innerHTML = ""

  for(let i = 0; i < state.items.length; i++) {
    const item = state.items[i]
    const itemLi = document.createElement('li')
    itemLi.setAttribute('id', item.id)
    itemLi.innerText = item.name

    let image = document.createElement("img")
    image.src = `assets/icons/${item.id}.svg`

    let button = document.createElement("button")
    button.addEventListener("click", () => addToCart(item))
  
    button.innerHTML = "Add to cart"

    itemLi.appendChild(image)
    itemLi.appendChild(button)
    itemListUL.appendChild(itemLi)
  }

}

function addToCart(item) {
  let checkItem = state.cart.find(checkItem => checkItem.id == item.id)

  if(checkItem) {
    checkItem.quantity += 1
  }else {
    state.cart.push({ ...item, quantity: 1})
  }
  console.log(state.cart)
  renderCart()
  updatePrice()
}

function renderCart() {
  cartListUL.innerHTML = ""
    for(let i = 0; i < state.cart.length; i++) {
      if(state.cart[i].quantity > 0){
        const item = state.cart[i]
        const cartLi = document.createElement('li')
        cartLi.setAttribute('id', item.id)

        const p = document.createTextNode(item.name)
        
    
        let image = document.createElement("img")
        image.src = `assets/icons/${item.id}.svg`
        image.className = "cart--item-icon"
    
        let removeButton = document.createElement("button")
        removeButton.addEventListener("click", () => removeItem(item))
        removeButton.className = "quantity-btn remove-btn center"

        let addButton = document.createElement("button")
        addButton.addEventListener("click", () => addToCart(item))
        addButton.className = "quantity-btn add-btn center"

        let quantity = document.createElement("span")
        quantity.innerHTML = item.quantity
    
    
        cartLi.appendChild(image)
        cartLi.appendChild(p)
        cartLi.appendChild(removeButton)
        cartLi.appendChild(quantity)
        cartLi.appendChild(addButton)
        cartListUL.appendChild(cartLi)
      }
    }
  
}

function removeItem(item) {
  let checkItem = state.cart.find(checkItem => checkItem.id == item.id)
  if(checkItem) {
    checkItem.quantity -= 1
  }else {
    state.cart.pop(item)
  }
  console.log(state.cart)
  renderCart()
  updatePrice()
}

function updatePrice() {
  const priceP = document.querySelector(".total-number")
  priceP.innerHTML = ""
  let price = 0
  for(let i = 0; i < state.cart.length; i++) {
    let item = state.cart[i]
    price += item.price * item.quantity
  }
  priceP.innerHTML = `£${price.toFixed(2)}`

}

function main() {
  renderItems()
  renderCart()
}

main()