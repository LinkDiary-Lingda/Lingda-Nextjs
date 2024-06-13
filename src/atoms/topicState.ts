import {
  ImageContent,
  TextContent,
  UrlContent,
  defaultTopic,
} from '@/types/topic';
import { atom } from 'recoil';

export type CurrentTopicProps = {
  name?: string | undefined;
  categoryId: number | null;
  categoryName: string | undefined;
  contentRequest: {
    textContents: TextContent[];
    imageContents: ImageContent[];
    urlContents: UrlContent[];
  };
  stared?: boolean;
  createdDate?: string;
  updatedDate?: string;
};

export const currentTopicState = atom<CurrentTopicProps>({
  key: 'currentTopicState',
  default: defaultTopic,
});

export const editTopicState = atom<number | null>({
  key: 'editTopicState',
  default: null,
});

type Filter = {
  [key: string]: boolean;
};

export const filtersTopic = atom<Filter>({
  key: 'filtersAtom',
  default: {
    starred: false,
    link: false,
    text: false,
    image: false,
  },
});
