import { jwtDecode } from "jwt-decode";

function setToken(token){
  localStorage.setItem('access_token', token);
}

export function getToken(){
    return localStorage.getItem('access_token');
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated(){
  const token = readToken();  
  return (token) ? true : false;
}

export function removeToken(){
  localStorage.removeItem('access_token');
}

export async function authenticateUser(user, password) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ userName: user, password: password }),
    headers: {
      "content-type": "application/json"
    }
  });

  const data = await res.json();

  if(res.status === 200){
    setToken(data.token);
    return true;
  }else{
    throw new Error(data.message);
  } 
}

export async function registerUser(userName, password, password2, fullName, role) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({ userName, password, password2, fullName, role }),
      headers: {
        "Content-Type": "application/json"
      }``
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to register user');
    }
  
    return res.json();
  }
  


export default function logout(router) {
  removeToken();
  router.push('/');
}