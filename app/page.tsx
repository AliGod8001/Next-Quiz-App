import GetMainCategories from "@/services/main-categories/GetMainCategories"
import Index from "@/components/index/Index"

const HomePage = async () => {
  const { data: categories } = await GetMainCategories();

  return <Index categories={categories} />
}

export default HomePage