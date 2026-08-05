// Optionally points the demo apps at a local SDK checkout instead of the published packages.
//
// Enable it by creating an untracked .env next to this file:
//
//   CALLIX_LINK_LOCAL_SDK=true
//   CALLIX_SDK_REPO=/absolute/path/to/callix-sdk   # optional, defaults to ../callix-sdk
//
// readPackage rewrites the @callixbrasil/* specifiers to link: targets and afterAllResolved hands
// pnpm back the lockfile as it was read, so pnpm-lock.yaml never records the override. Shell
// variables win over .env, so `CALLIX_LINK_LOCAL_SDK=false pnpm install` disables it for one run.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = import.meta.dirname;
const ENV_FILE = path.join(ROOT, '.env');
const PACKAGES = ['client-sdk', 'client-sdk-react', 'server-sdk'];
const DEPENDENCY_FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies'];

if (fs.existsSync(ENV_FILE)) {
  process.loadEnvFile(ENV_FILE);
}

const enabled = ['1', 'true', 'yes'].includes(process.env.CALLIX_LINK_LOCAL_SDK?.toLowerCase() ?? '');
const sdkRepo = process.env.CALLIX_SDK_REPO ?? path.resolve(ROOT, '../callix-sdk');

const linkTargets = new Map(
  enabled
    ? PACKAGES.map((name) => [`@callixbrasil/${name}`, path.join(sdkRepo, 'packages', name, 'dist')]).filter(
        ([, dist]) => fs.existsSync(dist)
      )
    : []
);

let pristineLockfile;
let linked = false;

function preResolution({ wantedLockfile }) {
  if (linkTargets.size === 0) {
    return;
  }
  // Cloned because pnpm mutates this object while resolving.
  pristineLockfile = structuredClone(wantedLockfile);
}

function readPackage(pkg, context) {
  for (const field of DEPENDENCY_FIELDS) {
    const deps = pkg[field];

    if (deps == null) {
      continue;
    }

    for (const [name, dist] of linkTargets) {
      if (deps[name] == null || deps[name].startsWith('link:')) {
        continue;
      }

      deps[name] = `link:${dist}`;
      linked = true;
      context.log(`${pkg.name ?? 'workspace root'}: ${name} -> ${dist}`);
    }
  }

  return pkg;
}

function afterAllResolved(lockfile, context) {
  if (!linked || pristineLockfile?.importers == null) {
    return lockfile;
  }

  context.log('restored pnpm-lock.yaml, the local links are intentionally not recorded');

  return pristineLockfile;
}

export const hooks = { preResolution, readPackage, afterAllResolved };
