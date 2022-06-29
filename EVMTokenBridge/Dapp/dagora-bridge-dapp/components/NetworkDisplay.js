// import { Button } from "antd";
// import React from "react";
// import { useThemeSwitcher } from "react-css-theme-switcher";

// import Address from "./Address";
// import Balance from "./Balance";
// import Wallet from "./Wallet";

// export default function Account({
//   address,
//   userSigner,
//   localProvider,
//   mainnetProvider,
//   price,
//   minimized,
//   web3Modal,
//   loadWeb3Modal,
//   logoutOfWeb3Modal,
//   blockExplorer,
//   isContract,
// }) {
//   const { currentTheme } = useThemeSwitcher();

//   let accountButtonInfo;
//   if (web3Modal?.cachedProvider) {
//     accountButtonInfo = { name: 'Logout', action: logoutOfWeb3Modal };
//   } else {
//     accountButtonInfo = { name: 'Connect', action: loadWeb3Modal };
//   }

//   const display = !minimized && (
//     <span>
//       {!isContract && (
//         <Wallet
//           address={address}
//           provider={localProvider}
//           signer={userSigner}
//           ensProvider={mainnetProvider}
//           price={price}
//           color={currentTheme === "light" ? "#1890ff" : "#2caad9"}
//           size={22}
//           padding={"0px"}
//         />
//       )}
//     </span>
//   );

//   return (
//     <div style={{ display: "flex" }}>
//       {display}
//       {web3Modal && (
//         <Button
//           style={{ marginLeft: 8 }}
//           shape="round"
//           onClick={accountButtonInfo.action}
//         >
//           {accountButtonInfo.name}
//         </Button>
//       )}
//     </div>
//   );
// }