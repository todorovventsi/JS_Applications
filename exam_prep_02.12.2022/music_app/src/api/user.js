import { setUserData, clearUserData } from "../util.js";
import { post, get } from "./api.js";

export async function loginUser(email, password) {
    const {
        _id,
        email: resultEmail,
        accessToken,
    } = await post("/users/login", { email, password });

    setUserData({
        _id,
        resultEmail,
        accessToken,
    });
}

export async function registerUser(email, password) {
    const {
        _id,
        email: resultEmail,
        accessToken,
    } = await post("/users/register", { email, password });

    setUserData({
        _id,
        resultEmail,
        accessToken,
    });
}

export async function logout() {
    get("/users/logout");
    clearUserData();
}
