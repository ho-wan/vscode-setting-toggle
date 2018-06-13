import * as assert from 'assert';
import * as usd from "../UserDataPath";
// import * as extension from '../extension';

suite("settingsLocator", () => {
    let originalHome: string;
    let originalAppData: string;

    const usd_object = new usd.UserDataPath();

    suiteSetup(() => {
        originalHome = process.env.HOME;
        originalAppData = process.env.APPDATA;
    });

    suiteTeardown(() => {
        SetHome(originalHome);
        SetAppData(originalAppData);
    });

    test("if mac then is mac path", () => {
        SetPlatform('darwin');
        SetHome('/Users/user');

        let codePath = usd_object.getPathCodeSettings();
        console.log(codePath);
        assert.equal(codePath, "/Users/user/Library/Application Support/Code/User/settings.json")
    });

    test("if windows then is windows path", () => {
        SetPlatform('win32');
        //windows uses the appdata settings not the home
        SetAppData('C:\\Users\\User\\AppData\\Roaming');
        SetHome('');

        let codePath = usd_object.getPathCodeSettings();
        console.log(codePath);
        assert.equal(codePath, "C:\\Users\\User\\AppData\\Roaming\\Code\\User\\settings.json")
    });

    test("if linux then is linux path", () => {
        SetPlatform('linux');
        SetHome('/var/local');

        let codePath = usd_object.getPathCodeSettings();
        console.log(codePath);
        assert.equal(codePath, "/var/local/.config/Code/User/settings.json")
    });

});

function SetHome(home) {
    Object.defineProperty(process.env, 'HOME', {
        value: home
    });
}

function SetAppData(location) {
    Object.defineProperty(process.env, 'APPDATA', {
        value: location
    });
}

function SetPlatform(platform) {
    Object.defineProperty(process, 'platform', {
        value: platform
    });
}