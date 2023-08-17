import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { MdCancel } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

export const ModalSuccess = ({ onClose, isOpen }: Props) => {
  const onClosed = () => {
    onClose();
  };

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative rounded-3xl z-10"
        initialFocus={cancelButtonRef}
        onClose={() => onClosed()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform md:overflow-hidden rounded-[50px] text-left shadow-xl transition-all">
                <div className="absolute right-0 pt-4 pr-4 md:pr-8 sm:block z-10">
                  <button
                    type="button"
                    className="rounded-md  text-gray-400 hover:text-gray-500"
                    onClick={() => onClosed()}
                  >
                    <span className="sr-only">Close</span>
                    <MdCancel className="text-black w-6 h-6" />
                  </button>
                </div>
                <div className="flex flex-col rounded-[50px] overflow-hidden min-w-[250px]  bg-white p-4 md:min-w-[400px] ">
                  <main>
                    <div className="flex flex-col justify-center items-center my-5 md:my-10 font-nunito">
                      <AiFillCheckCircle size={100} color="#42e695" />
                      <p className="text-xl md:text-2xl font-semibold text-center text-black my-2">
                        Success !
                      </p>
                      <button
                        className="bg-orange-600  text-white shadows font-bold py-2 px-4 md:px-10 rounded-full uppercase  my-4 md:my-6"
                        type="button"
                        onClick={() => onClosed()}
                      >
                        Continue
                      </button>
                    </div>
                  </main>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
