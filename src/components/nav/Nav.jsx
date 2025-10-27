import React from "react";
import useTheme from "../hooks/useTheme";

const NavComponent = ({setTheme}) => {

  return (
    <nav>
      <div className="logo">
        YourTasks
      </div>
      <ul>
        <li>Главная</li>
        <li>О нас</li>
        <li>Поддержка</li>
        <li style={{display: 'flex', gap:'10px'}}>
          <button onClick={()=>setTheme('light')}>Light</button>
          <button onClick={()=>setTheme('dark')}>Dark</button>
        </li>
        
      </ul>
    </nav>
  )
}

export default NavComponent