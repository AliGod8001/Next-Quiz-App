import ThemeToggler from '@/components/theme-toggler/ThemeToggler';

import HeaderLogo from './HeaderLogo';
import HeaderAccount from './HeaderAccount';

import styles from './Header.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      <HeaderLogo />
      <div className={styles.right}>
        <ThemeToggler />
        <HeaderAccount />
      </div>
    </div>
  )
}

export default Header;