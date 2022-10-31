import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  border-radius: 10px;

  .mordal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .login-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }
  .login-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
  return (
    <Container>
      <CloseXIcon className="mordal-close-x-icon" onClick={closeModal} />
      <div className="login-input-wrapper">
        <Input
          placeholder="メールアドレス"
          name="email"
          type="email"
          icon={<MailIcon />}
        />
      </div>
      <div className="login-input-wrapper sign-up-password-input-wrapper">
        <Input
          placeholder="パスワード"
          type="password"
          icon={<ClosedEyeIcon />}
        />
      </div>
      <div className="login-modal-submit-button-wrapper">
        <Button type="submit">
          ログイン
        </Button>
      </div>
      <p>
        Airbnbアカウントがありますか？
        <span className="login-modal-set-signup">
          会員登録
        </span>
      </p>
    </Container>
  );
};

export default React.memo(LoginModal);
