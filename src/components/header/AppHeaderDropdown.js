import React, { useEffect } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/chat.png'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const [myUser, setMyUser] = React.useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Any initialization logic can go here
    const myuser= JSON.parse(localStorage.getItem("userdetails"))
    console.log("user details from local storage", myuser);
    setMyUser(myuser);
  }, [])

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Name: {myUser?.firstName ? `${myUser.firstName} ${myUser.lastName}` : "N/A"}
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Email: {myUser?.email || "N/A"}
        </CDropdownItem>
      
       
       
       
        <CDropdownDivider />
        <CDropdownItem href="#"  onClick={()=>{
            localStorage.clear();
            navigate("/")}}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
