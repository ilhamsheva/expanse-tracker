const AuthLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen md:w-[60vw] px-12 py-10 ">
      <h2 className="text-xl font-medium text-black">Expanse Tracker</h2>
      {children}
    </div>
  );
};

export default AuthLayout;
