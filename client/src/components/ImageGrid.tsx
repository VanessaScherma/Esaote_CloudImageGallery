import * as React from "react";
import Grid from "@mui/material/Grid2";
import ImageCard from "./ImageCard";
import { useQuery } from "@apollo/client";
import { GET_IMAGES } from "../graphql/queries";
import { SchemaData, Image } from "../types";

const ImageGrid: React.FC = () => {
    const { loading, error, data } = useQuery<SchemaData>(GET_IMAGES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.schema) return <p>No data available</p>;

    return (
        <Grid container spacing={data.schema.layout.spacing} columns={data.schema.layout.columns}>
            {data.schema.images.map((image: Image) => (
                <Grid key={image.id} size={3}>
                    <ImageCard image={image} actions={data.schema.actions} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageGrid;
