const Contact: React.FC = () => {
  return (
    <footer className="py-[60px]">
      <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Contact
      </h3>
      <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto border-b-2 border-gray-100 pb-10">
        Please feel free to drop me a line at
        <a className="text-green-500 px-2" href="mailto:email@example.com">
          hello@marcus_dev.com
        </a>
      </p>
      <small className="pt-[40px] block text-gray-400">© 2003 - 2022 Marcus Bartend</small>
    </footer>
  );
};

export default Contact;
