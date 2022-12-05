import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { catalogView } from "./views/catalogView.js";
import { createView } from "./views/createView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { updateNav } from "./views/nav.js";
import { registerView } from "./views/registerView.js";

const main = document.getElementById("main-content");

page(decorateContext);
page("/", homeView);

page("/catalog", catalogView);
page("/catalog/:id", detailsView);

page("/search", () => console.log("search"));

page("/edit/:id", editView);
page("/create", createView);

page("/login", loginView);
page("/register", registerView);

updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    const user = getUserData();

    if (user) {
        ctx.user = user;
    }

    next();
}

function renderMain(content) {
    render(content, main);
}
