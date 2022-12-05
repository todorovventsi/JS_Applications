import { deleteAlbumById, getAlbumById } from "../api/data.js";
import { html, nothing, page } from "../lib.js";

const detailViewTemplate = (user, album, onDelete) => html`<section
    id="details"
>
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src="..${album.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p>
                <strong>Band:</strong
                ><span id="details-singer">${album.singer}</span>
            </p>
            <p>
                <strong>Album name:</strong
                ><span id="details-album">${album.album}</span>
            </p>
            <p>
                <strong>Release date:</strong
                ><span id="details-release">${album.release}</span>
            </p>
            <p>
                <strong>Label:</strong
                ><span id="details-label">${album.label}</span>
            </p>
            <p>
                <strong>Sales:</strong
                ><span id="details-sales">${album.sales}</span>
            </p>
        </div>
        <div id="likes">Likes: <span id="likes-count">0</span></div>

        <!--Edit and Delete are only for creator-->
        ${user
            ? html`<div id="action-buttons">
                  <a href="" id="like-btn">Like</a>
                  ${user._id == album._ownerId
                      ? html`<a href="/edit/${album._id}" id="edit-btn">Edit</a>
                            <a
                                @click=${onDelete}
                                href="javascript:void(0)"
                                id="delete-btn"
                                >Delete</a
                            >`
                      : nothing}
              </div>`
            : nothing}
    </div>
</section>`;

export async function detailsView(ctx) {
    const user = ctx.user;
    const album = await getAlbumById(ctx.params.id);

    ctx.render(detailViewTemplate(user, album, onDelete));

    async function onDelete() {
        const choice = confirm("Are you sure?");
        if (choice) {
            await deleteAlbumById(album._id);
            page.redirect("/catalog");
        }
    }
}
