import { loginUser } from "../api/user.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const loginViewTemplate = (onLogin) => html`
    <section id="loginPage">
        <form @submit=${onLogin}>
            <fieldset>
                <legend>Login</legend>

                <label for="email" class="vhide">Email</label>
                <input
                    id="email"
                    class="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                />

                <label for="password" class="vhide">Password</label>
                <input
                    id="password"
                    class="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                />

                <button type="submit" class="login">Login</button>

                <p class="field">
                    <span
                        >If you don't have profile click
                        <a href="/register">here</a></span
                    >
                </p>
            </fieldset>
        </form>
    </section>
`;

export function loginView(ctx) {
    ctx.render(loginViewTemplate(createSubmitHandler(onLogin)));

    async function onLogin({ email, password }) {
        if (email == "" || password == "") {
            return alert("Empty email or password!");
        }

        await loginUser(email, password);
        ctx.updateNav();
        ctx.page.redirect("/");
    }
}
