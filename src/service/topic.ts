import { toast } from 'react-toastify';
import { DELETE, GET, POST } from './HttpClient';
import { TopicItem } from '@/types/topic';

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

export async function getPresignedUrl(
  fileName: string,
  token: string
): Promise<{
  presignedUrl: string;
  fileName: string;
}> {
  try {
    const url = await POST({
      path: 's3/presigned-url',
      token,
      body: { fileName },
    });
    return url;
  } catch (error: any) {
    console.error(error.response.data);
    throw error;
  }
}

export async function updateImage({
  imageBody,
  name,
  token,
}: {
  imageBody: any;
  name: string;
  token: string;
}) {
  try {
    const { presignedUrl, fileName } = await getPresignedUrl(name, token);
    await fetch(presignedUrl, {
      method: 'PUT',
      body: imageBody,
    });
    return `https://image.lingda.app/images/${fileName}`;
  } catch (error) {
    console.log(error);
    toast.error('등록에 실패했어요. 다시 시도해주세요🥲');
    throw error;
  }
}

export async function starTopic(id: number, token: string) {
  try {
    const stared = await POST({ path: `topics/stars/${id}`, token });
    return stared;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function cancelStarTopic(id: number, token: string) {
  try {
    const stared = await DELETE({ path: `topics/stars/${id}`, token });
    return stared;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopic(id: number, token: string): Promise<TopicItem> {
  try {
    const topic = await GET({ path: `topics/${id}`, token });
    return topic;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function trashTopic(id: number, token: string) {
  try {
    const deleted = await DELETE({ path: `topics/${id}`, token });
    return deleted;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
