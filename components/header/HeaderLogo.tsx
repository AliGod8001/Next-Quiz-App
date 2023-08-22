import Image from 'next/image';
import Link from 'next/link';

import { logoImage } from '@/public/images';

import styles from './HeaderLogo.module.scss'

const HeaderLogo = () => {
  return <Link className={styles.logo} href='/'>
    <Image
      className={styles.img}
      src={logoImage}
      width={150}
      height={60}
      loading='lazy'
      alt='quiz app logo image'
    />
    <div>
      <span className={styles.title}>Quiz App</span>
      <span className={styles.text}>Ali_God</span>
    </div>
  </Link>
}

export default HeaderLogo;