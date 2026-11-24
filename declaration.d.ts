declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.jpg";
declare module "*.png";
declare module "*.webp" {
  const url: string;
  export default url;
}
declare module "*.md";
