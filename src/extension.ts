"use strict";

import * as vscode from "vscode";
// name of settings strings
const g_togglePrimary: string = "toggle.settingTitle";
const g_toggleTitle_s1: string = "toggle.setting1Title";
const g_toggleTitle_s2: string = "toggle.setting2Title";
// name of setting states and default values specified in package.json
const g_settingState1: string = "toggle.settingState1";
const g_settingState2: string = "toggle.settingState2";
const g_state1Default: string = "state1";
const g_state2Default: string = "state2";
// name of commands
const g_commandToggleP = "extension.toggle";
const g_commandToggleS1 = "extension.toggle_s1";
const g_commandToggleS2 = "extension.toggle_s2";
// status bar items
let g_statusBarTogP: vscode.StatusBarItem;
let g_statusBarTogS1: vscode.StatusBarItem;
let g_statusBarTogS2: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  console.log(`Extension "toggle-btn" is now active! again!`);
  // Setting Toggle (primary)
  const disposable = vscode.commands.registerCommand(g_commandToggleP, () => {
    toggleSetting(g_togglePrimary);
  });

  g_statusBarTogP = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    3
  );
  g_statusBarTogP.text = "T-P";
  g_statusBarTogP.command = g_commandToggleP;
  context.subscriptions.push(g_statusBarTogP);

  // Setting 1 Toggle
  const disposable1 = vscode.commands.registerCommand(g_commandToggleS1, () => {
    toggleSetting(g_toggleTitle_s1);
  });
  g_statusBarTogS1 = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    2
  );
  g_statusBarTogS1.text = "T-S1";
  g_statusBarTogS1.command = g_commandToggleS1;
  context.subscriptions.push(g_statusBarTogS1);

  // Setting 2 Toggle
  const disposable2 = vscode.commands.registerCommand(g_commandToggleS2, () => {
    toggleSetting(g_toggleTitle_s2);
  });
  g_statusBarTogS2 = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    1
  );
  g_statusBarTogS2.text = "T-S2";
  g_statusBarTogS2.command = g_commandToggleS2;
  context.subscriptions.push(g_statusBarTogS2);

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable1);
  context.subscriptions.push(disposable2);

  showStatusBarItem();
}

function showStatusBarItem(): void {
  g_statusBarTogP.show();
  g_statusBarTogS1.show();
  g_statusBarTogS2.show();
}

export function deactivate() {}

function toggleSetting(toggleTitle: string) {
  try {
    const config = vscode.workspace.getConfiguration();
    const settingTitle: string = config.get(toggleTitle);

    let state = config.get(settingTitle);
    if (state == undefined) {
      vscode.window.showErrorMessage(
        `Setting Toggle: "${settingTitle}" is not a valid setting.`
      );
      return;
    }

    if (typeof state === "boolean") {
      toggleBoolean(config, settingTitle, state);
    } else if (typeof state === "number" || typeof state === "string") {
      toggleCustom(config, settingTitle, state);
    } else {
      vscode.window.showErrorMessage(
        `Setting Toggle: "${settingTitle}" has invalid type, must be boolean, number or string to toggle.`
      );
    }
  } catch (err) {
    vscode.window.showErrorMessage("Setting Toggle: Error caught: " + err);
  }
}

async function toggleBoolean(
  config: vscode.WorkspaceConfiguration,
  settingTitle: string,
  oldState: boolean
) {
  const newState = !oldState;
  const isGlobalSetting = true;

  await config.update(settingTitle, newState, isGlobalSetting);
  vscode.window.showInformationMessage(
    `Setting Toggle: Setting ${settingTitle} changed to ${newState}.`
  );
}

async function toggleCustom(
  config: vscode.WorkspaceConfiguration,
  settingTitle: string,
  oldState: number | string
) {
  const settingState1: number | string = config.get(g_settingState1);
  const settingState2: number | string = config.get(g_settingState2);

  if (settingState1 === g_state1Default || settingState2 === g_state2Default) {
    vscode.window.showErrorMessage(
      `Setting Toggle: Set "settingState1" and "settingState2" to toggle non-boolean values.`
    );
    return;
  }

  let newState: number | string;
  // toggle using custom setting values
  if (oldState === settingState1) {
    newState = settingState2;
  } else if (oldState === settingState2) {
    newState = settingState1;
  } else {
    vscode.window.showErrorMessage(
      `Setting Toggle: State does not match state1 or state2. ${settingTitle} cannot be toggled.`
    );
    return;
  }

  const isGlobalSetting = true;
  await config.update(settingTitle, newState, isGlobalSetting);
  vscode.window.showInformationMessage(
    `Setting Toggle: ${settingTitle} changed to ${newState}.`
  );
}
