import { HeadFC } from 'gatsby'
import Introduction from '../components/main/Introduction'
import { useState } from 'react'
import Category from '../components/main/Category'
import PostList from '../components/main/PostList'
import Seo from '../components/common/Seo'

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

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

      <PostList selectedCategory={selectedCategory} />
    </>
  )
}

export default Index

export const Head: HeadFC = () => <Seo />
