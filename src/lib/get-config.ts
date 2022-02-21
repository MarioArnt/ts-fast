import { findConfigFile, ParseConfigHost, ParsedCommandLine, parseJsonConfigFileContent, readConfigFile, sys } from "typescript";

export const getTsConfig = (cwd: string, name?: string): ParsedCommandLine => {
  const parseConfigHost: ParseConfigHost = {
    fileExists: sys.fileExists,
    readFile: sys.readFile,
    readDirectory: sys.readDirectory,
    useCaseSensitiveFileNames: true,
  };
  const configFileName = findConfigFile(cwd, sys.fileExists, name || 'tsconfig.json');
  if (!configFileName) {
    throw new Error('Cannot resolve tsconfig.json');
  }
  const configFile = readConfigFile(configFileName, sys.readFile);
  return parseJsonConfigFileContent(configFile.config, parseConfigHost, cwd);
};
