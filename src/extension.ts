"use strict";

import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

const settingsPath = getSettingsPath();

export function activate(context: vscode.ExtensionContext) {
  console.log(`Extension "toggle-btn" is now active!`);

  let disposable = vscode.commands.registerCommand("extension.toggle", () => {
    const settingTitle = vscode.workspace.getConfiguration("", null).get("setting-toggle.setting");

    fs.readFile(settingsPath, "utf8", function(err, userSettings) {
      if (err) {
        vscode.window.showErrorMessage("Error: unable to read settings. " + err);
      }

      const newSettings = toggleSetting(userSettings, settingTitle.toString());
      fs.writeFile(settingsPath, newSettings, function(err) {
        if (err) {
          vscode.window.showErrorMessage("Error: unable to write settings. " + err);
        }
      });
      // end write
    });
    // end read
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

// uses regex and string methods to toggle setting (Because settings.json has comments which make it difficult to parse)
function toggleSetting(rawSettings: string, settingTitle: string) {
  let userSettings = rawSettings;
  try {
    const state = vscode.workspace.getConfiguration("", null).get(settingTitle);
    if (typeof state !== "boolean") {
      vscode.window.showErrorMessage(`Error: ${settingTitle} is not a boolean. Only boolean settings can be toggled.`);
      return rawSettings;
    }

    const newState: boolean = !state;
    const curSetting: string = `"${settingTitle}": ${state}`;
    const newSetting: string = `"${settingTitle}": ${newState}`;
    // const correctSettingUsage: string = `"setting-toggle.setting": "${settingTitle}"`;

    // regex to match setting with variable whitespace, eg. "editor.codeLens":  false
    const matchSettingVarSpacing = new RegExp(`("${settingTitle}":\\s*((false)|(true)))`);
    // regex to match commented setting with variable whitespace, eg. // "editor.codeLens":  false ,
    const matchSettingCommented = new RegExp(`\\s(\\/{2})\\s*("${settingTitle}":)\\s*((false)|(true))\\s*`);
    // regex to match start of json file { followed by any character until " or /
    const jsonStart = /^{[^\/"]*/;

    // Find setting and apply correct formatting.
    const settingMatched = userSettings.match(matchSettingVarSpacing);
    if (settingMatched) {
      userSettings = userSettings.replace(settingMatched[0], curSetting);
    }

    if (userSettings.match(matchSettingCommented)) {
      // route 0: setting found but commented out

      vscode.window.showWarningMessage(`Error: please uncomment or delete "${settingTitle}" in order to toggle.`);
      return rawSettings;
      // Checks settings and returns toggled setting if possible, otherwise returns existing settings.
    } else if (userSettings.match(curSetting)) {
      // route 1: correct usage and format - setting toggled

      const toggledSettings = userSettings.replace(curSetting, newSetting);
      vscode.window.setStatusBarMessage(`${settingTitle} is now ${newState}`, 3000);
      return toggledSettings;
    } else if (userSettings.match(`"${settingTitle}":`)) {
      // route 2: setting key found but incorrect format - return original settings

      vscode.window.showWarningMessage(`Error: ${settingTitle} found but formatting incorrect, please correct format.`);
      return rawSettings;
    } else if (!userSettings.match(`"${settingTitle}":`)) {
      // route 3: setting key not found - add new setting and return

      const settingStart = userSettings.match(jsonStart);
      if (settingStart) {
        // route 3a: concatenate setting to user settings and return
        const settingStartString = settingStart[0] + curSetting + ",\n\t";
        const settingAdded = userSettings.replace(jsonStart, settingStartString);
        vscode.window.setStatusBarMessage(`${curSetting} now added to settings`, 3000);
        return settingAdded;
      } else {
        // route 3b: unable to match start of settings.json, return original settings
        vscode.window.showWarningMessage(`Error: unable to match settings.json formatting.`);
        return rawSettings;
      }
    } else {
      // route 4: unknown error, return original settings

      vscode.window.showErrorMessage(`Error: unknown reason. Please check your settings.`);
      return rawSettings;
    }
  } catch (err) {
    vscode.window.showErrorMessage("Error caught: " + err);
    return rawSettings;
  }
}

// get the PATH of settings.json (check Stable or Insiders build)
function getSettingsPath() {
  let settingsFile;
  let settingsData;
  // var settingsData = process.env.HOME + '/Library/Application Support';
  settingsData =
    process.env.APPDATA ||
    (process.platform == "darwin" ? process.env.HOME + "/Library/Application Support" : "/var/local");
  if (process.execPath.match(/insiders/gi)) {
    settingsFile = path.join(settingsData, "Code - Insiders/User/settings.json");
  } else {
    settingsFile = path.join(settingsData, "Code/User/settings.json");
  }
  // Workaround for Linux
  if (process.platform == "linux") {
    let os = require("os");
    settingsData = path.join(os.homedir(), ".config/");
    if (process.execPath.match(/insiders/gi)) {
      settingsFile = path.join(settingsData, "Code - Insiders/User/settings.json");
    } else {
      settingsFile = path.join(settingsData, "Code/User/settings.json");
    }
  }
  return settingsFile;
}
