import { useEffect, useState } from 'react'
import styled from 'styled-components'
import PostItem from './PostItem'
import { useInView } from 'react-intersection-observer'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { fetchAllPosts, fetchCategoryPosts } from '../../servers'
import { Queries } from '../../types/graphql-types'
import Loading from '../common/Loading'

interface PostListProps {
  selectedCategory: string
}

const Wrapper = styled.section`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

const PostList: React.FC<PostListProps> = ({ selectedCategory }) => {
  const [items, setItems] = useState<
    Queries.IndexPageQuery['postCollection']['items']
  >([])
  const [hasNextPage, setHasNextPage] = useState<boolean | undefined>(false)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [ref, inView] = useInView({})
  const { fetchMorePosts, isLoading } = useInfiniteScroll({
    items,
    setItems,
    hasNextPage,
    setHasNextPage,
    currentPage,
    setCurrentPage,
    selectedCategory,
  })

  const fetchDataHandler = async (selectedCategory: string) => {
    let data
    if (selectedCategory === 'All') {
      data = await fetchAllPosts()
    } else {
      data = await fetchCategoryPosts(selectedCategory)
    }
    setItems(data.posts)
    setHasNextPage(data.hasNextPage)
    setCurrentPage(data.currentPage)
  }

  useEffect(() => {
    setItems([])
    fetchDataHandler(selectedCategory)
  }, [selectedCategory])

  useEffect(() => {
    if (inView) {
      fetchMorePosts()
    }
  }, [inView])

  return (
    <Wrapper>
      {items.map(({ title, date, category, thumbnail, description, slug }) => (
        <PostItem
          key={title}
          title={title as string}
          date={date as string}
          category={category as string[]}
          thumbnail={thumbnail as { url: string }}
          description={description as string}
          slug={slug as string}
        />
      ))}
      {items.length === 0 ? <Loading /> : isLoading && <Loading />}
      <div ref={ref}></div>
    </Wrapper>
  )
}

export default PostList
