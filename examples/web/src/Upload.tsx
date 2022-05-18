import React, { useState } from "react";
import { ShdwDrive } from "@shadow-drive/sdk";
import { AnchorWallet, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import FormData from "form-data";

export default function Upload() {
    const [file, setFile] = useState<File>(undefined)
    const [uploadUrl, setUploadUrl] = useState<String>(undefined)
    const [txnSig, setTxnSig] = useState<String>(undefined)
    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    return (
        <div>
            <form onSubmit={async event => {
                event.preventDefault()
                const drive = await new ShdwDrive(connection, wallet as AnchorWallet).init();
                const accounts = await drive.getStorageAccounts();
                const acc = accounts[0].publicKey;
                const getStorageAccount = await drive.getStorageAccount(acc);

                const upload = await drive.uploadFile(acc, file);
                console.log(upload);
                setUploadUrl(upload.finalized_location)
                setTxnSig(upload.transaction_signature)
            }}>
                <h1>Shadow Drive File Upload</h1>
                <input type="file" onChange={e => setFile(e.target.files[0])} />
                <br />
                <button type="submit">Upload</button>
            </form>
            <span>You may have to wait 60-120s for the URL to appear</span>
            <div>
                {(uploadUrl) ? (
                    <div>
                        <h3>Success!</h3>
                        <h4>URL: {uploadUrl}</h4>
                        <h4>Sig: {txnSig}</h4>
                    </div>
                ) : (<div></div>)
                }
            </div>
        </div>
    )
}


