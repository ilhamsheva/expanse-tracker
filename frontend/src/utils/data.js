import {LuHandCoins, LuLayoutDashboard, LuLogOut, LuWalletMinimal} from 'react-icons/lu';

export const SIDE_MENU = [
    {
        id: 1,
        label: "Home",
        icon: LuLayoutDashboard,
        path: "/home",
    },

    {
        id: 2,
        label: "Income",
        icon: LuWalletMinimal,
        path: "/income",
    },

    {
        id: 3,
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense"
    },

    {
        id: 4,
        label: "Logout",
        icon: LuLogOut,
        path: "logout"
    }
];