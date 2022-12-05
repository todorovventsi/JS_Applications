import { getAll } from "../api/data.js";
import { html } from "../lib.js";

const catalogViewTemplate = (data) => html`<section id="dashboard">
    <h2>Albums</h2>
    ${!data.length == 0
        ? html`<ul>
              ${data.map(generateCard)}
          </ul>`
        : html`<h2>There are no albums added yet.</h2>`}
</section>`;

function generateCard(album) {
    return html`<li class="card">
        <img src=".${album.imageUrl}" alt="travis" />
        <p>
            <strong>Singer/Band: </strong
            ><span class="singer">${album.singer}</span>
        </p>
        <p>
            <strong>Album name: </strong
            ><span class="album">${album.album}</span>
        </p>
        <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
        <a class="details-btn" href="/catalog/${album._id}">Details</a>
    </li>`;
}

export async function catalogView(ctx) {
    const data = await getAll();
    ctx.render(catalogViewTemplate(data));
}
