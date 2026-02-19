import { giphyApi } from '../api/giphy.api'
import type { GiphyResponse } from '../interfaces/giphy.response'
import type { Gif } from '../interfaces/gif.interface'

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  const res = await giphyApi.get<GiphyResponse>('/search', {
    params: {
      q: query,
      limit: 10,
    },
  })

  return res.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height),
  }))
}
