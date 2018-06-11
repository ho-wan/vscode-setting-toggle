# Setting Toggle

## Easily toggle any VS code setting at the **click of a button**!

This extension lets you toggle up to 3 boolean settings using commands.
- The primary setting can be toggled using the button.

---
<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle-img1.png" alt="setting-toggle-image1"/>

- Now you can quickly toggle codeLens, minimap, font ligatures, or whatever setting you want! You can also assign your own keybinding to the **Setting Toggle** commands.

- Separate settings can be saved in individual workspaces, eg. codeLens for C#.

---
Status bar shows toggled setting

<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle-status.gif" alt="setting-toggle-status.gif"/>

---
## Requirements

- The toggled setting must be a boolean; codeLens is toggled by default.
``` JSON
    "editor.codeLens": false,
```
- To toggle a custom setting, set **"toggle.setting.title":** to the name of the custom setting in the user settings. eg.
``` JSON
    "toggle.setting.title": "editor.minimap.enabled",
```
- To use the Setting 1 and 2, "setting1" and "setting2" must be enabled and assigned a title. eg.
``` JSON
    "toggle.setting1.enabled": true,
    "toggle.setting1.title": "editor.fontLigatures",
```
The commands to toggle the three settings are:
- **Setting Toggle**
- **Setting 1 Toggle**
- **Setting 2 Toggle**

---

<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle.gif" alt="setting-toggle-demo.gif">

---
## Settings

- `"toggle.setting.title"`: Title of the primary setting, can be toggled using the button. Default is "editor.codeLens".
- `"toggle.setting1.title"`: Title of setting 1 for toggle.
- `"toggle.setting2.title"`: Title of setting 2 for toggle.
- `"toggle.setting1.enabled"`: Enables command "Setting 1 Toggle". Default is true.
- `"toggle.setting2.enabled"`: Enables command "Setting 2 Toggle". Default is true.
- `"toggle.icon.enabled"`: Show or hide the button icon. Default is true.

---
## Known Issues

- Changes to the "settings.json" file should be saved before the setting is toggled using this extension, otherwise there will be a merge error when saving.

---
