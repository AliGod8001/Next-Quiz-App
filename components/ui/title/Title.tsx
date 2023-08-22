import Link from 'next/link';
import styles from './Title.module.scss'

const Title = ({
  children,
  linkText,
  href
} : {
  children: React.ReactNode
  linkText?: string,
  href?: string
}) => {
  return <div className={styles['title-wrapper']}>
    <span className={styles.title}>{children}</span>
    {
      linkText && <Link className={styles.text} href={href!}>{linkText}</Link>
    }
  </div>
}

export default Title;