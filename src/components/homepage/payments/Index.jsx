import { useState } from "react";
import { useTranslation } from "react-i18next";

import Account from "./Account";
import NavBar from "./NavBar";
import WithDraw from "./WithDraw";
import History from "./History";

const PaymentRequest = () => {
  const { t } = useTranslation();
  const [navItem, setNavItem] = useState("account");

  return (
    <div className="mx-8 my-4">
      <NavBar setNavItem={setNavItem} navItem={navItem} />
      <div className="bg-gray-100 px-5 py-5">
        {navItem === "account" ? (
          <Account />
        ) : navItem === "withdrawing" ? (
          <WithDraw />
        ) : navItem === "history" ? (
          <History />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PaymentRequest;
