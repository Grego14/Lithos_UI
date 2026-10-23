import { AvatarGroup } from '../../../components/ui/Avatar'

const users = [
  { src: '/example-avatar1.webp', alt: 'Jane Doe' },
  { src: '/example-avatar2.webp', alt: 'John Smith' },
  { src: '/example-avatar3.webp', alt: 'Amy Lee' },
  { alt: 'User 4' },
  { alt: 'User 5' },
  { alt: 'User 6' },
  { alt: 'User 7' },
  { alt: 'User 8' },
  { alt: 'User 9' },
  { alt: 'User 10' },
  { alt: 'User 11' },
  { alt: 'User 12' },
  { alt: 'User 13' },
  { alt: 'User 14' },
]

export const FourteenUserAvatarGroupExample = () => <AvatarGroup items={users} max={4} />
