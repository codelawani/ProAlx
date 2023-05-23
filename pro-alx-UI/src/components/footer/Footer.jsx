import NavLinks from "../nav/NavLinks";

const Footer = () => {
    const date = new Date();
    const currentYear = date.getFullYear()
  return (
      <footer>
          <p>&copy;{currentYear} proalx </p>
          <NavLinks/>
      </footer>
  )
}

export default Footer