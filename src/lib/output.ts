import { resolve, relative, join } from "path"
import { CompilerOptions } from "typescript"

export const resolveOutputPath = (compilerOptions: CompilerOptions, sourceAbsolutePath: string): string => {
  let file = sourceAbsolutePath.replace(/\.ts$/, '.js');
  if (!compilerOptions.outDir) {
    return file;
  }
  const rootDirs = compilerOptions.rootDirs || [compilerOptions.rootDir] || [];
  const relativeRootDir = rootDirs.filter((r) => !!r).find((root) => file.startsWith(root!));
  const relativeFile = relativeRootDir ? relative(relativeRootDir, file) : relative(compilerOptions.outDir, file);
  return resolve(join(compilerOptions.outDir), relativeFile);
}
