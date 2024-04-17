import { defineStore } from 'pinia'
import api from '~/api/api'
import type { Address, Cart, CartLineItemsInner } from '~/types/interfaces'
import { getStorage } from '~/utils/localStorage'
import * as mockedCart from '~/utils/mockedCartApi'

interface State {
    cart: Cart;
    address?: Address;
    orderId?: string;
}

export default defineStore('cart', {
    state: (): State => ({
        cart: {
            lineItems: [],
            version: 0,
        }
    }),
    actions: {
        loadCart(): void {
            if (getStorage().getItem('camp_cart')) {
                this.cart = JSON.parse(getStorage().getItem('camp_cart') as string)
                // Refresh cart from server
                this.loadById(this.cart.id as string)
            } else {
                this.createNewCart()
            }

            // Load the cart from the server
        },
        async createNewCart(): Promise<void> {
            try {
                const response = await api<Cart>({
                    url: '/carts',
                    method: 'post'
                })

                this.cart = response.data
            } catch (error) {
                // TBD, make a error message
                // Throw a error message
                console.error(error)

                console.info('Error creating a new cart. Falling back to mocked cart')
                this.cart = mockedCart.createCart()
            }

            this.cacheCart()
        },
        async loadById(id: string): Promise<void> {
            try {
                const response = await api<Cart>({
                    url: `/carts/${id}`,
                    method: 'get'
                })

                this.cart = response.data
            } catch (error) {
                // TBD, make a error message
                // Throw a error message
                console.error(error)

                console.info('Error loading cart. Falling back to mocked cart')
                this.cart = mockedCart.loadById(id)
            }

            this.cacheCart()
        },
        async addProductToCart(productSKU: string, quantity: number): Promise<void> {
            try {
                await api<Cart>({
                    url: `/carts/${this.cart.id}`,
                    method: 'put',
                    data: {
                        version: (this.cart.version || 0) + 1,
                        action: 'AddLineItem',
                        AddLineItem: {
                            variantId: productSKU,
                            quantity
                        }
                    }
                })

                // to do - add line item to cart
                // this.cacheCart()
            } catch (error) {
                // TBD, make a error message
                // Throw a error message
                console.error(error)

                console.info('Error adding product to cart. Falling back to mocked cart')
                mockedCart.addProductToCart(productSKU, quantity)
            }

            await this.loadById(this.cart.id as string)
        },
        async updateQuantity(lineItem: CartLineItemsInner, quantity: number): Promise<void> {
            try {
                await api<Cart>({
                    url: `/carts/${this.cart.id}`,
                    method: 'put',
                    data: {
                        version: (this.cart.version || 0) + 1,
                        action: 'ChangeLineItemQuantity',
                        ChangeLineItemQuantity: {
                            lineItemId: lineItem.id,
                            quantity
                        }
                    }
                })

                // to do - add line item to cart
                // this.cacheCart()
            } catch (error) {
                // TBD, make a error message
                // Throw a error message
                console.error(error)

                console.info('Error updating quantity. Falling back to mocked cart')
                mockedCart.changeQuantity(lineItem, quantity)
            }

            await this.loadById(this.cart.id as string)
        },
        async removeLineItem(lineItem: CartLineItemsInner): Promise<void> {
            try {
                await api<Cart>({
                    url: `/carts/${this.cart.id}`,
                    method: 'put',
                    data: {
                        version: (this.cart.version || 0) + 1,
                        action: 'RemoveLineItem',
                        RemoveLineItem: {
                            lineItemId: lineItem.id,
                            quantity: lineItem.quantity
                        }
                    }
                })

                // to do - add line item to cart
                // this.cacheCart()
            } catch (error) {
                // TBD, make a error message
                // Throw a error message
                console.error(error)

                console.info('Error removing line item. Falling back to mocked cart')
                mockedCart.removeProductFromCart(lineItem.variant?.sku as string)
            }

            await this.loadById(this.cart.id as string)
        },

        async setAddress(address: Address): Promise<void> {
            try {
                await api<Cart>({
                    url: `/carts/${this.cart.id}`,
                    method: 'put',
                    data: {
                        version: (this.cart.version || 0) + 1,
                        action: 'SetShippingAddress',
                        SetShippingAddress: address
                    }
                })

                await this.loadById(this.cart.id as string)
                // to do - add line item to cart
                this.cacheCart()

                this.address = address
            } catch (error) {
                // TBD, make a error message
                // Throw a error message
                console.error(error)

                console.info('Error setting address. Falling back to mocked cart')
                // But we don't any where
                this.address = address
            }
        },

        async placeOrder(): Promise<void> {
            try {
                const order = await api<Cart>({
                    url: `/carts/${this.cart.id}/order`,
                    method: 'post',
                    data: {}
                })

                this.orderId = order.data.id
            } catch (error) {
                // TBD, make a error message
                // Throw a error message
                console.error(error)

                console.info('Error placing order. Falling back to mocked cart')

                this.orderId = 'mocked-order-id'
                mockedCart.clearCart()
            }

            this.clearCart()
        },

        cacheCart(): void {
            getStorage().setItem('camp_cart', JSON.stringify(this.cart))
        },

        clearCart(): void {
            getStorage().removeItem('camp_cart')
        }
    },
})
