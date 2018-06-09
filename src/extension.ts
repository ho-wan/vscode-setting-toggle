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
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

function toggleSetting(userSettings: string, settingTitle: string) {
  try {
    const state = vscode.workspace.getConfiguration("", null).get(settingTitle);
    if (typeof state !== "boolean") {
      vscode.window.showErrorMessage(`Error: ${settingTitle} is not a boolean`);
      return userSettings;
    }

    const newState: boolean = !state;
    const settingString: string = `"${settingTitle}": ${state}`;
    const newSetting: string = `"${settingTitle}": ${newState}`;
    // const correctSettingUsage: string = `"setting-toggle.setting": "${settingTitle}"`;

    // route 1: correct usage - setting toggled
    if (userSettings.match(settingString)) {
      // find and toggle setting using string replace
      const settings = userSettings.replace(settingString, newSetting);
      vscode.window.setStatusBarMessage(`${settingTitle} is now ${newState}`);
      return settings;
      // route 2: setting key found but incorrect format - return original settings
    } else if (userSettings.match(`"${settingTitle}":`)) {
      vscode.window.showErrorMessage("Error: please check setting formatting.");
      return userSettings;
      // route 3: setting key not found - add new setting and return
    } else if (!userSettings.match(`"${settingTitle}":`)) {
      // regex to match { followed by any character not " or /
      const jsonStart = /^{[^\/"]*/;
      const settingStart = userSettings.match(jsonStart);
      if (settingStart) {
        // concatenate setting to user settings and return
        const settingStartString = settingStart.toString() + newSetting + ", \n    ";
        const settingAdded = userSettings.replace(jsonStart, settingStartString);
        vscode.window.setStatusBarMessage(`${newSetting} now added to settings`);
        return settingAdded;
      } else {
        // else unable to match start of settings.json, return original settings
        vscode.window.showErrorMessage(`Error: unable to match settings.json formatting.`);
        return userSettings;
      }
    } else {
      // else unkonwn error, return original settings
      vscode.window.showErrorMessage(`Error: unknown reason. Please check your settings.`);
      return userSettings;
    }
  } catch (err) {
    vscode.window.showErrorMessage("Error caught: " + err);
    return userSettings;
  }
}

// get the PATH of settings.json (check Stable or Insiders build?)
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
  // console.log("settingsFile =", settingsFile);

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
