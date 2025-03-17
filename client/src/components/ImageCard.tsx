import * as React from "react";
import { Card, CardContent, CardMedia, IconButton, Typography, Box, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { ADD_LIKE, REMOVE_LIKE, DELETE_IMAGE, MARK_FEATURED } from "../graphql/mutations";
import { GET_IMAGES } from "../graphql/queries";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleLikeState } from "../store/likesSlice";
import * as Icons from "@mui/icons-material";
import { Action, Image } from "../types";

type ImageProps = {
  image: Image;
  actions: Action[];
};

const ImageCard: React.FC<ImageProps> = ({ image, actions }) => {
  const dispatch = useDispatch();
  const likedImages = useSelector((state: RootState) => state.likes.likedImages);
  const hasLiked = likedImages.includes(image.id);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [isFeatured, setIsFeatured] = React.useState(image.isFeatured);

  const [addLike] = useMutation(ADD_LIKE);
  const [removeLike] = useMutation(REMOVE_LIKE);
  const [deleteImage] = useMutation(DELETE_IMAGE, {
    refetchQueries: [{ query: GET_IMAGES }],
  });
  const [markFeatured] = useMutation(MARK_FEATURED, {
    variables: { id: image.id },
    onCompleted: (data) => {
      setIsFeatured(data.markFeatured.isFeatured);
    },
  });

  const handleAction = (action: string) => {
    switch (action) {
      case "toggleLike":
        dispatch(toggleLikeState(image.id));
        if (hasLiked) {
          removeLike({ variables: { id: image.id } });
        } else {
          addLike({ variables: { id: image.id } });
        }
        break;
      case "deleteImage":
        setOpenDeleteDialog(true);
        break;
      case "toggleFeature":
        markFeatured();
        break;
      default:
        return;
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
      outline: isFeatured ? "2px solid gold" : "none",
      }}
    >
      <CardMedia component="img" height="200" image={image.src} alt={image.alt} sx={{ borderRadius: 2 }} />
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          {image.alt}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 1 }}>
          {image.likes} {image.likes === 1 ? "like" : "likes"}
        </Typography>

        <Box display="flex" alignItems="center" gap="8px">
          {actions.map((action) => {
            const IconComponent = (Icons as any)[action.icon];
            const isStar = action.action === "toggleFeature";
            const isHeart = action.action === "toggleLike";

            return (
              <IconButton
                key={action.name}
                onClick={() => handleAction(action.action)}
                sx={{ color: isStar ? (isFeatured ? "gold" : "gray") : isHeart ? (hasLiked ? "red" : "gray") : action.color }}
              >
                <IconComponent />
              </IconButton>
            );
          })}
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
