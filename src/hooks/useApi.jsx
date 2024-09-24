import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import { CHANGEPSD, GETTIME, LOGIN, REGISTER } from "../constant/api";

import { useAtom } from "jotai";
import { idAtom, timeAtom, tokenWithPersistenceAtom } from "../atoms/index";

const UseApi = () => {
  // operation characteristics
  const [, setTime] = useAtom(timeAtom);
  const [, setToken] = useAtom(tokenWithPersistenceAtom);
  const [, setId] = useAtom(idAtom);

  const [op, setOp] = useState({
    appErr: null,
    serverErr: null,
  });

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // configuration
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Post Op Configuration
  const postConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //register
  const submitRegister = async (formData) => {
    try {
      const { data } = await axios.post(REGISTER, formData, config);

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setId(data.id);

      navigate("/login");
      // formData.role ? navigate("/admin/manage") : navigate("/login");
    } catch (error) {
      setOp({
        appErr: error?.response?.data?.message,
        serverErr: error?.message,
      });
    }
  };

  const submitLogin = async (formData) => {
    try {
      const { data } = await axios.post(LOGIN, formData, config);

      localStorage.setItem("token", data.token);
      setToken(data.token);

      switch (data.name) {
        case "Manager":
          navigate("/admin/manage");
          break;

        case "Admin":
          navigate("/homepage");
          break;

        default:
          navigate("/homepage");
          break;
      }

      // GetTime();
      setId("");
    } catch (error) {
      setOp({
        appErr: error?.response?.data?.message,
        serverErr: error?.message,
      });
    }
  };

  const GetTime = async () => {
    try {
      const { data } = await axios.get(GETTIME, postConfig);
      setTime(data);
    } catch (error) {}
  };

  const submitChangePsd = async () => {
    try {
      const { data } = await axios.post(CHANGEPSD, postConfig);
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (error) {
      setOp({
        appErr: error?.response?.data?.message,
        serverErr: error?.message,
      });
    }
  };

  return { submitRegister, submitLogin, setOp, op, GetTime };
};

export default UseApi;
