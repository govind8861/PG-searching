import * as React from "react"; 
import { Link } from "react-router-dom";
// import { Modal } from "../UI";
import useDisclosure from '../Hooks/useDisclosure'
import Login from "../auth/Login";
import Register from "../auth/Register";

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import  { useState } from 'react';

import 'react-responsive-modal/styles.css';

import { Modal } from 'react-responsive-modal';
import Search from "../Search";


export default function Header(){
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
    onCloseModal1(false);

  }
  const handleClose1 =() =>{
  
    onCloseModal(false);
    onCloseModal1(false);
    toggleOffcanvas()

  }

  
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

    return(
        <>
          <Navbar className="bg-body-tertiary mb-3">
      <Container fluid>
        <Button variant="outline-success" onClick={toggleOffcanvas} className="ms-auto">
          Search
        </Button>
        <Offcanvas show={showOffcanvas} onHide={toggleOffcanvas} placement="end" style={{'width':'50%'}}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>RoomNinja</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
        <Search/>
            </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
        
    <Modal open={open} onClose={onCloseModal} dialogClassName="my-modal" center classNames={{modal:'customModal',closeButton:'button'}}>
        <Login/>
      </Modal>
    
    <Modal open={open1} onClose={onCloseModal1}  center classNames={{modal:'customModal1'}}>
        <Register/>
      </Modal>
    

  <nav class="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
    <div class="container">
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <Link class="navbar-brand text-brand" to='/home'>Room<span class="color-b">Ninja</span></Link>

       <div class="navbar-collapse collapse justify-content-center" id="navbarDefault">
        <ul class="navbar-nav">
      
        <li class="nav-item">
          <Link class="nav-link " to="/home"  onClick={handleClose}>Home</Link>
          </li>

          <li class="nav-item">
            <Link class="nav-link " to="/about"  onClick={handleClose}>About</Link>
          </li>
        
          <li class="nav-item">
            <Link class="nav-link " to="/Property"  onClick={handleClose}>PG</Link>
          </li>


       
          <li class="nav-item">
            <Link class="nav-link " to="/contact"  onClick={handleClose}>Contact</Link>
          </li>
          
          
      <li class="nav-item dropdown">
            <Link class="nav-link dropdown-toggle" to="/dashboard" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={handleClose}>Dashboard</Link>
            <div class="dropdown-menu">
              <Link class="dropdown-item " to="/booking" onClick={handleClose}>Booking table</Link>
              <Link class="dropdown-item " to="/city" onClick={handleClose}>City</Link>
              
              <Link class="dropdown-item " to="/addcategory" onClick={handleClose}>Add Category</Link>
              
              <Link class="dropdown-item " to="managecategory" onClick={handleClose}>Manage Category</Link>
              <Link class="dropdown-item " to="/updatecategory" onClick={handleClose}>Update Category</Link>
              <Link class="dropdown-item " to="/addcity" onClick={handleClose}> Add City</Link>
              <Link class="dropdown-item " to="/managecity" onClick={handleClose}>Manage City</Link>
              <Link class="dropdown-item " to="/updatecity" onClick={handleClose}>Update City</Link>
              <Link class="dropdown-item " to="/addroom" onClick={handleClose}>Add Room</Link>
              <Link class="dropdown-item " to="/manageroom" onClick={handleClose}>Manage Room</Link>
              <Link class="dropdown-item " to="/updateroom" onClick={handleClose}>Update Room</Link>
              <Link class="dropdown-item " to="/viewfeedback"onClick={handleClose}>View Feedback</Link>
              <Link class="dropdown-item " to="/viewcontact " onClick={handleClose}>View Contact</Link>
            </div>
          </li>
          <li class="nav-item">
            <Link class="nav-link " onClick={handleClick} >Log in</Link>
      
          </li>
          <li class="nav-item">
            <Link class="nav-link " onClick={handleClick1} >Register</Link>
      
          </li>
          <li class="nav-item">
            <Link class="nav-link " to="/bookingrequest" onClick={handleClose}>Booking</Link>
      
          </li>
          <li class="nav-item">
            <Link class="nav-link " to="/feedback" onClick={handleClose}>Feedback</Link>
      
          </li>
          
       
        </ul>
      </div>

      <button type="submit" class="btn btn-b-n " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleClose1} >
        <i class="bi bi-search"></i>
      </button>

      

    </div>
   </nav>
       </>
    )
}