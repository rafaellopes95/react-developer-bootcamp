export default function getAgeFrom(birthDate) {
  if (!birthDate) {
    return "?";
  }

  const [birthYear, birthMonth, birthDay] = birthDate.split("-");

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDay();

  const age = todayYear - parseInt(birthYear);

  if (parseInt(birthMonth) > todayMonth) {
    return age - 1;
  }

  if (parseInt(birthMonth) === todayMonth && parseInt(birthDay) > todayDay) {
    return age - 1;
  }

  return age;
}
