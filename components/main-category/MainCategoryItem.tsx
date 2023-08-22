import Image from 'next/image'
import Link from 'next/link';
import tinycolor from 'tinycolor2';

import styles from './MainCategoryItem.module.scss'

const MainCategoryItem = ({
  categoryData,
} : {
  categoryData: MainCategory
}) => {
  const color = tinycolor(categoryData.color)

  return <li>
    <Link href={`/${categoryData.id}`} className={styles.item} style={{ backgroundColor: `${color.setAlpha(0.1)}` }}>
      <Image
        className={styles.img}
        src={categoryData.icon}
        width={70}
        height={70}
        loading='lazy'
        alt={`${categoryData.title} icon image`}
      />
      <span className={styles.title} style={{ color: `${categoryData.color}`}}>{categoryData.title}</span>
      <span className={styles.text}>{categoryData.text}</span>
    </Link>
  </li>
}

export default MainCategoryItem;