import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Queries } from '../../types/graphql-types'

interface CategoryProps {
  selectedCategory: string
  handleSelect: (category: string) => void
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px 20px;
  margin-top: 80px;

  @media (max-width: 1024px) {
    gap: 5px 15px;
  }

  @media (max-width: 768px) {
    gap: 5px 10px;
  }
`

const Item = styled.div<{ $selected: boolean }>`
  font-size: 16px;
  font-weight: ${({ $selected }) => ($selected ? 600 : 300)};
  cursor: ${({ $selected }) => ($selected ? 'default' : 'pointer')};

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const Category: React.FC<CategoryProps> = ({
  selectedCategory,
  handleSelect,
}) => {
  const [categories, setCategories] = useState<Record<string, number>>({})

  const fetchCategories = async () => {
    const result = await fetch('/___graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query MyQuery {
            allContentfulPost {
              nodes {
                category
              }
            }
          }
        `,
      }),
    })

    const data = await result.json()
    const categories: Record<string, number> =
      data.data.allContentfulPost.nodes.reduce(
        (
          categories: Record<string, number>,
          post: Queries.IndexPageQuery['allContentfulPost']['nodes'][0],
        ) => {
          post.category
            ?.filter((category): category is string => !!category)
            .forEach(
              category =>
                (categories[category] = (categories[category] ?? 0) + 1),
            )
          return categories
        },
        { All: data.data.allContentfulPost.nodes.length },
      )
    setCategories(categories)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <Wrapper>
      {Object.entries(categories).map(([category, count]) => (
        <Item
          onClick={() => handleSelect(category)}
          $selected={category === selectedCategory}
          key={category}
        >
          #{category}({count})
        </Item>
      ))}
    </Wrapper>
  )
}

export default Category
