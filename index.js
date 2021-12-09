// Working on Solana.
const {
	Connection,
	PublicKey,
	clusterApiUrl,
	Keypair,
	LAMPORTS_PER_SOL,
	Transaction,
	Account,
} = require('@solana/web3.js');

const getKeys = (keypair) => {
	const publicKey = new PublicKey(keypair._keypair.publicKey).toString();
	const secretKey = keypair._keypair.secretKey;
	return { publicKey, secretKey };
};


const getWalletBalance = async (secretKey) => {
	try {
		const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
		const myWallet = Keypair.fromSecretKey(secretKey);
		const balance = await connection.getBalance(new PublicKey(myWallet.publicKey));
		console.log(`balance for ${myWallet.publicKey} ${parseInt(balance, 10) / LAMPORTS_PER_SOL}`);
	} catch (error) {
		console.log(error);
	}
};

const airDropSol = async (secretKey, n_sol) => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = Keypair.fromSecretKey(secretKey);
        console.log(`-- Airdropping ${n_sol} SOL --`)
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            n_sol * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

const main = async (secretKey) => {
	await getWalletBalance(secretKey);
	await airDropSol(secretKey, 4);
	await getWalletBalance(secretKey);
};

const keypair = new Keypair();
kp = getKeys(keypair);
console.log('public key', kp.publicKey);
console.log('secret key', kp.secretKey);

main(kp.secretKey);
