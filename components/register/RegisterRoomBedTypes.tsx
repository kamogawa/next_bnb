import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import RegisterButton from "../common/Button";
import palette from "../../styles/palette";
import { BedType } from "../../types/room";
import Selector from "../common/Selector";
import { bedTypes } from "../../lib/staticData";
import Counter from "../common/Counter";
import { registerRoomActions } from "../../store/registerRoom";

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
  .register-room-bed-type-counters {
    width: 320px;
    margin-top: 30px;
  }
  .regigster-room-bed-type-counter {
    width: 290px;
    margin-bottom: 20px;
  }
  .regigster-room-bed-type-bedroom-counts {
    font-size: 20px;
    color: ${palette.gray_76};
  }
`;

interface IProps {
  bedroom: { id: number; beds: { type: BedType; count: number }[] };
}

const RegisterRoomBedTypes: React.FC<IProps> = ({ bedroom }) => {
  const [opened, setOpened] = useState(false);
  const initialBedOption = bedroom.beds.map((bed) => bed.type);
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>(
    initialBedOption
  );

  const dispatch = useDispatch();

  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
  }, [activedBedOptions, bedroom]);

  const onChangeBedTypeCount = (value:number, type: BedType) =>
    dispatch(
      registerRoomActions.setBedTypeCount({
        bedroomId: bedroom.id,
        type,
        count: value,
      })
    );

  const bedsText = useMemo(() => {
    const texts = bedroom.beds.map((bed) => `${bed.type} ${bed.count}個`);
    return texts.join(",");
  }, [bedroom]);

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
        <div className="register-room-bed-type-bedroom-texts">
          <p className="register-room-bed-type-bedroom">{bedroom.id}番 ルーム</p>
          <p className="register-room-bed-type-bedroom-counts">
            ベッド {totalBedsCount}個
            <br />
            {bedsText}
          </p>
        </div>
        <RegisterButton onClick={toggleOpened} styleType="register" color="white">
          {opened && "完了"}
          {!opened &&
            (totalBedsCount === 0 ? "ベッド追加" : "ベッド修正")}
        </RegisterButton>
      </div>
      {opened && (
        <div className="register-room-bed-type-counters">
          {activedBedOptions.map((type) => (
            <div className="regigster-room-bed-type-counter" key={type}>
              <Counter
                label={type}
                value={
                  bedroom.beds.find((bed) => bed.type === type)?.count || 0
                }
                key={type}
                onChange={(value) => {
                  onChangeBedTypeCount(value, type);
                }}
              />
            </div>
          ))}
          <Selector
            type="register"
            options={lastBedOptions}
            defaultValue="他のベッド追加"
            value="他のベッド追加"
            disabledOptions={["他のベッド追加"]}
            useValidation={false}
            onChange={(e) => setActivedBedOptions([
              ...activedBedOptions,
              e.target.value as BedType
            ])}
          />
        </div>
      )}
    </Container>
  );
};

export default React.memo(RegisterRoomBedTypes);
