import React,{useState,useEffect, Fragment} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {useNavigate} from "react-router-dom"
import {toast} from 'react-hot-toast';
const Ingredients = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const [editId,setEditId]=useState(0);
    const [editName,setEditName]=useState('');
    const [editImage,setEditImage]=useState('');
    const [editPrice,setEditPrice]=useState(0);
    const [editUnit,SetEditUnit]=useState();
    const [editQty,setEditQty]=useState(1);
    const [data,setData]=useState([]);
    useEffect(()=>{
        getData();
    },[])
    const getData = async () => {
        const url = `http://localhost:5112/api/Ingredient/Get3`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    function newvalue(){
        navigate('/ingredient/new1')
    }
    const handleEdit=async(id)=>{
        handleShow();
        setEditId(id);
        const url = `http://localhost:5112/api/Ingredient/Get4?id=${id}`;
         fetch(url)
            .then((response) => response.json())
            .then((jsonArray) => {
                const json = jsonArray[0]; 
                setEditName(json.ingredient_name);
                setEditImage(json.ingredient_image);
                setEditPrice(json.ingredient_price);
                SetEditUnit(json.unit);
        })};
    
    const handleDelete=(id)=>{
        if(window.confirm("Are you sure to delete")===true){
        fetch(`http://localhost:5112/api/Ingredient?id=${id}`,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            toast.success(result)
            getData();

        },(error)=>{
            toast.error('Failed')
        })
    }
    }
    const handleUpdate=()=>{
        fetch(`http://localhost:5112/api/Ingredient/Put1?ingredient_id=${editId}&ingredient_name=${editName}&ingredient_image=${editImage}&ingredient_price=${editPrice}&unit=${editUnit}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ingredient_id:editId,
                ingredient_name:editName,
                ingredient_image:editImage,
                ingredient_price:editPrice,
                unit:editUnit
            })
            })
            .then(res=>res.json())
            .then((result)=>{
                toast.success(result);
                getData();
            },(error)=>{
                toast.error('Failed');
            })
    }
  return (
    <Fragment>
        <Container className='mt-20'>
            <Col xs={12} className="flex justify-content-end">
                    <Button variant="primary" onClick={newvalue}>Add New Ingredient</Button>
            </Col>
        </Container>
        <br></br>
    <Table striped bordered hover className='mt-5'>
      <thead>
        <tr>
          <th>Ingredient Id</th>
          <th>Ingredient Name</th>
          <th>Ingredient Image</th>
          <th>Price</th>
          <th>Unit</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length>0?data.map((item,index)=>{
            return(
                <tr key={index}>
                <td>{item.ingredient_id}</td>
                <td>{item.ingredient_name}</td>
                <td>{item.ingredient_image}</td>
                <td>{item.ingredient_price}</td>
                <td>{item.unit}</td>
                <td>{item.qty}</td>
                <td colSpan={2}>
                    <button className='btn btn-primary mr-2' onClick={()=>handleEdit(item.ingredient_id)}>Edit</button>
                    <button className='btn btn-danger' onClick={()=>handleDelete(item.ingredient_id)}>Delete</button>
                </td>
                </tr>
            )
            }):'Loading...'}
      </tbody>
    </Table>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify/Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
            <Col>
                <Row><label>Ingredient Name:</label></Row>
                <Row><input type="text" className='form-control' placeholder='Enter Name' value={editName} onChange={(e)=>setEditName(e.target.value)}/></Row>
                <Row><label>Ingredient Image Link:</label></Row>
                <Row><input type="text" className='form-control' placeholder='Enter Image Link' value={editImage} onChange={(e)=>setEditImage(e.target.value)}/></Row>
                <Row><label>Price:</label></Row>
                <Row><input type="text" className='form-control' placeholder='Enter Price' value={editPrice} onChange={(e)=>setEditPrice(e.target.value)}/></Row>
                <Row><label>Unit:</label></Row>
                <Row><input type="text" className='form-control' placeholder='Enter Unit' value={editUnit} onChange={(e)=>SetEditUnit(e.target.value)}/></Row>
            </Col>
        </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default Ingredients