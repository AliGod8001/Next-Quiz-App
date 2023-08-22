"use client"
import Image from 'next/image';

import { useUserStore } from '@/store/user-store';
import { bannerImage } from '@/public/images';

import styles from './IndexBanner.module.scss'

const IndexBanner = () => {
  const user = useUserStore(state => state.user)

  return <div className={styles.banner}>
    <div className={styles.body}>
      <h5 className={styles.title}>Welcome Back {user ? user.userName : "User"}</h5>
      <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum in lorem non finibus. Proin ultrices sollicitudin augue. Vestibulum vel hendrerit dolor. Nunc non lobortis justo. Sed et consequat nulla, sed accumsan augue. Etiam ex massa, pellentesque nec laoreet ac, tincidunt sed tortor. Sed pellentesque accumsan est, eu lobortis ante viverra ullamcorper. Ut enim massa, luctus nec mattis et, commodo ac nisi. Maecenas egestas lacinia nisl id condimentum. In ligula erat, consequat quis consequat nec, dictum non sem. Duis justo libero, iaculis ac consectetur vitae, luctus et nunc. Suspendisse euismod at quam in semper. Maecenas cursus varius ultrices. Integer facilisis massa vitae tellus congue vehicula.</p>
    </div>

    <Image
      className={styles.img}
      src={bannerImage}
      width={160}
      height={160}
      loading='lazy'
      alt='banner image'
    />
  </div>
}

export default IndexBanner;