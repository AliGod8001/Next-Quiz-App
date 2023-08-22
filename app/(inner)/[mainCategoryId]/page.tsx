import { Metadata } from "next"

import GetMainCategory from "@/services/main-categories/GetMainCategory"
import GetCategories from "@/services/categories/GetCategories"
import Category from "@/components/category/Category"

type Props = {
  params: { mainCategoryId: string }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const id = params.mainCategoryId
  const { data } = await GetMainCategory(Number(id))
  return {
    title: data?.title,
  }
}

const MainCategoryPage = async ({
  params
} : {
  params: {
    mainCategoryId: string
  }
}) => {
  const {data: category} = await GetCategories(Number(params.mainCategoryId))
  const {data: mainCategory} = await GetMainCategory(Number(params.mainCategoryId))

  return <Category title={mainCategory?.title} category={category} />
}

export default MainCategoryPage;