export interface TopicItem {
  id: number;
  name: string;
  color: string;
  categoryId: number | null;
  categoryName: string;
  stared: boolean;
  createdDate: string;
  updatedDate: string;
  contentResponses: {
    imageContents: ImageContent[];
    textContents: TextContent[];
    urlContents: UrlContent[];
  };
}

export type ImageContent = {
  imageUrl: string;
};

export type TextContent = {
  text: string;
};

export type UrlContent = {
  url: string;
};

export const defaultTopic = {
  name: '',
  categoryId: null,
  categoryName: undefined,
  contentRequest: {
    textContents: [
      {
        text: '',
      },
    ],
    imageContents: [
      {
        imageUrl: '',
      },
    ],
    urlContents: [
      {
        url: '',
      },
    ],
  },
};
