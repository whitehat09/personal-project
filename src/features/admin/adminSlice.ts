import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  admin: any;
  errorMessage:string;
  isLoginAdmin:Boolean;
}
const initialState: InitialState = {
  admin:{
    email: "admin",
    password: "123123"
  },
  errorMessage:'',
  isLoginAdmin:false,

 
};
const  idExists=(value:any,array:Array<[]>) => {
  return array.some((item:any)=> {
    return item.id === value;
  }); 
};
export const authSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
   
    signInAdmin: (state, action) => {// 
      
      if(state.admin.email === action.payload.email &&state.admin.password === action.payload.password){
        state.isLoginAdmin=true;
      }
      
    },
    
  },
});
export const { signInAdmin  } = authSlice.actions;
export const {   } = authSlice.actions;




export default authSlice.reducer;
