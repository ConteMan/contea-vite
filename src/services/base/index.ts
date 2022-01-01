import infoList from '~/models/list/infoList'

type Paginate = {
  currentPage: number
  num: number
  orderBy?: string | Array<string>
  isReverse?: boolean
}

class Base {
  async list(paginate: Paginate) {
    const { currentPage, num } = paginate
    return await infoList.storage.query().orderBy('ca_sort_at').offset((currentPage - 1) * num).reverse().toArray()
  }
}

export default new Base()
