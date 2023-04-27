import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { generateAvatarUpload } from "../modules/intl/upload";
import Cookies from "js-cookie";
import { API_PATHS } from "../API/api";
import { RESPONSE_STATUS_SUCCESS } from "../modules/intl/httpResponseCode";
import { RootState } from "./store";

export interface IData {
  id: number;
  status: string;
  updatedAt: string;
  client: string;
  currency: string;
  total: number;
  invoice: string;
}

interface IDatas {
  Products: IData[];
  ProductByID: any;
  InforUser: any;
}

interface IInforUser {
  name: string,
  email: string,
  avatar: string,
  description: string,
  state: number,
  region:number,
}

const initialState: IDatas = {
  Products: [],
  ProductByID: {},
  InforUser: {},
};

export const fetchInforUser = createAsyncThunk(
  "data/fetchInforUser",
  async (data: string) => {
    const response = await fetch(
      "http://api.training.div3.pgtest.co/api/v1/user",
      {
        headers: { Authorization: data },
      }
    );
    const result = await response.json();
    // console.log(result)
    return result;
  }
);

export const fetchDataAllProduct = createAsyncThunk(
  "data/fetchDataAllProduct",
  async (data: string) => {
    const response = await fetch(
      "http://api.training.div3.pgtest.co/api/v1/product",
      {
        headers: { Authorization: data },
      }
    );
    const result = await response.json();
    return result;
  }
);

export const fetchUpdateProduct = createAsyncThunk(
  "data/fetchUpdateProduct",
  async (data: any) => {
    const response = await fetch(
      "http://api.training.div3.pgtest.co/api/v1/product",
      {
        method: "POST",
        body: JSON.stringify({
          id: data.id,
          status: data.status,
          date: data.date,
          client: data.client,
          currency: data.currency,
          total: data.total,
          invoice: data.invoice,
        }),
        headers: { Authorization: data.token },
      }
    );
    const result = await response.json();
    return result;
  }
);
// export const fetchUpdateUser = createAsyncThunk(
//   "data/fetchUpdateUser",
//   async (data: any) => {
//     const response = await fetch(
//       `http://api.training.div3.pgtest.co/api/v1/product/${data.id}`,
//       {
//         headers: { Authorization: data.token },
//       }
//     );
//     const result = await response.json();
//     return result;
//   }
// )
export const fetchDataProductById = createAsyncThunk(
  "data/fetchDataProductById",
  async (data: any) => {
    const response = await fetch(
      `http://api.training.div3.pgtest.co/api/v1/product/${data.id}`,
      {
        headers: { Authorization: data.token },
      }
    );
    const result = await response.json();
    return result;
  }
);

export const fetchDeleteProduct = createAsyncThunk(
  "data/fetchDeleteProduct",
  async (data: any) => {
    const response = await fetch(
      `http://api.training.div3.pgtest.co/api/v1/product/${data.id}`,
      {
        method:"DELETE",
        headers: { Authorization: data.token },
      }
    );
    const result = await response.json();
    return result;
    // return data.id;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAllProduct.fulfilled, (state, action) => {
        state.Products = action.payload.data;
      })
      .addCase(fetchDataProductById.fulfilled, (state, action) => {
        state.ProductByID = action.payload.data;
      })
      .addCase(fetchInforUser.fulfilled, (state, action) => {
        state.InforUser = action.payload.data
      });
  },
});

export const {} = dataSlice.actions;

const { reducer } = dataSlice;

export default reducer;
