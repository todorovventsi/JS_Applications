import { deleteById, getDetails } from "../api/data.js";
import { html, nothing } from "../lib.js";

const detailsPageTemplate = (pet, user, onDelete) => html`
    <section id="detailsPage">
        <div class="details">
            <div class="animalPic">
                <img src=${pet.image} />
            </div>
            <div>
                <div class="animalInfo">
                    <h1>Name: ${pet.name}</h1>
                    <h3>Breed: ${pet.breed}</h3>
                    <h4>Age: ${pet.age}</h4>
                    <h4>Weight: ${pet.weight}</h4>
                    <h4 class="donation">Donation: 0$</h4>
                </div>
                ${user
                    ? html`<!-- if there is no registered user, do not display div-->
                          <div class="actionBtn">
                              ${pet._ownerId == user._id
                                  ? html`<!-- Only for registered user and creator of the pets-->
                                        <a href="/edit/${pet._id}" class="edit"
                                            >Edit</a
                                        >
                                        <a
                                            @click=${onDelete}
                                            href="javascript:void(0)"
                                            class="remove"
                                            >Delete</a
                                        >`
                                  : html`<!--(Bonus Part) Only for no creator and user-->
                                        <a href="#" class="donate">Donate</a>`}
                          </div>`
                    : nothing}
            </div>
        </div>
    </section>
`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const pet = await getDetails(id);

    async function onDelete() {
        const choice = confirm("Do you want to continue?");
        if (choice) {
            await deleteById(id);
            ctx.page.redirect("/");
        }
    }

    ctx.render(detailsPageTemplate(pet, ctx.user, onDelete));
}
