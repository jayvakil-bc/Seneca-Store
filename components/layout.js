import Link from 'next/link';
import { useRouter } from 'next/router';
import { readToken, removeToken } from '../lib/authenticate';

let token  = readToken();
export default function Layout(props) {
  const router = useRouter();
  
  function logout() {
    removeToken();
    router.push('/');
  }

  return (
    <>
      <header className="bg-light p-4 mb-3 shadow-sm">
        <div className="container d-flex align-items-center justify-content-between">
          <div style={{flexDirection: 'column'}} className="d-flex align-items-center">
            <img 
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Seneca_College_logo.svg/750px-Seneca_College_logo.svg.png?20140403223902' 
              width='200px' 
              className="mr-3"
            />
            <p className="mb-0 text-black ">We Sell Everything You Can Think Of</p>
          </div>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/product-details" className="nav-link">
                  Product Details
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={logout} className='btn btn-secondary'>Logout</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="container">
        {props.children}
      </main>
    </>
  );
}
