import React from "react";
import styled from "styled-components";
import { useSelector } from "../../store";
import RegisterRoomPublicBedTypes from "./RegisterRoomPublicBedTypes";
import RegisterRoomBedTypes from "./RegisterRoomBedTypes";

const Container = styled.ul`
  width: 548px;
`;
const RegisterRoomBedList: React.FC = () => {
  const bedList = useSelector((state) => state.registerRoom.bedList);

  return (
    <Container className="register-room-bed-type-list">
      {bedList.map((bedroom) => (
        <RegisterRoomBedTypes key={bedroom.id} bedroom={bedroom} />
      ))}
      <RegisterRoomPublicBedTypes />
    </Container>
  );
};

export default React.memo(RegisterRoomBedList);
