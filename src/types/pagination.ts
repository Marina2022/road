export type PaginatedData<T> = {
  list: T[], 
  metadata: { count: number, hasNext: boolean, cursor?: number }
}