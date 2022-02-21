#! /usr/bin/env node
import { transpile } from '../lib';

(async () => {
  try {
    if (process.argv.length === 2 || (process.argv.length === 4 && process.argv[2] === '-p')) {
      const [,,,name] = process.argv;
      await transpile(process.cwd(), name);
      process.exit(0);
    } else {
      console.error('[ts-fast] Invalid usage');
      console.error('Please use the following sythax : ts-fast [-p <config>]');
      process.exit(1);
    }
    
  } catch (e) {
    console.error('[ts-fast] Unexpected error :');
    console.error(e);
  }
})();
