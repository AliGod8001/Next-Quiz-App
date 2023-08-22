import Link from "next/link";

import styles from "./ResultDetailHeader.module.scss";

const ResultDetailHeader = ({
  mainCat,
  cat,
  subCat,
}: {
  mainCat?: MainCategory;
  cat?: Category;
  subCat?: SubCategory;
}) => {
  const items = [
    {
      id: 1,
      title: mainCat?.title,
      href: `/${mainCat?.id}`,
    },
    {
      id: 2,
      title: cat?.title,
      href: `/${cat?.mainCategory_id}/${cat?.id}`,
    },
    {
      id: 3,
      title: subCat?.title,
      href: `/${cat?.mainCategory_id}/${subCat?.category_id}/${subCat?.id}`,
    },
  ];

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id}>
          <Link href={item.href} className={styles.link}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ResultDetailHeader;
