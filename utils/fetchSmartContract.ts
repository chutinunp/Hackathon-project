import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";

export const fetchSmartContract =
  (library: JsonRpcProvider, abi: any) =>
  async (...args: any) => {
    if (!library) return;

    const [arg1, arg2, ...params] = args;
    const address = arg1;
    const method = arg2;
    const contract = new ethers.Contract(address, abi, library);
    return contract[method](...params);
  };
