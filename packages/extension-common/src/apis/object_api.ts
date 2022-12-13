import { fetchWrapped } from "./fetch";
import config from "../../config";
import { IKOL } from "./kol_api";

type ObjectType = 'kol';
export async function collectObject(object_id:string,object_type:ObjectType):Promise<IKOL[]> {
  const res = await fetchWrapped(
    config.baseURL + `/users/object/collect?object_type=${object_type}&object_id=${object_id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (res && res.success) {
    return res.result;
  }
  throw new Error(res.message)
}

export async function uncollectObject(object_id:string){
  const res = await fetchWrapped(
    config.baseURL +`/users/object/uncollect?object_id=${object_id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (res && res.success) {
    return res.result;
  }
  throw new Error(res.message)
}

export async function collectedObjects(object_type:ObjectType,pageIndex = 1,pageSize=20){
  const res = await fetchWrapped(
    config.baseURL +`/users/object/collected?object_type=${object_type}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (res && res.success) {
    return res.data.data;
  }
  return null;
}