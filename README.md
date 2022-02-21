# ts-fast

I created this tiny CLI util to work around the lack of ``--no-check`` or ``only-emit`` flags in official typescript `tsc` CLI.

This might be very useful when :

* you want to seperate type-check (expensive and long) and transpile-only tasks (fast) in different threads.
* you do not want to repeat type-checking on code that already passed it on previous build stage.

## Usage

````bash
# No config given, will recusrively find the nearest tsconfig.json
ts-fast

# Or you can spacify the name of the config (same syntax than tsc)
ts-fast -p ./config/ts-config.prod.json
````

> It does not support other flags of tsc command like `--esModuleInterop`, we don't want to maintain an interface with a huge ammount of options. Anyway, all these configs can be all declared in tsconfig.json
