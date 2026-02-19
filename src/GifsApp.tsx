import { useState } from 'react'

import { GifList } from './gifs/components/GifList'
import { PreviousSearches } from './gifs/components/PreviousSearches'
import { mockGifs } from './mock-data/gifs.mock'
import { CustomHeader } from './shared/components/CustomHeader'
import { SearchBar } from './shared/components/SearchBar'

import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.action'

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(['dragon ball z'])

  const handleTermClicked = (term: string) => {
    console.log({ term })
  }

  const handleSearch = async (query: string) => {
    query = query.toLowerCase().trim()
    if (query.length === 0) return
    if (previousTerms.includes(query)) return
    setPreviousTerms([query, ...previousTerms].slice(0, 8))

    const gifs = await getGifsByQuery(query)

    console.log({ gifs })
  }

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el Gif perfecto"
      />

      {/* Search */}
      <SearchBar placeholder="Busca lo que quieras" onQuery={handleSearch} />

      {/* Busquedas previas */}
      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      {/* Gifs */}
      <GifList gifs={mockGifs} />
    </>
  )
}
