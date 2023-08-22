import Link from "next/link";
import styles from "./CategoryItem.module.scss";

const CategoryItem = ({ title, href }: { title: string; href: string }) => {
  return (
    <li>
      <Link className={styles.link} href={href}>{title}</Link>
    </li>
  );
};

export default CategoryItem;
