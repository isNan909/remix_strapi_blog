import Navbar from '~/components/navbar';
import Contact from '~/components/contact';

const Layout = ({ children }: any) => {
  return (
    <>
      <div className="max-w-2xl mx-auto px-4">
        <Navbar />
        <div>{children}</div>
        <Contact />
      </div>
    </>
  );
};

export default Layout;
