import React, { useState } from "react";
import ShdwDrive from "@shadow-drive/sdk";
import { AnchorWallet, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import FormData from "form-data";

export default function Upload() {
    const [file, setFile] = useState()
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

                const fd = new FormData();
                console.log("appending")
                fd.append("file", file, {
                    contentType: file.type,
                    filename: file.name,
                });

                const upload = await drive.uploadFile(acc, fd);
                console.log(upload);
            }

            }>
                <h1>React File Upload</h1>
                <input type="file" onChange={e => setFile(e.target.files[0])} />
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}


