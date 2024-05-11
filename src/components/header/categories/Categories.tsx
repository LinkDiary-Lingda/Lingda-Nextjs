'use client';
import React, {
  Dispatch,
  DragEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import DividerItem from './DividerItem';
import RootCategoryItem from './RootCategoryItem';
import NestedCategoryItem from './NestedCategoryItem';
import { CategoryDividerItem } from '@/types/category';
import { GoPlus } from 'react-icons/go';
import MenuBox from '@/components/menu/MenuBox';
import InputModal from '@/components/modal/CategoryInputModal';
import { getCategoryItems } from '@/service/category';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
  setMenuOn: Dispatch<SetStateAction<boolean>>;
};

export default function Categories({ setMenuOn }: Props) {
  const { data }: any = useSession();
  const router = useRouter();
  const [draggedOverId, setDraggedOverId] = useState<{
    targetId: string;
    targetParentId: string | null;
  } | null>(null);
  const [createMenuOn, setCreateMenuOn] = useState(false);
  const [items, setItems] = useState<Array<CategoryDividerItem>>([
    {
      id: 1,
      name: '',
      type: 'CATEGORY',
      color: null,
      dividerId: null,
      prevId: null,
      categories: [],
    },
  ]);
  const [modalOn, setModalOn] = useState(false);
  const [isCategory, setIsCategory] = useState(true);

  const menus = [
    {
      title: '디바이더 추가하기',
      handleClick: () => {
        setModalOn(true);
        setIsCategory(false);
      },
    },
    {
      title: '주제 추가하기',
      handleClick: () => {
        setModalOn(true);
        setIsCategory(true);
      },
    },
  ];

  const sortItemsByPrevId = (items: Array<CategoryDividerItem>) => {
    const firstItem = items.find((item) => item.prevId === null);
    const sortedItems = [];
    let currentItem = firstItem;
    let iterations = 0;
    while (currentItem && iterations < items.length) {
      if (currentItem.type === 'DIVIDER' && currentItem.categories.length > 0) {
        currentItem.categories = sortItemsByPrevId(currentItem.categories);
      }
      sortedItems.push(currentItem);
      currentItem = items.find((item) => item.prevId === currentItem?.prevId);
      iterations++;
    }
    return sortedItems;
  };

  const handleDragStart = (e: DragEvent<HTMLElement>) => {
    const dragData = {
      itemId: e.currentTarget.id,
      parentId: e.currentTarget.getAttribute('data-id'),
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDraggedOverId({
      targetId: e.currentTarget.id,
      targetParentId: e.currentTarget.getAttribute('data-id'),
    });
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDraggedOverId(null);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    if (draggedOverId === null) return;

    const { itemId, parentId } = JSON.parse(
      e.dataTransfer.getData('application/json')
    );

    const updatedItems = items.map((item) => {
      const id = item.id.toString();
      if (id !== itemId) return item;

      const { targetId, targetParentId } = draggedOverId;
      // dragOver한 아이템밑으로 itemId 설정
      if (targetParentId === id && item.type === 'DIVIDER') {
        const newChildren = item.categories.filter(
          (child) => child.id !== itemId
        );
        return { ...item, children: newChildren };
      }
      return {
        ...item,
        prevId: parseInt(targetId),
        parentId:
          targetParentId !== null ? parseInt(targetParentId) : targetParentId,
      };
    });
    console.log(updatedItems);

    setItems(sortItemsByPrevId(updatedItems));
    setDraggedOverId(null);
  };

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getCategoryItems(data.accessToken);
      setItems(categories);
    };
    getCategories();
  }, [data.accessToken]);

  return (
    <div className="mt-4 w-64 text-Body-1">
      <div className="h-14 flex items-center border-b-[1px] justify-between relative">
        <p>전체보기</p>
        <button
          className="w-9 h-9 flex items-center justify-center"
          aria-label="create-category-btn"
          onClick={() => setCreateMenuOn(!createMenuOn)}
        >
          <GoPlus size={24} />
        </button>
        {createMenuOn && <MenuBox menus={menus} position="right-0" />}
      </div>
      {modalOn && (
        <InputModal
          isCategory={isCategory}
          modalOn={modalOn}
          setModalOn={setModalOn}
          setItems={setItems}
        />
      )}
      <ul>
        {items.map((item) => {
          if (item.type === 'CATEGORY') {
            return (
              <li
                key={item.id}
                className="h-14 flex items-center justify-between border-b-[1px] border-Gray-02 cursor-pointer"
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                id={item.id + ''}
                data-id={item.dividerId}
                onClick={() => {
                  setMenuOn(false);
                  router.push(`/my/${item.id}`);
                }}
              >
                <RootCategoryItem
                  categoryId={item.id}
                  title={item.name}
                  color={item.color!}
                  token={data.accessToken}
                />
              </li>
            );
          }
          if (item.type === 'DIVIDER') {
            return (
              <li
                key={item.id}
                className="flex flex-col justify-between border-b-[1px] border-Gray-02"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
              >
                <DividerItem
                  title={item.name}
                  id={item.id + ''}
                  isDraggedOver={draggedOverId?.targetId === item.id + ''}
                />
                <ul>
                  {item.categories.map((child) => {
                    if (child.type === 'CATEGORY') {
                      return (
                        <li
                          key={child.id}
                          className="h-14 ml-6 flex items-center justify-between"
                          draggable
                          onDragStart={handleDragStart}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          onDragLeave={handleDragLeave}
                          id={child.id + ''}
                          data-id={child.dividerId}
                        >
                          <NestedCategoryItem
                            color={child.color!}
                            title={child.name}
                          />
                        </li>
                      );
                    }
                  })}
                </ul>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
