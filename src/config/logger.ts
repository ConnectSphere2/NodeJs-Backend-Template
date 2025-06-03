/* eslint-disable @typescript-eslint/no-explicit-any */
import { createLogger, format, Logger, transports } from 'winston';

const contextFormat = format((info) => {
  info.traceId = info.traceId || 'no-trace-id';
  return info;
});

const oneLineFormat = format.printf((info) => {
  const parts: string[] = [
    `[${info.level.toUpperCase()}]`,
    `${info.timestamp}`,
    `Message: ${info.message}`,
  ];

  if (info.traceId) parts.push(`TraceId: ${info.traceId}`);
  if (info.functionName) parts.push(`Function: ${info.functionName}`);
  if (info.error) parts.push(`Error: ${info.error}`);
  if (info.metadata && Object.keys(info.metadata).length > 0)
    parts.push(`Metadata: ${JSON.stringify(info.metadata)}`);

  return parts.join(' | ');
});

const wTransports = [
  new transports.Console({
    handleExceptions: true,
    level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
    format: format.combine(
      contextFormat(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.metadata({
        fillExcept: ['message', 'timestamp', 'functionName', 'error', 'level', 'traceId'],
      }),
      oneLineFormat
    ),
  }),
  new transports.File({ filename: 'logs/error.log', level: 'error' }),
  new transports.File({ filename: 'logs/combined.log' }),
];

const baseLogger = createLogger({
  transports: wTransports,
});

class CustomLogger {
  constructor(private _logger: Logger) { }

  info(message: string, functionName?: string, traceId?: string, meta?: any): void {
    this._logger.info(message, { functionName, traceId, ...meta });
  }

  debug(message: string, functionName?: string, traceId?: string, meta?: any): void {
    this._logger.debug(message, { functionName, traceId, ...meta });
  }

  trace(message: string, functionName?: string, traceId?: string, meta?: any): void {
    this._logger.verbose(message, { functionName, traceId, ...meta });
  }

  error(
    message: string,
    functionName?: string,
    error?: unknown,
    traceId?: string,
    meta?: any
  ): void {
    this._logger.error(message, {
      error: error instanceof Error ? error.stack : error,
      functionName,
      traceId,
      ...meta,
    });
  }

  warn(message: string, functionName?: string, traceId?: string, meta?: any): void {
    this._logger.warn(message, { functionName, traceId, ...meta });
  }

  fatal(message: string, functionName?: string, traceId?: string, meta?: any): void {
    this._logger.error(message, { functionName, traceId, ...meta });
  }
}

const log = new CustomLogger(baseLogger);

export default log;
