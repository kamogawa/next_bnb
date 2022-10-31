import React from "react";
import styled from "styled-components";
import SignUpModal from "./SignUpModal";
import { useSelector, RootState } from "../../store";
import LoginModal from "./LoginModal";

interface IProps {
  closeModal: () => void;
}

const ModalGroup = styled.div`
  z-index: 11;
`;

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
  const authMode = useSelector((state: RootState) => state.auth.authMode);

  return (
    <ModalGroup>
      {authMode === "signup" && <SignUpModal closeModal={closeModal} />}
      {authMode === "login" && <LoginModal closeModal={closeModal} />}
    </ModalGroup>
  );
};

export default AuthModal;
