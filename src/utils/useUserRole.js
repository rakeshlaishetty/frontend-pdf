import { useSelector } from "react-redux";

const useUserRole = () => {
  const userData = useSelector((state) => state.userData);
  
  const roleName = userData.user.role.roleName;
  console.log(roleName,"ROLE")
  return roleName;
};

export default useUserRole;
