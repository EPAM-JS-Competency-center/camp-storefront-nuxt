import api from '~/api/api'
import type { Layout } from '~/types/layout'

export const getPromos = async (sku: string): Promise<Layout | undefined> => {
    const response = await api<Layout>({
        method: 'get',
        url: `/promos/${sku}`
    })

    return response.data
}
