import React, { useEffect, useState } from "react";
import { ShdwDrive, StorageAccountResponse } from "@shadow-drive/sdk";
import { AnchorWallet, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

export default function Drive() {
	const [account, setAccount] = useState<StorageAccountResponse>()
	const { connection } = useConnection();
	const wallet = useAnchorWallet();
	useEffect(() => {
		(async () => {
			if (wallet?.publicKey) {
				const drive = await new ShdwDrive(connection, wallet as AnchorWallet).init();
				const accounts = await drive.getStorageAccounts();

				if (!accounts) {
					const storage = await drive.createStorageAccount('my-test-storage', '1MB');
					const accounts = await drive.getStorageAccounts();
				}
				else {
					setAccount(accounts[0])
					console.log(accounts[0])
					console.log("Account Pub Key: " + accounts[0].publicKey.toBase58())
					console.log("Account Owner: " + accounts[0].account.owner1)
					console.log("Storage Name: " + accounts[0].account.identifier);
					console.log("Total storage: " + accounts[0].account.storage / 1000000 + " MB");
					console.log("Remaining storage: " + accounts[0].account.storageAvailable / 1000000 + " MB");
				}
			}
		})();
	}, [wallet?.publicKey])
	return (
		<div>
			{(account) ? (
				<div>
					<span>Shdw Account Pub Key: {account.publicKey.toBase58()}</span><br />

					<span>Account Owner: {account.account.owner1.toBase58()}</span><br />

					<span>Storage Name: {account.account.identifier}</span><br />

					<span>Total storage: {account.account.storage / 1000000} MB</span><br />

					<span>Remaining storage: {account.account.storageAvailable / 1000000} MB</span>

				</div>
			) : (<div></div>)}
		</div>
	)
}