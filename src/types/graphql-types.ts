export namespace Queries {
  export type IndexPageQuery = {
    postCollection: {
      total: number
      items: Array<{
        title: string
        category: string[]
        slug: string
        date: string
        description: string
        thumbnail: {
          url: string
        }
      }>
    }
  }
}

// export interface IGatsbyImageData {
//   layout: 'fixed' | 'fullWidth' | 'constrained'
//   backgroundColor: string
//   images: {
//     fallback: {
//       src: string
//       srcSet: string
//       sizes: string
//     }
//     sources: Array<{
//       srcSet: string
//       type: string
//       sizes: string
//     }>
//   }
//   width: number
//   height: number
// }
