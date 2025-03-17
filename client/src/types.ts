export type Layout = {
  type: string;
  spacing: number;
  columns: number;
};

export type Action = {
  name: string;
  icon: string;
  action: string;
  color: string;
};

export interface Image {
  id: string;
  src: string;
  alt: string;
  likes: number;
  isFeatured: boolean;
}
  
export interface SchemaData {
  schema: {
    layout: Layout;
    actions: Action[];
    images: Image[];
  };
}
  