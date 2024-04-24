export type Category = {
  id: number;
  color: string;
  type: 'category';
  name: string;
  parentId: number | null;
  prevId: number | null;
};
export type Divider = {
  id: number;
  type: 'divider';
  name: string;
  parentId: number | null;
  prevId: number;
  children: Array<Category | Divider>;
};
