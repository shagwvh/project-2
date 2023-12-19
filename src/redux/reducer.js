import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addList: (state, action) => {
      let data = action.payload;
      data = data && data.length>0 && data.map((item,index)=>{
        return {...item,like:0,dislike:0};
      })

      return data;
    },
    likeListItem: (state, action) => {
      console.log(action,state,initialState,'shashank');
      const listArray = action.payload.listArray;
      const id = action.payload.id;
      const newArray = listArray.map(obj => 
        obj.id === id ? { ...obj, like: 1,dislike:0 } : obj
      );
      return newArray;
    },
    dislikeListItem : (state, action) => {
      console.log(action,state,initialState,'shashank');
      const listArray = action.payload.listArray;
      const id = action.payload.id;
      const newArray = listArray.map(obj => 
        obj.id === id ? { ...obj, dislike: 1 ,like:0} : obj
      );
      return newArray;
    },
  },
});

export const { addList, likeListItem, dislikeListItem } = listSlice.actions;

export default listSlice.reducer;
