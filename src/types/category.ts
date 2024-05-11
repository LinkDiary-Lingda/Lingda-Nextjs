// export type Category = {
//   id: number;
//   color: string;
//   type: 'category';
//   name: string;
//   parentId: number | null;
//   prevId: number | null;
// };
// export type Divider = {
//   id: number;
//   type: 'divider';
//   name: string;
//   parentId: number | null;
//   prevId: number;
//   children: Array<Category | Divider>;
// };

export interface CategoryDividerItem {
  id: number;
  name: string;
  type: 'CATEGORY' | 'DIVIDER';
  color: CategoryColor;
  dividerId: number | null;
  prevId: number | null;
  categories: CategoryDividerItem[];
}

export type CategoryColor =
  | '#F04242'
  | '#F08A42'
  | '#F2CC0D'
  | '#47B4EB'
  | '#A35CD6'
  | '#EC93C7'
  | '#E0E0E0'
  | null;

export type CategoryItem = {
  name: string;
  categoryType: 'CATEGORY' | 'DIVIDER' | string;
  color: CategoryColor | string;
  prevId: number | null;
  dividerId: number | null;
};

export const categories = [
  {
    id: 1,
    name: '안녕',
    type: 'CATEGORY',
    color: '#F04242',
    dividerId: null,
    prevId: null,
    categories: [],
  },
];
