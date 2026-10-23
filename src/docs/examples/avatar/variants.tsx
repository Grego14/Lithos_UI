import { Avatar } from '../../../components/ui/Avatar'

export const AvatarVariantsExample = () => (
  <div className="flex items-center space-x-4">
    <Avatar src="/example-avatar.webp" alt="Jane Doe" />
    <Avatar alt="Jane Doe" />
    <Avatar alt="Amy" />
    <Avatar variant="solid" src="https://broken.example/404.png" alt="Jane Doe" />
  </div>
)
