import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { bedTypes } from "../../lib/staticData";
import Counter from "../common/Counter";
import palette from "../../styles/palette";
import { registerRoomActions } from "../../store/registerRoom";
import { useSelector } from "../../store";
import { BedType } from "../../types/room";
import Selector from "../common/Selector";
import Button from "../common/Button";

const Container = styled.li`
  width: 100%;
  padding: 30px 0;
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
    font-size: 20px;
    color: ${palette.gray_48};
  }
  .register-room-public-bed-type-counters {
    width: 320px;
    margin-top: 30px;
  }
  .register-room-bed-type-bedroom-counts {
    font-size: 20px;
    color: ${palette.gray_76};
  }
  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 20px;
  }
`;

const RegisterRoomPublicBedTypes: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const publicBedList = useSelector(
    (state) => state.registerRoom.publicBedList
  );

  const dispatch = useDispatch();

  const totalBedsCount = useMemo(() => {
    let total = 0;
    publicBedList.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [publicBedList]);

  const bedsText = useMemo(() => {
    const texts = publicBedList.map((bed) => `${bed.type} ${bed.count}個`);
    return texts.join(",");
  }, [publicBedList]);

  const initialBedOptions = () => publicBedList.map((bed) => bed.type);
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>(
    initialBedOptions
  );

  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
  }, [activedBedOptions, publicBedList]);

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div>
          <p className="register-room-bed-type-bedroom">共用スペース</p>
          <p className="register-room-bed-type-bedroom-counts">
            ベッド {totalBedsCount}個<br />
            {bedsText}
          </p>
        </div>
        <Button
          onClick={() => setOpened(!opened)}
          styleType="register"
          color="white"
        >
          {opened && "完了"}
          {!opened &&
            (totalBedsCount === 0 ? "ベッド追加" : "ベッド修正")}
        </Button>
      </div>
      {opened && (
        <div className="register-room-public-bed-type-counters">
          {activedBedOptions.map((type) => (
            <div className="register-room-bed-type-counter" key={type}>
              <Counter
                label={type}
                value={
                  publicBedList.find((bed) => bed.type === type)?.count || 0
                }
                key={type}
                onChange={(value) =>
                  dispatch(
                    registerRoomActions.setPublicBedTypeCount({
                      type,
                      count: value,
                    })
                  )
                }
              />
            </div>
          ))}
          <Selector
            type="register"
            options={lastBedOptions}
            disabledOptions={["他のベッド追"]}
            value="他のベッド追"
            useValidation={false}
            onChange={(e) =>
              setActivedBedOptions([
                ...activedBedOptions,
                e.target.value as BedType,
              ])
            }
          />
        </div>
      )}
    </Container>
  );
};

export default React.memo(RegisterRoomPublicBedTypes);
