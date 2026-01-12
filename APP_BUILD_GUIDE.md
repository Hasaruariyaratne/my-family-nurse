# How to Create the PC Software (.exe) and Mobile App

I have set up your Admin Dashboard to be converted into PC Software (Electron) and a Mobile App (PWA).

## 1. Creating the PC Software (.exe)
You can now build a real Windows installer for your admin panel.

1.  **Open Terminal** in: `d:\HOSPITAL SETUP\ag 3\admin`
2.  **Run Build Command**:
    ```powershell
    npm run electron:build
    ```
3.  **Find the file**:
    After it finishes, check the `admin/release` folder.
    You will find `Visiting Nurse Admin Setup 0.0.0.exe`.
    *Double-click this to install it on any Windows computer.*

*Note: For the app to work, the Backend Server must still be running (or hosted online).*

## 2. Using as a Mobile App (PWA)
You do not need to build complex APKs. You can "Install" the website on your phone, and it behaves exactly like an App.

1.  **Open the Admin URL** on your phone (e.g., if hosted, `https://admin.visitingnurse.lk`).
2.  **Android**: Tap Chrome Menu (⋮) -> **"Add to Home Screen"** -> "Install".
3.  **iPhone**: Tap Share Button -> **"Add to Home Screen"**.

Now you have a "Visiting Nurse Admin" icon on your home screen that opens fullscreen like a real app.
