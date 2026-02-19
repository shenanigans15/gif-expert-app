import axios from 'axios'
import type { GiphyResponse } from '../interfaces/giphy.response'
import type { Gif } from '../interfaces/gif.interface'

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  const res = await axios.get<GiphyResponse>(
    'https://api.giphy.com/v1/gifs/search',
    {
      params: {
        q: query,
        limit: 10,
        lang: 'es',
        api_key: 'X9Yh12KqtpSb5IzWxkaBz65n1oJTaigh',
      },
    },
  )

  return res.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height),
  }))
}
