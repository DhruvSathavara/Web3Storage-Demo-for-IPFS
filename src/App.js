import React, { useState } from "react";
import { Web3Storage } from "web3.storage";

export default function App() {

  const [fileupload, setFileupload] = useState();

  async function Web3StorageEx(e) {
    let file = e.target.files[0];
    let API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRCZTZkRUQzRmFmMTNDNWE4RTg3ODliODYxNjZBNkZiQkRFRjlDNTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTY1ODk4MzM1NzcsIm5hbWUiOiJkaHJ1dldlYjNTdG9yYWdlIn0.6yD0SeKAZVw4GLu2T0EadB47KyIPTXk-LbS-SDCSbEE'
    const client = new Web3Storage({ token: API_TOKEN })

    const fileInput = document.querySelector('input[type="file"]')

    // Pack files into a CAR and send to web3.storage
    // Whenever we 'put' any data in web3storage it will return us content ID, so here we have content ID in const "rootCid";
    const rootCid = await client.put(fileInput.files)
    console.log(rootCid, "root content id...")

    // const URL =  `https://ipfs.infura.io/ipfs/${rootCid}`
    // console.log(URL);

    setFileupload(rootCid);

    // Get info on the Filecoin deals that the CID is stored in
    const info = await client.status(rootCid)

    // Fetch and verify files from web3.storage
    const res = await client.get(rootCid)
    const files = await res.files()
    for (const file of files) {
      console.log(`${file.cid},${file.name}`)
    }
  }
    return (
      <>
        <div className="App">
          <h1>Web3 storage</h1>
          <input type="file" onChange={Web3StorageEx}></input>
          {
            fileupload && (
             <p>Content ID: {fileupload}</p>
            )
          }
        </div>
      </>
    )
  
}