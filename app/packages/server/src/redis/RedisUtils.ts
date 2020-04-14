export const parseInfo = (infoStr: string): RedisInfo => {
  const infoData: { [key: string]: string[] } = infoStr.split('# ')
    .filter(x => x !== '')
    .map(x => {
      const parts = x.split('\r\n')
        .filter(p => p !== '');

      return {
        key: parts[0].trim(),
        value: parts.slice(1)
      };
    })
    .filter(x => x.key === 'Server' || x.key === 'Keyspace')
    .reduce((obj, item) => ({
      ...obj,
      [item.key]: item.value,
    }), {});

  const server = infoData['Server'] || [];
  const keyspace = infoData['Keyspace'] || [];

  const dbs: { [key: number]: number } = keyspace.length > 0
    ? keyspace.map(x => {
      const parts = x.split(':');
      const keys = parts[1].split(',')[0].replace('keys=', '');
      return {
        key: Number(parts[0].trim().replace('db', '')),
        value: Number(keys)
      }
    })
      .reduce((obj, item) => ({
        ...obj,
        [item.key]: item.value,
      }), {})
    : {};

  const infoO: RedisInfo = {
    server,
    keys: dbs
  }

  return infoO;
}
