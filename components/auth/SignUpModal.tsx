import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import PersonIcon from "../../public/static/svg/auth/person.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import Input from "../common/Input";
import palette from "../../styles/palette";
import Selector from "../common/Selector";
import { daysList, monthsList, yearsList } from "../../lib/staticData";
import Button from "../common/Button";
import { signupAPI } from "../../lib/api/auth";
import { userActions } from "../../store/user";

const Container = styled.div`
  width: 568px;
  height: 614px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }

  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      width: 33%;
    }
  }

  .sing-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
  svg {
    cursor: pointer;
  }
`;

const SignUpModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [validateMode, setValidateMode] = useState(true);

  const dispatch = useDispatch();

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value);
  };

  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value);
  };

  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  };

  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidateMode(true);

    if (!email || !lastname || !firstname || !password || !birthMonth || !birthYear) {
      return undefined;
    }

    try {
      const signUpBody = {
        email,
        lastname,
        firstname,
        password,
        birthDay: new Date(
          `${birthYear}-${birthMonth!.replace("月", "")}-${birthDay}`
        ),
      };
      const { data } = await signupAPI(signUpBody);
      dispatch(userActions.setLoggedUser(data));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <form onSubmit={onSubmitSignUp}>
        <CloseXIcon className="modal-close-x-icon" />
        <InputWrapper>
          <Input
            placeholder="email"
            type="email"
            icon={<MailIcon />}
            name="email"
            value={email}
            onChange={onChangeEmail}
            validateMode={validateMode}
            useValidation
            isValid={!!email}
            errorMessage="emailを入力してください"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder="名(例:太郎)"
            icon={<PersonIcon />}
            value={lastname}
            onChange={onChangeLastname}
            validateMode={validateMode}
            useValidation
            isValid={!!lastname}
            errorMessage="名を入力してください"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder="姓(例:山田)"
            icon={<PersonIcon />}
            value={firstname}
            onChange={onChangeFirstname}
            validateMode={validateMode}
            useValidation
            isValid={!!firstname}
            errorMessage="姓を入力してください"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder="パスワード"
            type={hidePassword ? "password" : "text"}
            icon={
              hidePassword ? (
                <ClosedEyeIcon onClick={toggleHidePassword} />
              ) : (
                <OpenedEyeIcon onClick={toggleHidePassword} />
              )
            }
            value={password}
            onChange={onChangePassword}
            validateMode={validateMode}
            useValidation
            isValid={!!password}
            errorMessage="パスワードを入力してください"
          />
        </InputWrapper>
        <p className="sign-up-birthday-label">誕生日</p>
        <p className="sign-up-modal-birthday-info">
          ご登録は18歳以上の方に限ります。 誕生日がほかのAirbnbユーザーに見られることはありません。
        </p>
        <div className="sign-up-modal-birthday-selectors">
          <div className="sign-up-modal-birthday-month-selector">
            <Selector
              options={monthsList}
              disabledOptions={["月"]}
              defaultValue="月"
              onChange={onChangeBirthMonth}
              value={birthMonth}
            />
          </div>
          <div className="sign-up-modal-birthday-day-selector">
            <Selector
              options={daysList}
              disabledOptions={["日"]}
              defaultValue="日"
              onChange={onChangeBirthDay}
              value={birthDay}
            />
          </div>
          <div className="sign-up-modal-birthday-year-selector">
            <Selector
              options={yearsList}
              disabledOptions={["年"]}
              defaultValue="年"
              onChange={onChangeBirthYear}
              value={birthYear}
            />
          </div>
        </div>
        <div className="sing-up-modal-submit-button-wrapper">
          <Button type="submit">登録する</Button>
        </div>
      </form>
    </Container>
  );
};

export default SignUpModal;
