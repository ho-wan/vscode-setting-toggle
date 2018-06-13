"use strict";

import * as vscode from "vscode";
import * as fs from "fs";
import * as usd from "./UserDataPath";
// name of settings strings
const g_toggleTitle: string = "toggle.setting.title";
const g_toggleTitle_s1: string = "toggle.setting1.title";
const g_toggleTitle_s2: string = "toggle.setting2.title";
// name of setting states and default values specified in package.json
const g_settingState1: string = "toggle.setting.state1";
const g_settingState2: string = "toggle.setting.state2";
const g_state1Default: string = "state1";
const g_state2Default: string = "state2";

export function activate(context: vscode.ExtensionContext) {
  console.log(`Extension "toggle-btn" is now active!`);
  // Setting Toggle (primary)
  let disposable = vscode.commands.registerCommand("extension.toggle", () => {
    updateSettingsFile(g_toggleTitle);
  });
  // Setting 1 Toggle
  let disposable1 = vscode.commands.registerCommand("extension.toggle_s1", () => {
    updateSettingsFile(g_toggleTitle_s1);
  });
  // Setting 2 Toggle
  let disposable2 = vscode.commands.registerCommand("extension.toggle_s2", () => {
    updateSettingsFile(g_toggleTitle_s2);
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable1);
  context.subscriptions.push(disposable2);
}

// get current setting state, read and write setting.jsons with updated state.
function updateSettingsFile(toggleTitle: string) {
  const m_usd = new usd.UserDataPath();
  const m_settingsPath = m_usd.getPathCodeSettings();
  const m_settingTitle = vscode.workspace.getConfiguration("", null).get(toggleTitle);
  // if settingTitle has not been assigned, then show warning message and break out of function.
  if (m_settingTitle === "") {
    vscode.window.showWarningMessage(`Assign name of setting to "${toggleTitle}": to use`);
    return;
  }

  // read settings.json
  fs.readFile(m_settingsPath, "utf8", function (err, userSettings) {
    if (err) {
      vscode.window.showErrorMessage("Error: unable to read settings. " + err);
    }

    const newSettings = toggleSetting(userSettings, m_settingTitle.toString());
    // write newSettings to settings.json
    fs.writeFile(m_settingsPath, newSettings, function (err) {
      if (err) {
        vscode.window.showErrorMessage("Error: unable to write settings. " + err);
      }
    });
  });
}

export function deactivate() { }

// uses regex and string methods to toggle setting (Because settings.json has comments which make it difficult to parse)
export function toggleSetting(rawSettings: string, settingTitle: string) {
  let userSettings = rawSettings;
  let newState;

  const settingState1 = vscode.workspace.getConfiguration("", null).get(g_settingState1);
  const settingState2 = vscode.workspace.getConfiguration("", null).get(g_settingState2);
  try {
    let state = vscode.workspace.getConfiguration("", null).get(settingTitle);
    if (typeof state === "boolean") {
      newState = !state;
    } else if (settingState1 === g_state1Default && settingState2 === g_state2Default) {
      vscode.window.showErrorMessage(`Error: change "state1" and "state2" to toggle values`);
      return rawSettings;
    } else {
      // toggle using user assigned states if matches current state
      if (state === settingState1) {
        newState = settingState2;
      } else if (state === settingState2) {
        newState = settingState1;
      } else {
        vscode.window.showErrorMessage(`Error: state does not match state1 or state 2. ${settingTitle} cannot be toggled.`);
        return rawSettings;
      }
      if (typeof newState === "string") {
        state = `"${state}"`
        newState = `"${newState}"`
      }
    }

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
        const settingStartString = settingStart[0] + newSetting + ",\n\t";
        const settingAdded = userSettings.replace(jsonStart, settingStartString);
        vscode.window.setStatusBarMessage(`${newSetting} now added to settings`, 3000);
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
