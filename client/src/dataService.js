import axios from "axios";

const URL = axios.create({
    withCredentials: true,
    headers: {"Content-type": "application/json"}
})

class DataService {
    signup(msg) {
        return URL.post(`/signup`, msg)
    }
    checkLogin() {
        return URL.get(`/login`)
    }
    login(msg) {
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
    createPoem(msg) {
        return URL.post(`/poems/createPoem`, msg)
    }
    deletePoem(msg) {
        return URL.post(`/poems/deletePoem`, msg)
    }
    getPoemData() {
        return URL.get(`/poems/poemData`)
    }
    snap(msg) {
        return URL.put(`/poems/snap`, msg)
    }
    createComment(msg) {
        return URL.post(`/comments/createComment`, msg)
    }
    getComments(msg) {
        return URL.post(`/comments/getComments`, msg)
    }
    snapComment(msg) {
        return URL.put(`/comments/snapComment`, msg)
    }
    deleteComment(msg) {
        return URL.post(`/comments/deleteComment`, msg)
    }
}

export default new DataService();