import { ethers } from "ethers";
import { toast } from "react-toastify";
import hackAbi from "../hack-abi.json";

interface Dto {
  casNumber: string;
}

export function useVerify() {
  const handleVerify = async ({ casNumber }: Dto) => {
    const contractAddress = "0x2Ac64cA6b0d71545b7b6163B6Db92266e8bA9a0E";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, hackAbi, signer);
    try {
      const transaction = await contract.verifyStudent(casNumber);
      toast.loading("Waiting to verify the student.");
      await transaction.wait();
      await toast.dismiss();
      toast.success("You have successfully verified.");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      return;
    }
  };

  const getVerify = async ({ casNumber }: Dto) => {
    const contractAddress = "0x2Ac64cA6b0d71545b7b6163B6Db92266e8bA9a0E";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, hackAbi, signer);
    try {
      const transaction = await contract.students(casNumber);
      toast.loading("Waiting to verify the student.");
      await transaction.wait();
      await toast.dismiss();
      toast.success("You have successfully verified.");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      return;
    }
  };

  return {
    handleVerify,
  };
}
