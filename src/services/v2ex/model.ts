export type Config = {
  key: string
  enable: boolean
  name: string
  site: string
  url: string
  expried: number
  storageKey: string
}

export type BaseUser = {
  expried?: number
  username?: string
}

export type User = BaseUser & {
  updatedAt?: number
  id?: string
  created?: string
  dau?: string
  online?: string
  balance?: {
    gold?: string
    silver?: string
    bronze?: string
  }
  showName?: string
  signature?: string
}

export type Mession = {
  completed?: boolean
  days?: number
}
