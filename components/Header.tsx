import Link from "next/link";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import AirbnbLogoIcon from "../public/static/svg/logo/logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/logo/logo_text.svg";
import HamburgerIcon from "../public/static/svg/header/hamburger.svg";
import palette from "../styles/palette";
// import SignUpModal from "./auth/SignUpModal";
import useModal from "../hook/useModal";
import { useSelector } from "../store";
import { authActions } from "../store/auth";
import AuthModal from "./auth/AuthModal";
import { logoutAPI } from "../lib/api/auth";
import { userActions } from "../store/user";

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

  /** react-ouside-click-handler div */
  .header-logo-wrapper + div {
    position: relative;
  }
  .header-usermenu {
    position: absolute;
    right: 0;
    top: 52px;
    width: 240px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: white;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
      background-color: ${palette.gray_dd};
    }
  }
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
  const dispatch = useDispatch();
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);

  const logout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser());
      setIsUsermenuOpened(false);
    } catch (e) {
      console.log(e);
    }
  };

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
          <HeadSingUpButton
            type="button"
            onClick={() => {
              dispatch(authActions.setAuthMode("signup"));
              openModal();
            }}
          >
            会員登録
          </HeadSingUpButton>
          <HeaderLoginButton
            type="button"
            onClick={() => {
              dispatch(authActions.setAuthMode("login"));
              openModal();
            }}
          >
            ログイン
          </HeaderLoginButton>
        </div>
      )}
      {user.isLogged && (
        <OutsideClickHandler
          onOutsideClick={() => {
            if (isUsermenuOpened) {
              setIsUsermenuOpened(false);
            }
          }}
        >
          <HeaderUserProfile type="button" onClick={() => setIsUsermenuOpened(!isUsermenuOpened)}>
            <HamburgerIcon />
            <img
              src={user.profileImage}
              alt=""
            />
          </HeaderUserProfile>
          {isUsermenuOpened && (
            <ul className="header-usermenu">
              <li>宿泊管理</li>
              <Link href="/room/register/building">
                <a
                  role="presentation"
                  onClick={() => {
                    setIsUsermenuOpened(false);
                  }}
                >
                  <li>宿泊をホストする</li>
                </a>
              </Link>
              <div className="header-usermenu-divider" />
              <li role="presentation" onClick={logout}>
                ログアウト
              </li>
            </ul>
          )}
        </OutsideClickHandler>
      )}
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Conatainer>
  );
};

export default Header;
