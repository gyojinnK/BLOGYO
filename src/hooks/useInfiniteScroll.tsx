import { useState } from 'react'
import { Queries } from '../types/graphql-types'
import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } from '../../config'

interface UseInfiniteScrollProps {
  items: Queries.IndexPageQuery['postCollection']['items']
  setItems: React.Dispatch<
    React.SetStateAction<Queries.IndexPageQuery['postCollection']['items']>
  >
  hasNextPage: boolean | undefined
  setHasNextPage: React.Dispatch<React.SetStateAction<boolean | undefined>>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  selectedCategory: string
}

const useInfiniteScroll = ({
  items,
  setItems,
  hasNextPage,
  currentPage,
  setHasNextPage,
  setCurrentPage,
  selectedCategory,
}: UseInfiniteScrollProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const fetchMorePosts = async () => {
    if (!hasNextPage) return

    let variables
    let query

    if (selectedCategory !== 'All') {
      query = `query IndexPage($skip: Int!, $limit: Int!, $category: [String]!) {
        postCollection(skip: $skip, limit: $limit, where: { category_contains_all: $category }) {
          total
          items {
            title
            category
            slug
            date
            thumbnail {
              url
            }
            description 
          }
        }
      }`
      variables = {
        skip: items.length,
        limit: 5,
        category: selectedCategory,
      }
    } else {
      query = `query IndexPage($skip: Int!, $limit: Int!) {
            postCollection(skip: $skip, limit: $limit) {
              total
              items {
                title
                category
                slug
                date
                description
                thumbnail {
                  url
                }
              }
            }
          }
      `
      variables = {
        skip: items.length,
        limit: 5,
      }
    }

    const url = new URL(
      `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
    )
    url.searchParams.append('query', query)
    url.searchParams.append('variables', JSON.stringify(variables))
    url.searchParams.append('access_token', CONTENTFUL_ACCESS_TOKEN || '')

    setIsLoading(true)

    const result = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const newData = await result.json()
    const newPosts = newData.data.postCollection.items
    const total = newData.data.postCollection.total
    const newHasNextPage = items.length + 5 < total
    const newCurrentPage = Math.floor(items.length / 5) + 1

    setItems([...items, ...newPosts])
    setHasNextPage(newHasNextPage)
    setCurrentPage(newCurrentPage)

    setIsLoading(false)
  }

  return { isLoading, hasNextPage, currentPage, fetchMorePosts }
}

export default useInfiniteScroll
