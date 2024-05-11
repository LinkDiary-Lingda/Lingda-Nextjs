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
    id: 0,
    type: 'category',
    color: 'red',
    name: '햄스터 키우기',
    parentId: null,
    prevId: null,
  },
  {
    id: 1,
    type: 'divider',
    name: '디자인 블로그',
    parentId: null,
    prevId: 0,
    children: [
      {
        id: 5,
        type: 'category',
        color: 'green',
        name: '폰트',
        parentId: 1,
        prevId: null,
      },
      {
        id: 6,
        type: 'category',
        color: 'blue',
        name: '색상',
        parentId: 1,
        prevId: 5,
      },
    ],
  },
  {
    id: 2,
    type: 'category',
    color: 'orange',
    name: '강아지 키우기',
    parentId: null,
    prevId: 1,
  },
];
