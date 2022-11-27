import React from 'react';
import { BiLogOut } from "react-icons/bi";
import {Link} from "react-router-dom";
import './Header.css';


const Header = () => {   
    return(
        <div class="header">
     <h1>Shre Manikkam Dental Clinic</h1>
     <div class="header-right">
     <Link to={`/`}>
     Logout <BiLogOut/>
                  </Link>
  
</div>
</div>
    )
}

export default Header;