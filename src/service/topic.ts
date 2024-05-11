import { GET } from './HttpClient';

export async function getTopics(
  categoryId: number | null,
  token: string
): Promise<TopicItem[]> {
  try {
    const topics = await GET({
      path: `topics/category/?id=${categoryId}`,
      token,
    });
    return topics;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
