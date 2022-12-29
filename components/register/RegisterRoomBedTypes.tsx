import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import RegisterButton from "../common/Button";
import palette from "../../styles/palette";
import { BedType } from "../../types/room";
import Selector from "../common/Selector";

const Container = styled.li`
  width: 100%;
  padding: 28px 0;
  border-top: 1px solid ${palette.gray_dd};
  &:last-child {
    border-bottom: 1px solid ${palette.gray_dd};
  }
  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }
  .register-room-bed-type-select-wrapper {
    width: 320px;
  }
`;

interface IProps {
  bedroom: { id: number; beds: { type: BedType; count: number }[] };
}

const RegisterRoomBedTypes: React.FC<IProps> = ({ bedroom }) => {
  const [opened, setOpened] = useState(false);

  const totalBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);

  //* 침대 종류 텍스트
  const toggleOpened = () => setOpened(!opened);

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div>
          <p className="register-room-bed-type-bedroom">{bedroom.id}番 ルーム</p>
          <p className="register-room-bed-type-bedroom-counts">
            ベッド {totalBedsCount}個
          </p>
        </div>
        <RegisterButton onClick={toggleOpened} styleType="register" color="white">
          {opened && "完了"}
          {!opened &&
            (totalBedsCount === 0 ? "ベッド追加" : "ベッド修正")}
        </RegisterButton>
      </div>
      {opened && (
        <div className="register-room-bed-type-select-wrapper">
          <Selector
            type="register"
            defaultValue="他のベッド追加"
            value="他のベッド追加"
            disabledOptions={["他のベッド追加"]}
          />
        </div>
      )}
    </Container>
  );
};

export default React.memo(RegisterRoomBedTypes);
