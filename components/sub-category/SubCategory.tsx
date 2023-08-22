import Title from "@/components/ui/title/Title";
import NotFound from "@/components/ui/not-found/NotFound";
import CategoryList from "@/components/ui/list/CategoryList";

import styles from "./SubCategory.module.scss";

const SubCategory = ({
  subCategories,
  title,
  wrapperId,
}: {
  subCategories: SubCategory[] | null;
  title?: string;
  wrapperId?: number;
}) => {
  return (
    <>
      <Title href={`/${wrapperId}`} linkText="Back">
        Sub Categories of {title}
      </Title>
      <CategoryList list={subCategories!} wrapperId={wrapperId} />
    </>
  );
};

export default SubCategory;
