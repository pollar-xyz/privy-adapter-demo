import { createPollarPrivyAdapter } from '@pollar/privy-adapter';
import { config } from './config';
import { logger } from './logger';

export const adapter = createPollarPrivyAdapter({
  getCredentials: async () => ({
    appId: config.PRIVY_APP_ID,
    appSecret: config.PRIVY_APP_SECRET,
  }),
  pollarApiSecret: config.POLLAR_API_SECRET,
  network: config.STELLAR_NETWORK,
  port: config.ADAPTER_PORT,
  onError: (err, ctx) => logger.error({ err, ctx }, 'privy-adapter error'),
  onWalletCreated: (userId, address) =>
    logger.info({ userId, address }, 'wallet created via privy-adapter'),
  onTransactionSigned: (walletAddress) =>
    logger.info({ walletAddress }, 'tx signed via privy-adapter'),
});
