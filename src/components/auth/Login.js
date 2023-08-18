import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import CustomInput from "../layout/CustomInput";
import {  signInWithEmailAndPassword,signInWithPopup } from 'firebase/auth';
import { auth,googleProvider } from "../Firebase";
import ForgotPAssword from "../ForgotPassword";
import 'react-responsive-modal/styles.css';

import { Modal } from 'react-responsive-modal';




import { FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect } from "react";
import Register from "./Register";


export default function Login(){
    const [open, setOpen] = useState(false);

  const onCloseModal = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const onOpenModal = () => setOpen(true);
  
  const onOpenModal1 = () => setOpen1(true);
  const onCloseModal1 = () => setOpen1(false);
  const handleClick =() =>{
    onOpenModal(true);
    onCloseModal1(false);

  }
  const handleClick1 =() =>{
    onOpenModal1(true);
    onCloseModal(false);

  }
  const handleClose =() =>{
  
    onCloseModal(false);
    nav('/forgot')
    onCloseModal1(false);

  }
  useEffect(()=>{
    onCloseModal()

  },[open])


    
    const nav = useNavigate()
    const[email,setEmail]= useState("")
    const[pass,setPass]= useState("")
    const [isLogin, setIsLogin] = useState(false)
    
    const [showPassword, setShowPassword] = useState(false);
    // const handleform =(data)=>{
    //     data.preventDefault()
    //     if(email =="govindmaurya8699@gmail.com" && pass=="gobind"){
    //         nav('/register')
    //             toast("Succsefully login")
    //         console.log("successful")
    //     }else{
    //         console.log("unsuccess")
    //         toast("error occured")
    //     }

    // }
    const handleSubmit = async (e) => {
        
        e.preventDefault()
            await signInWithEmailAndPassword(auth, email, pass)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    alert("Login Successful")
                    nav("/home")
                    // console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                    alert("error")
                });
        // else await createUserWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         // Signed in
        //         const user = userCredential.user;
        //         console.log(user);
        //         alert("User Created")
        //         setIsLogin(true)

        //         // ...
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.log(errorCode, errorMessage);
        //         alert("Error: " + errorMessage)
        //         // ..
        //     });
    }
    
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };
    
      const handlePasswordChange = (data) => {
        setPass(data.target.value)
    };
    const signInWithGoogle = async () => {
        try {
        await signInWithPopup(auth,googleProvider);
        } catch (err){
          console.error(err);
        }
      };
      
   
    const handleButtonClick = () =>{

    }
    return(
        <>
         <Modal open={open} onClose={onCloseModal} dialogClassName="my-modal"  center classNames={{modal:'customModal'}}>
        <Login/>
      </Modal>
    
    <Modal open={open1} onClose={onCloseModal1}  center classNames={{modal:'customModal'}}>
        <Register/>
      </Modal>
   
            <div class="container p-3  " style={{'width':'400px'}}>
                <div class="row mt-1 logincolor rounded ">
                {/* <div class="row mt-5 bg-success"> */}
                <div class="col-md col-lg mt-2">
                    <div class="title-single-box mt-1">
                    <h1 class="title-single pb-3 text-center text-white">Sign in</h1>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-12 py-3 mt-2 rounded">
                <form onSubmit={handleSubmit} >
                    <div class="form-group">
                        <label className="py-3">Email Address</label>
                        <input type="email" class="form-control mb-1 rounded-pill" id="addcategory"  placeholder="enter your email here" required onChange={(data)=>{setEmail(data.target.value)}} />
                     </div>
                    <div class="form-group">
                        <label className="py-3">Password</label>
                        {/* <input type="password" class="form-control mb-4 rounded-pill" id="addcategory"  placeholder="enter your password here" required
                          onChange={(data)=>{setPass(data.target.value)}}/> */}
                          <CustomInput value={pass}  onChange={handlePasswordChange} />

     
                     </div>
                    
                    <button type="submit" class="btn btn-success rounded mx-auto d-block mt-4">Submit</button>
                </form>
                	
                
                     <div class="form-group row mt-3">
                      <Link  className=" text " to='/forgot' onClick={handleClose}>Forgot Password</Link>
                

                    <span>Don't have an account?<Link to='/register' onClick={handleClick}> Register</Link></span>
                            </div>                   
                    <button onClick={signInWithGoogle} className="btn  btn-a rounded mt-3 text-white">Sign in with &nbsp;<i className="fa fa-google"></i></button>
        
                
                </div>
                </div>
             </div>
        
            <ToastContainer/>
			
          
        </>
    )
}