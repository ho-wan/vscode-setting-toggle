# Setting Toggle

## Easily toggle any VS code setting at the **click of a button**!

This extension lets you toggle up to 3 settings using commands.
- The primary setting can be toggled using the button.
- Can toggle between two preset values (string and ints) as well as booleans.

---
<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle-img1.png" alt="setting-toggle-image1"/>

- Now you can quickly toggle codeLens, minimap, font ligatures, or whatever setting you want! You can also assign your own keybinding to the **Setting Toggle** commands.

- Separate settings can be saved in individual workspaces, eg. codeLens for a C# project.

---
Status bar shows toggled setting

<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle-status.gif" alt="setting-toggle-status.gif"/>

---
## Requirements


The commands to toggle the three settings are:
- **Setting Toggle**
- **Setting 1 Toggle**
- **Setting 2 Toggle**
---
- The toggle setting gets automatically updated in your settings.json file. codeLens is toggled by default.
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
---
<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle.gif" alt="setting-toggle-demo.gif">

---
- To toggle a non-boolean setting, assign .state1 and .state2 the values you want to toggle between. eg.
``` JSON
    "editor.wordWrap": "off",
    "toggle.setting.title": "editor.wordWrap",
    "toggle.setting.state1": "off",
    "toggle.setting.state2": "wordWrapColumn",
```
---
Toggle font size using ints.

<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle-states1.1.2a.gif" alt="setting-toggle-demo-states_ints.gif">

---
Toggle word wrap using custom strings.

<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle-states1.1.2b.gif" alt="setting-toggle-demo-states_strings.gif">

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

- Save "settings.json" before toggling setting, otherwise there will be a merge error when saving.

---
