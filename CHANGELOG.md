# Change Log
All notable changes to the "setting-toggle" extension will be documented in this file.

## [1.5.1] (14 December 2021)
- Language specific settings can now be toggled using the following syntax:
`"toggle.settingTitle": "[terraform]editor.codeLens",`

## [1.5.0] (13 December 2021)
- Add all 3 toggle settings to status bar, which can be clicked to toggle each one. By default, only the primary is shown, `settings.json` can be used to configure if each toggle is shown in status bar or not. State of boolean toggles will be shown as (T) or (F).

## [1.4.1] (06 June 2021)
- Update setting toggle to use vscode api to update state instead of string matching used in v1.3.1 and prior. This should now work when using VSCode in WSL (previously the settings file would not be found).

## [1.3.1] (09 Nov 2018)
- Minor update to readme.

## [1.2.6] (22 June 2018)
- Error checking added for invalid setting.

## [1.2.5] (21 June 2018)
- Minor typo corrected. Description updated.

## [1.2.4] (20 June 2018)
- settings renamed; setting1Enabled and setting2Enabled removed, and readme updated.

## [1.2.3] (14 June 2018)
- settings renamed; toggle.setting.title -> toggle.settingTitle, etc.

## [1.2.2 ] (13 June 2018)
- getPath method moved to UserDataPath class. Code refactored.

## [1.2.1 ] (13 June 2018)
- Add environment tests to extension.test.ts.
- settings.json path updated and should now work on Mac and Linux (if not, let me know in repository.)
- Main command renamed to Setting Toggle Primary (for easier ctrl+p searching)

## [1.2.0 ] (12 June 2018)
- Now non-boolean settings can be toggled between preset values.
- Gifs demonstrating int and string toggling added.
