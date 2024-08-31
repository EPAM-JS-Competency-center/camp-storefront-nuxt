export type MagentoProductsResponse = {
  items: MagentoProduct[]
  search_criteria: MagentoSearchCriteria
  total_count: number
}

export type MagentoProduct = {
  id: number
  sku: string
  name?: string
  attribute_set_id?: number
  price?: number
  status?: number
  visibility?: number
  type_id?: string
  created_at?: string
  updated_at?: string
  weight?: number
  extension_attributes?: MagentoExtensionAttributes
  product_links?: MagentoProductLink[]
  options?: MagentoProductOptions[]
  media_gallery_entries?: MagentoMediaGallery[]
  tier_prices?: MagentoTierPrice[]
  custom_attributes?: MagentoCustomAttribute[]
}

export type MagentoExtensionAttributes = {
  website_ids?: number[]
  category_links?: MagentoCategoryLink[]
  discounts?: MagentoDiscount[]
  bundle_product_options?: MagentoBundleProductOption[]
  stock_item: MagentoStockItem
  downloadable_product_links?: MagentoDownloadableProductLink[]
  downloadable_product_samples?: MagentoDownloadableProductSample[]
  giftcard_amounts?: MagentoGiftcardAmount[]
  configurable_product_options?: MagentoConfigurableProductOption[]
  configurable_product_links?: number[]
}

export type MagentoCategoryLink = {
  position?: number
  category_id: string
  extension_attributes: MagentoExtensionAttribute
}

export type MagentoExtensionAttribute = {
}

export type MagentoDiscount = {
  discount_data: MagentoDiscountData
  rule_label: string
  rule_i_d: number
}

export type MagentoDiscountData = {
  amount: number
  base_amount: number
  original_amount: number
  base_original_amount: number
}

export type MagentoBundleProductOption = {
  option_id?: number
  title?: string
  required?: boolean
  type?: string
  position?: number
  sku?: string
  product_links?: MagentoBundleProductProductOptionLink[]
  extension_attributes: MagentoExtensionAttribute
}

export type MagentoBundleProductProductOptionLink = {
  id?: string
  sku?: string
  option_id?: number
  qty?: number
  position?: number
  is_default: boolean
  price: number
  price_type: number
  can_change_quantity?: number
  extension_attributes?: MagentoExtensionAttribute[]
}

export type MagentoStockItem = {
  item_id?: number
  product_id?: number
  stock_id?: number
  qty: number
  is_in_stock: boolean
  is_qty_decimal: boolean
  show_default_notification_message: boolean
  use_config_min_qty: boolean
  min_qty: number
  use_config_min_sale_qty: number
  min_sale_qty: number
  use_config_max_sale_qty: boolean
  max_sale_qty: number
  use_config_backorders: boolean
  backorders: number
  use_config_notify_stock_qty: boolean
  notify_stock_qty: number
  use_config_qty_increments: boolean
  qty_increments: number
  use_config_enable_qty_inc: boolean
  enable_qty_increments: boolean
  use_config_manage_stock: boolean
  manage_stock: boolean
  low_stock_date: string
  is_decimal_divided: boolean
  stock_status_changed_auto: number
  extension_attributes?: MagentoExtensionAttribute
}

export type MagentoDownloadableProductLink = {
  id?: number
  title?: string
  sort_order: number
  is_shareable: number
  price: number
  number_of_downloads?: number
  link_type: string
  link_file?: string
  link_file_content?: MagentoLinkFileContentOrSampleFileContent
  link_url?: string
  sample_type: string
  sample_file?: string
  sample_file_content: MagentoLinkFileContentOrSampleFileContent
  sample_url?: string
  extension_attributes: MagentoExtensionAttribute
}

export type MagentoLinkFileContentOrSampleFileContent = {
  file_data: string
  name: string
  extension_attributes?: MagentoExtensionAttribute
}

export type MagentoDownloadableProductSample = {
  id?: number
  title: string
  sort_order: number
  sample_type: string
  sample_file?: string
  sample_file_content?: MagentoLinkFileContentOrSampleFileContent
  sample_url?: string
  extension_attributes?: MagentoExtensionAttribute
}

export type MagentoGiftcardAmount = {
  attribute_id: number
  website_id: number
  value: number
  website_value: number
  extension_attributes?: MagentoExtensionAttribute
}

export type MagentoConfigurableProductOption = {
  id?: number
  attribute_id?: string
  label?: string
  position?: number
  is_use_default?: boolean
  values?: MagentoOptionValue[]
  extension_attributes?: MagentoExtensionAttribute
  product_id?: number
}

export type MagentoOptionValue = {
  value_index: number
  extension_attributes?: MagentoExtensionAttribute
}

export type MagentoProductLink = {
  sku: string
  link_type: string
  linked_product_sku: string
  linked_product_type: string
  position: number
  extension_attributes?: MagentoProductLinkExtensionAttribute
}

export type MagentoProductLinkExtensionAttribute = {
  qty: number
}

export type MagentoProductOptions = {
  product_sku: string
  option_id?: number
  title: string
  type: string
  sort_order: number
  is_require: boolean
  price?: number
  price_type?: string
  sku?: string
  file_extension?: string
  max_characters?: number
  image_size_x?: number
  image_size_y?: number
  values?: MagentoProductOptionValue[]
  extension_attributes: MagentoExtensionAttribute
}

export type MagentoProductOptionValue = {
  title: string
  sort_order: number
  price: number
  price_type: string
  sku?: string
  option_type_id?: number
}

export type MagentoMediaGallery = {
  id?: number
  media_type: string
  label: string
  position: number
  disabled: boolean
  types: string[]
  file?: string
  content?: Content
  extension_attributes?: MagentoMediaGalleryExtensionAttributes
}

export type Content = {
  base64_encoded_data: string
  type: string
  name: string
}

export type MagentoMediaGalleryExtensionAttributes = {
  video_content: MagentoVideoContent
}

export type MagentoVideoContent = {
  media_type: string
  video_provider: string
  video_url: string
  video_title: string
  video_description: string
  video_metadata: string
}

export type MagentoTierPrice = {
  customer_group_id: number
  qty: number
  value: number
  extension_attributes?: MagentoTierPriceExtensionAttributes
}

export type MagentoTierPriceExtensionAttributes = {
  percentage_value: number
  website_id: number
}

export type MagentoCustomAttribute = {
  attribute_code: string
  value: string
}

export type MagentoSearchCriteria = {
  filter_groups: MagentoFiltersGroup[]
  sort_orders?: MagentoSearchCriteriaSortOrder[]
  page_size?: number
  current_page?: number
}

export type MagentoFiltersGroup = {
  filters?: MagentoFilter[]
}

export type MagentoFilter = {
  field: string
  value: string
  condition_type?: string
}

export type MagentoSearchCriteriaSortOrder = {
  field: string
  direction: string
}
