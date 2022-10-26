import axios from "axios";

const URL = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_URL,
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
    getPoems() {
        return URL.get(`/poems/`)
    }
    getFeed() {
        return URL.get(`/poems/getFeed`)
    }
    createPoem(msg) {
        return URL.post(`/poems/createPoem`, msg)
    }
    deletePoem(msg) {
        console.log(msg)
        return URL.post(`/poems/deletePoem`, msg)
    }
    getPoemData() {
        return URL.get(`/poems/poemData`)
    }
}

export default new DataService();