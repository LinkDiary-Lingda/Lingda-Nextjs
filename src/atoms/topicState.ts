import { defaultTopic } from '@/types/topic';
import { atom } from 'recoil';

export type CurrentTopicProps = {
  name?: string | undefined;
  categoryId: number | undefined;
  categoryName: string | undefined;
  contentRequest: {
    textContents: { text: string }[];
    imageContents: { imageUrl: string }[];
    urlContents: { url: string }[];
  };
};

export const currentTopicState = atom<CurrentTopicProps>({
  key: 'currentTopicState',
  default: defaultTopic,
});
