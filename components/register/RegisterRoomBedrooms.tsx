import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { bedroomCountList } from "../../lib/staticData";
import { getNumber } from "../../lib/utils";
import { useSelector } from "../../store";
import { registerRoomActions } from "../../store/registerRoom";
import palette from "../../styles/palette";
import Counter from "../common/Counter";
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
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    width: 320px;
    margin-bottom: 24px;
    word-break: keep-all;
  }
  .register-room-maximun-guest-count-wrapper {
    width: 320px;
    margin-top: 24px;
    margin-bottom: 32px;
  }
  .register-room-bedroom-count-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
  .register-room-bed-count-wrapper {
    width: 320px;
    margin-bottom: 57px;
  }
`;

const RegisterRoomBedrooms: React.FC = () => {
  const maximunGuestCount = useSelector(
    (state) => state.registerRoom.maximumGuestCount
  );
  const bedroomCount = useSelector((state) => state.registerRoom.bedroomCount);
  const bedCount = useSelector((state) => state.registerRoom.bedCount);

  const dispatch = useDispatch();

  //* 최대 숙박인원 변경 시
  const onChangeMaximunGuestCount = (value: number) => {
    dispatch(registerRoomActions.setMaximumGuestCount(value));
  };

  //* 寝室数変更時
  const onChangeBedroomCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setBedroomCount(getNumber(event.target.value) || 0));
  };

  const onChangeBedCount = (value: number) => dispatch(registerRoomActions.setBedCount(value));

  return (
    <Container>
      <h2>宿泊施設にはどれくらいの人数が宿泊できますか？</h2>
      <h3>2段階</h3>
      <p>
        すべてのゲストが快適に滞在できるようにベッドが十分に備わっているか確認してください。
      </p>
      <div className="register-room-maximun-guest-count-wrapper">
        <Counter
          label="最大宿泊人数"
          value={maximunGuestCount}
          onChange={onChangeMaximunGuestCount}
        />
      </div>
      <div className="register-room-bedroom-count-wrapper">
        <Selector
          type="register"
          value={`寝室 ${bedroomCount}個`}
          onChange={onChangeBedroomCount}
          label="ゲストが利用できる寝室は何個ですか？"
          options={bedroomCountList}
        />
      </div>
      <div className="register-room-bed-count-wrapper">
        <Counter
          label="ベッド"
          value={bedCount}
          onChange={onChangeBedCount}
        />
      </div>
    </Container>
  );
};

export default React.memo(RegisterRoomBedrooms);
