import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/AuthContext'

const Users = () => {
    const [auth] = useAuth();
  return (
    <>
    <div className="row m-2 ">
        <div className="col-2"><AdminMenu/></div>
        <div className="col-7">{auth.user.name}</div>
    </div>
    
    </>
  )
}

export default Users