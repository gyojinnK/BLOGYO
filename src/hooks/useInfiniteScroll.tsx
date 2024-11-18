import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface UseInfiniteScrollProps {
  posts: Queries.IndexPageQuery['allContentfulPost']['nodes']
  pageInfo: Queries.IndexPageQuery['allContentfulPost']['pageInfo']
  selectedCategory: string
}

const useInfiniteScroll = ({
  posts,
  pageInfo,
  selectedCategory,
}: UseInfiniteScrollProps) => {
  const [items, setItems] = useState(posts)
  const [hasNextPage, setHasNextPage] = useState(pageInfo.hasNextPage)
  const [currentPage, setCurrentPage] = useState(pageInfo.currentPage)

  const fetchMorePosts = async () => {
    if (!hasNextPage) return

    let variables
    let query

    if (selectedCategory !== 'All') {
      query = `query IndexPage($skip: Int!, $limit: Int!, $category: String!) {
        allContentfulPost(skip: $skip, limit: $limit, filter: { category: { eq:  $category} }) {
          pageInfo {
            pageCount
            totalCount
            currentPage
            hasNextPage
          }
          nodes {
            title
            category
            slug
            date
            thumbnail {
              gatsbyImageData
            }
            description {
              description
            }
          }
        }
      }`
      variables = {
        skip: items.length,
        limit: 5,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
      }
    } else {
      query = `query IndexPage($skip: Int!, $limit: Int!) {
            allContentfulPost(skip: $skip, limit: $limit) {
              pageInfo {
                pageCount
                totalCount
                currentPage
                hasNextPage
              }
              nodes {
                title
                category
                slug
                date
                thumbnail {
                  gatsbyImageData
                }
                description {
                  description
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

    const result = await fetch('/___graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    })

    const newData = await result.json()
    const newPosts = newData.data.allContentfulPost.nodes
    const newPageInfo = newData.data.allContentfulPost.pageInfo

    setItems([...items, ...newPosts])
    setHasNextPage(newPageInfo.hasNextPage)
    setCurrentPage(newPageInfo.currentPage)
  }

  return { items, setItems, hasNextPage, currentPage, fetchMorePosts }
}

export default useInfiniteScroll
