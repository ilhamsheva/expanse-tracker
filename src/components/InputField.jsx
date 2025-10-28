import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const InputField = ({value, onChange, label, placeholder, type}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTooglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div>
            <label className='text-[14px] text-slate-600'>{label}</label>

            <div className='input-box'>
                <input
                    placeholder={placeholder}
                    className='w-full bg-transparent outline-none'
                    value={value}
                    onChange={(e) => onChange(e)} 
                    type={type == 'password' ? showPassword ? 'text' : 'password' : type} 
                />
                {type == 'password' && (
                    showPassword ? (
                        <FaRegEye size={22} className="text-primary cursor-pointer" onClick={handleTooglePassword}/>
                    ) : (
                        <FaRegEyeSlash size={22} className="text-primary cursor-pointer" onClick={handleTooglePassword}/>
                    )
                )}
            </div>
        </div>
    )
}

export default InputField