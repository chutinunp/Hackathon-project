import { ethers } from "ethers";
import { toast } from "react-toastify";
import hackAbi from "../hack-abi.json";

interface Dto {
  casNumber: string;
  fullName: string;
  email: string;
}

export function useSignIn() {
  const handleRegister = async ({ casNumber, fullName, email }: Dto) => {
    const contractAddress = "0x2Ac64cA6b0d71545b7b6163B6Db92266e8bA9a0E";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, hackAbi, signer);
    try {
      const transaction = await contract.registerStudent(
        casNumber,
        fullName,
        email
      );
      toast.loading("Waiting to register on the blockchain.");
      await transaction.wait();
      await toast.dismiss();
      toast.success("You have successfully signed up for our service!");
      return true;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      return false;
    }
  };

  return {
    handleRegister,
  };
}
