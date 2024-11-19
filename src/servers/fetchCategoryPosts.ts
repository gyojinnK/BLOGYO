export const fetchCategoryPosts = async (
  category: string,
  skip: number = 0,
  limit: number = 5,
) => {
  const result = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
        query MyQuery($category: String!, $skip: Int!, $limit: Int!) {
          postCollection(limit: $limit, skip: $skip, where: { category_contains: $category }) {
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
        }
      `,
        variables: {
          category,
          skip,
          limit,
        },
      }),
    },
  )

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
