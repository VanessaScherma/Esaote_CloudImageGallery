export interface Image {
    id: string;
    src: string;
    alt: string;
    likes: number;
    isFeatured: boolean;
  }
  
  export interface SchemaData {
    schema: {
      layout: string;
      columns: number;
      images: Image[];
    };
  }
  