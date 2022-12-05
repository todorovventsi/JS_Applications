import { del, get, post, put } from "./api.js";

export async function getCatalogsData() {
    return get("/data/albums?sortBy=_createdOn%20desc&distinct=name");
}

export async function getAlbumDetails(id) {
    return get(`/data/albums/${id}`);
}

export async function deleteAlbum(id) {
    return del(`/data/albums/${id}`);
}

export async function createAlbum(data) {
    return post("/data/albums", data);
}

export async function editAlbum(id, data) {
    return put("/data/albums/" + id, data);
}
