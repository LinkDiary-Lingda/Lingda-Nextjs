import { FaPlus } from 'react-icons/fa';
import Content from './content';
import Filters from './filters';
import Nothing from './nothing';
import Link from 'next/link';

export default function My() {
  return (
    <>
      <Filters />
      <section className="mt-1 flex flex-col h-[85vh] overflow-auto scrollbar-hide">
        <Content />
        <Content />
        <Content />
        <div className="sticky bottom-12 ml-auto mr-4">
          <Link
            className="w-[60px] h-[60px] rounded-full bg-Primary-02 flex items-center justify-center"
            href="/new"
          >
            <FaPlus size={40} color="white" />
          </Link>
        </div>
      </section>
    </>
  );
}
