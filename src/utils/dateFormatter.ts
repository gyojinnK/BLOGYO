export const dateFormatter = (date: string) => {
  const objDate = new Date(date)
  return (
    objDate.getFullYear() + '-' + objDate.getMonth() + '-' + objDate.getDate()
  )
}
