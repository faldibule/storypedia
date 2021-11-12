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
            case 'Login' : {
                localStorage.setItem('userToken', JSON.stringify(action.payload.token))
                return {
                    isAuth: true,
                    userId: action.payload.userId,
                    image: action.payload.image,
                    image_id: action.payload.image_id,
                    nama: action.payload.nama,
                    username: action.payload.username,
                    email: action.payload.email,
                    role: action.payload.role,
                    token: action.payload.token   
                } 
            }
            case 'Logout': {
                localStorage.clear()
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