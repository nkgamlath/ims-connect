import { useState ,useContext }  from "react";
import { Link } from "react-router-dom"
import './page-auth.css'
import { AuthWrapper } from "./AuthWrapper";
import { useAuth  } from "../../utils/AuthProvider";//

export const LoginPage = () => {
    const [formData, setFormData] = useState({
        password: '',
        username: '',
        rememberMe: false,
    });
    const [message, setMessage] = useState('');
    const auth = useAuth();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // Handle form submission logic here
            console.log('Form submitted:', formData, JSON.stringify({
                username: formData.username,
                password: formData.password
            }));

            //ngs
            //call the backend
            const response = await fetch("http://localhost:3001/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }),
            });

            const result = await response.json();
            console.log("api call result:",result.data, result);
            

            if (result) {
                setMessage("User login successfull");
                auth.login(result.token, result.user)
            } else {
                setMessage("login failed");
            }
            //nge
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <AuthWrapper>
            <h4 className="mb-2">Welcome to GeenFuture IMS!</h4>
            <p className="mb-4">Please sign-in to your account and start innovation</p>

            <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={formData.name}
                        onChange={handleChange}
                        name="username"
                        placeholder="Enter your username"
                        autoFocus />
                </div>
                <div className="mb-3 form-password-toggle">
                    <div className="d-flex justify-content-between">
                        <label className="form-label" htmlFor="password">Password</label>
                        {/* <Link aria-label="Go to Forgot Password Page" to="/auth/forgot-password">
                            <small>Forgot Password?</small>
                        </Link> */}
                    </div>
                    <div className="input-group input-group-merge">
                        <input
                            type="password"
                            autoComplete="true"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            name="password"
                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                            aria-describedby="password" />
                        <span className="input-group-text cursor-pointer"></span>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="remember-me"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            readOnly={true}
                        />
                        <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
                    </div>
                </div>
                <div className="mb-3">
                    <button aria-label='Click me' className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                </div>
            </form>

            <p className="text-center">
                <span>trouble signing in? </span>
                <Link aria-label="Go to Register Page" className="registration-link">
                    <span>Contact your office admin</span>
                </Link>
            </p>

        </AuthWrapper>
    )
}