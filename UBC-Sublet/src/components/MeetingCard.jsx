import styled from 'styled-components';

const CardContainer = styled.div`
  width: 252px;
  height: 265px;
  background: white;
  border-radius: 30px;
  box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
  transition: 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled.div`
  width: 100%;
  height: 50%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background: linear-gradient(#e66465, #9198e5);
  display: flex;
  align-items: top;
  justify-content: right;
`;

const SaveButton = styled.div`
  transition: 0.2s ease-in-out;
  border-radius: 10px;
  margin: 20px;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1) rotate(10deg);
  }
`;

const SvgIcon = styled.svg`
  transition: 0.2s ease-in-out;
  width: 15px;
  height: 15px;
`;

const TextContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: space-around;
`;

const IconBox = styled.div`
  margin-top: 15px;
  width: 70%;
  padding: 10px;
  background-color: #e3fff9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const IconText = styled.p`
  margin-left: 10px;
  font-family: 'Lucida Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #9198e5;
`;

const MeetingCard = () => {
  return (
    <CardContainer>
      <Image>
        <SaveButton>
          <SvgIcon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 683 683"
            fill="none"
          >
            {/* SVG content */}
          </SvgIcon>
        </SaveButton>
      </Image>
      <TextContainer>
        <p className="h3">Meeting your Colleagues</p>
        <p className="p">6 Video - 40 min</p>
        <IconBox>
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512.001 512.001"
          >
            {/* SVG content */}
          </svg>
          <IconText>Business Trip</IconText>
        </IconBox>
      </TextContainer>
    </CardContainer>
  );
};

export default MeetingCard;