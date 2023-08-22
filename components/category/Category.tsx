import NotFound from "@/components/ui/not-found/NotFound";
import Title from "@/components/ui/title/Title";
import CategoryList from "@/components/ui/list/CategoryList";

import styles from "./Category.module.scss";

const Category = ({
  category,
  title,
}: {
  category: Category[] | null;
  title?: string;
}) => {
  return (
    <>
      <Title href="/" linkText="Back">Categories of {title}</Title>
      <CategoryList list={category!} />
    </>
  );
};

export default Category;
