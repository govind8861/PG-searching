import { useState ,useEffect} from "react"
import { useNavigate } from "react-router-dom"

import { db,storage } from "./Firebase"

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import  {collection,addDoc,Timestamp} from 'firebase/firestore'



export default function AddRoom(){
    const nav = useNavigate()
    const [addCategory,setAddCategory] = useState("")
    const [addRoomAddress,setAddRoomAddress] = useState("")
    const [addState,setAddState] = useState("")
    const [addCity,setAddCity] = useState("")
    const [addRent,setAddRent] = useState("")
    const [addAccomodation,setAddAccomodation] = useState("")
    // const [addImage,setAddImage] = useState("")
    const [addDescription,setAddDesccription] = useState("")
    const [file, setFile] = useState(null)
    
    const [fileName, setFileName] = useState(null)
    const [percent, setPercent] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    const [taskcompletionStatus,settaskcompletionStatus] = useState('Pending')
 

    const handleform = async (data) =>{
        data.preventDefault()
        uploadFile()
        // try{
        //     await addDoc(collection(db,'AddRooms'),{
        //       addCategory:addCategory,
        //       addRoomAddress:addRoomAddress,
        //       addState:addState,
        //       addCity:addCity,
        //       addRent:addRent,
        //       addAccomodation:addAccomodation,
        //       taskcompletionStatus:taskcompletionStatus,
             
        //       addDescription:addDescription,
        //         created:Timestamp.now()
        //     })
        //     alert("city added")
        // }
        // catch(err){
        //     alert(err)
        // }
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
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log("URL",url);
                    setFileName(fileName)
                    setImageUrl(url)
                });
            }
        );
    };

    const saveData = async () => {
        try {
            await addDoc(collection(db, 'AddRooms'), {
                addCategory:addCategory,
                addRoomAddress:addRoomAddress,
                addState:addState,
                addCity:addCity,
                addRent:addRent,
                addAccomodation:addAccomodation,
                taskcompletionStatus:taskcompletionStatus,
                addDescription:addDescription,
            
                image: imageUrl,
                fileName: fileName,
                created: Timestamp.now()
            })
            alert("Submitted")
        } catch (err) {
            alert(err)
        }
    }
    
    useEffect(() => {
        if (!!imageUrl)
            saveData()
    }, [imageUrl])
    
    return(
        <>
        <div class="container mt-5 logincolor">
    <div class="row mt-5">
      <div class="col-md-12 col-lg-12 mt-5">
        <div class="title-single-box mt-5 ">
          <h1 class="title-single text-center pb-4 text-white"> Add Room</h1>
        </div>
      </div>
            </div>
  </div>

     <div className="container p-4 mx-auto shadow my-4 ">
                <form onSubmit={handleform}>
                    <div class="form-group col-md-12">
                        <label for="name" className="h5 ">Category Name</label>
                    <input type="text" class="form-control my-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Category name" required onChange={(data)=>{setAddCategory(data.target.value)}}/>
                       </div>
                    <div class="form-group col-md-12">
                        <label for="exampleInputEmail1 " className="h5 ">Room address</label>
                    <input type="text" class="form-control mt-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Room address" required onChange={(data)=>{setAddRoomAddress(data.target.value)}}/>
                    </div>
                    <div className="form-gropu row">

                    <div class="form-group col-md-4">
                        <label for="name" className="h5 my-3 ">City</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter City" required onChange={(data)=>{setAddCity(data.target.value)}}/>
                       </div>
                       <div class="form-group col-md-3">
                        <label for="name" className="h5 my-3">Rent</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Rent of the room" required onChange={(data)=>{setAddRent(data.target.value)}}/>
                       </div>
                    
                       <div class="form-group col-md">
                        <label for="name" className="h5 my-3">Accomodation</label>
                    <input type="text" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Accomodation of the room" required onChange={(data)=>{setAddAccomodation(data.target.value)}}/>
                       </div>         
                 
                    <div class="form-group row col-md-12">
                    </div>
                        <label for="exampleInputPassword1"className="h5 my-3 ">Image</label>
                        <input type="file" class="form-control" id="exampleInputPassword1" placeholder="Password" required onChange={(e) =>
                  // console.log(e.target.files[0])
                  setFile(e.target.files[0])
                  }/>
                    </div>
                    <div class="form-group row col-md-12">
                        <label for="exampleInputPassword1"className="h5 my-3 "> Description</label>
                        <textarea type="" class="form-control" id="exampleInputPassword1" placeholder="Enter the description" rows={10} required onChange={(data)=>{setAddDesccription(data.target.value)}}/>
                    </div>
                    <div className="py-3">

                    <button type="submit" class="btn btn-success d-block mx-auto ">Submit</button>
                    </div>
                        </form>
                </div>
            



        </>
    )
}