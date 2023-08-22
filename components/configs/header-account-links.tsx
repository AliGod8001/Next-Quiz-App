import Link from 'next/link';
import type { MenuProps } from 'antd';

const HeaderAccountItems: MenuProps["items"] = [
  {
    key: 0,
    label: <Link href="/profile">Profile</Link>
  },
  {
    key: 5,
    label: <Link href="/profile/results">Results</Link>
  },
  {
    type: "divider"
  },
]

export default HeaderAccountItems