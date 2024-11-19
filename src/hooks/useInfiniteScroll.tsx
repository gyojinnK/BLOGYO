import { Queries } from '../types/graphql-types'

interface UseInfiniteScrollProps {
  items: Queries.IndexPageQuery['allContentfulPost']['nodes']
  setItems: React.Dispatch<
    React.SetStateAction<Queries.IndexPageQuery['allContentfulPost']['nodes']>
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
  const fetchMorePosts = async () => {
    console.log('call')
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
        category: selectedCategory,
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

  return { hasNextPage, currentPage, fetchMorePosts }
}

export default useInfiniteScroll
