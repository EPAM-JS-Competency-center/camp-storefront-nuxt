import { defineStore } from 'pinia'
import { AxiosError, type AxiosResponse } from 'axios'
import api from '~/api/api'
import type { Address, Cart, CartLineItemsInner } from '~/types/interfaces'
import { getStorage } from '~/utils/localStorage'
import * as mockedCart from '~/utils/mockedCartApi'

interface State {
  cart: Cart
  address?: Address
  orderId?: string
}

export default defineStore('cart', {
  state: (): State => ({
    cart: {
      lineItems: [],
      version: 0,
    },
  }),
  actions: {
    async loadCart(): Promise<void> {
      if (getStorage().getItem('camp_cart')) {
        this.cart = JSON.parse(getStorage().getItem('camp_cart') as string)
        // Refresh cart from server
        await this.loadById(this.cart.id as string)
      } else {
        await this.createNewCart()
      }

      // Load the cart from the server
    },
    async createNewCart(): Promise<void> {
      try {
        const response = await api<Cart>({
          url: '/carts',
          method: 'post',
        })

        this.cart = response.data
      } catch (error) {
        // TBD, make an error message
        // Throw an error message
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
          method: 'get',
        })

        this.cart = response.data
      } catch (error) {
        // TBD, make an error message
        // Throw an error message
        console.error(error)

        console.info('Error loading cart. Falling back to mocked cart')
        this.cart = mockedCart.loadById(id)
      }

      this.cacheCart()
    },
    async setPromoCodeToCart(promoCode: string = ''): Promise<void> {
      if (mockedCart.isMockedCart(this.cart)) {
        mockedCart.addPromoCode()

        await this.loadById(this.cart.id as string)

        return
      }

      try {
        const response = await api<Cart>({
          url: `/carts/${this.cart.id}`,
          method: 'put',
          data: {
            version: this.cart.version,
            action: 'AddDiscountCode',
            AddDiscountCode: {
              code: promoCode,
            },
          },
        })

        this.cart = response.data
      } catch (error) {
        console.error(error)

        // Do not fallback to mocked cart if not a timeout
        if (error instanceof AxiosError && error.code === 'ERR_BAD_REQUEST') {
          throw new Error(error.response?.data?.message || error.message)
        }

        throw error
      }

      this.cacheCart()
    },

    async removePromoCodeFromCart(): Promise<void> {
      if (mockedCart.isMockedCart(this.cart)) {
        mockedCart.removePromoCode()

        await this.loadById(this.cart.id as string)

        return
      }

      const discountCode = this.cart.discountCodes?.[0].discountCode

      if (!discountCode) {
        return Promise.reject(new Error('No promo code to remove'))
      }

      try {
        const response = await api<Cart>({
          url: `/carts/${this.cart.id}`,
          method: 'put',
          data: {
            version: this.cart.version,
            action: 'RemoveDiscountCode',
            RemoveDiscountCode: {
              ...discountCode
            },
          },
        })

        this.cart = response.data
      } catch (error) {
        console.error(error)

        console.info('Error loading cart. Falling back to mocked cart')
        this.cart = mockedCart.loadById(this.cart.id as string)
        throw error
      }

      this.cacheCart()
    },

    async addProductToCart(productSKU: string, quantity: number): Promise<void> {
      try {
        await api<Cart>({
          url: `/carts/${this.cart.id}`,
          method: 'put',
          data: {
            version: this.cart.version,
            action: 'AddLineItem',
            AddLineItem: {
              variantId: productSKU,
              quantity,
            },
          },
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
            version: this.cart.version,
            action: 'ChangeLineItemQuantity',
            ChangeLineItemQuantity: {
              lineItemId: lineItem.id,
              quantity,
            },
          },
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
            version: this.cart.version,
            action: 'RemoveLineItem',
            RemoveLineItem: {
              lineItemId: lineItem.id,
              quantity: lineItem.quantity,
            },
          },
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
            version: this.cart.version,
            action: 'SetShippingAddress',
            SetShippingAddress: address,
          },
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
          data: {},
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
    },

    checkPromoCode(promoCode: string): Promise<unknown> {
      if (mockedCart.isMockedCart(this.cart)) {
        mockedCart.addPromoCode()

        return Promise.resolve()
      }

      return api({
        url: '/discount-codes',
        method: 'get',
        params: {
          code: promoCode,
        },
      })
    },

    createPaymentSession(amount: number) {
      return api({
        url: '/checkout',
        method: 'post',
        params: {
          amount,
        },
      })
    },
  },
})
