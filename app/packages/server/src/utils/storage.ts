import * as fs from 'fs';

export namespace Storage {

  const baseDir = './data';
  const connectionsFile = `${baseDir}/connections.json`;

  export const saveConnection = (opts: RedisConnectionOptions): void => {
    if (!fs.existsSync(connectionsFile)) {
      if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
      }

      fs.writeFileSync(connectionsFile, JSON.stringify([opts]));
      return;
    }

    const raw = fs.readFileSync(connectionsFile).toString('utf8');
    const json: RedisConnectionOptions[] = JSON.parse(raw);

    const arr = json.filter(x => x.name !== opts.name);

    arr.push(opts);

    fs.writeFileSync(connectionsFile, JSON.stringify(arr));
  }

  export const loadConnections = (): RedisConnectionOptions[] => {
    if (!fs.existsSync(connectionsFile)) {
      return [];
    }

    const raw = fs.readFileSync(connectionsFile).toString('utf8');
    const json: RedisConnectionOptions[] = JSON.parse(raw);

    return json || [];
  }

}
