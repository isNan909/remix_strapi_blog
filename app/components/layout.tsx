const Layout = ({ children }: any) => {
  return (
    <>
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
