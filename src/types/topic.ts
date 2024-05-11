interface TopicItem {
  id: number;
  name: string;
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
