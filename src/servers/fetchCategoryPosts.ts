export const fetchCategoryPosts = async (
  category: string,
  skip: number = 0,
  limit: number = 5,
) => {
  const query = `
    query MyQuery($category: [String]!, $skip: Int!, $limit: Int!) {
      postCollection(limit: $limit, skip: $skip, where: { category_contains_all: $category }) {
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

  const variables = {
    category,
    skip,
    limit,
  }

  const url = new URL(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.GATSBY_CONTENTFUL_SPACE_ID}`,
  )
  url.searchParams.append('query', query)
  url.searchParams.append('variables', JSON.stringify(variables))
  url.searchParams.append(
    'access_token',
    process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN || '',
  )

  const result = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await result.json()
  const total = data.data.postCollection.total
  const hasNextPage = skip + limit < total
  const currentPage = Math.floor(skip / limit) + 1

  return {
    posts: data.data.postCollection.items,
    total,
    hasNextPage,
    currentPage,
  }
}
