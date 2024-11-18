import { useState } from 'react'

const useCategory = () => {
  const [postsByCategory, setPostsByCategory] = useState([])

  const fetchPostsByCategory = async (category: string) => {
    const result = await fetch('/___graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query IndexPage($category: String!) {
            allContentfulPost(filter: { category: { eq: $category } }) {
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
        variables: { category },
      }),
    })

    const posts = await result.json()
    setPostsByCategory(posts.data.allContentfulPost.nodes)
  }

  return { postsByCategory, fetchPostsByCategory }
}

export default useCategory
