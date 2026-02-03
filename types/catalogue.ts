export type CategoryNode = {
  [key: string]: CategoryNode
}

export type FrequentItem = {
  id: string
  title: string
  cat: string
  subCat?: string
  subset?: string
  freq: string
  unit: string
  src: string
  db: string
  datatype: string
}
