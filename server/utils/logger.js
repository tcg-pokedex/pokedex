import { Logger, transports } from 'winston';
import mkdirp from 'mkdirp';
import nconf from '../config';

mkdirp.sync('./logs', 0o755);

const logger = new Logger({
  transports: [
    new transports.File({
      name: 'info-file',
      filename: 'logs/info.log',
      level: 'info',
      json: false,
    }),
    new transports.File({
      name: 'error-file',
      filename: 'logs/error.log',
      level: 'error',
      json: false,
    }),
  ],
});

if (nconf.get('NODE_ENV') === 'development') {
  logger.add(transports.Console, {
    level: 'debug',
    colorize: true,
    prettyPrint: true,
  });
}

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

export default logger;
