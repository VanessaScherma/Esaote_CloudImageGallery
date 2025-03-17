import * as React from "react";
import { Card, CardContent, CardMedia, IconButton, Typography, Box, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { Delete, Favorite, Star } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { ADD_LIKE, REMOVE_LIKE, DELETE_IMAGE, MARK_FEATURED } from "../graphql/mutations";
import { GET_IMAGES } from "../graphql/queries";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleLikeState } from "../store/likesSlice";

type ImageProps = {
  image: {
    id: string;
    src: string;
    alt: string;
    likes: number;
    isFeatured: boolean;
  };
};

const ImageCard: React.FC<ImageProps> = ({ image }) => {
  const dispatch = useDispatch();
  const likedImages = useSelector((state: RootState) => state.likes.likedImages);
  const hasLiked = likedImages.includes(image.id);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

const [addLike] = useMutation(ADD_LIKE);
const [removeLike] = useMutation(REMOVE_LIKE);
const [deleteImage] = useMutation(DELETE_IMAGE, {
    refetchQueries: [{ query: GET_IMAGES }],
});
const [markFeatured] = useMutation(MARK_FEATURED);

const handleLike =() => {
    dispatch(toggleLikeState(image.id));
    if (hasLiked) {
        removeLike({ variables: { id: image.id } });
    } else {
        addLike({ variables: { id: image.id } });
    }
};

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia component="img" height="200" image={image.src} alt={image.alt} sx={{ borderRadius: 2 }} />
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          {image.alt}
        </Typography>
        <Box display="flex" alignItems="center" gap="8px">
          <IconButton onClick={handleLike}>
            <Favorite color={hasLiked ? "error" : "disabled"} />
          </IconButton>
          <Typography variant="body2">{image.likes}</Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end" gap="8px" marginTop={1}>
          <IconButton onClick={() => setOpenDeleteDialog(true)}>
            <Delete />
          </IconButton>
          <IconButton onClick={() => markFeatured({ variables: { id: image.id } })}>
            <Star color={image.isFeatured ? "warning" : "disabled"} />
          </IconButton>
        </Box>
      </CardContent>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Are you sure you want to delete the image <b>{image.alt}</b>?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>No, cancel</Button>
          <Button onClick={() => deleteImage({ variables: { id: image.id } })} color="error">Yes, delete</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ImageCard;
