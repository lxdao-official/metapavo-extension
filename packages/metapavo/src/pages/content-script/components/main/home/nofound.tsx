import styled from "styled-components";
import {useState} from 'react';
import { useSnackbar } from "notistack";
import { reportCreate } from "../../../../../utils/apis/nft_api";

const NoFoundWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .main-title{
    text-align: center;
    width: 100%;
    margin: 30px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    color: #000000;
  }

  .form-wrap{
    display: flex;
    flex-direction: column;
    width: 90%;
    line-height: 30px;
  }
  
  .form-title{
    text-align: left;
    width: 100%;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 10px;
    color: #000000;
  }

  .form-input{
    height: 36px;
    line-height: 36px;
    border: 1px solid #E5E3E6;
    border-radius: 6px;
    padding: 12px 16px;
    margin-bottom: 20px;
  }
  .disable{
    background: #EFEEF1;
  }
  .form-select{
    height: 45px;
    border: 1px solid #E5E3E6;
    border-radius: 6px;
    padding: 0 16px;
    margin-bottom: 20px;
  }

  button{
    background: linear-gradient(91.75deg, rgba(125, 226, 172, 0.1) 0%, rgba(56, 157, 250, 0.1) 49.26%, rgba(159, 80, 255, 0.1) 97.76%);
    box-shadow: 0px 0px 0px #4216E7;
    border-radius: 4px;
    border-width: 3px;
    margin-bottom: 20px;
    border-image-slice: 1;
    border-image-source: linear-gradient(to left, #7DE2AC, #9F50FF);
  }
`

export function NoFound() {
  const [type, setType] = useState<string>('NFT');
  const [name, setName] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  const onBtnClick = async () =>{
    const reportResult = await reportCreate(
     window.location.toString(),
     type,
     name
    )
    console.log('heisan-->', reportResult)
    if (reportResult) {
      // return {
      //   projectInfo,
      //   status: CheckResultStatus.SUCCESS,
      // };
      clear()
      enqueueSnackbar("Succeed", {});
    } else {
      // return {
      //   status: CheckResultStatus.NOTINSERVER,
      // };
      enqueueSnackbar("Error", {});
    }
    
  }
  const onTypeChange = (e:any) => {
    setType(e.target.value)
  }
  const onNameChange = (e:any) => {
    setName(e.target.value)
  }
  const clear = () => {
    setType('NFT')
    setName('')
  }


  return (
    <NoFoundWrap>
      <div className="main-title">Unable to identify the project</div>
      <div className="form-wrap">
        <span className="form-title">URL</span>
        <input
          className="form-input disable"
          type="text"
          disabled={true}
          value={window.location.toString()}
        />
        <span className="form-title">Type</span>
        <select className="form-select" onChange={onTypeChange} value={type}>
          <option value="NFT">NFT</option>
          <option value="TOKEN">TOKEN</option>
          <option value="TWITTER">TWITTER</option>
          <option value="DAO">DAO</option>
          <option value="OTHERS">OTHERS</option>
        </select>
        <span className="form-title">Name</span>
        <input
          onChange={onNameChange}
          value={name}
          className="form-input"
          type="text"
          placeholder="Name"
        />
        <button type="button" onClick={onBtnClick}>Submit</button>
      </div>
      
    </NoFoundWrap>
  );
}
