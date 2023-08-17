/* eslint-disable react/no-unescaped-entities */
import useSWR from "swr";
import { useAccount } from "wagmi";
import hackAbi from "@/blockchain/abis/hack-abi.json";
import { ethers } from "ethers";
import { fetchSmartContract } from "@/utils/fetchSmartContract";
import { useVerify } from "@/blockchain/abis/hooks/useVerify";
import ConnectButtonCustom from "@/components/ConnectButton";
import { SendForm } from "@/components/SendForm";
import { useEffect, useState } from "react";
interface Person {
  fullname: string;
  casnumber: string;
  email: string;
  password: string;
}

const Index = () => {
  const { address } = useAccount();
  const [casnumber, setCasnumber] = useState("");

  const { handleVerify } = useVerify();
  const provider = new ethers.providers.JsonRpcProvider(
    "https://optimism-goerli.infura.io/v3/e6d63b6ddfca4470b8352130a5ee11e4"
  );

  const { data: student } = useSWR(
    ["0x2Ac64cA6b0d71545b7b6163B6Db92266e8bA9a0E", "students", casnumber],
    {
      fetcher: fetchSmartContract(provider, hackAbi),
    }
  );

  useEffect(() => {
    const retrievedPersonJSON = localStorage.getItem("user") as string;
    const retrievedPerson: Person = JSON.parse(retrievedPersonJSON);
    setCasnumber(retrievedPerson.casnumber);
  }, []);

  return (
    <div className="flex justify-center mt-5 md:mt-10 mb-10  px-10 md:px-40">
      <div className="h-fit rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl">
        <div className="rounded-[10px] bg-white p-4  sm:p-6">
          <h3 className="text-center text-lg md:text-4xl font-thin text-gray-900">
            Simplify international student fees transfer like never before!
          </h3>
          <h4 className="text-center text-base md:text-2xl font-thin text-gray-900 mt-5">
            "Send From Pakistan to United Kingdom"
          </h4>
          <p className="text-center text-sm md:text-lg font-thin text-gray-900 mt-5">
            Introducing a revolutionary payment system using ETH, enabling
            secure and transparent cross-border transactions, circumventing the
            traditional hundi and hawala systems, and ensuring faster, cheaper,
            and more efficient financial transfers.
          </p>
          <div className="flex justify-center mt-10">
            {!student ? (
              <p>Loading...</p>
            ) : (
              <>
                {!address && <ConnectButtonCustom />}
                {address && !student.verified && (
                  <div>
                    <p className="m-auto text-lg font-bold">
                      Please verify student
                    </p>
                    <button
                      type="button"
                      onClick={() => handleVerify({ casNumber: casnumber })}
                      className="block w-full bg-orange-500 hover:bg-orange-400 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                    >
                      Verify
                    </button>
                  </div>
                )}
                {address && student.verified && (
                  <SendForm casNumber={casnumber} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

Index.requireAuth = true;
