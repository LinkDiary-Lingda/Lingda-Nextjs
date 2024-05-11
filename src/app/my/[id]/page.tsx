import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MyId({ params }: { params: { id: number } }) {
  const { id } = params;
  console.log(id);

  return <></>;
}
