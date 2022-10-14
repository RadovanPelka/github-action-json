import path from "path";
import fs from "fs";
import {
  setFailed,
  setOutput,
  getInput,
  info,
  startGroup,
  endGroup,
} from "@actions/core";
import { isEmpty, mergeDeepRight } from "ramda";

type UnknownObject = Record<string, any>;

type TryParseObjectOptionalProps = { defaultValue?: UnknownObject };

const tryParseObject = (
  data: string,
  { defaultValue = {} }: TryParseObjectOptionalProps = {}
): UnknownObject => {
  try {
    const parsed = JSON.parse(data);

    return parsed || defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

(async () => {
  try {
    const pathInputParam = getInput("path");
    const replaceInputParam = getInput("replaceWith");
    const resolvePath = path.resolve(process.cwd(), pathInputParam);

    if (!fs.existsSync(resolvePath)) {
      setFailed(`File \x1b[31;1m${resolvePath}\x1b[0m does not exist!`);
      return;
    }

    const packageJsonAsString = await (
      await fs.promises.readFile(resolvePath)
    ).toString();

    let packageJson = tryParseObject(packageJsonAsString);

    const newPackageValues = tryParseObject(replaceInputParam);

    if (!isEmpty(newPackageValues)) {
      packageJson = mergeDeepRight(packageJson, newPackageValues);
    }

    await fs.promises.writeFile(
      resolvePath,
      JSON.stringify(packageJson, null, 2)
    );

    startGroup(`\x1b[32;1m package.json\x1b[0m content: `);
    info(`${JSON.stringify(packageJson, null, 2)}`);
    endGroup();

    Object.keys(packageJson).forEach((keyname) => {
      const value = packageJson[keyname];
      setOutput(keyname, JSON.stringify(value));
    });
  } catch (error) {
    setFailed(error.message);
  }
})();
