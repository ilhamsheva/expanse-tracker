import { getInitial } from "../validate/getInitials";

const CharAvatar = ({fullName, width, height}) => {


  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}>
        {getInitial(fullName || "")}
    </div>
  )
}

export default CharAvatar