import dotenv from 'dotenv';
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
dotenv.config();

function getPublicKeyFromSecretKey(): string {
  const keypair = getKeypairFromEnvironment("SECRET_KEY");
  return keypair.publicKey.toBase58();
}

export { getPublicKeyFromSecretKey };