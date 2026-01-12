# How to Publish Your Website to the Internet

You have built the final version of your website in the `dist` folder. Now you need to host it so anyone can access it.

Here are the two easiest ways to do this for free.

## Option 1: The Easiest Way (Netlify Drop)
*Best for: Getting it online in 30 seconds without installing anything.*

1. **Locate your `dist` folder**: 
   Open your file explorer to `d:\HOSPITAL SETUP\ag 3\dist`.
   (Note: Ensure you have run `npm run build` first. You should see files like `index.html` and an `assets` folder inside).

2. **Go to Netlify Drop**:
   Open your web browser and go to [https://app.netlify.com/drop](https://app.netlify.com/drop).

3. **Drag and Drop**:
   Drag the entire `dist` folder onto the page where it says "Drag and drop your site folder here".

4. **Wait & Rename**:
   - Proper upload usually takes a few seconds.
   - Once done, you will get a link like `random-name.netlify.app`.
   - You can click "Site Settings" -> "Change site name" to something like `visiting-nurse-lk.netlify.app`.

---

## Option 2: The Professional Way (Vercel)
*Best for: Good performance and automatic updates if you use Git later.*

1. **Install Vercel CLI** (Optional but easy via terminal):
   Run the following command in your terminal:
   ```powershell
   npm install -g vercel
   ```

2. **Deploy**:
   Run this command inside your project folder:
   ```powershell
   vercel
   ```
   - It will ask you to log in (or sign up).
   - Keep pressing `Enter` to accept all default settings.
   - It will detect your `vite` project and deploy it.

3. **Result**:
   You will get a permanent URL (e.g., `visiting-nurse.vercel.app`).

---

## Option 3: Connecting a Custom Domain (e.g., .lk or .com)
If you buy a domain (like `visitingnurse.lk`), both Netlify and Vercel allow you to connect it for free in their "Domain Settings" dashboard. You just need to follow their instructions to update your DNS records.
