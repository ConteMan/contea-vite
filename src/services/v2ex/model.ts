export type Config = {
  key: string
  enable: boolean
  name: string
  site: string
  url: string
  expried: number
}

export type BaseUser = {
  expried?: number
  username?: string
  login?: boolean
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

export type InfoItem = {
  ca_module: string
  ca_module_type: string
  [other: string]: any
}

export type InfoList = InfoItem []
