import { deleteAlbum, getAlbumDetails } from "../api/data.js";
import { html, nothing, page } from "../lib.js";

const detailsViewTemplate = (album, isOwner, onDelete) => html`<section
    id="detailsPage"
>
    <div class="wrapper">
        <div class="albumCover">
            <img src="..${album.imgUrl}" />
        </div>
        <div class="albumInfo">
            <div class="albumText">
                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: ${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>

            ${isOwner
                ? html`<div class="actionBtn">
                      <a href="/edit/${album._id}" class="edit">Edit</a>
                      <a
                          @click=${onDelete}
                          href="javascript:void(0)"
                          class="remove"
                          >Delete</a
                      >
                  </div>`
                : nothing}
            <!-- Only for registered user and creator of the album-->
        </div>
    </div>
</section>`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const album = await getAlbumDetails(id);
    let isOwner = false;

    if (ctx.user._id == album._ownerId) {
        isOwner = true;
    }

    ctx.render(detailsViewTemplate(album, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm("Are you sure you want to delete this album?");
        if (choice) {
            await deleteAlbum(id);
            page.redirect("/catalog");
        }
    }
}
