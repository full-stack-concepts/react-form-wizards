/* eslint-disabled  */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const request = async (method, url, data) => {
    let response = await fetch(
        url,                
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    return response;      
}

export const loginUser = createAsyncThunk(
    'user/login',
      async ({ email, password }, thunkAPI) => {
        try {
            const url = 'http://localhost:4000/users/login';    
            const response = await request('POST', url, { email, password });           
            const data = await response.json();        
            if (response.status === 200) {                
                return { 
                    ...data,                 
                    status: true
                };
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {            
            return thunkAPI.rejectWithValue({
                status:false,
                data: e.response.data
            });
        }
    }
)

export const signupUser = createAsyncThunk(
    'user/signup',
    async ({ email, password }, thunkAPI) => {    
        try {
            const url = 'http://localhost:4000/users/register';            
            const response = await request('POST', url, { email, password });           
            let data = await response.json();                
            if (response.status === 200 || response.status === 201) {                
                return { 
                    ...data, 
                    email: email,
                    status: data.status,
                    message: (data.message) ? data.message: null
                }
            } else {                  
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {            
            return thunkAPI.rejectWithValue({
                status: false,
                data: e.response.data
            });
        }
    }
);


const initFetchState = {
    fetching: false,
    success: false,
    error: false,
    message: null
}

const initMemberState = {
    token: null,  
    email: null        
}

const initialState = {
	loggedIn:false,
	status: initFetchState,
	member: initMemberState
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {    	
    	clearState: state => { state = initialState; },    
        clearFetchStatus: state => {
            state.status = initFetchState;
        },
    	deleteUserToken: state => {
    		 state.member = { ...state.member, token: null};
    	},
    	setuserToken: (state, action) => { 
    		 state.member = { ...state.member, token: action.payload };
    	},
        logout: (state, action) => { 
             state = { 
                 loggedn: false,
                 status: initFetchState,
                 member: initMemberState
             };
        },
    },
    extraReducers: {
    	[signupUser.fulfilled]: (state, { payload }) => {          
      		state.status.fetching = false;
      		state.status.success = true;          
      		state.member.email = payload.email;      	
            return state;
    	},
    	[signupUser.pending]: (state) => {
      		state.status.fetching = true;
            return state;
    	},
    	[signupUser.rejected]: (state, { payload }) => {                     
    		state.status.fetching= false;
    		state.status.error = true;
      		state.status.message = (payload) ? payload.message : 'Connection Error';            
            return state;
    	},
    	[loginUser.fulfilled]: (state, { payload }) => {                                        
            state.loggedIn = true;
            state.member.token = payload.token;
	        state.member.email = payload.user.email;
	        state.member.id = payload.user.id;        
	        state.status.fetching = false;
	        state.status.success = true;
	        return state;
    	},
	    [loginUser.rejected]: (state, { payload }) => {	                       
	        state.status.fetching= false;
	        state.status.error = true;	           
            state.status.message = (payload) ? payload.message : 'Connection Error';           
            return state;
	    },
	    [loginUser.pending]: (state) => {       
	        state.status.fetching = true;
            return state;
	    },  	
    }
});

export const {
    clearState,   
    setuserToken,
    clearFetchStatus
} = userSlice.actions;

export default userSlice.reducer;