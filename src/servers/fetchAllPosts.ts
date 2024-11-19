export const fetchAllPosts = async (skip: number = 0, limit: number = 5) => {
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
        query MyQuery {
          postCollection (limit: 5){
            total    
            items {
              title
              category
              slug
              date
              thumbnail {
                url
              }
              description {
                description
              }
            }
          }
        }
      `,
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
