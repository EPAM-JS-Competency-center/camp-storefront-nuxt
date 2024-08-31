const magentoBaseURL = 'https://magento.sandbox.epamdev.com/rest/all'

export const magentoFetch = $fetch.create({
  baseURL: magentoBaseURL as string,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})