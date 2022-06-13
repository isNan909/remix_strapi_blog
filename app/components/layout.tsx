const Layout = ({ children }: any) => {
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
