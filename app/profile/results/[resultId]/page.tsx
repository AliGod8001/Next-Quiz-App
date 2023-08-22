import { Metadata } from "next";

import GetUserQuestionPackResult from "@/services/users/GetUserQuestionPackResult";
import GetQuestionPack from "@/services/question-packs/GetQuestionPack";
import GetSubCategory from "@/services/sub-categories/GetSubCategory";
import GetCategory from "@/services/categories/GetCategory";
import GetMainCategory from "@/services/main-categories/GetMainCategory";
import ResultDetail from "@/components/result-detail/ResultDetail";

type Params = {
  resultId: string;
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  let titleText: string = "Faild to load";
  const id = params.resultId;
  const { data } = await GetUserQuestionPackResult(Number(id));
  if (data) {
    const { data: pack, statusText: packStatusText } = await GetQuestionPack(
      data.questionPackId
    );
    if (pack) {
      const { data: subCategory, statusText: subCategoryStatusText } =
        await GetSubCategory(pack.subCategory_id);
      if (subCategory) titleText = subCategory.title;
      else titleText = subCategoryStatusText;
    } else {
      titleText = packStatusText;
    }
  }

  return {
    title: `${titleText} Results`,
  };
}

const profileResultDetailPage = async ({ params }: { params: Params }) => {
  const { data: result } = await GetUserQuestionPackResult(
    Number(params.resultId)
  );
  const { data: pack } = await GetQuestionPack(result?.questionPackId!);
  const { data: subCategory } = await GetSubCategory(pack?.subCategory_id!);
  const { data: category } = await GetCategory(subCategory?.category_id!);
  const { data: mainCategory } = await GetMainCategory(
    category?.mainCategory_id!
  );

  return (
    <ResultDetail
      result={result!}
      pack={pack!}
      subCat={subCategory!}
      cat={category!}
      mainCat={mainCategory!}
    />
  );
};

export default profileResultDetailPage;
