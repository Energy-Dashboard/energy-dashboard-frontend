function Footer() {
  return (
    <footer className="sticky bottom-0 w-full text-center py-5 bg-[#333]">
      Made with ❤️ by{" "}
      <a
        className="underline text-red-400"
        href="https://github.com/JMGarCas"
        target="_blank"
      >
        JMGarCas
      </a>{" "}
      &{" "}
      <a
        className="underline text-red-400"
        href="https://github.com/Marchabar"
        target="_blank"
      >
        Marchabar
      </a>
      <br />
      Datos obtenidos de{" "}
      <a
        href="https://www.kaggle.com/datasets/anshtanwar/global-data-on-sustainable-energy"
        className="underline text-red-400"
        target="_blank"
      >
        Kaggle
      </a>
      , por Ansh Antwar
    </footer>
  );
}

export default Footer;
