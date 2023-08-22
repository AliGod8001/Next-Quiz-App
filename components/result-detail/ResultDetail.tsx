import Title from "@/components/ui/title/Title";
import MainCard from "@/components/ui/card/main/MainCard";

import ResultDetailHeader from "./ResultDetailHeader";
import ResultDetailResult from "./ResultDetailResult";
import ResultDetailResultStep from "./ResultDetailResultStep";

const ResultDetail = ({
  result,
  pack,
  subCat,
  cat,
  mainCat,
}: {
  result?: QuestionPackResult;
  pack?: QuestionPack;
  subCat?: SubCategory;
  cat?: Category;
  mainCat?: MainCategory;
}) => {
  return (
    <>
      <Title href="/profile/results" linkText="Back">
        {subCat?.title} Results
      </Title>
      <MainCard>
        <ResultDetailHeader mainCat={mainCat} cat={cat} subCat={subCat} />
        <ResultDetailResult result={result} />
        <ResultDetailResultStep pack={pack} result={result} />
      </MainCard>
    </>
  );
};

export default ResultDetail;
