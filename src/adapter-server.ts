import { adapter } from './adapter';
import { config } from './config';
import { logger } from './logger';

async function main() {
  await adapter.start();
  logger.info({ port: config.ADAPTER_PORT, network: config.STELLAR_NETWORK }, 'privy-adapter listening');

  let stopping = false;
  const shutdown = async (signal: string) => {
    if (stopping) return;
    stopping = true;
    logger.info({ signal }, 'shutting down privy-adapter');
    try {
      await adapter.stop();
      process.exit(0);
    } catch (err) {
      logger.error({ err }, 'error during shutdown');
      process.exit(1);
    }
  };

  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));
}

main().catch((err) => {
  logger.fatal({ err }, 'privy-adapter failed to start');
  process.exit(1);
});
