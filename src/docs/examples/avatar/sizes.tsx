import { Avatar } from '../../../components/ui/Avatar'

export const AvatarSizesExample = () => (
  <div className="flex items-end space-x-4">
    <Avatar size="sm" src="/example-avatar.webp" alt="Jane Doe" />
    <Avatar size="md" src="/example-avatar.webp" alt="Jane Doe" />
    <Avatar size="lg" src="/example-avatar.webp" alt="Jane Doe" />
  </div>
)
