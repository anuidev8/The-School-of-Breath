import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// Define an interface for the props
import "../../styles/AuthPage.css";
import { AuthContext } from "../../contexts/AuthContext";

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const {setIsAuthenticated} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsloading(true);
      if (email && password) {
        /*  const data = 
          {
            "email": email,
            "locale": "en",
            "fields": [
              {
                "fieldName": "First name",
                "slug": "first_name",
                "value": firstName
            },
              ],
            "tags": [
                  {
                      "id": 691956,
                      "name": "Free Gift - Ebook"
                  }
              ]
          } */

        const saveUserData = {
          email: email,
          password: password,
          fullName: firstName,
        };
        const saveUserInDb = await axios.post(
          "https://angel.sorfin.com.co/auth/register",
          saveUserData
        );
        if (saveUserInDb.data.success) {
          toast.success("Success Notification !", {
            position: toast.POSITION.TOP_CENTER,
          });
          localStorage.setItem('isAuth','true')
          localStorage.setItem('authorization',`${saveUserInDb.data.token}`)
          localStorage.setItem('user',JSON.stringify(saveUserInDb.data.user))
          setIsAuthenticated(true)
          setIsloading(false)
          navigate('/menu')
        
        }
      }
    } catch (error) {
      const info = "email registered";
      toast.error(info ?? "something is wrong", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <main className="register-form" style={{ width:'100%'}}>
        <figure>
          <img width="210" height="210" src="/logo.png" />
        </figure>
        <h2 className='title-login'>Start to relax</h2>
      <form className="form" onSubmit={handleSubmit}>
     <div className="form-input">
        <input
          required
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        </div>
        <div className="form-input">
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        </div>
        <div className="form-input">

        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div className="form-input">
        <button  className="login-btn" type="submit">{isLoading ? "Registering" : "Register"}</button>

        </div>
      </form>
      <ToastContainer />
    </main>
  );
};
