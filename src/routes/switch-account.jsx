import { identity } from "deso-protocol";
import { useContext } from "react";
import { UserContext } from "../contexts";
import { getDisplayName } from "../helpers";
// import { Web3Auth } from "@web3auth/modal";
// import { Web3AuthNoModal } from "@web3auth/no-modal";/
//Initialize within your constructor

export const SwitchAccount = () => {
  // const web3auth = new Web3AuthNoModal({
  //   clientId: "", // Get your Client ID from Web3Auth Dashboard
  //   chainConfig: {
  //     chainNamespace: CHAIN_NAMESPACES.EIP155,
  //     chainId: "0x1",
  //     rpcTarget: "https://rpc.ankr.com/eth", // This is the mainnet RPC we have added, please pass on your own endpoint while creating an app
  //   },
  //   web3AuthNetwork: "mainnet", // mainnet, aqua, celeste, cyan or testnet
  // });

  const { currentUser, alternateUsers, isLoading } = useContext(UserContext);

  if (!currentUser) {
    return (
      <>
        <p>You need to login in with more than one user to start switching</p>
        <h1>Login to get started</h1>
        <button onClick={() => identity.login()}>Login</button>
      </>
    );
  }

  if (currentUser && !alternateUsers?.length) {
    return (
      <>
        <p>
          You are logged in as{" "}
          {currentUser.ProfileEntryResponse?.Username ??
            currentUser.PublicKeyBase58Check}
        </p>
        <h1>Add another account to start switching</h1>
        <button onClick={() => identity.login()}>Add an account</button>
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <p>
          You are currently logged in as{" "}
          {currentUser.ProfileEntryResponse?.Username ??
            currentUser.PublicKeyBase58Check}
        </p>
      )}
      <button onClick={() => identity.login()}>Add another account</button>
      <h1>Switch to another account</h1>
      <ul className="switch-account__list list--unstyled">
        {alternateUsers?.map((user) => (
          <li key={user.PublicKeyBase58Check}>
            <button
              className="switch-account__button"
              onClick={() => identity.setActiveUser(user.PublicKeyBase58Check)}
            >
              {getDisplayName(user)}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
