import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { largeBuildingTypeList } from "../../lib/staticData";
import { useSelector } from "../../store";
import { registerRoomActions } from "../../store/registerRoom";
import palette from "../../styles/palette";
import Selector from "../common/Selector";
import RadioGroup from "../common/RadioGroup";
import RegisterRoomFooter from "./RegisterRoomFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-building-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
  .register-room-room-type-radio {
    max-width: 485px;
    margin-bottom: 50px;
  }
  .register-room-is-setup-for-guest-radio {
    margin-bottom: 50px;
  }
`;

const roomTypeRadioOptions = [
  {
    label: "まるまる貸切",
    value: "entire",
    description:
      "ゲストは宿泊施設全体を他の人と共有することなく、単独で利用します。通常、ベッドルーム、バスルーム、キッチンが含まれます。",
  },
  {
    label: "個室",
    value: "private",
    description:
      "ゲストにプライベートベッドルームを提供します。ベッドルーム以外のスペースは共用です。",
  },
  {
    label: "シェアルーム",
    value: "public",
    description:
      "ゲストはプライベートスペースなしで、他の人と一緒に使用するベッドルームまたは共用エリアに滞在します。",
  },
];

const isSetUpForGuestOptions = [
  {
    label: "はい、ゲスト用に別に設けられた宿泊施設です。",
    value: true,
  },
  {
    label: "いいえ、私の個人的なものは宿泊施設にあります。",
    value: false,
  },
];

const disabledLargeBuildingTypeOptions = ["１つ選んでください。"];

const RegisterRoomBuilding: React.FC = () => {
  const largeBuildingType = useSelector(
    (state) => state.registerRoom.largeBuildingType
  );
  const buildingType = useSelector((state) => state.registerRoom.buildingType);
  const roomType = useSelector((state) => state.registerRoom.roomType);
  const isSetUpForGuest = useSelector((state) => state.registerRoom.isSetUpForGuest);

  const dispatch = useDispatch();

  const onChangeLargeBuildingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setLargeBuildingType(event.target.value));
  };
  const onChangeBuildingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setBuildingType(event.target.value));
  };
  const onChangeRoomType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value;
    dispatch(registerRoomActions.setRoomType(selected as "entire" | "private" | "public"));
  };
  const onChangeIsSetUpForGuest = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value === "true";
    dispatch(registerRoomActions.setIsSetUpForGuest(selected));
  };

  //* 건물유형 변경하기 Dispatch
  const setBuildingTypeDispatch = (selected: string) =>
    dispatch(registerRoomActions.setBuildingType(selected));

  //* 宿泊 options
  const detailBuildingOptions = useMemo(() => {
    switch (largeBuildingType) {
      case "マンション": {
        const { apartmentBuildingTypeList } = require("../../lib/staticData");
        setBuildingTypeDispatch(apartmentBuildingTypeList[0]);
        return apartmentBuildingTypeList;
      }
      case "住宅": {
        const { houseBuildingTypeList } = require("../../lib/staticData");
        setBuildingTypeDispatch(houseBuildingTypeList[0]);
        return houseBuildingTypeList;
      }
      case "別荘": {
        const {
          secondaryBuildingTypeList,
        } = require("../../lib/staticData");
        setBuildingTypeDispatch(secondaryBuildingTypeList[0]);

        return secondaryBuildingTypeList;
      }
      case "ユニークな宿泊": {
        const { uniqueBuildingTypeList } = require("../../lib/staticData");
        setBuildingTypeDispatch(uniqueBuildingTypeList[0]);

        return uniqueBuildingTypeList;
      }
      case "B&B": {
        const { bnbBuildingTypeList } = require("../../lib/staticData");
        setBuildingTypeDispatch(bnbBuildingTypeList[0]);

        return bnbBuildingTypeList;
      }
      default:
        return [];
    }
  }, [largeBuildingType]);

  //* 모든 값이 있는지 확인하기
  const isValid = useMemo(() => {
    if (!largeBuildingType || !buildingType || !roomType || !isSetUpForGuest) {
      return false;
    }
    return true;
  }, [largeBuildingType, buildingType, roomType, isSetUpForGuest]);

  return (
    <Container>
      <h2>宿泊施設の種類は何ですか？</h2>
      <h3>1段階</h3>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={largeBuildingType || undefined}
          defaultValue="１つ選んでください。"
          disabledOptions={disabledLargeBuildingTypeOptions}
          label="範囲を絞ってみましょう"
          options={largeBuildingTypeList}
          onChange={onChangeLargeBuildingType}
          isValid={!!largeBuildingType}
        />
      </div>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={buildingType || undefined}
          onChange={onChangeBuildingType}
          disabled={!largeBuildingType}
          label="宿泊の種類を選んでください。"
          options={detailBuildingOptions}
          isValid={!!buildingType}
        />
      </div>
      {buildingType && (
        <>
          <div className="register-room-room-type-radio">
            <RadioGroup
              label="ゲストが泊まる予定の宿泊施設の種類を選択してください。"
              value={roomType}
              options={roomTypeRadioOptions}
              onChange={onChangeRoomType}
              isValid={!!roomType}
            />
          </div>
          <div className="register-room-is-setup-for-guest-radio">
            <RadioGroup
              label="ゲストのみを使用するように作られた宿泊施設ですか？"
              value={isSetUpForGuest}
              options={isSetUpForGuestOptions}
              onChange={onChangeIsSetUpForGuest}
              isValid={!!isSetUpForGuest}
            />
          </div>
        </>
      )}
      <RegisterRoomFooter
        isValid={isValid}
        prevHref="/"
        nextHref="/room/register/bedrooms"
      />
    </Container>
  );
};

export default RegisterRoomBuilding;
