import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAtom } from "jotai";

import { tokenWithPersistenceAtom } from "../../../../atoms";

import Account from "../../account/Index";

const AccountMenu = ({ show, setShow, affId }) => {
  const [token, setToken] = useAtom(tokenWithPersistenceAtom);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    setPayload(jwtDecode(token));
  }, [token]);

  return (
    <div className="relative text-[15px]">
      <button
        onClick={() => setShow(!show)}
        className="border-[1px] border-emerald-600 bg-white font-semibold rounded-md px-5 py-1 drop-shadow-md shadow-emerald-600"
      >
        {payload?.fullName}&nbsp;&nbsp;&nbsp;
        <i className="fa fa-chevron-down text-[10px]" />
      </button>
      {show && <Account setShow={setShow} />}
    </div>
  );
};

export default AccountMenu;
