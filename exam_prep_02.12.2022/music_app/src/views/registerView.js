import { loginUser, registerUser } from "../api/user.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const registerViewTemplate = (onRegister) => html`
    <section id="registerPage">
        <form @submit=${onRegister}>
            <fieldset>
                <legend>Register</legend>

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

                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input
                    id="conf-pass"
                    class="conf-pass"
                    name="confpass"
                    type="password"
                    placeholder="Confirm Password"
                />

                <button type="submit" class="register">Register</button>

                <p class="field">
                    <span
                        >If you already have profile click
                        <a href="#">here</a></span
                    >
                </p>
            </fieldset>
        </form>
    </section>
`;

export function registerView(ctx) {
    ctx.render(registerViewTemplate(createSubmitHandler(onRegister)));

    async function onRegister({ email, password, confpass }) {
        if (email == "" || password == "") {
            return alert("Empty email or password!");
        }
        if (password !== confpass) {
            return alert("Passwords dont match!");
        }

        await registerUser(email, password);
        ctx.updateNav();
        ctx.page.redirect("/");
    }
}
