export interface IProduct {
  title: string
  price: number
  imagePath: string
  uuid: string
  score: number
}

export interface Category {
  /**
   *
   * @type {string}
   * @memberof Category
   */
  id?: string
  /**
   *
   * @type {string}
   * @memberof Category
   */
  name?: string
  /**
   *
   * @type {string}
   * @memberof Category
   */
  slug?: string
  /**
   *
   * @type {string}
   * @memberof Category
   */
  description?: string
  /**
   * Contains the parent path towards the root Category.
   * @type {Category<string>}
   * @memberof Category
   */
  ancestors?: {
    type: string
    id: string
  }[]
  /**
   *
   * @type {Category}
   * @memberof Category
   */
  parent?: Category
}

export interface CategoriesResponse {
  /**
   *
   * @type {Array<Category>}
   * @memberof CategoriesResponse
   */
  results?: Array<Category>
}

export interface Image {
  /**
   *
   * @type {string}
   * @memberof Image
   */
  url?: string
  /**
   *
   * @type {string}
   * @memberof Image
   */
  label?: string
}

export interface PriceValue {
  /**
   *
   * @type {string}
   * @memberof PriceValue
   */
  currencyCode?: string
  /**
   *
   * @type {number}
   * @memberof PriceValue
   */
  centAmount?: number
}

export interface Price {
  /**
   *
   * @type {string}
   * @memberof Price
   */
  id?: string
  /**
   *
   * @type {PriceValue}
   * @memberof Price
   */
  value?: PriceValue
}

export interface ProductVariantAvailability {
  /**
   *
   * @type {boolean}
   * @memberof ProductVariantAvailability
   */
  isOnStock?: boolean
  /**
   *
   * @type {number}
   * @memberof ProductVariantAvailability
   */
  availableQty?: number
}

export interface ProductAttribute {
  name?: string
  value?: {
    key?: string
    label?: string
  }
}

export interface ProductVariant {
  /**
   *
   * @type {string}
   * @memberof ProductVariant
   */
  id?: string
  /**
   *
   * @type {string}
   * @memberof ProductVariant
   */
  sku?: string
  /**
   *
   * @type {string}
   * @memberof ProductVariant
   */
  name?: string
  /**
   *
   * @type {string}
   * @memberof ProductVariant
   */
  slug?: string
  /**
   *
   * @type {Array<Image>}
   * @memberof ProductVariant
   */
  images?: Array<Image>
  /**
   *
   * @type {Array<Price>}
   * @memberof ProductVariant
   */
  prices?: Array<Price>
  /**
   *
   * @type {ProductAttribute[]}
   * @memberof ProductVariant
   */
  attributes?: ProductAttribute[]
  /**
   *
   * @type {ProductVariantAvailability}
   * @memberof ProductVariant
   */
  availability?: ProductVariantAvailability
}

export interface Product {
  /**
   *
   * @type {string}
   * @memberof Product
   */
  id?: string
  /**
   *
   * @type {string}
   * @memberof Product
   */
  name?: string
  /**
   *
   * @type {string}
   * @memberof Product
   */
  description?: string
  /**
   *
   * @type {string}
   * @memberof Product
   */
  slug?: string
  /**
   *
   * @type {Array<Category>}
   * @memberof Product
   */
  categories?: Array<Category>
  /**
   *
   * @type {Array<ProductVariant>}
   * @memberof Product
   */
  variants?: Array<ProductVariant>
  /**
   *
   * @type {ProductVariant}
   * @memberof Product
   */
  masterVariant?: ProductVariant
}

export interface ProductsGet200Response {
  /**
   *
   * @type {number}
   * @memberof ProductsGet200Response
   */
  limit?: number
  /**
   *
   * @type {number}
   * @memberof ProductsGet200Response
   */
  offset?: number
  /**
   *
   * @type {number}
   * @memberof ProductsGet200Response
   */
  total?: number
  /**
   *
   * @type {Array<Product>}
   * @memberof ProductsGet200Response
   */
  results?: Array<Product>
}

export interface AddLineItem {
  /**
   *
   * @type {string}
   * @memberof AddLineItem
   */
  variantId?: string
  /**
   *
   * @type {number}
   * @memberof AddLineItem
   */
  quantity?: number
}

export interface CartTotalPrice {
  /**
   *
   * @type {string}
   * @memberof CartTotalPrice
   */
  currencyCode?: string
  /**
   *
   * @type {number}
   * @memberof CartTotalPrice
   */
  centAmount?: number
}

export interface OrderTotalPrice {
  /**
   *
   * @type {string}
   * @memberof OrderTotalPrice
   */
  currencyCode?: string
  /**
   *
   * @type {number}
   * @memberof OrderTotalPrice
   */
  centAmount?: number
}

export interface IncludedDiscounts {
  discount?: {
      typeId?: string,
      id?: string
  },
  discountedAmount?: {
      type?: string,
      currencyCode?: string,
      centAmount?: number,
      fractionDigits?: number
  }
}

export interface DiscountedPrice {
  value?: PriceValue
  includedDiscounts?: IncludedDiscounts[]
}

export interface DiscountedPricePerQuantity {
  quantity?: number
  discountedPrice?: DiscountedPrice
}

export interface CartLineItemsInner {
  /**
   *
   * @type {string}
   * @memberof CartLineItemsInner
   */
  id?: string
  /**
   *
   * @type {ProductVariant}
   * @memberof CartLineItemsInner
   */
  variant?: ProductVariant
  /**
   *
   * @type {number}
   * @memberof CartLineItemsInner
   */
  quantity?: number
  /**
   * Total price of this Line Item equalling price multiplied by quantity.
   * @type {number}
   * @memberof CartLineItemsInner
   */
  totalPrice?: number
  /**
   *
   * @type {string}
   * @memberof CartLineItemsInner
   */
  currencyCode?: string

  /**
   * @type {DiscountedPrice}
   * @memberof CartLineItemsInner
   */
  discountedPrice?: DiscountedPrice

  /**
   * @type {DiscountedPricePerQuantity}
   * @memberof CartLineItemsInner
   */
  discountedPricePerQuantity?: DiscountedPricePerQuantity[]
}

export interface DiscountCode {
  /**
   * Discount Code Information
   * @type {Record<string, string>}
   * @memberof DiscountCode
   */
  discountCode?: {
      typeId: string,
      id: string
  },
  /**
   * State of the Discount Code
   * @type {string}
   * @memberof DiscountCode
   */
  state?: string
}

export interface DiscountOnTotalPrice {
  /**
   * Discounted Amount Information
   * @type {Record<string, string>}
   * @memberof DiscountOnTotalPrice
   */
  discountedAmount?: {
      type?: string,
      currencyCode?: string,
      centAmount?: number,
      fractionDigits?: number
  },

  /**
   * Array of included Discounts
   * @type {Array}
   * @memberof DiscountOnTotalPrice
   */
  includedDiscounts?: IncludedDiscounts[]
}

export interface Cart {
  /**
   *
   * @type {string}
   * @memberof Cart
   */
  id?: string
  /**
   *
   * @type {number}
   * @memberof Cart
   */
  version?: number
  /**
   *
   * @type {string}
   * @memberof Cart
   */
  customerId?: string
  /**
   *
   * @type {Array<CartLineItemsInner>}
   * @memberof Cart
   */
  lineItems?: Array<CartLineItemsInner>
  /**
   *
   * @type {CartTotalPrice}
   * @memberof Cart
   */
  totalPrice?: CartTotalPrice
  /**
   *
   * @type {number}
   * @memberof Cart
   */
  totalQuantity?: number

  /**
   *
   * @type {Array<DiscountCode>}
   * @memberof Cart
   */
  discountCodes?: DiscountCode[]

  /**
   * @type {DiscountOnTotalPrice}
   * @memberof Cart
   */
  discountOnTotalPrice?: DiscountOnTotalPrice
}

export interface ChangeLineItemQuantity {
  /**
   *
   * @type {string}
   * @memberof ChangeLineItemQuantity
   */
  lineItemId?: string
  /**
   *
   * @type {number}
   * @memberof ChangeLineItemQuantity
   */
  quantity?: number
}

export interface Recalculate {
  /**
   * Leave empty or set to false to only update the Prices of the Line Items. Set to true to update the Line Items' product data (like name) also.
   * @type {boolean}
   * @memberof Recalculate
   */
  updateProductData?: boolean
}

export interface RemoveLineItem {
  /**
   *
   * @type {string}
   * @memberof RemoveLineItem
   */
  lineItemId?: string
  /**
   *
   * @type {number}
   * @memberof RemoveLineItem
   */
  quantity?: number
}

export type CartsIdPutRequestUpdateAction =
  | AddLineItem
  | ChangeLineItemQuantity
  | Recalculate
  | RemoveLineItem

export interface CartsIdPutRequest {
  /**
   *
   * @type {number}
   * @memberof CartsIdPutRequest
   */
  version?: number
  /**
   *
   * @type {CartsIdPutRequestUpdateAction}
   * @memberof CartsIdPutRequest
   */
  updateAction?: CartsIdPutRequestUpdateAction
}

export interface CartPrice {
  /**
   *
   * @type {string}
   * @memberof CartPrice
   */
  id?: string
  /**
   *
   * @type {CartTotalPrice}
   * @memberof CartPrice
   */
  value?: CartTotalPrice
}

export interface Address {
  /**
   *
   * @type {string}
   * @memberof Address
   */
  id?: string
  /**
   *
   * @type {string}
   * @memberof Address
   */
  country?: string
  /**
   *
   * @type {string}
   * @memberof Address
   */
  title?: string
  /**
   *
   * @type {string}
   * @memberof Address
   */
  firstName?: string
  /**
   *
   * @type {string}
   * @memberof Address
   */
  lastName?: string
  /**
   *
   * @type {string}
   * @memberof Address
   */
  streetName?: string
  /**
   *
   * @type {string}
   * @memberof Address
   */
  streetNumber?: string
  /**
   *
   * @type {string}
   * @memberof Address
   */
  postalCode?: string
  /**
   *
   * @type {string}
   * @memberof Address
   */
  city?: string
  /**
   *
   * @type {string}
   * @memberof Address
   */
  region?: string
  /**
   *
   * @type {string}
   * @memberof Address
   */
  state?: string
  /**
   *
   * @type {string}
   * @memberof Address
   */
  email?: string
}

export interface OrderLineItemsInner {
  /**
   *
   * @type {string}
   * @memberof OrderLineItemsInner
   */
  id?: string
  /**
   *
   * @type {ProductVariant}
   * @memberof OrderLineItemsInner
   */
  variant?: ProductVariant
  /**
   *
   * @type {number}
   * @memberof OrderLineItemsInner
   */
  quantity?: number
  /**
   * Total price of this Line Item equalling price multiplied by quantity.
   * @type {number}
   * @memberof OrderLineItemsInner
   */
  totalPrice?: number
  /**
   *
   * @type {string}
   * @memberof OrderLineItemsInner
   */
  currencyCode?: string
}

export interface ChangeOrderState {
  /**
   *
   * @type {string}
   * @memberof ChangeOrderState
   */
  orderState?: string
}

export interface SetBillingAddress {
  /**
   *
   * @type {Address}
   * @memberof SetBillingAddress
   */
  address?: Address
}

export interface SetShippingAddress {
  /**
   *
   * @type {Address}
   * @memberof SetShippingAddress
   */
  address?: Address
}

export type OrdersIdPutRequestUpdateAction =
  | ChangeOrderState
  | SetBillingAddress
  | SetShippingAddress

export interface OrdersIdPutRequest {
  /**
   *
   * @type {number}
   * @memberof OrdersIdPutRequest
   */
  version?: number
  /**
   *
   * @type {OrdersIdPutRequestUpdateAction}
   * @memberof OrdersIdPutRequest
   */
  updateAction?: OrdersIdPutRequestUpdateAction
}

export interface OrderCart {
  /**
   *
   * @type {string}
   * @memberof OrderCart
   */
  id?: string
  /**
   *
   * @type {number}
   * @memberof OrderCart
   */
  version?: number
  /**
   *
   * @type {string}
   * @memberof OrderCart
   */
  customerId?: string
  /**
   *
   * @type {Array<OrderLineItemsInner>}
   * @memberof OrderCart
   */
  lineItems?: Array<OrderLineItemsInner>
  /**
   *
   * @type {OrderTotalPrice}
   * @memberof OrderCart
   */
  totalPrice?: OrderTotalPrice
  /**
   *
   * @type {number}
   * @memberof OrderCart
   */
  totalQuantity?: number
}

export interface OrdersPostRequest {
  /**
   *
   * @type {string}
   * @memberof OrdersPostRequest
   */
  version?: string
  /**
   *
   * @type {OrderCart}
   * @memberof OrdersPostRequest
   */
  cart?: OrderCart
}

export interface Order {
  /**
   *
   * @type {string}
   * @memberof Order
   */
  id?: string
  /**
   *
   * @type {number}
   * @memberof Order
   */
  version?: number
  /**
   *
   * @type {string}
   * @memberof Order
   */
  customerId?: string
  /**
   *
   * @type {string}
   * @memberof Order
   */
  customerEmail?: string
  /**
   *
   * @type {Array<OrderLineItemsInner>}
   * @memberof Order
   */
  lineItems?: Array<OrderLineItemsInner>
  /**
   *
   * @type {OrderTotalPrice}
   * @memberof Order
   */
  totalPrice?: OrderTotalPrice
  /**
   *
   * @type {number}
   * @memberof Order
   */
  totalQuantity?: number
  /**
   *
   * @type {Address}
   * @memberof Order
   */
  billingAddress?: Address
  /**
   *
   * @type {Address}
   * @memberof Order
   */
  shippingAddress?: Address
  /**
   * Cart Id
   * @type {string}
   * @memberof Order
   */
  origin?: string
  /**
   *
   * @type {string}
   * @memberof Order
   */
  orderState?: string
  /**
   *
   * @type {string}
   * @memberof Order
   */
  createdAt?: string
  /**
   *
   * @type {string}
   * @memberof Order
   */
  completedAt?: string
}

export interface OrderPrice {
  /**
   *
   * @type {string}
   * @memberof Price
   */
  id?: string
  /**
   *
   * @type {OrderTotalPrice}
   * @memberof Price
   */
  value?: OrderTotalPrice
}

export interface OrderProductVariant {
  /**
   *
   * @type {string}
   * @memberof OrderProductVariant
   */
  id?: string
  /**
   *
   * @type {string}
   * @memberof OrderProductVariant
   */
  sku?: string
  /**
   *
   * @type {string}
   * @memberof OrderProductVariant
   */
  name?: string
  /**
   *
   * @type {string}
   * @memberof OrderProductVariant
   */
  slug?: string
  /**
   *
   * @type {Array<Image>}
   * @memberof OrderProductVariant
   */
  images?: Array<Image>
  /**
   *
   * @type {Array<OrderPrice>}
   * @memberof OrderProductVariant
   */
  prices?: Array<OrderPrice>
  /**
   *
   * @type {ProductAttribute[]}
   * @memberof OrderProductVariant
   */
  attributes?: ProductAttribute[]
  /**
   *
   * @type {ProductVariantAvailability}
   * @memberof OrderProductVariant
   */
  availability?: ProductVariantAvailability
}
