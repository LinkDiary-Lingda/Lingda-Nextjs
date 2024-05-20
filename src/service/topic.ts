import { GET, POST } from './HttpClient';

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

export async function createTopic(
  item: Omit<
    TopicItem,
    'id' | 'categoryName' | 'stared' | 'createdDate' | 'updatedDate'
  >,
  token: string
) {
  try {
    const created = await POST({
      path: 'topics',
      token,
      body: item,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
