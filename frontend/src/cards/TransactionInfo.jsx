import {
  LuTrash,
  LuTrendingDown,
  LuTrendingUp,
  LuUtensils,
} from "react-icons/lu";

const TransactionInfo = ({
  title,
  icon,
  date,
  type,
  amount,
  hideDeleteButton,
  onDelete,
}) => {
  const getAmountStyles = () => {
    if (type === "income") {
      return "bg-green-100 text-green-800";
    } else {
      return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/50 ">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 rounded-full">
        {icon ? (
          <span className="w-6 h-6">
            {icon}
          </span>
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-500 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteButton && (
            <button
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash size={18} />
            </button>
          )}
        </div>

        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
        >
          <h6 className="">
            {type === "income" ? "+" : "-"} ${amount}
          </h6>

          <h6 className="">
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfo;
