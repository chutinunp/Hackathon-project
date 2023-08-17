import { useState } from "react";
import { usePayment } from "@/blockchain/abis/hooks/usePayment";
import { ModalSuccess } from "./ModalSuccess";

interface Props {
  casNumber: string;
}

export const SendForm = ({ casNumber }: Props) => {
  const [amount, setAmount] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [receiver, setReceiver] = useState("");
  const { handlePayment } = usePayment();
  const [openModal, setModalOpen] = useState<boolean>(false);

  const handleClose = () => {
    setModalOpen(false);
    setAmount("");
    setBankCode("");
    setBankNumber("");
    setBankName("");
    setReceiver("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const success = await handlePayment({
      amount,
      casNumber,
      banckAccountNumber: bankNumber,
      bankAccoutSortCode: bankCode,
      bankName: bankName,
      receiver,
    });

    if (success) {
      setModalOpen(true);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center  text-gray-800 font-bold text-2xl mb-5">
          You send exactly
        </h1>

        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <input
            className="pl-2 outline-none border-none"
            type="text"
            required
            placeholder="Receiver"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </div>

        <div className="flex items-center border-2 py-2 px-3 rounded-2xl  mb-4">
          <input
            className="pl-2 outline-none border-none"
            type="number"
            required
            placeholder="Amount in PKR"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {amount && (
          <div className="flex flex-col items-center mt-2 mb-4">
            <p className="font-thin ">Recipient gets in GBP</p>
            <p className="font-thin ">
              {((parseFloat(amount) * 2700) / 1000000).toFixed(5)}
            </p>
          </div>
        )}

        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <input
            className="pl-2 outline-none border-none"
            type="text"
            required
            placeholder="UK Bank Sort Code"
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
          />
        </div>

        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <input
            className="pl-2 outline-none border-none"
            type="text"
            required
            placeholder="UK Bank Account No."
            value={bankNumber}
            onChange={(e) => setBankNumber(e.target.value)}
          />
        </div>

        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <input
            className="pl-2 outline-none border-none"
            type="text"
            required
            placeholder="UK Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="block w-full bg-orange-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
        >
          Get Started
        </button>
      </form>
      <ModalSuccess onClose={handleClose} isOpen={openModal} />
    </div>
  );
};
