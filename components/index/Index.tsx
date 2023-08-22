import MainCategoryList from "@/components/main-category/MainCategoryList";
import Title from "@/components/ui/title/Title";

import IndexBanner from "./IndexBanner";

const Index = ({
    categories
} : {
    categories: MainCategory[] | null
}) => {
    return <>
        <IndexBanner />
        <Title linkText="see all" href="/">All Categories</Title>
        <MainCategoryList list={categories} />
    </>
}

export default Index;