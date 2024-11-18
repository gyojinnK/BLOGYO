import { useEffect, useState } from 'react'
import styled from 'styled-components'
import PostItem from './PostItem'
import { useInView } from 'react-intersection-observer'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'

interface PostListProps {
  posts: Queries.IndexPageQuery['allContentfulPost']['nodes']
  pageInfo: Queries.IndexPageQuery['allContentfulPost']['pageInfo']
  selectedCategory: string
}

const Wrapper = styled.section`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

const PostList: React.FC<PostListProps> = ({
  posts,
  pageInfo,
  selectedCategory,
}) => {
  const { items, setItems, fetchMorePosts } = useInfiniteScroll({
    posts,
    pageInfo,
    selectedCategory,
  })
  const [ref, inView] = useInView({})

  useEffect(() => {
    fetchMorePosts()
  }, [selectedCategory])

  useEffect(() => {
    if (inView) {
      fetchMorePosts()
    }
  }, [inView])

  console.log(selectedCategory)

  return (
    <Wrapper>
      {items.map(({ title, date, category, thumbnail, description, slug }) => (
        <PostItem
          key={title}
          title={title as string}
          date={date as string}
          category={category as string[]}
          thumbnail={thumbnail?.gatsbyImageData as IGatsbyImageData}
          description={description?.description as string}
          slug={slug as string}
        />
      ))}
      <div ref={ref}></div>
    </Wrapper>
  )
}

export default PostList
