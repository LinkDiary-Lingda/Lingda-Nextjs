import Content from './content';
import Filters from './filters';
import Nothing from './nothing';

export default function My() {
  return (
    <>
      <Filters />
      <section className="mt-1 flex flex-col">
        <Nothing />
        <Content />
        <Content />
        <Content />
      </section>
    </>
  );
}
