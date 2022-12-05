import { del, get, post, put } from "./api.js";

export async function getAll() {
    return get("/data/albums?sortBy=_createdOn%20desc");
}

export function getAlbumById(id) {
    return get(`/data/albums/${id}`);
}

export function createNewAlbum(data) {
    return post("/data/albums", data);
}

export function editAlbumById(id, data) {
    return put(`/data/albums/${id}`, data);
}

export function deleteAlbumById(id) {
    return del(`/data/albums/${id}`);
}
