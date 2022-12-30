import { BedType } from "../types/room";

export const monthsList = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];

//* 1부터 31까지
export const daysList = Array.from(Array(31), (_, i) => String(i + 1));

//* 2020년부터 1900년까지
export const yearsList = Array.from(Array(121), (_, i) => String(2022 - i));

//* 宿泊種類
export const largeBuildingTypeList = [
  "マンション",
  "住宅",
  "ユニークな宿泊",
  "別荘",
  "B&B"
];

//* マンション種類
export const apartmentBuildingTypeList = [
  "アパート",
  "マンション",
  "共同住宅",
  "ロフト",
  "レジデンス"
];

//* 住宅種類
export const houseBuildingTypeList = [
  "住宅",
  "バンガロー",
  "ログハウス",
  "小屋"
];

//* 別荘種類
export const secondaryBuildingTypeList = [
  "ゲストスイート",
  "農場"
];

//* ユニークな宿泊種類
export const uniqueBuildingTypeList = [
  "納屋",
  "ボート",
  "バス"
];

//* B&B種類
export const bnbBuildingTypeList = [
  "B&B",
  "山岳",
  "旅館"
];

//* 침실 개수
export const bedroomCountList = Array.from(Array(16), (_, i) => `寝室 ${i}個`);

//*ベッドタイプ
export const bedTypes: BedType[] = [
  "他のベッドを追加",
  "ソファ",
  "エアマットレス",
  "布団",
  "シングル",
  "ダブル",
  "クイーン",
  "二段ベッド",
  "ベビーベッド",
  "ハンモック",
  "ウォーターベッド"
];
