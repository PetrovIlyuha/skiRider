export class ShopParams implements IShopParams {
  productBrandIdForFilterSelected = 0;
  productCategoryIdForFilterSelected = 0;
  sortByString = 'name';
  pageNumber = 1;
  pageSize = 6;
}

export interface IShopParams {
  productBrandIdForFilterSelected: number;
  productCategoryIdForFilterSelected: number;
  sortByString: string;
  pageNumber: number;
  pageSize: number;
}
