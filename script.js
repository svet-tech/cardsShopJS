const products = [
    {
        id: 0,
        name: 'Ноутбук',
        price: 5000
    },
    {
        id: 1,
        name: 'Телевизор',
        price: 15000
    },
    {
        id: 2,
        name: 'Телефон',
        price: 52000
    },
    {
        id: 3,
        name: 'Телефон',
        price: 352000
    },
]
let cart = []

const getProductConteiner = (product, buttonText = 'купить', handleClick, isCart = false) => {

    const productContainer = document.createElement('div')
    productContainer.className = 'product'

    const name = document.createElement('span')
    name.textContent = product.name

    const price = document.createElement('span')
    price.textContent = product.price

    const quantity = document.createElement('span')
    quantity.textContent = 'количество: ' + product.quantity


    const actionsBlock = document.createElement('div')
    actionsBlock.className = 'actionButtons'



    const increaseButton = document.createElement('button')
    increaseButton.textContent = '+'
    increaseButton.onclick = () => increaseQuantity(product.id)

    const decreaseButton = document.createElement('button')
    decreaseButton.textContent = '-'
    decreaseButton.onclick = () => decreaseQuantity(product.id)



    const actinButton = document.createElement('button')
    actinButton.textContent = buttonText
    actinButton.onclick = () => handleClick(product.id)


    actionsBlock.appendChild(increaseButton)
    actionsBlock.appendChild(decreaseButton)

    productContainer.appendChild(name)
    productContainer.appendChild(price)
    productContainer.appendChild(actinButton)
    isCart && productContainer.appendChild(actionsBlock)
    isCart && productContainer.appendChild(quantity)



    return productContainer
}

function showProducts() {
    const container = document.getElementById('products')

    container.innerHTML = ''

    products.forEach((product) => {

        const productContainer = getProductConteiner(product, 'купить', addToCart)

        container.appendChild(productContainer)
    })
}

function addToCart(id) {
    const cartProduct = cart.find((item) => item.id === id)
    if (cartProduct) {
        cartProduct.quantity++
    } else {
        const newProduct = products.find((item) => item.id === id)
        cart.push({
            ...newProduct, quantity: 1
        })
    }


    // const productIndex = cart.findIndex((product) => product.id === id)
    // if (productIndex >= 0) {
    //     cart = [...cart.slice(0, productIndex),
    //     {
    //         ...cart[productIndex], 
    //         quantity: cart[productIndex].quantity + 1,
    //     }

    //     ]
    // }
    updateCart()

}
function deletFromCart(id) {
    // const deleteProduct = cart.find((item) => item.id === id)
    // if (deleteProduct && (deleteProduct.quantity > 1)) {
    //     deleteProduct.quantity--
    // } else {

    const filteredArray = cart.filter((cartItem) => cartItem.id !== id)
    cart = filteredArray
    // }

    updateCart()
}

function increaseQuantity(id) {
    const cartProduct = cart.find((item) => item.id === id)
    if (cartProduct) {
        cartProduct.quantity++
    }
    updateCart()
}
function decreaseQuantity(id) {
    const cartProduct = cart.find((item) => item.id === id)
    if (cartProduct && cartProduct.quantity > 1) {
        cartProduct.quantity--
    } else {
        deletFromCart(id)
    }
    updateCart()

}

function updateCart() {
    const container = document.getElementById('cart-items')
    const total = document.getElementById('total')

    container.innerHTML = ''

    let totalPrice = 0

    cart.forEach((cartItem) => {
        totalPrice += cartItem.price * cartItem.quantity

        const cartItemContainer = getProductConteiner(cartItem, 'удалить из корзины', deletFromCart, true)

        container.appendChild(cartItemContainer)
    })

    total.textContent = totalPrice

}



showProducts()