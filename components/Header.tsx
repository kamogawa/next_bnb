import Link from "next/link";
import React from "react";
import styled from "styled-components";
import AirbnbLogoIcon from "../public/static/svg/logo/logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/logo/logo_text.svg";
import HamburgerIcon from "../public/static/svg/header/hamburger.svg";
import palette from "../styles/palette";
import SignUpModal from "./auth/SignUpModal";
import useModal from "../hook/useModal";
import { useSelector } from "../store";

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

const HeaderUserProfile = styled.button`
      display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }
    img {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
`;

const Header: React.FC = () => {
  // modal
  // const [showModal, setShowModal] = useState(false);
  const { openModal, ModalPortal, closeModal } = useModal();
  const user = useSelector((state) => state.user);

  return (
    <Conatainer>
      <Link href="/">
        <HeaderLogoWrapper>
          <AirbnbLogoIcon className="header-log" />
          <AirbnbLogoTextIcon />
        </HeaderLogoWrapper>
      </Link>
      {!user.isLogged && (
        <div>
          <HeadSingUpButton type="button" onClick={openModal}>
            会員登録
          </HeadSingUpButton>
          <HeaderLoginButton type="button">
            Login
          </HeaderLoginButton>
        </div>
      )}
      {user.isLogged && (
        <HeaderUserProfile type="button">
          <HamburgerIcon />
          <img
            src={user.profileImage}
            alt=""
          />
        </HeaderUserProfile>
      )}
      <ModalPortal>
        <SignUpModal closeModal={closeModal} />
      </ModalPortal>
    </Conatainer>
  );
};

export default Header;
