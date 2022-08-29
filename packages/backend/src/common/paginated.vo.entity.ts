export class PaginatedVO<T> {
  total: number;
  pageNo: number;
  pageSize: number;
  results: T[];

  constructor(vo: PaginatedVO<T>) {
    Object.assign(this, vo);
  }
}
