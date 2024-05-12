import { GET } from './HttpClient';

export async function getTopics(
  categoryId: number | null,
  token: string
): Promise<TopicItem[]> {
  try {
    const topics = await GET({
      path: categoryId
        ? `topics/category?categoryId=${categoryId}`
        : `topics/category`,
      token,
    });

    return topics;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
