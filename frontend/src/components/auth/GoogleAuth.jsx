import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { setCredential } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function GoogleAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      // Create a Google Auth instance
      const provider = new GoogleAuthProvider();

      // Create Firebase Auth object for App --> including info like API key
      const auth = getAuth(app);

      // Return the result with user info (credentials) if success
      const result = await signInWithPopup(auth, provider);

      axios.post("http://localhost:3000/api/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      }, {withCredentials: true}).then((res) => {
        dispatch(setCredential(res.data))
        navigate('/');
      }).catch(error => {
        console.log(error)
      });
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleGoogleAuth}
      className="flex items-center justify-center lg:w-4/6 w-4/5 gap-2 px-5 py-3 border-2 border-slate-400 rounded-md cursor-pointer"
    >
      <FcGoogle className="text-xl" />
      <h1 className="font-semibold text-l">Login with Google</h1>
    </motion.div>
  );
}
