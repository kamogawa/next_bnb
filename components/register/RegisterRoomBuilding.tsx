import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { largeBuildingTypeList } from "../../lib/staticData";
import { useSelector } from "../../store";
import { registerRoomActions } from "../../store/registerRoom";
import palette from "../../styles/palette";
import Selector from "../common/Selector";

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
`;

const disabledLargeBuildingTypeOptions = ["１つ選んでください。"];

const RegisterRoomBuilding: React.FC = () => {
  const largeBuildingType = useSelector(
    (state) => state.registerRoom.largeBuildingType
  );
  const dispatch = useDispatch();

  const onChangeLargeBuildingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setLargeBuildingType(event.target.value));
  };

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
        />
      </div>
    </Container>
  );
};

export default RegisterRoomBuilding;
