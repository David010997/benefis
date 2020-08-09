import axios from "axios";
import { ActionSearch } from "material-ui/svg-icons";

const instance = axios.create({
    baseURL: "http://localhost:4000/",

});
export class Api {
    static url = "http://localhost:4000/"
}


export const authAPI = {
    login(email, password) {
        return instance.post(`users/login`, { email, password })
    },
    register(name, email, password) {
        return instance.post(`users/register`, { name, email, password });
    },
    socialAuth(id, email, name, avatar, social) {
        return instance.post(`users/social-auth`, {id, email, name, avatar, social})
    },
    getUserData() {
        return instance.get(`users/get-user`, {
            headers: {
                "Authorization": JSON.parse(localStorage.getItem('token'))
            }
        })
    },
    editUserAvatar(avatar) {
        const formData = new FormData();
        formData.append("avatar", avatar)
        return instance.post(`users/upload-avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': JSON.parse(localStorage.getItem('token'))
            }
        });
    },
    editUserData(name, email, surname, price, fb_link, insta_link) {
        return instance.post(`users/edit-user`, { name, email, surname, price, fb_link, insta_link }, {
            headers: {
                'Authorization': JSON.parse(localStorage.getItem('token'))
            }
        });
    },
    editUserPassword(old_password, new_password, confirm_password) {
        return instance.post(`users/change-password`, { old_password, new_password, confirm_password }, {
            headers: {
                'Authorization': JSON.parse(localStorage.getItem('token'))
            }
        })
    }

}
export const categoryAPI = {
    category() {
        return instance.get(`categories`)
    },
    getCategory(slug,sort) {
        return instance.get(`categories/${slug}?sort=${sort}`)
    }

}

export const starApi = {
    getSingleStar(star) {
        return instance.get(`stars/get/${star}`)
    },
    verifyStar(type,email,password) {
        return instance.post(`tokens/generate`,{type,email,password})
    },
    starRegisterPermission(token) {
        return instance.get(`stars/registration/${token}`)
    },
    registerStar(name,surname,email,phone,price,cat_id,password,token) {
        console.log(arguments);
        return instance.post(`stars/registration`,{name,surname,email,phone,price,cat_id,password,token})
    },
    getAllStars() {
        return instance.get(`stars`)
    },
    search(star='all',skip, sort=null) {
        return instance.get(`stars/search/${star}/${skip}?sort=${sort}`)
    },
    
    uploadVideo(video,orderId) {
        const formData = new FormData();
        formData.append("video", video)
        formData.append("order_id", orderId)
        return instance.post(`stars/add-video`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': JSON.parse(localStorage.getItem('token'))
            }
        })

    }
}
export const paymentApi={
    pay(email){
        return instance.post(`payments/pay`,{ email })
    }
}
export const rateApi={
    rating(rating,slug){
        return instance.post(`stars/rate`,{ rating,slug},{
            headers: {
                'Authorization': JSON.parse(localStorage.getItem('token'))
            }
        })
    }
}
