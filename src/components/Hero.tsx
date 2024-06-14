import { useState, useEffect } from "react";
import {
	CircularProgress,
	Dialog,
	DialogTitle,
	Divider,
	alpha,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Typography from "@mui/material/Typography";
import lottery from "../web3/lottery";
import web3 from "../web3/web3";

export default function Hero() {
	const [lotteryValues, setLotteryValues] = useState<any>({
		manager: "",
		players: [],
		balance: "",
	});
	const [amountEther, setAmountEther] = useState("");
	const [loadingMsg, setLoadingMsg] = useState("");
	const [open, setOpen] = useState(false);
	const [feedbackImg, setFeedbackImg] = useState("loading");

	async function getManager() {
		try {
			const manager = await lottery.methods.manager().call();
			const players = await lottery.methods.getPlayers().call();
			const balance = await web3.eth.getBalance(lottery.options.address!);
			setLotteryValues({ manager, players, balance });
			setLoadingMsg(
				"You shoud have ethereum on sepholia network to test this application"
			);
			setFeedbackImg("alert");
			setOpen(true);
		} catch (error) {
			setLoadingMsg(
				"You shoud have the metamask pluggin installed to test this application"
			);
			setFeedbackImg("loading");
			setOpen(true);
		}
	}

	useEffect(() => {
		getManager();
	}, []);

	const handleTransaction = async (transactionMethod: () => Promise<any>) => {
		try {
			setLoadingMsg("Waiting on transaction success...");
			setFeedbackImg("loading");
			setOpen(true);

			await transactionMethod();

			setLoadingMsg("Transaction success!");
			setFeedbackImg("success");
		} catch (error) {
			setOpen(false);
		}
	};

	const onSubmit = async () => {
		const accounts = await web3.eth.getAccounts();
		await handleTransaction(() =>
			lottery.methods.enter().send({
				from: accounts[0],
				value: web3.utils.toWei(amountEther, "ether"),
			})
		);
	};

	const onClick = async () => {
		const accounts = await web3.eth.getAccounts();
		await handleTransaction(() =>
			lottery.methods.pickWinner().send({
				from: accounts[0],
			})
		);
	};

	return (
		<Box
			id="hero"
			sx={(theme) => ({
				width: "100%",
				backgroundImage:
					theme.palette.mode === "light"
						? "linear-gradient(180deg, #CEE5FD, #FFF)"
						: `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
				backgroundSize: "100% 20%",
				backgroundRepeat: "no-repeat",
			})}>
			<Container
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					pt: { xs: 14, sm: 20 },
					pb: { xs: 8, sm: 12 },
				}}>
				<Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
					<Typography
						variant="h1"
						sx={{
							display: "flex",
							flexDirection: { xs: "column", md: "row" },
							alignSelf: "center",
							textAlign: "center",
							fontSize: "clamp(3.5rem, 10vw, 4rem)",
						}}>
						Lotery in&nbsp;
						<Typography
							component="span"
							variant="h1"
							sx={{
								fontSize: "clamp(3rem, 10vw, 4rem)",
								color: (theme) =>
									theme.palette.mode === "light"
										? "primary.main"
										: "primary.light",
							}}>
							Web3
						</Typography>
					</Typography>
					<Typography
						textAlign="center"
						color="text.secondary"
						sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}>
						This is a decentralized app that simulates a betting platform using
						solidity, node, react, typescript and web3.js. Explore the universe
						of emerging technologies like Web3.
					</Typography>
				</Stack>
				<Box
					id="image"
					sx={(theme) => ({
						mt: { xs: 8, sm: 10 },
						alignSelf: "center",
						height: { xs: 200, sm: 700 },
						padding: "40px",
						width: "100%",
						borderRadius: "10px",
						outline: "1px solid",
						outlineColor:
							theme.palette.mode === "light"
								? alpha("#BFCCD9", 0.5)
								: alpha("#9CCCFC", 0.1),
						boxShadow:
							theme.palette.mode === "light"
								? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
								: `0 0 24px 12px ${alpha("#033363", 0.2)}`,
					})}>
					<Typography
						variant="h6"
						color="text.primary"
						sx={{ width: { sm: "100%", md: "80%" } }}>
						Lottery Contract
					</Typography>
					<Typography
						color="text.secondary"
						sx={{ width: { sm: "100%", md: "80%" } }}>
						This contract is managed by {lotteryValues.manager} {"\n"}. There
						are currently {lotteryValues.players?.length} people entered,
						competing to win{" "}
						{lotteryValues.balance
							? web3.utils.fromWei(lotteryValues.balance, "ether")
							: 0}{" "}
						ether!
					</Typography>
					<Divider sx={() => ({ paddingY: 2 })} />
					<Box paddingY={5}>
						<Typography
							variant="h5"
							color="text.primary"
							sx={{ width: { sm: "100%", md: "80%" } }}>
							Want to try your luck?
						</Typography>
						<Stack
							direction={{ xs: "column", sm: "row" }}
							alignSelf="center"
							spacing={1}
							useFlexGap
							sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}>
							<TextField
								id="outlined-basic"
								hiddenLabel
								size="small"
								type="number"
								value={amountEther}
								onChange={(e) => setAmountEther(e.target.value)}
								variant="outlined"
								aria-label="amount-eter"
								placeholder="Amount of ether to enter"
								inputProps={{
									autoComplete: "off",
									"aria-label": "amount-eter",
								}}
							/>
							<Button onClick={onSubmit} variant="contained" color="primary">
								Enter
							</Button>
						</Stack>
					</Box>
					<Box>
						<Typography
							variant="h5"
							color="text.primary"
							sx={{ width: { sm: "100%", md: "80%" } }}>
							Ready to pick a winner?
						</Typography>
						<Button onClick={onClick} variant="contained" color="primary">
							Pick a winner!
						</Button>
					</Box>
				</Box>
			</Container>
			<Dialog onClose={() => setOpen(false)} open={open}>
				<DialogTitle marginTop={2}>{loadingMsg}</DialogTitle>
				<Box
					component="form"
					sx={{
						display: "flex",
						flexDirection: "column",
						m: "auto",
						p: 10,
					}}>
					{feedbackImg === "loading" ? (
						<Box sx={{ display: "flex", alignSelf: "center" }}>
							{" "}
							<CircularProgress color="primary" />{" "}
						</Box>
					) : feedbackImg === "alert" ? (
						<PriorityHighIcon color="info" fontSize="large" />
					) : (
						<CheckCircleIcon color="success" fontSize="large" />
					)}
				</Box>
			</Dialog>
		</Box>
	);
}
