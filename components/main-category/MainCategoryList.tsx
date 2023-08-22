import NotFound from "@/components/ui/not-found/NotFound";
import MainCategoryItem from "./MainCategoryItem";

import styles from "./MainCategoryList.module.scss";

const MainCategoryList = ({ list }: { list: MainCategory[] | null }) => {
  return list && list.length ? (
    <ul className={styles.list}>
      {list.map((data) => (
        <MainCategoryItem key={data.id} categoryData={data} />
      ))}
    </ul>
  ) : (
    <NotFound>Main Categories</NotFound>
  );
};

export default MainCategoryList;
