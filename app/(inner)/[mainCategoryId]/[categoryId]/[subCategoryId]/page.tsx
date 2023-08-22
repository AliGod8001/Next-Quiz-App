import { Metadata } from "next"

import GetSubCategory from "@/services/sub-categories/GetSubCategory"
import GetQuestionPack from "@/services/question-packs/GetQuestionPack"
import Question from "@/components/question/Question"

type Params = {
  mainCategoryId: string,
  categoryId: string,
  subCategoryId: string,
}

export const generateMetadata = async ({
  params
} : {
  params: Params
}) : Promise<Metadata> => {
  const { data } = await GetSubCategory(Number(params.subCategoryId))

  return {
    title: `${data?.title} | questions `
  }
}

const SubCategoryPage = async ({
  params
} : {
  params: Params
}) => {
  const { data: subCategory } = await GetSubCategory(Number(params.subCategoryId))
  const { data: pack } = await GetQuestionPack(subCategory?.questionPackId as number)

  return <Question pack={pack} title={subCategory?.title} />
}

export default SubCategoryPage;