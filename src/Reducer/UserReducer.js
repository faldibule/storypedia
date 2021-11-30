export const UserReducer = {
    initialize: {
        userId: null,
        image: null,
        image_id: null,
        nama: null,
        username: null,
        email: null,
        role: null,
        token: null,
        isAuth: false
    },

    reducer: (state, action) => {
        switch(action.type){
            case 'SET_USER_DATA' : {
                return {
                    ...state,
                    userId: action.payload.userId,
                    image: action.payload.image,
                    image_id: action.payload.image_id,
                    nama: action.payload.nama,
                    username: action.payload.username,
                    email: action.payload.email,
                    role: action.payload.role
                }
            }

            case 'EDIT_PROFIL' : {
                return {
                    ...state,
                    nama: action.payload.nama,
                    username: action.payload.username,
                    email: action.payload.email,
                }
            }

            case 'EDIT_FOTO': {
                return {
                    ...state,
                    image: action.payload.image,
                    image_id: action.payload.image_id,
                }
            }

            case 'Login' : {
                if(!sessionStorage.getItem('userToken')){
                    sessionStorage.setItem('userToken', JSON.stringify(action.payload.token))
                }
                return {
                    ...state,
                    isAuth: true,
                    token: action.payload.token || sessionStorage.getItem('userToken')  
                } 
            }

            case 'NEW_TOKEN': {
                sessionStorage.removeItem('userToken')
                sessionStorage.setItem('userToken', JSON.stringify(action.payload.token))
                return {
                    ...state,
                    token: action.payload.token
                }
            }

            case 'Logout': {
                localStorage.clear()
                sessionStorage.removeItem('userToken')
                return {
                    userId: null,
                    image: null,
                    image_id: null,
                    isAuth: false,
                    nama: null,
                    username: null,
                    email: null,
                    role: null,
                    token: null,
                }
            }
            default: {
                return {
                    userId: null,
                    image: null,
                    image_id: null,
                    isAuth: true,
                    nama: null,
                    username: null,
                    email: null,
                    role: null,
                    token: null,
                }
            }
        }
    },
}