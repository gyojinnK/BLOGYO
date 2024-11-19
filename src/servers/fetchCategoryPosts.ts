export const fetchCategoryPosts = async (category: string) => {
  const result = await fetch('https://blogyo.vercel.app/___graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        query MyQuery {
          allContentfulPost (limit: 5, filter: { category: { eq: "${category}" } }) {
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
      `,
    }),
  })

  const data = await result.json()
  return {
    posts: data.data.allContentfulPost.nodes,
    pageInfo: data.data.allContentfulPost.pageInfo,
  }
}
