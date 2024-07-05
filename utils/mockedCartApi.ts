import { getStorage } from './localStorage'
import type { Cart, CartLineItemsInner, Price } from '~/types/interfaces'
import singleProductData from '@/mock_data/product.json'
import giftItem from '@/mock_data/gift.json'

export function createCart(): Cart {
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
        existingLineItem.totalPrice = (existingLineItem.prices[0].value.centAmount || 0) * existingLineItem.quantity
    } else {
        cart.lineItems.push({
            id: 'mocked-line-item-id',
            productId: singleProductData.id,
            variant: productVariant,
            quantity,
            prices: productVariant.prices,
            totalPrice: productVariant.prices[0].value.centAmount
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

    // No action for gift item
    if (lineItem.id === 'mocked-gift-item') {
        return
    }

    if (existingLineItem) {
        existingLineItem.quantity = quantity
        existingLineItem.totalPrice = (existingLineItem.prices[0].value.centAmount || 0) * existingLineItem.quantity
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

export function isMockedCart(cart: Cart) {
    return cart.id === 'mocked-cart-id'
}

export function addPromoCode() {
    const cart = loadById('mocked-cart-id')

    // Create discount code
    cart.discountCodes = [{
        state: 'MatchesCart',
        discountCode: {
            typeId: 'discount-code',
            id: 'mocked-discount-code'
        }
    }]

    getStorage().setItem('mocked-cart-mocked-cart-id', JSON.stringify(cart))
    recalculateValue()
}

export function removePromoCode() {
    const cart = loadById('mocked-cart-id')

    cart.discountCodes = []

    getStorage().setItem('mocked-cart-mocked-cart-id', JSON.stringify(cart))
    recalculateValue()
}

function createGiftLineItem() {
    return {
        id: 'mocked-gift-item',
        productId: '1252',
        variant: giftItem,
        quantity: 1,
        prices: giftItem.prices,
        totalPrice: 0,
        discountedPricePerQuantity: [
            {
                quantity: 1,
                discountedPrice: {
                    value: {
                        type: "centPrecision",
                        currencyCode: "USD",
                        centAmount: 0,
                        fractionDigits: 2
                    },
                    includedDiscounts: [
                        {
                            discount: {
                                "typeId": "cart-discount",
                                "id": "a13fa3cf-c4ef-4b59-ac56-f8d24be99ebc"
                            },
                            discountedAmount: {
                                type: "centPrecision",
                                currencyCode: "USD",
                                centAmount: giftItem.prices[0].value.centAmount,
                                fractionDigits: 2
                            }
                        }
                    ]
                }
            }
        ]
    }
}

function shouldAddGiftToCart(cart: Cart) {
    // The cart has a gift if there are more than 3 items with variant id 1252
    const hasItems = cart.lineItems &&
      cart.lineItems.find((lineItem: CartLineItemsInner) => lineItem.variant?.id === '1211' && (lineItem.quantity || 0) > 3)

    // Doesn't have gift item
    const hasGift = cart.lineItems &&
      cart.lineItems.find((lineItem: CartLineItemsInner) => lineItem.id === 'mocked-gift-item')

    return hasItems && !hasGift
}

function shouldRemoveGiftFromCart(cart: Cart) {
    // The cart has a gift if there are more than 3 items with variant id 1252
    const hasItems = cart.lineItems &&
      cart.lineItems.find((lineItem: CartLineItemsInner) => lineItem.variant?.id === '1211' && (lineItem.quantity || 0) > 3)

    // Doesn't have gift item
    const hasGift = cart.lineItems &&
      cart.lineItems.find((lineItem: CartLineItemsInner) => lineItem.id === 'mocked-gift-item')

    return !hasItems && hasGift
}

function hasFixedDiscount(cart: Cart) {
    // The cart has a fixed discount if there are more than 2 items with variant id 1211
    return cart.lineItems &&
      cart.lineItems.find((lineItem: CartLineItemsInner) => lineItem.variant?.id === '1211' && (lineItem.quantity || 0) > 2)
}

function checkAndApplyDiscounts(cart: Cart) {
    cart.discountOnTotalPrice = {
        discountedAmount: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 0,
            fractionDigits: 2
        },
        includedDiscounts: [
            // {
            //     "discount": {
            //         "typeId": "cart-discount",
            //         "id": "d3dd376f-b846-4501-a0c4-314545cbf5c9"
            //     },
            //     "discountedAmount": {
            //         "type": "centPrecision",
            //         "currencyCode": "USD",
            //         "centAmount": 2000,
            //         "fractionDigits": 2
            //     }
            // },
            // {
            //     "discount": {
            //         "typeId": "cart-discount",
            //         "id": "86867670-b61b-4afc-8570-e1b191ce6635"
            //     },
            //     "discountedAmount": {
            //         "type": "centPrecision",
            //         "currencyCode": "USD",
            //         "centAmount": 1828,
            //         "fractionDigits": 2
            //     }
            // }
        ]
    }

    // Discount code
    if (cart.discountCodes && cart.discountCodes.length > 0) {
        // Dicount Code is 5% from all value
        const discountedValue = (cart.totalPrice?.centAmount || 0) * 0.05

        cart.discountOnTotalPrice.includedDiscounts?.push({
            discount: {
                typeId: 'cart-discount',
                id: 'mocked-discount-id'
            },
            discountedAmount: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: discountedValue,
                fractionDigits: 2
            }
        })

        if (cart.discountOnTotalPrice?.discountedAmount?.centAmount !== undefined) {
            cart.discountOnTotalPrice.discountedAmount.centAmount += discountedValue
        }
    }

    // Fixed discount
    if (hasFixedDiscount(cart)) {
        cart.discountOnTotalPrice.includedDiscounts?.push({
            "discount": {
                "typeId": "cart-discount",
                "id": "d3dd376f-b846-4501-a0c4-314545cbf5c9"
            },
            "discountedAmount": {
                "type": "centPrecision",
                "currencyCode": "USD",
                "centAmount": 10000,
                "fractionDigits": 2
            }
        });

        if (cart.discountOnTotalPrice?.discountedAmount?.centAmount !== undefined) {
            cart.discountOnTotalPrice.discountedAmount.centAmount += 10000
        }
    }

    // Extract from total price
    if (cart.discountOnTotalPrice?.discountedAmount?.centAmount !== undefined && cart.totalPrice?.centAmount) {
        cart.totalPrice.centAmount -= cart.discountOnTotalPrice.discountedAmount.centAmount
    }


    // BOGO
    if (shouldAddGiftToCart(cart)) {
        cart.lineItems?.push(createGiftLineItem())
    } else if (shouldRemoveGiftFromCart(cart)) {
        const giftIndex = cart.lineItems?.findIndex((lineItem: CartLineItemsInner) => lineItem.id === 'mocked-gift-item')

        if (giftIndex !== undefined && giftIndex !== -1 && cart.lineItems) {
            cart.lineItems.splice(giftIndex, 1)
        }
    }
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

    checkAndApplyDiscounts(cart)

    getStorage().setItem('mocked-cart-mocked-cart-id', JSON.stringify(cart))
}
