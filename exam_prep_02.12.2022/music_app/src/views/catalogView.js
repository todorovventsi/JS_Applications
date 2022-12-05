import { getCatalogsData } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../util.js";

const catalogViewTemplate = (data) => html` <section id="catalogPage">
    <h1>All Albums</h1>

    ${data.length == 0
        ? html`<p>No Albums in Catalog!</p>`
        : data.map(generateAlbumCard)}
</section>`;

export async function catalogView(ctx) {
    const data = await getCatalogsData();
    ctx.render(catalogViewTemplate(data));
}

function generateAlbumCard(album) {
    const user = getUserData();
    const card = html`<div class="card-box">
        <img src="..${album.imgUrl}" />
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: ${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>

            ${user
                ? html`<div class="btn-group">
                      <a href="catalog/${album._id}" id="details"> Details </a>
                  </div>`
                : nothing}
        </div>
    </div>`;

    return card;
}
