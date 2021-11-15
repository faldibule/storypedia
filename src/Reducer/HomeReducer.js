import { useReducer } from "react"
import { createContainer } from "react-tracked"

export const HomeReducer = {
    initialize: {
        postData: [],
        page: 2,
        more: true,
        pathname: '/home'
    },

    reducer: (state, action) => {
        switch(action.type){
            case 'REFRESH': {
                return{
                    postData: [],
                    page: 2,
                    more: true,
                }
            }

            case 'SET_POST_DATA_FIRST': {
                return {
                    ...state,
                    postData: action.payload.data,
                }
            }

            case 'SET_POST_DATA': {
                const newData =  action.payload.data1.filter(item => {
                    if (!action.payload.data2.some(item1=>item._id === item1._id)) {
                      return item
                    }
                  }).concat(action.payload.data2)
                return {
                    ...state,
                    postData: newData,
                }
            }
            case 'NOT_HAS_MORE': {
                return {
                    ...state,
                    more: false
                }
            }
            case 'SET_PAGE': {
                return{
                    ...state,
                    page: state.page + 1
                }
            }
            case 'SET_PATH': {
                return{
                    ...state,
                    pathname: action.payload.pathname
                }
            }

            default : {
                return {
                    ...state,
                }
            }
        }
    }
}

const useValue = () => useReducer(HomeReducer.reducer, HomeReducer.initialize);

export const {
  Provider,
  useTrackedState,
  useUpdate: useHomeDispatch,
} = createContainer(useValue);