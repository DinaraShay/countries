const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }
    return systemSettingDark.matches ? "dark" : "light";
}

let currentThemeSetting = calculateSettingAsThemeString({ 
    localStorageTheme, 
    systemSettingDark 
});

document.querySelector("html").setAttribute("data-theme", currentThemeSetting);

const button = document.querySelector("[data-theme-toggle]");
if (button) {
    const sunIcon = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.5904 0.0362357C10.7368 0.0977502 10.8423 0.229567 10.8716 0.384818L11.4545 3.54549L14.6152 4.12549C14.7704 4.15478 14.9022 4.26023 14.9638 4.4067C15.0253 4.55316 15.0077 4.72013 14.9169 4.85195L13.092 7.5L14.9169 10.1451C15.0077 10.2769 15.0253 10.4439 14.9638 10.5904C14.9022 10.7368 14.7704 10.8423 14.6152 10.8716L11.4545 11.4545L10.8716 14.6152C10.8423 14.7704 10.7368 14.9022 10.5904 14.9638C10.4439 15.0253 10.2769 15.0077 10.1451 14.9169L7.5 13.092L4.85487 14.9169C4.72306 15.0077 4.55609 15.0253 4.40963 14.9638C4.26316 14.9022 4.15771 14.7704 4.12842 14.6152L3.54549 11.4545L0.384818 10.8716C0.229567 10.8423 0.0977502 10.7368 0.0362357 10.5904C-0.0252788 10.4439 -0.00770325 10.2769 0.0831039 10.1451L1.90804 7.5L0.0831039 4.85487C-0.00770325 4.72306 -0.0252788 4.55609 0.0362357 4.40963C0.0977502 4.26316 0.229567 4.15771 0.384818 4.12842L3.54549 3.54549L4.12842 0.384818C4.15771 0.229567 4.26316 0.0977502 4.40963 0.0362357C4.55609 -0.0252788 4.72306 -0.00770325 4.85487 0.0831039L7.5 1.90804L10.1451 0.0831039C10.2769 -0.00770325 10.4439 -0.0252788 10.5904 0.0362357ZM4.68791 7.5C4.68791 6.75419 4.98418 6.03892 5.51155 5.51155C6.03892 4.98418 6.75419 4.68791 7.5 4.68791C8.24581 4.68791 8.96108 4.98418 9.48845 5.51155C10.0158 6.03892 10.3121 6.75419 10.3121 7.5C10.3121 8.24581 10.0158 8.96108 9.48845 9.48845C8.96108 10.0158 8.24581 10.3121 7.5 10.3121C6.75419 10.3121 6.03892 10.0158 5.51155 9.48845C4.98418 8.96108 4.68791 8.24581 4.68791 7.5ZM11.2495 7.5C11.2495 6.50558 10.8544 5.55189 10.1513 4.84873C9.44811 4.14557 8.49442 3.75054 7.5 3.75054C6.50558 3.75054 5.55189 4.14557 4.84873 4.84873C4.14557 5.55189 3.75054 6.50558 3.75054 7.5C3.75054 8.49442 4.14557 9.44811 4.84873 10.1513C5.55189 10.8544 6.50558 11.2495 7.5 11.2495C8.49442 11.2495 9.44811 10.8544 10.1513 10.1513C10.8544 9.44811 11.2495 8.49442 11.2495 7.5Z" fill="white" />
</svg>`;

    const moonIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5532 13.815C9.66857 13.815 6.51929 10.9278 6.51929 7.36821C6.51929 6.0253 6.96679 4.78158 7.73143 3.75C4.69036 4.69515 2.5 7.33122 2.5 10.4381C2.5 14.3385 5.94929 17.5 10.2036 17.5C13.5929 17.5 16.4696 15.4932 17.5 12.7045C16.375 13.4048 15.0161 13.815 13.5532 13.815Z" fill="white" stroke="#111517" stroke-width="1.25" />
</svg>`;

    function updateButtonContent(theme) {
        const text = theme === "dark" ? "LIGHT" : "DARK";
        const icon = theme === "dark" ? sunIcon : moonIcon; 
        
        button.innerHTML = icon + text;
        button.setAttribute("aria-label", `Switch to ${text} theme`);
        
        button.style.display = "inline-flex";
        button.style.alignItems = "center";
        button.style.justifyContent = "center";
        button.style.gap = "8px"; 
    }

    updateButtonContent(currentThemeSetting);

    button.addEventListener("click", () => {
        const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
        currentThemeSetting = newTheme;
        
        updateButtonContent(newTheme);
        document.querySelector("html").setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
}

systemSettingDark.addEventListener('change', (e) => {
    if (!localStorage.getItem("theme")) { 
        const newSystemTheme = e.matches ? "dark" : "light";
        document.querySelector("html").setAttribute("data-theme", newSystemTheme);
        currentThemeSetting = newSystemTheme;
        
        if (button) {
            updateButtonContent(newSystemTheme);
        }
    }
});