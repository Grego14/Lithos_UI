
declare module '*.css' {
  const content: string
  export default content
}

declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      ht: import('react').DetailedHTMLProps<import('react').HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
