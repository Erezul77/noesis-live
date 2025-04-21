'use client';
import { useState } from 'react';

export default function Reflect() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    setStatus('⏳ Uploading to IPFS...');
    const res = await fetch('/api/pin', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('✅ Reflection pinned! CID: ' + data.cid);
      await submitReflection(data.cid);
    } else {
      setStatus('❌ Submission failed.');
      console.error(data);
    }
  };

  const submitReflection = async (cid: string) => {
    if (!(window as any).ethereum) {
      alert('MetaMask not detected');
      return;
    }

    const provider = new (window as any).ethers.providers.Web3Provider((window as any).ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contract = new (window as any).ethers.Contract(
      '0x437c332495a8ef52e00ca721f9cF26Dc81B0aC3D',
      (await import('@/lib/ReflectionVaultABI.json')).default,
      signer
    );

    const tx = await contract.submitReflection(cid);
    await tx.wait();
    setStatus('✅ Reflection submitted to chain!');
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl mb-6">🧠 Submit Reflection</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded mb-4"
        rows={5}
        placeholder="Write your reflection..."
      />
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Submit
      </button>
      <p className="mt-4">{status}</p>
    </div>
  );
}