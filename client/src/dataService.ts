import axios from "axios";

const URL = axios.create({
    withCredentials: true,
    headers: { "Content-type": "application/json" }
})

class DataService {
    signup(msg: any) {
        return URL.post(`/signup`, msg)
    }
    checkLogin() {
        return URL.get(`/login`)
    }
    login(msg: any) {
        return URL.post(`/login`, msg)
    }
    logout() {
        return URL.get(`/logout`)
    }
    getPoem() {
        return URL.get(`/poems/getPoem`)
    }
    getFeed() {
        return URL.get(`/poems/getFeed`)
    }
    createPoem(msg: any) {
        return URL.post(`/poems/createPoem`, msg)
    }
    deletePoem(msg: any) {
        return URL.post(`/poems/deletePoem`, msg)
    }
    getPoemData() {
        return URL.get(`/poems/poemData`)
    }
    snap(msg: any) {
        return URL.put(`/poems/snap`, msg)
    }
    createComment(msg: any) {
        return URL.post(`/comments/createComment`, msg)
    }
    getComments(msg: any) {
        return URL.post(`/comments/getComments`, msg)
    }
    snapComment(msg: any) {
        return URL.put(`/comments/snapComment`, msg)
    }
    deleteComment(msg: any) {
        return URL.post(`/comments/deleteComment`, msg)
    }
}

export default new DataService();