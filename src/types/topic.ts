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

type ImageContent = {
  imageUrl: string;
};

type TextContent = {
  text: string;
};

type UrlContent = {
  url: string;
};

export const defaultTopic ={
  name: '',
  categoryId: null,
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
},}
