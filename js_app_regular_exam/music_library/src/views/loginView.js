import { html, page } from "../lib.js";
import { login } from "../api/user.js";
import { createSubmitHandler } from "../util.js";

const loginTemplate = (onLogin) => html`<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form @submit=${onLogin} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
            />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="#">Create an account</a>
            </p>
        </form>
    </div>
</section>`;

export function loginView(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    async function onLogin({ email, password }) {
        if (email == "" || password == "") {
            return alert("Empty email or password!");
        }

        await login(email, password);
        ctx.updateNav();
        page.redirect("/");
    }
}
