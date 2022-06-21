import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import AirbnbLogoIcon from "../public/static/svg/logo/logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/logo/logo_text.svg";
import palette from "../styles/palette";
import SignUpModal from "./auth/SignUpModal";
import ModalPortal from "./MordalPortal";

const Conatainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
`;

const HeaderLogoWrapper = styled.a`
  display: flex;
  align-items: center;
  .header-log {
    margin-right: 6px;
  }
`;

const HeaderLoginButton = styled.button`
  height: 42px;
  padding: 0 16px;
  border: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
  border-radius: 21px;
  background-color: white;
  cursor: pointer;
  outline: none;
  &:hover {
     box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  }
`;

const HeadSingUpButton = styled.button`
  height: 42px;
  margin-right: 8px;
  padding: 0 16px;
  border: 0;
  border-radius: 21px;
  background-color: white;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: ${palette.gray_f7};
  }
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;

const ModalContents = styled.div`
  width: 400px;
  height: 400px;
  background-color: white;
  z-index: 11;
`;

const Header: React.FC = () => {
  // modal
  const [showModal, setShowModal] = useState(false);

  return (
    <Conatainer>
      <Link href="/">
        <HeaderLogoWrapper>
          <AirbnbLogoIcon className="header-log" />
          <AirbnbLogoTextIcon />
        </HeaderLogoWrapper>
      </Link>
      <div>
        <HeadSingUpButton type="button" onClick={() => setShowModal(true)}>
          会員登録
        </HeadSingUpButton>
        <HeaderLoginButton type="button">
          Login
        </HeaderLoginButton>
      </div>
      {showModal && (
        <ModalWrapper>
          <ModalBackground
            role="presentation"
            onClick={() => setShowModal(false)}
          />
          <ModalContents />
        </ModalWrapper>
      )}
      {showModal && (
        <ModalPortal closePortal={() => setShowModal(false)}>
          <SignUpModal />
        </ModalPortal>
      )}
    </Conatainer>
  );
};

export default Header;
