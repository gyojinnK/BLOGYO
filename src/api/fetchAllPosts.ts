export const fetchAllPosts = async () => {
  const result = await fetch('/___graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query MyQuery {
          allContentfulPost (limit: 5){
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
