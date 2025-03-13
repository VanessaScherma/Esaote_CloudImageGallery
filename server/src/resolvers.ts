const images = [
    { id: '1', url: '/images/image1.jpg', likes: 0, featured: false },
    { id: '2', url: '/images/image2.jpg', likes: 5, featured: false },
    { id: '3', url: '/images/image3.jpg', likes: 10, featured: true },
];

export const resolvers = {
    Query: {
        images: () => images,
    },
    Mutation: {
        likeImage: (_: any, { id }: any) => {
            const image = images.find((image) => image.id === id);
            if (!image) {
                throw new Error(`Couldn't find image with id ${id}`);
            }
            image.likes += 1;
            return image;
        },
        deleteImage: (_: any, { id }: any) => {
            const index = images.findIndex((image) => image.id === id);
            if (index === -1) {
                throw new Error(`Couldn't find image with id ${id}`);
            }
            images.splice(index, 1);
            return true;
        },
        markFeatured: (_: any, { id }: any) => {
            const image = images.find((image) => image.id === id);
            if (!image) {
                throw new Error(`Couldn't find image with id ${id}`);
            }
            image.featured = !image.featured;
            return image;
        },
    }
}