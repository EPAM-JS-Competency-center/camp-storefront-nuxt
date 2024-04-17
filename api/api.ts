import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

interface ApiRequestParams extends AxiosRequestConfig {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  url: string
  pathParams?: Record<string, string | number>
}

const BASE_URL = import.meta.env.VITE_BFF_URL || 'http://localhost:3000/api/v1'

const http = axios.create({
  baseURL: BASE_URL,
})

export default async function <T>(options: ApiRequestParams): Promise<AxiosResponse<T>> {
  try {
    const { pathParams = {}, headers = {}, ...opts } = options

    if (pathParams) {
      Object.keys(pathParams).forEach((param) => {
        opts.url = opts.url.replace(param, pathParams[param] as string)
      })
    }

    const response: AxiosResponse = await http({
      headers,
      ...opts,
    })

    return response
  } catch (e) {
    console.error(e)
    throw e
  }
}
