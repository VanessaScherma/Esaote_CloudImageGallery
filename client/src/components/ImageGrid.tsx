import * as React from 'react';
import Grid from '@mui/material/Grid2';
import ImageCard from './ImageCard';
import imageSchema from '../schema.json';

const ImageGrid: React.FC = () => {
    return (
        <Grid container spacing={4}>
            {imageSchema.images.map((image) => (
                <Grid key={image.id} size={2}>
                    <ImageCard image={image} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageGrid;