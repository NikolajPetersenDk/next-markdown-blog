import Link from "next/link"

function Header() {
  return (
    <header>
       <div className="container">
          <Link href="/" passHref>
            <h2>Dev Blog</h2>
          </Link>
       </div>
    </header>
  )
}

export default Header