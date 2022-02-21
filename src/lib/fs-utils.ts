import { access, constants, mkdir, writeFile } from 'fs';
import { dirname } from 'path';
import { debug } from './debug';

export const emitFile = async (dest: string, data: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const folder = dirname(dest);
    access(dest, constants.F_OK, (err) => {
      if (err && err.code === 'ENOENT') {
        mkdir(folder, { recursive: true }, (err) => {
          if (err) {
            debug('Error making target folder', folder);
            debug(err);
            return reject(err);
          }
          writeFile(dest, data, (err) => {
            if (err) {
              debug('Error write target file', dest);
              debug(err);
              return reject(err);
            }
            return resolve();
          });
        });
      } else if (err) {
        debug('Error checking existence of target folder', folder);
        debug(err);
        return reject(err);
      } else {
        // Target folder exists
        writeFile(dest, data, (err) => {
          if (err) {
            debug('Error write target file', dest);
            debug(err);
            return reject(err);
          }
          return resolve();
        });
      }
    });
  });
};