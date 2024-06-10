import Web3 from "web3";

interface Ethereum {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

interface Window {
  ethereum?: Ethereum;
}

const win = window as Window;
win.ethereum?.request({ method: "eth_requestAccounts" });
const web3 = new Web3(win.ethereum);

export default web3;
