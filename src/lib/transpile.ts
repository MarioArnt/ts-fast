import {
  CompilerOptions,
  transpileModule,
} from 'typescript';
import { readFile } from 'fs';
import { relative } from 'path';
import { debug } from './debug';
import { getTsConfig } from './get-config';
import { emitFile } from './fs-utils';
import { resolveOutputPath } from './output';

export const transpileFile = (
  cwd: string,
  absolutePath: string,
  compilerOptions: CompilerOptions,
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    readFile(absolutePath, (err, buffer) => {
      if (err) {
        debug(err);
        return reject(err);
      }
      const js = transpileModule(buffer.toString(), { compilerOptions });
      const dest = resolveOutputPath(compilerOptions, absolutePath);
      debug(relative(cwd, absolutePath), '->', dest);
      emitFile(dest, js.outputText).then(resolve).catch(reject);
    });
  });
};

export const transpile = async (cwd: string, name?: string): Promise<void> => {
  debug('compiling files in directory', cwd);
  const config = getTsConfig(cwd, name);
  debug('config read', config);
  const fileNames = config.fileNames;
  await Promise.all(fileNames.map((file) => transpileFile(cwd, file, config.options)));
};
