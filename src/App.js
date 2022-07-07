import React, { useState } from "react";
import { Web3Storage } from "web3.storage";

export default function App() {

  const [fileupload, setFileupload] = useState();

  async function Web3StorageEx(e) {
    // let file = e.target.files[0];
    let API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRCZTZkRUQzRmFmMTNDNWE4RTg3ODliODYxNjZBNkZiQkRFRjlDNTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTY1ODk4MzM1NzcsIm5hbWUiOiJkaHJ1dldlYjNTdG9yYWdlIn0.6yD0SeKAZVw4GLu2T0EadB47KyIPTXk-LbS-SDCSbEE'
    const client = new Web3Storage({ token: API_TOKEN })

    const fileInput = document.querySelector('input[type="file"]')

    // Pack files into a CAR and send to web3.storage
    // Whenever we 'put' any data in web3storage it will return us content ID, so here we have content ID in const "rootCid";
    const rootCid = await client.put(fileInput.files)
    console.log(rootCid, "root content id...")

    // setFileupload(rootCid);

    // Get info on the Filecoin deals that the CID is stored in
    const info = await client.status(rootCid)

    // const metadata  = JSON.stringify(client.put {
    //   name: 'dhruv',
    //   description: 'This is in IPSF storage via NFT storage !',
    //   Examine: 'By Dhruv',
    // })

    // Fetch and verify files from web3.storage
    const res = await client.get(rootCid)
    const files = await res.files()
    // console.log(files);

    let url = URL.createObjectURL(files[0])
    console.log(url)

    setFileupload(url)

    console.log(files.file.cid);
    for (const file of files) {
      console.log(`${file.cid},${file.name}`)
    }
  }
  return (
    <div className="App">
      <h1>Web3Storage - Example</h1>  
      <div>
        <input type="file" id="input" onChange={Web3StorageEx} />
        {
       fileupload && (
        <img src={ fileupload } width="200px" />
      )
    }
    </div>
  </div>
  )
  
}