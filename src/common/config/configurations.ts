import path from 'node:path';
import * as yaml from 'js-yaml';
import { readFileSync } from 'node:fs';

// 这里是动态读取env的一个load函数
export default () => {
  const file = path.join(__dirname, `/${process.env.NODE_ENV}.yml`);
  console.log('🚀 ~  ~ file: ', file);
  return yaml.load(readFileSync(file, 'utf8')) as Record<string, any>;
};
