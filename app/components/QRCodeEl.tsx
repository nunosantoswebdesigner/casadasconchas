'use client';

import { useState } from 'react'
import { useQRCode } from 'next-qrcode';

const QRCodeEl = () => {
  const [url, setUrl] = useState('lhlqufeiurbf')
	const [qr, setQr] = useState('')

	const GenerateQRCode = (url: any) => {
	  console.log('GenerateQRCode')

      console.log(url)
      setQr(url)
	}
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <h1>QR Generator</h1>
      <input 
				type="text"
				placeholder="e.g. https://google.com"
				value={url}
				onChange={e => setUrl(e.target.value)} />
			<button onClick={GenerateQRCode}>Generate</button>
			{qr && <>
				<img src={qr} />
				<a href={qr} download="qrcode.png">Download</a>
			</>}
   
    </div>
  );
};

export default QRCodeEl;
