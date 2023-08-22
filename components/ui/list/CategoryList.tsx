import NotFound from "../not-found/NotFound";

import CategoryItem from "./CategoryItem";
import styles from "./CategoryList.module.scss";

const CategoryList = ({
  list,
  wrapperId,
}: {
  list: Category[] | SubCategory[];
  wrapperId?: number;
}) => {
  return (
    <>
      {list.length ? (
        <ul className={styles.list}>
          {list.map((item) => {
            const cat = item as Category;
            const subCat = item as SubCategory;
            return (
              <CategoryItem
                key={`my-list-item-${item.id}`}
                title={item.title}
                href={
                  wrapperId
                    ? `/${wrapperId}/${subCat.category_id}/${subCat.id}`
                    : `/${cat.mainCategory_id}/${item.id}`
                }
              />
            );
          })}
        </ul>
      ) : (
        <NotFound>List</NotFound>
      )}
    </>
  );
};

export default CategoryList;
