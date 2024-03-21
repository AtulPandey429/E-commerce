
import UserMenue from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";

const UserProfile = () => {
    const [auth] =useAuth()
  return (
    <Layout>
      UserProfile
      <div className="row m-2 p-2">
        <div className="col-2">
          <UserMenue />
        </div>
        <div className="col-7">
            <div className="row">{auth?.user?.name}</div>
            <div className="row">{auth?.user?.email}</div>
            <div className="row">{auth?.user?.mobile}</div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
