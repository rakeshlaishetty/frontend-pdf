import { useSelector } from "react-redux";

const useUserRole = () => {
  const userData = useSelector((state) => state.userData);
  
  const roleName = userData.user.roleName;

  return roleName;
};

export default useUserRole;
