# Setting Toggle

## Easily toggle any VS code setting

This extension lets you toggle up to 3 custom settings defined in the `settings.json` file.

- The primary setting can be toggled using the **T** button.
- Status bar can be use to show the 3 settings and can be clicked to toggle.
- Boolean fields will be toggled by default. However, one pair of two preset values can be toggled (string and ints).

<br>

<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle-top-bar.png" alt="setting-toggle-image1"/>

<br>

<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle-status-bar.png" alt="setting-toggle-status-bar"/>

<br>

The commands to toggle the three settings are:
- **Setting Toggle - Toggle Primary Setting**
- **Setting Toggle - Toggle S1 Setting**
- **Setting Toggle - Toggle S2 Setting**

---

## Settings

- `"toggle.settingTitle"`: Title of the primary setting, can be toggled using the button. Default is "editor.codeLens".
- `"toggle.setting1Title"`: Title of setting 1 for toggle.
- `"toggle.setting2Title"`: Title of setting 2 for toggle.
- `"toggle.settingState1"`: Custom value of state 1 for toggle, eg. "on".
- `"toggle.settingState2"`: Custom value of state 2 for toggle, eg. "off".
- `"toggle.iconEnabled"`: Show or hide the button icon. Default is true.
- `"toggle.showStatusbarPrimary"`: Show Primary toggle in status bar. Default is true.
- `"toggle.showStatusbarS1"`: Show S1 toggle in status bar. Default is false.
- `"toggle.showStatusbarS2"`: Show S2 toggle in status bar. Default is false.

---
- The toggled setting gets automatically updated in your settings.json file.
- CodeLens is toggled by default.
- To toggle a custom setting, update your settings.json file with **"toggle.settingTitle":** to the name of the custom setting in the user settings, eg.
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

---
## Known Issues

- If "settings.json" is open with unsaved changes, the setting will not be toggled.
- Nested settings are not supported, ie.
```
    "[terraform]": {
        "editor.codeLens": false
    },
```

---
