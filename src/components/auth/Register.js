import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { db ,storage} from "../Firebase"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import  {collection,addDoc,Timestamp} from 'firebase/firestore'

import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from "../Firebase";



export default function Register(){

    const nav = useNavigate()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [contact,setContact] = useState('')
    const [zip,setZip] = useState('')
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState(null)
   
    const [image,setImage] = useState('')
    const [address,setAddress] = useState('')
    const [gender,setGender] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [terms,setTerms] = useState('')
    const [isLogin, setIsLogin] = useState(false)
    const [taskcompletionStatus,settaskcompletionStatus] = useState('Pending')
    const handleform = async (data) =>{
        
        data.preventDefault()
        uploadFile()
        // console.log(taskcompletionStatus)
    //     try {
    //         // setTimeout(() => {
    //         //     setLoading(false)
              
    //         // }, 5000);
    //         await addDoc(collection(db, 'tasks'), {
    //           name: name,
    //           email:  email,
    //           contact:  contact,
    //           zip: zip,
    //           address: address,
    //           gender: gender,
    //             password:password,
    //           confirmPassword:confirmPassword,
    //           terms:  terms,
    //           taskcompletionStatus: taskcompletionStatus,
    //           created: Timestamp.now()
              
    //         })
            

    //     //   setLoading(false);
    //     //   toast("registration successfull")
    //       } catch (err) {
    //         // setLoading(false);
    //         // toast("registration decline")
           
    //       }

    // }
   
}
    const handleSubmit = async (e) => {
        e.preventDefault()
            // await signInWithEmailAndPassword(auth, email, pass)
            //     .then((userCredential) => {
            //         // Signed in
            //         const user = userCredential.user;
            //         alert("Login Successful")
            //         nav("/home")
            //         // console.log(user);
            //     })
            //     .catch((error) => {
            //         const errorCode = error.code;
            //         const errorMessage = error.message;
            //         console.log(errorCode, errorMessage)
            //     });
            const saveData = async (data) => {
                try {
                    await addDoc(collection(db, 'tasks'), {
                        name:data.name,
                        email:data.email,
                        contact:data.contact,
                        zip:data.zip,
                        address:data.address,
                        gender:data.gender,
                        terms:data.terms,
                        image:data.image,
                        taskcompletionStatus:data.taskcompletionStatus,
                        created:Timestamp.now()
                    })
                    alert("Submitted")
                } catch (err) {
                    alert(err)
                }
            }
    
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                let userdata= {
                    uid : user.uid,
                    name: name,
                    email:  email,
                    contact:  contact,
                    zip: zip,
                    address: address,
                    gender: gender,
                    terms:  terms,
                    fileName: fileName,
                    image:image,
                    taskcompletionStatus: taskcompletionStatus,
                }
                saveData(userdata)
                // alert("User Created")
                // setIsLogin(true)

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert("Error: " + errorMessage)
                // ..
            });
           }
           const uploadFile = () => {
            if (!file) {
                alert("Please upload an image first!");
            }
            console.log("File",file)
            console.log("File Name",file.name)
      
            const fileName = `${Date.now()}-${file.name}`
            const storageRef = ref(storage, `/files/${fileName}`);
      
            // progress can be paused and resumed. It also exposes progress updates.
            // Receives the storage reference and the file to upload.
            const uploadTask = uploadBytesResumable(storageRef, file);
      
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    // update progress
                    // setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log("URL",url);
                        setFileName(fileName)
                        setImage(url)
                    });
                }
            );
        };
    
    
    
    
    
    return(
        <>
            <div class="container p-4  rounded">
                <div class="row pt-2">
                <div class="col-md-12 pt-2 col-lg-12 pb-2 text-center rounded logincolor">
                    <div class="">
                    <h1 class="title-single text-white rounded">Sign up</h1>
                    </div>
                </div>

                 <div className="container p-3 mx-auto  mt-4  ">
                <form onSubmit={handleSubmit}>
                    <div class="form-group col-md-12 py-3">
                        <label for="name" className="h5 ">Name</label>
                    <input type="text" class="form-control my-3" id="name" aria-describedby="emailHelp" placeholder="Enter your name" required onChange={(data)=>{setName(data.target.value)}}/>
                       </div>
                    <div class="form-group col-md-12">
                        <label for="Email" className="h5 ">Email address</label>
                    <input type="email" class="form-control mt-3" id="Email" aria-describedby="emailHelp" placeholder="Enter your email address" required onChange={(data)=>{setEmail(data.target.value)}}/>
                    </div>
                    <div className="row">
                    <div class="form-group col-md-3">
                        <label for="contact" className="h5 my-3">Contact</label>
                    <input type="number" class="form-control" id="contact" aria-describedby="emailHelp" placeholder="Enter your phone number" required onChange={(data)=>{setContact(data.target.value)}}/>
                       </div>
                       <div class="form-group col-md-3">
                        <label for="zip" className="h5 my-3 ">Zip code</label>
                    <input type="number" class="form-control" id="zip" aria-describedby="emailHelp" placeholder="Enter your zip code" required onChange={(data)=>{setZip(data.target.value)}}/>
                       </div>
                    
                       <div class="form-group col-md-6">
                        <label for="address" className="h5 my-3 ">Address</label>
                    <input type="text" class="form-control " id="address" aria-describedby="emailHelp" placeholder="Enter your home address" required onChange={(data)=>{setAddress(data.target.value)}}/>
                       </div>
                       </div>
                    
                       
                        <div class="col-md form-group mt-3">
                        <label className="h5 me-3 " >Gender</label>
                      
                        <input type="radio" name="Gender" id="male"value={'Male'} onChange={(data)=>{setGender(data.target.value)}} />
                        <label class="h6 me-3" for="male" >Male</label>
                        <input type="radio"value={'Female'} onChange={(data)=>{setGender(data.target.value)}} name="Gender" id="female"/>
                        <label class="h6 me-3"for="female">Female</label>
                        <input type="radio"value={'Others'} onChange={(data)=>{setGender(data.target.value)}} name="Gender"  id="others"/>
                        <label class="h6 " for="others">Others</label>
                      </div>
                        
                 
                    <div class="form-group row col-md-12">
                        <label for="Password"className="h5 my-3 ">Password</label>
                        <input type="password" class="form-control" id="Password" placeholder="Password" required onChange={(data)=>{setPassword(data.target.value)}}/>
                    </div>
                    <div class="form-group row col-md-12">
                        <label for="confirm-password"className="h5 my-3"> Confirm Password</label>
                        <input type="password" class="form-control" id="confirm-password" placeholder="Confirm Password" required onChange={(data)=>{setConfirmPassword(data.target.value)}}/>
                    </div>
                    <input type="file" class="form-control" id="exampleInputPassword1" placeholder="Password" required onChange={(e) =>
                  // console.log(e.target.files[0])
                  setFile(e.target.files[0])
                  }/>
                    <div class="form-group form-check col-md-12 my-3 tcol-md-12">
                        <input type="checkbox" class="form-check-input" id="terms" required onChange={(data)=>{setTerms(data.target.value)}}/>
                        <label class="form-check-label" className="h6 " for="terms">Agree to all terms and conditions</label>
                    </div>
                    <div className="">
                    <button type="submit" class="btn btn-a rounded d-block mx-auto ">Submit</button>
                    </div>
                        </form>
                </div>
                </div>
            </div>
           
        </>
    )
}