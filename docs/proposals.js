const contractAddress = "0x7260A119ae7Aa0B25F87CD0B347e345d571a6C7E";
const contractABI = [
  "function propose(string memory _text) public",
  "function getProposalCount() public view returns (uint)",
  "function getProposal(uint index) public view returns (string memory)"
];

const pinataJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjYjQ2NGIyMy03MzdlLTRkMmItOTI2Ny1jZDJhOWVlOTFlNzgiLCJlbWFpbCI6ImVyZXpzbnpAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImYwM2JjNjg1OTQ3ZWNlMGZhYTFlIiwic2NvcGVkS2V5U2VjcmV0IjoiNjJmNmI5NTNlMmU3MzdhZGYxMzQwNWI1ZTExYTFmNTQ3MTg1NDcyNzM0ZTdiNjQ0NWUyNWRjZTc2NjBmZjE1NiIsImV4cCI6MTc3NTg5NTE2N30.bkm7ieDqikbXItIa79gQ3kL-Htg6SxU3s4-7BawwbME"; // 🔐 replace with your actual JWT

async function loadProposals() {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    const count = await contract.getProposalCount();
    const container = document.getElementById("proposals");
    container.innerHTML = "";

    for (let i = count - 1; i >= 0; i--) {
      const text = await contract.getProposal(i);
      const card = document.createElement("div");
      card.className = "proposal-card";
      card.textContent = text;
      container.appendChild(card);
    }
  } catch (err) {
    console.error("Error loading proposals:", err);
    alert(`❌ Failed to load proposals: ${err.message}`);
  }
}

document.getElementById("submitButton").onclick = async function submitReflection() {
  const text = document.getElementById("reflectionText").value.trim();
  if (!text) return alert("Please write your reflection.");

  try {
    const ipfsRes = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pinataJWT}`
      },
      body: JSON.stringify({ content: text })
    });

    const data = await ipfsRes.json();
    console.log("📦 Pinata response:", data);

    if (!data.IpfsHash) throw new Error("Invalid Pinata response");

    const ipfsURI = `ipfs://${data.IpfsHash}`;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.propose(ipfsURI);
    await tx.wait();

    alert(`✅ Reflection submitted!\nIPFS CID: ${data.IpfsHash}`);
  } catch (err) {
    console.error("❌ Submission failed:", err);
    alert(`❌ Submission failed: ${err.message}`);
  }
};
