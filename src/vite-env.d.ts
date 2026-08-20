/// <reference types="vite/client" />

// Image imports
declare module "*.svg" {
  const content: string;
  export default content;
}
declare module "*.svg?react" {
  import type { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}
declare module "*.svg?url" {
  const content: string;
  export default content;
}
declare module "*.png" {
  const content: string;
  export default content;
}
declare module "*.jpg" {
  const content: string;
  export default content;
}
declare module "*.jpeg" {
  const content: string;
  export default content;
}
declare module "*.gif" {
  const content: string;
  export default content;
}
declare module "*.webp" {
  const content: string;
  export default content;
}
declare module "*.avif" {
  const content: string;
  export default content;
}

// CSS modules
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// CSS / SCSS
declare module "*.css" {}
declare module "*.scss" {}

// JSON
declare module "*.json" {}

// Env types
interface ImportMetaEnv {
  readonly VITE_APP_TITLE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
