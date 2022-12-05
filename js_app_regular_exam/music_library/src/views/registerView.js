import { html, page } from "../lib.js";
import { register } from "../api/user.js";
import { createSubmitHandler } from "../util.js";

const registerTemplateView = (onRegister) => html`<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${onRegister} class="login-form">
            <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
            />
            <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
            />
            <input
                type="password"
                name="repassword"
                id="repeat-password"
                placeholder="repeat password"
            />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="#">Login</a></p>
        </form>
    </div>
</section>`;

export function registerView(ctx) {
    ctx.render(registerTemplateView(createSubmitHandler(onRegister)));

    async function onRegister({ email, password, repassword }) {
        if (email == "" || password == "") {
            return alert("Empty email or password!");
        }

        if (password !== repassword) {
            return alert("Passwords do not match!");
        }

        await register(email, password);
        ctx.updateNav();
        page.redirect("/");
    }
}
