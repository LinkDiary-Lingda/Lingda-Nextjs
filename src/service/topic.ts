import { toast } from 'react-toastify';
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
    return `https://image.giftmoa.co.kr/images/${fileName}`;
  } catch (error) {
    console.log(error);
    toast.error('등록에 실패했어요. 다시 시도해주세요🥲');
    throw error;
  }
}
