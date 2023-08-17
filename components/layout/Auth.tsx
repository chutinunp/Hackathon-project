import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactElement;
};

export const Auth = ({ children }: Props): JSX.Element => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const retrievedPersonJSON = localStorage.getItem("user");
    if (!retrievedPersonJSON) {
      router.push("/signin");
      return;
    }
    setAuthorized(true);
  }, []);

  return authorized ? <div>{children}</div> : <></>;
};
