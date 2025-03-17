import * as fs from "fs";

const schemaData: { images: { id: string; src: string; alt: string; likes: number; isFeatured: boolean }[] } = 
  JSON.parse(fs.readFileSync("src/schema.json", "utf-8"));

export const resolvers = {
  Query: {
    schema: () => schemaData,
  },
  Mutation: {
    addLike: (_: unknown, { id }: { id: string }) => {
      const image = schemaData.images.find((img) => img.id === id);
      if (!image) throw new Error("Image not found");
      image.likes += 1;
      return image;
    },
    removeLike(_: unknown, { id }: { id: string }) {
        const image = schemaData.images.find((img) => img.id === id);
        if (!image) throw new Error("Image not found");
        image.likes -= 1;
        return image;
    },
    deleteImage: (_: unknown, { id }: { id: string }) => {
      const index = schemaData.images.findIndex((img) => img.id === id);
      if (index === -1) throw new Error("Image not found");
      schemaData.images.splice(index, 1);
      return true;
    },
    markFeatured: (_: unknown, { id }: { id: string }) => {
      const image = schemaData.images.find((img) => img.id === id);
      if (!image) throw new Error("Image not found");
      image.isFeatured = !image.isFeatured;
      return image;
    },
  },
};
