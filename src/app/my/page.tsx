import Categories from './categories';
import Topic from './topic';

export default function My() {
  return (
    <>
      <Categories />
      <section className="mt-1 flex flex-col">
        <Topic />
        <Topic />
      </section>
    </>
  );
}
