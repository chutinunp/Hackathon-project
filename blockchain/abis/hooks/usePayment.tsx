import { ethers } from "ethers";
import { toast } from "react-toastify";
import hackAbi from "../hack-abi.json";

interface Dto {
  casNumber: string;
  amount: string;
  receiver: string;
  bankAccoutSortCode: string;
  banckAccountNumber: string;
  bankName: string;
}

export function usePayment() {
  const handlePayment = async ({
    casNumber,
    amount,
    receiver,
    banckAccountNumber,
    bankAccoutSortCode,
    bankName,
  }: Dto) => {
    const contractAddress = "0x2Ac64cA6b0d71545b7b6163B6Db92266e8bA9a0E";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, hackAbi, signer);
    try {
      const etherAmountToSend = ethers.utils.parseEther(amount); // Change the amount as needed
      const transaction = await contract.processPayment(
        casNumber,
        receiver,
        bankAccoutSortCode,
        banckAccountNumber,
        bankName,
        {
          value: etherAmountToSend,
        }
      );
      toast.loading("Waiting for the payment to be processed");
      await transaction.wait();
      await toast.dismiss();
      return true;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      return false;
    }
  };

  return {
    handlePayment,
  };
}
