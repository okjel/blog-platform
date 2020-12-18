import avatarImg from '../images/avatar.png';

const toUrl = (string) => {
  try {
    return new URL(string);
  } catch {
    return avatarImg;
  }
};

export default toUrl;
