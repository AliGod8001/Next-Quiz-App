import { Metadata } from "next";

import GetCategory from "@/services/categories/GetCategory";
import GetSubCategories from "@/services/sub-categories/GetSubCategories";
import SubCategory from "@/components/sub-category/SubCategory";

type Params = { 
  mainCategoryId: string,
  categoryId: string
}

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}) : Promise<Metadata> => {
  const { data } = await GetCategory(Number(params.categoryId))

  return {
    title: data?.title
  }
};

const CategoryPage = async ({
  params
} : {
  params: Params
}) => {
  const { data: category } = await GetCategory(Number(params.categoryId))
  const { data: subCategories} = await GetSubCategories(Number(params.categoryId))

  return <SubCategory subCategories={subCategories} title={category?.title} wrapperId={category?.mainCategory_id} />
};

export default CategoryPage;
