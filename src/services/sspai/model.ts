export type Config = {
  key: string
  enable: boolean
  name: string
  site: string
  url: string
  apiUrl: string
  cdnUrl: string
  expried: number
}

export type User = {
  updatedAt?: number
  expried?: number

  [propName: string]: any
}
