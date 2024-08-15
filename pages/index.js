import { useEffect, useState } from 'react';
import Layout from '@components/layout';
import { isAuthenticated, readToken } from '../lib/authenticate';
import Link from 'next/link';

let token = readToken();

export default function Home() {
      const [loggedIn, setLoggedIn] = useState(false);

      useEffect(() => {
            const authStatus = isAuthenticated();
            setLoggedIn(authStatus);
      }, []);

      return (
            <Layout>
                  <h1 className='text-black text-center'>Welcome to my Seneca Store</h1>
                  <h4 className='text-black text-center'>Let&apos;s Explore and buy some exciting products!!</h4>
                  
                  {!loggedIn && (
                        <div>
                              <p className='text-black text-center'>Login or Register yourself to view all products</p>
                              <div className='text-center'>
                                    <Link href='/login' className='btn btn-primary btn-md'>
                                          Login
                                    </Link>
                              </div>
                        </div>
                  )}
            </Layout>
      );
}
