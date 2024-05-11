import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCategoryItems } from '@/service/category';
import { getServerSession } from 'next-auth';
import { getTopics } from '@/service/topic';

type Props = {
  params: { id: number | null };
};
export default async function MyId({ params }: Props) {
  const { id } = params;
  const session = await getServerSession();
  const topics = await getTopics(id, session?.user?.email || '');

  return <></>;
}
