import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfo from "./TransactionInfo";

const RecentTransaction = ({ onSeeMore, label, lastTransactions7Days }) => {
  
  return (
    <div>
      <div className="mt-3 p-4 border rounded-lg shadow-sm bg-white border-gray-200/50 flex justify-between items-center">
        <h2 className="text-xl">{label}</h2>
        <button
          className="flex flex-row items-center gap-3 border border-gray-100/50 hover:bg-gray-100/50 p-1"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {lastTransactions7Days.slice(0, 7).map((transaction) => (
          <TransactionInfo
            key={transaction._id}
            title={
              transaction.type === "expense"
                ? transaction.category
                : transaction.source
            }
            icon={transaction.icon}
            date={moment(transaction.date).format("DD MMM YYYY")}
            amount={transaction.amount}
            type={transaction.type}
            hideDeleteButton
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransaction;
