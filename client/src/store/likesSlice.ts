import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const storedLikes = localStorage.getItem("likedImages");
const initialState: { likedImages: string[] } = {
    likedImages: storedLikes ? JSON.parse(storedLikes) : [],
};

const likesSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {
        toggleLikeState: (state, action: PayloadAction<string>) => {
            const index = state.likedImages.indexOf(action.payload);
            if (index > -1) {
                state.likedImages.splice(index, 1);
            } else {
                state.likedImages.push(action.payload);
            }
            localStorage.setItem("likedImages", JSON.stringify(state.likedImages));
        },
    },
});

export const { toggleLikeState } = likesSlice.actions;
export default likesSlice.reducer;
