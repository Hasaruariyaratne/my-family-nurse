# How to Get a Custom .LK Domain (e.g., visitingnurse.lk)

To get a professional link like `visitingnurse.lk`, you need to do two things:
1.  **Register (Buy)** the domain name.
2.  **Connect** it to your website host (Netlify or Vercel).

---

## Step 1: Buy the .LK Domain
In Sri Lanka, the official registry for `.lk` domains is the **LK Domain Registry**.

1.  **Visit**: [https://www.domains.lk/](https://www.domains.lk/)
2.  **Search**: Type your desired name (e.g., `visitingnurse` or `homenursing`).
3.  **Check Availability**:
    *   If it says "Domain Available", you can buy it.
    *   Cost is usually around **Rs. 3,000 - 5,000 per year**.
4.  **Register**:
    *   Click "Register Domain".
    *   You will need to provide your details (Name, NIC/Company Reg, Address).
    *   **Important**: For "Name Servers" (DNS), you can leave them blank for now OR use the ones from Netlify/Vercel if you have already set up the hosting (see Step 2).
5.  **Pay**: Complete the payment online. It usually takes 24 hours to activate.

---

## Step 2: Host Your Website (Free) & Get Name Servers

We will use **Netlify** (easiest) detailed in the previous guide, but now we configure it for a custom domain.

1.  **Upload to Netlify**:
    *   Go to [app.netlify.com/drop](https://app.netlify.com/drop).
    *   Drag your `dist` folder there.
    *   Your site is now online (e.g., `random-name.netlify.app`).

2.  **Add Custom Domain in Netlify**:
    *   Click usually on **"Site Settings"** > **"Domain Management"**.
    *   Click **"Add a domain"**.
    *   Enter your new domain: `www.visitingnurse.lk` (or whatever you bought).
    *   Click **"Verify"** > **"Add domain"**.

3.  **Get DNS Settings**:
    *   Netlify will tell you "Check your DNS configuration".
    *   It will give you **4 Name Servers**. They look like:
        *   `dns1.p01.nsone.net`
        *   `dns2.p01.nsone.net`
        *   `dns3.p01.nsone.net`
        *   `dns4.p01.nsone.net`
    *   **COPY THESE**.

---

## Step 3: Connect Them (The Final Link)

1.  Go back to **domains.lk** (where you bought the domain).
2.  Log in to your account.
3.  Find your domain and look for **"Edit Name Servers"** or "DNS Settings".
4.  Replace the existing Name Servers with the **4 lines you got from Netlify**.
5.  Save/Update.

**Wait**: It can take up to 24 hours for the connection to work worldwide, but often happens in 1-2 hours.

After this, when anyone types `www.visitingnurse.lk`, they will see your website!
