import { HeadFC, PageProps, graphql } from 'gatsby'
import Introduction from '../components/main/Introduction'
import { useState } from 'react'
import Category from '../components/main/Category'
import PostList from '../components/main/PostList'
import Seo from '../components/common/Seo'

const Index = ({
  data: {
    allContentfulPost: { nodes, pageInfo },
  },
}: PageProps<Queries.IndexPageQuery>) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const posts = nodes.filter(
    ({ category }) =>
      selectedCategory === 'All' || category?.includes(selectedCategory),
  )

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <>
      <Introduction />
      <Category
        selectedCategory={selectedCategory}
        handleSelect={handleSelectCategory}
      />

      <PostList
        posts={posts}
        pageInfo={pageInfo}
        selectedCategory={selectedCategory}
      />
    </>
  )
}

export default Index

export const Head: HeadFC = () => <Seo />

export const query = graphql`
  query IndexPage($skip: Int = 0, $limit: Int = 5) {
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
