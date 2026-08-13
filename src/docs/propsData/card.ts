import type { PropItem } from '../../components/ui/PropsTable'

export const cardPropsData: PropItem[] = [
  {
    name: 'variant',
    type: "'default' | 'accent' | 'image' | 'blueprint' | 'physics' | 'solid'",
    defaultValue: "'default'",
    required: false,
    description: 'Visual treatment. image drops padding/background for edge-to-edge media; solid permanently fills with the theme accent color.',
  },
  {
    name: 'interactive',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Enables the hover lift transform. Off by default so static cards stay still.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const cardImagePropsData: PropItem[] = [
  {
    name: 'src',
    type: 'string',
    required: true,
    description: 'Image source URL.',
  },
  {
    name: 'alt',
    type: 'string',
    required: true,
    description: 'Accessible alternative text describing the image.',
  },
  {
    name: 'isBackground',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Positions the image absolutely to bleed behind CardContent instead of stacking above it.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const cardContentPropsData: PropItem[] = [
  {
    name: 'spacing',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    required: false,
    description: 'Internal padding scale.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const cardTitlePropsData: PropItem[] = [
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const cardDescriptionPropsData: PropItem[] = [
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const cardFooterPropsData: PropItem[] = [
  {
    name: 'spacing',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    required: false,
    description: 'Internal padding scale, matched to the adjacent CardContent.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]
