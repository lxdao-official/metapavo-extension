import { ItemContainer } from "../styleCom";

export const ListItem = (props: any) => {
  const { userIcon, useName, userEth, links, dayTime, hourTime } = props.itemData;

  return (
    <ItemContainer onClick={props.onClick}>
      <img className="user-icon" src={userIcon} alt="" />
      <div className="user-des">
        <span className="user-name">{useName}</span>
        <span className="user-eth">{userEth}</span>
      </div>
      <div className="imgs-container">
        {links.map((link: any, index: number) => {
          return (
            <a className="link-container" key={index} href={link.link} target="_blank">
              <img className="link-icon" src={link.img} alt="" />
            </a>
          );
        })}
      </div>
      <div className="times">
        <span className="day-time">{dayTime}</span>
        <span className="hour-time">{hourTime}</span>
      </div>
    </ItemContainer>
  );
};
