export namespace Queries {
  export type IndexPageQuery = {
    allContentfulPost: {
      pageInfo: {
        pageCount: number
        totalCount: number
        currentPage: number
        hasNextPage: boolean
      }
      nodes: Array<{
        title: string
        category: string[]
        slug: string
        date: string
        thumbnail: {
          gatsbyImageData: IGatsbyImageData
        }
        description: {
          description: string
        }
      }>
    }
  }
}

export interface IGatsbyImageData {
  layout: 'fixed' | 'fullWidth' | 'constrained'
  backgroundColor: string
  images: {
    fallback: {
      src: string
      srcSet: string
      sizes: string
    }
    sources: Array<{
      srcSet: string
      type: string
      sizes: string
    }>
  }
  width: number
  height: number
}
