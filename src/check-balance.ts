import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getPublicKeyFromSecretKey } from "./generate-keypair";

function getPublicKey(): PublicKey {
    const publicKey = new PublicKey(process.argv[2] || getPublicKeyFromSecretKey());
    if (!PublicKey.isOnCurve(publicKey.toBytes())) {
        throw new Error(`Invalid public key for ${publicKey.toBase58()}. Please check the address and try again.`);
    }
    return publicKey
}

async function checkBalance(publicKey: PublicKey, connection: Connection): Promise<number> {
    const balanceInLamports = await connection.getBalance(publicKey);
    return balanceInLamports / LAMPORTS_PER_SOL;
}

const publicKey = getPublicKey();
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
checkBalance(publicKey, connection).then(balance => {
    console.log(`The balance for the wallet at address ${publicKey} is ${balance} SOL`);
}).catch(err => {
    console.error("Error checking balance:", err);
});