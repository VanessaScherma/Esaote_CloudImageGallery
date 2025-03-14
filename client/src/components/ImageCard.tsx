import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import * as React from 'react';

type ImageProps = {
    image: {
        id: string;
        src: string;
        alt: string;
        likes: number;
        isFeatured: boolean;
    };
};

const ImageCard: React.FC<ImageProps> = ({ image}) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={image.src}
                alt={image.alt}
            />
            <CardContent>
                <Typography variant="h6">{image.alt}</Typography>
                <Typography variant="body2">Likes: {image.likes}</Typography>
            </CardContent>
        </Card>
    );
};

export default ImageCard;