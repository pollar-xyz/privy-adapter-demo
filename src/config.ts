import 'dotenv/config';
import { z } from 'zod';

const Schema = z.object({
  PRIVY_APP_ID: z.string().min(1),
  PRIVY_APP_SECRET: z.string().min(1),
  POLLAR_API_SECRET: z.string().min(32),
  STELLAR_NETWORK: z.enum(['mainnet', 'testnet']),
  ADAPTER_PORT: z.coerce.number().int().positive().default(3001),
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
    .default('info'),
});

export type AppConfig = z.infer<typeof Schema>;

const parsed = Schema.safeParse(process.env);
if (!parsed.success) {
  console.error('[config] invalid environment:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config: AppConfig = parsed.data;
