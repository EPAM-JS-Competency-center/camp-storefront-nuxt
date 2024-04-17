import { getStorage } from './localStorage'
import type { CartLineItemsInner, Price } from '~/types/interfaces'
import singleProductData from '@/mock_data/product.json'

export function createCart() {
    const mockedCart = {
        id: 'mocked-cart-id',
        version: 0,
        customerId: 'mocked-customer-id',
        lineItems: [],
        totalPrice: {
            currencyCode: 'USD',
            centAmount: 0
        },
        totalQuantity: 0
    }

    getStorage().setItem('mocked-cart-mocked-cart-id', JSON.stringify(mockedCart))

    return mockedCart
}

export function loadById(id: string) {
    const cart = getStorage().getItem(`mocked-cart-${id}`)

    if (cart) {
        return JSON.parse(cart)
    } else {
        console.error('Cart not found for id ' + id)

        return createCart()
    }
}

export function addProductToCart(productSKU: string, quantity: number) {
    const cart = loadById('mocked-cart-id')

    const productVariant = singleProductData.variants.find(variant => variant.sku === productSKU) || singleProductData.variants[0]
    const existingLineItem = cart.lineItems.find((lineItem: CartLineItemsInner) => lineItem.variant?.sku === productVariant.sku)

    if (existingLineItem) {
        existingLineItem.quantity += quantity
    } else {
        cart.lineItems.push({
            id: 'mocked-line-item-id',
            productId: singleProductData.id,
            variant: productVariant,
            quantity
        })
    }

    getStorage().setItem('mocked-cart-mocked-cart-id', JSON.stringify(cart))
    recalculateValue()
}

export function removeProductFromCart(productSKU: string) {
    const cart = loadById('mocked-cart-id')

    const existingLineItemIndex = cart.lineItems.findIndex((lineItem: CartLineItemsInner) => lineItem.variant?.sku === productSKU)

    if (existingLineItemIndex !== -1) {
        cart.lineItems.splice(existingLineItemIndex, 1)
    }

    getStorage().setItem('mocked-cart-mocked-cart-id', JSON.stringify(cart))
    recalculateValue()
}

export function changeQuantity(lineItem: CartLineItemsInner, quantity: number) {
    const cart = loadById('mocked-cart-id')

    const existingLineItem = cart.lineItems.find((item: CartLineItemsInner) => item.id === lineItem.id)

    if (existingLineItem) {
        existingLineItem.quantity = quantity
    }

    if (quantity <= 0) {
        removeProductFromCart(lineItem.variant?.sku as string)

        return
    }

    getStorage().setItem('mocked-cart-mocked-cart-id', JSON.stringify(cart))
    recalculateValue()
}

export function clearCart() {
    getStorage().removeItem('mocked-cart-mocked-cart-id')
}

function recalculateValue() {
    const cart = loadById('mocked-cart-id')

    cart.totalQuantity = cart.lineItems.reduce((acc: number, lineItem: CartLineItemsInner) => acc + (lineItem.quantity || 0), 0)
    cart.totalPrice.centAmount = cart.lineItems.reduce((acc: number, lineItem: CartLineItemsInner) => {
        const price = lineItem.variant?.prices?.length
        ? lineItem.variant.prices[0] as Price
        : {
            value: {
                currencyCode: 'USD',
                centAmount: 0
            }
        }

        return acc + (lineItem.quantity || 0) * (price.value?.centAmount || 0)
    }, 0)

    getStorage().setItem('mocked-cart-mocked-cart-id', JSON.stringify(cart))
}
