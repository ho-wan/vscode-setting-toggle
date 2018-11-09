# Setting Toggle

## Easily toggle any VS code setting at the **click of a button**!

This extension lets you toggle up to 3 settings using commands.
- The primary setting can be toggled using the button.
- Can toggle between two preset values (string and ints) as well as booleans.

---
<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle-img1.png" alt="setting-toggle-image1"/>

- Now you can quickly toggle codeLens or whatever setting you want! You can also assign your own keybinding to the **Setting Toggle** commands using the vscode keybindings.

---
Status bar shows toggled setting

<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle-status.gif" alt="setting-toggle-status.gif"/>

---
## Requirements


The commands to toggle the three settings are:
- **Setting Toggle Primary**
- **Setting 1 Toggle**
- **Setting 2 Toggle**
---
- The toggle setting gets automatically updated in your settings.json file. codeLens is toggled by default.
- To toggle a custom setting, set **"toggle.settingTitle":** to the name of the custom setting in the user settings.
eg. to toggle the activityBar on the left of the editor:
``` JSON
    "toggle.settingTitle": "workbench.activityBar.visible",
```
- To use the Setting 1 and 2, assign the setting name to setting1Title and setting2Title.
``` JSON
    "toggle.setting1Title": "editor.codeLens",
    "toggle.setting2Title": "editor.parameterHints",
```
---
<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle.gif" alt="setting-toggle-demo.gif">

---
- To toggle a non-boolean setting, assign State1 and State2 the values you want to toggle between. The setting is only toggled if the current value matches either State1 or State2.
``` JSON
    "editor.wordWrap": "off",
    "toggle.settingTitle": "editor.wordWrap",
    "toggle.settingState1": "off",
    "toggle.settingState2": "wordWrapColumn",
```
---
Toggle font size using ints.

<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle-states1.1.2a.gif" alt="setting-toggle-demo-states_ints.gif">

---
Toggle word wrap using custom strings.

<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle-states1.1.2b.gif" alt="setting-toggle-demo-states_strings.gif">

_Please note that settings have been renamed as of v1.2.3; toggle.setting.title -> toggle.settingTitle, etc._

---
## Settings

- `"toggle.settingTitle"`: Title of the primary setting, can be toggled using the button. Default is "editor.codeLens".
- `"toggle.setting1Title"`: Title of setting 1 for toggle.
- `"toggle.setting2Title"`: Title of setting 2 for toggle.
- `"toggle.settingState1"`: Custom value of state 1 for toggle, eg. "on".
- `"toggle.settingState2"`: Custom value of state 2 for toggle, eg. "off".
- `"toggle.iconEnabled"`: Show or hide the button icon. Default is true.

---
## Known Issues

- Save "settings.json" before toggling setting, otherwise there will be a merge error when saving.
- Does not check for block comments in "settings.json".

---
