import web3 from "./web3";
import { ContractAbi } from "web3";


const address = process.env.REACT_APP_CONTRACT_ADDRESS;

const abi = [
	{ inputs: [], stateMutability: "nonpayable", type: "constructor" },
	{
		inputs: [],
		name: "enter",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [],
		name: "getPlayers",
		outputs: [
			{ internalType: "address payable[]", name: "", type: "address[]" },
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "manager",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "pickWinner",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		name: "players",
		outputs: [{ internalType: "address payable", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
];

const contract = new web3.eth.Contract(abi as ContractAbi, address);


export default contract;