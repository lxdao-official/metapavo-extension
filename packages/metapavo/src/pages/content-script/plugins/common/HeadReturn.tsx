import { useNavigate } from "react-router-dom";
import {
  HeadReturnContainer,
  ItemContainer,
  PageContainer,
  TrendsItemContainer,
} from "../styleCom";
const returnImg = chrome.runtime.getURL("images/svgs/return.svg");
export const HeadReturn = (props: any) => {
  const title = props.title;
  const navigate = useNavigate();
  return (
    <HeadReturnContainer>
      <img
        onClick={() => {
          navigate("/index");
        }}
        src={returnImg}
        alt=""
      />
      <span>{title}</span>
    </HeadReturnContainer>
  );
};
