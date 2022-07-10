import { readFileSync, writeFileSync } from "fs";
import { StoredUserType } from "../../types/user";

const userDataPath = `${process.cwd()}/data/users.json`;

const getList = () => {
  const usersBuffer = readFileSync(userDataPath);
  const usersString = usersBuffer.toString();

  if (!usersString) {
    return [];
  }
  const users: StoredUserType[] = JSON.parse(usersString);
  return users;
};

const exist = ({ email }: { email: string }) => {
  const users = getList();
  return users.some((user) => user.email === email);
};

const write = async (users: StoredUserType[]) => {
  writeFileSync(userDataPath, JSON.stringify(users));
};

export default { getList, exist, write };
