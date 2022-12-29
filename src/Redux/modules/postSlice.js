import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { getCookie } from "../../shared/Cookie";
import { instance } from "../../core/api/axios";

const initialState = {
  posts: [],
  post: {},
  mypageUserInfo: {},
  mypagePostList: [],
  isLoading: true,
  error: null,
  hospitalCheck: false,
};
// 커멘트가 추가되면 post list에 숫자가 들어가야함. 
// 마이페이지에서 사용하려는 데이터 ... 끼리 슬라이스를 만들어라.
// 그것을 기준으로 슬라이스를 만들어라 . 

export const __getPost = createAsyncThunk(
  "getPost",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/api/post/${payload}`);
      // console.log(data)

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPosts = createAsyncThunk(
  "getPosts",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get("/api/posts");
      // console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addPost = createAsyncThunk(
  "addPost",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await instance.post("/api/post", payload);
      thunkAPI.dispatch(__getPosts());
<<<<<<< HEAD
=======
      console.log(data.data)
>>>>>>> 009ea5cf06c639c508174abf46eeab32810da2bc
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deletePost = createAsyncThunk(
  "deletePost",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      await instance.delete(`/api/post/${payload}`);
      thunkAPI.dispatch(__getPosts());
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editPost = createAsyncThunk(
  "editPost",
  async (payload, thunkAPI) => {
    console.log(payload);
    const [newPost, postId] = payload;
    try {
      const data = await instance.put(`/api/post/${postId}`, newPost);
      thunkAPI.dispatch(__getPosts());
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postLike = createAsyncThunk(
  "postLike",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await instance.post(`/api/like/post/${payload}`);
      thunkAPI.dispatch(__getPosts());
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getMypage = createAsyncThunk(
  "getMypage",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get("/api/mypage");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

<<<<<<< HEAD
export const __editMypage = createAsyncThunk(
  "editMypage",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.put("/api/mypage", payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 마이페이지 겟요청 화면에 뿌려주기
// CRUD잘먹히는지 ㅇㅋㅇㅋ
// 댓글 데이터 ㅋㅋㅋ
=======
>>>>>>> 009ea5cf06c639c508174abf46eeab32810da2bc
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducer: {
    cleanupDetail: (state) => {
      state.post = {
        // commentNum: 0,
        // content: "",
        // createdAt: "2022-12-28T15:58:34.212976",
        // image: "",
        // likePost: false,
        // likePostNum: 0,
        // modifiedAt: "2022-12-28T16:36:50.399838",
        // postId: 0,
        // profileImage: "",
        // username: "",
      };
    },
  },
  extraReducers: {
    [__getPost.pending]: (state) => {},
    [__getPost.fulfilled]: (state, action) => {
      state.post = action.payload;
    },
    [__getPost.rejected]: (state, action) => {
      console.log(action.payload.response.data.errorMessage);
    },

    [__getPosts.pending]: (state) => {},
    [__getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.postFeed;
    },
    [__getPosts.rejected]: (state, action) => {
      console.log(action.payload.response.data.errorMessage);
    },

    [__addPost.pending]: (state) => {},
    [__addPost.fulfilled]: (state, action) => {
<<<<<<< HEAD
      // 앞쪽에 리스트를 넣는다. push도 안되던데 결과값을 출력해서 확인해보고
      // unshift ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 빨리하고 폼데이터 카크크카캌카
      //
      state.mypagePostList.unshift(action.payload);
=======
      console.log(action.payload)
      state.mypagePostList.push(action.payload);
      state.mypageUserInfo.postingNum += 1
>>>>>>> 009ea5cf06c639c508174abf46eeab32810da2bc
    },
    [__addPost.rejected]: (state, action) => {
      console.log(action.payload.response.data.errorMessage);
    },

    [__deletePost.pending]: (state) => {},
    [__deletePost.fulfilled]: (state, action) => {
      state.mypagePostList = state.mypagePostList.filter(
        (post) => post.postId !== action.payload
      );
      state.mypageUserInfo.postingNum -= 1
    },
    [__deletePost.rejected]: (state, action) => {
      console.log(action.payload.response.data.errorMessage);
    },

    [__editPost.pending]: (state) => {},
    [__editPost.fulfilled]: (state, action) => {
      state.post = action.payload;
    },
    [__editPost.rejected]: (state, action) => {
      console.log(action.payload.response.data.errorMessage);
    },

    [__getMypage.pending]: (state) => {},
    [__getMypage.fulfilled]: (state, action) => {
<<<<<<< HEAD
      // 게시물추가했을 때 리스트가 업데이트 됐을때 아래 만 렌더링 되게
      // 유저정보따로 리스트따로 ㅇㅋㅇㅋㅋㅇㅋㅇㅋ
      state.mypageUserInfo = action.payload;
=======
      console.log(action.payload)
      state.mypageUserInfo = action.payload
>>>>>>> 009ea5cf06c639c508174abf46eeab32810da2bc
      state.mypagePostList = action.payload.postList;
    },
    [__getMypage.rejected]: (state, action) => {
      console.log(action.payload.response.data.errorMessage);
    },

<<<<<<< HEAD
    [__editMypage.pending]: (state) => {},
    [__editMypage.fulfilled]: (state, action) => {
      // 게시물추가했을 때 리스트가 업데이트 됐을때 아래 만 렌더링 되게
      // 유저정보따로 리스트따로 ㅇㅋㅇㅋㅋㅇㅋㅇㅋ
      window.location.href = "/mypage";
    },
    [__editMypage.rejected]: (state, action) => {
      console.log(action.payload.response.data.errorMessage);
    },
=======
>>>>>>> 009ea5cf06c639c508174abf46eeab32810da2bc
  },
});

export const { cleanupDetail } = postSlice.actions;
export default postSlice.reducer;
