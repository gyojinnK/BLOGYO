import { useEffect, useMemo, useState } from 'react'
import { HEADERS } from './useRenderRichText'

type ContentType = {
  content: {
    content: {
      data: unknown
      marks: unknown
      nodeType: string
      value: string
    }[]
    nodeType: string
  }[]
  nodeType: string
}

const useTableOfContents = (rawContent: string) => {
  // 현재 위치한 챕터를 표시해주기 위해 추가
  const [activeId, setActiveId] = useState<string | null>(null)

  const toc = useMemo(() => {
    const { content } = JSON.parse(rawContent) as ContentType

    // nodeType이 BLOCKS.HEADING_1, BLOCKS.HEADING_2, BLOCKS.HEADING_3인 content만 필터링
    const headers = content.filter(item =>
      HEADERS.find(header => header === item.nodeType),
    )

    // h1을 쓰지 않고 h2, h3로만 제목을 구성하는 경우를 위해 최소 Depth를 계산
    // Depth에 따라 텍스트 시작 부분에 여백의 길이가 달라짐
    const minDepth = Math.min(
      ...headers.map(({ nodeType }) =>
        parseInt(nodeType.charAt(nodeType.length - 1)),
      ),
    )

    return headers.map(({ nodeType, content }) => {
      const title = content[0].value
      const id = `${title.replaceAll(' ', '-')}_` // 내부 텍스트를 통해 고유 ID 값을 생성
      const depth = parseInt(nodeType.charAt(nodeType.length - 1)) - minDepth // 위에서 구한 최소 Depth를 기준으로 해당 컴포넌트의 Depth 계산

      return { id, title, depth }
    })
  }, [rawContent])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        setActiveId(prevId => {
          // 스크롤을 아래로 내리는 경우
          if (entries[0].boundingClientRect.top < 0) return entries[0].target.id
          // 스크롤을 위로 올리는 경우
          else {
            const index = toc.findIndex(({ id }) => id === prevId)
            return index > 0 ? toc[index - 1].id : null
          }
        }),
      { rootMargin: '0% 0px -100% 0px' },
    )

    document
      .querySelectorAll('#content > h1, h2, h3')
      .forEach(element => observer.observe(element))

    return () => observer.disconnect()
  }, [toc])

  return { toc, activeId }
}

export default useTableOfContents
