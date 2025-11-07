import { useState } from "react";
import SideMenu from "./SideMenu"
import { HiOutlineMenuAlt1,  HiOutlineX } from 'react-icons/hi';

const Navbar = ({activeMenu}) => {
    const [menuActive, setMenuActive] = useState(false);

    const handleOpen = () => {
        setMenuActive(!menuActive);
    }
    
  return (
    <div className="flex gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <button onClick={handleOpen} className="block md:hidden text-black">
            {menuActive ? (
                <HiOutlineX className='text-2xl'/>
            ) : (
                <HiOutlineMenuAlt1 className="text-2xl"/>
            )}
        </button>

        <h2 className="text-xl font-bold text-black">Expense Tracker</h2>

        {menuActive && (
            <div className="fixed top-[62px] -ml-4">
                <SideMenu activeMenu={activeMenu}/>
            </div>
        )}
    </div>
  )
}

export default Navbar