import React,{useState,useEffect, Fragment} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useLocation,useNavigate} from "react-router-dom"
import {toast} from 'react-hot-toast';
const Datatable = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleClose = () => setShow(false);
    const [recipes,setRecipes]=useState([])
    const [ingredients,setIngredients]=useState([])
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [recipe,setRecipe]=useState('');
    const [editId,setEditId]=useState(0);
    const [editName,setEditName]=useState('');
    const [editImage,setEditImage]=useState('');
    const [editVeg_NonVeg,setEditVeg_NonVeg]=useState('');
    const [editNutrition,setEditNutrition]=useState('');
    const [editInstruction,setEditInstruction]=useState('');
    const [editVideo,setEditVideo]=useState('');
    const [data,setData]=useState([]);
    useEffect(()=>{
        getData();
    },[])
    const getData = async () => {
        const url = `http://localhost:5112/api/Recipe/Get3`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    function newvalue(){
        navigate('/recipe/new')
    }
    const handleEdit=async(id)=>{
        handleShow();
        setEditId(id);
        const url = `http://localhost:5112/api/user/Get2?id=${id}`;
         fetch(url)
            .then((response) => response.json())
            .then((jsonArray) => {
                const json = jsonArray[0]; 
                setEditName(json.recipe_name);
                setEditImage(json.recipe_image);
                setEditVeg_NonVeg(json.veg_nonveg);
                setEditNutrition(json.nutrition);
                setEditInstruction(json.instructions);
                setEditVideo(json.video);
        })};
    const handleView=async(id)=>{
      handleShow1();
      setEditId(id);
      const url = `http://localhost:5112/api/user/Get2?id=${id}`;
        fetch(url)
          .then((response) => response.json())
          .then((jsonArray) => {
              const json = jsonArray[0]; 
              setRecipe(json.recipe_name);
      })
    };
    const fetchingredientData = async () => {
      console.log('fetchdata');
      const url = `http://localhost:5112/api/ingredient1/Get2`;
      try {
        const response = await fetch(url);
        const data1 = await response.json();
        console.log('receipe');
        console.log(data1);
        setIngredients(data1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const handleOptionChange = (option) => {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    };
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setDropdownOpen(true);
    };
  
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
    const getData3 = async (url1,numlist) => {
      try {
        setLoading(true);
        fetch(url1)
          .then((response) => response.json())
          .then((json) => {
            setRecipes(json);
            console.log('json');
            console.log(json);
            toast.success('Successfully Added');
          });
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };
    const filteredOptions = ingredients.filter((option) =>
    option.ingredient_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
    
    const handleDelete=(id)=>{
        if(window.confirm("Are you sure to delete")===true){
        fetch(`http://localhost:5112/api/user?id=${id}`,{
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
        fetch(`http://localhost:5112/api/user/Put1?recipe_id=${editId}&recipe_name=${editName}&recipe_image=${editImage}&veg_nonveg=${editVeg_NonVeg}&nutrition=${editNutrition}&instructions=${editInstruction}&video=${editVideo}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                recipe_id:editId,
                recipe_name:editName,
                recipe_image:editImage,
                veg_nonveg:editVeg_NonVeg,
                nutrition:editNutrition,
                instructions:editInstruction,
                video:editVideo
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
    useEffect(() => {
      const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          handleSubmit();
        }
        console.log("useEffect");
        fetchingredientData();
      };
  
      document.addEventListener('keydown', handleKeyPress);
  
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, [selectedOptions]);
    const handleSubmit = () => {
      console.log('Selected options:', selectedOptions);
      var ingredient_list=[];
      var numlist=[];
      selectedOptions.forEach(answer => {
        var ingredient_item={};
        ingredient_item.ingredient_id=answer.ingredient_id;
        ingredient_list.push(ingredient_item);
        numlist.push(answer.ingredient_id);
        console.log("Entered");  
     })
     console.log("numlist");
     console.log(numlist);
     console.log("ingredient_list")
     console.log(ingredient_list);  
     var numlistpass=JSON.stringify(numlist);
     var ingredientlistpass=JSON.stringify(ingredient_list);
     console.log('numlistpass');
     console.log(numlistpass);
     //const url1 = `http://localhost:5112/api/ingredient1/Get3`;
     const url1 = `http://localhost:5112/api/user/insertRecipeIngredient?numlistpass=${ingredientlistpass}&recipe_id=${editId}`;
     getData3(url1,numlist);

      setSearchQuery('');
      setDropdownOpen(false);
    }
  return (
    <Fragment>
        <Container className='mt-20'>
            {/* <Row>
                <Col>
                <input type="text" className='form-control' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                </Col>
                <Col><input type="text" className='form-control' placeholder='Enter Age' value={age} onChange={(e)=>setAge(e.target.value)}/></Col>
                <Col><input type="checkbox" checked={isActive===1?true:false} onChange={(e)=>setIsActive(e)} value={isActive}/><label>isActive</label></Col>
                <Col><button className='btn btn-primary'>Submit</button></Col>
            </Row> */}
            <Col xs={12} className="flex justify-content-end">
                    <Button variant="primary" onClick={newvalue}>Add New Recipe</Button>
            </Col>
        </Container>
        <br></br>
    <Table striped bordered hover className='mt-5'>
      <thead>
        <tr>
          <th>Recipe Id</th>
          <th>Recipe Name</th>
          <th>Recipe Image</th>
          <th>Veg/NonVeg</th>
          <th>Nutrition</th>
          <th>Instruction</th>
          <th>Video Link</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length>0?data.map((item,index)=>{
            return(
                <tr key={index}>
                <td>{item.recipe_id}</td>
                <td>{item.recipe_name}</td>
                <td>{item.recipe_image}</td>
                <td>{item.veg_nonveg}</td>
                <td>{item.nutrition}</td>
                <td>{item.instructions}</td>
                <td>{item.video}</td>
                <td colSpan={2}>
                    <button className='btn btn-primary mr-2' onClick={()=>handleView(item.recipe_id)}>View</button>
                    <button className='btn btn-primary mr-2' onClick={()=>handleEdit(item.recipe_id)}>Edit</button>
                    <button className='btn btn-danger' onClick={()=>handleDelete(item.recipe_id)}>Delete</button>
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
                <Row><label>Recipe Name:</label></Row>
                <Row><input type="text" className='form-control' placeholder='Enter Name' value={editName} onChange={(e)=>setEditName(e.target.value)}/></Row>
                <Row><label>Recipe Image Link:</label></Row>
                <Row><input type="text" className='form-control' placeholder='Enter Image Link' value={editImage} onChange={(e)=>setEditImage(e.target.value)}/></Row>
                <Row><label>Veg/NonVeg:</label></Row>
                <Row><input type="text" className='form-control' placeholder='Enter Veg or NonVeg' value={editVeg_NonVeg} onChange={(e)=>setEditVeg_NonVeg(e.target.value)}/></Row>
                <Row><label>Nutrition:</label></Row>
                <Row><input type="text" className='form-control' placeholder='Enter Nutrition' value={editNutrition} onChange={(e)=>setEditNutrition(e.target.value)}/></Row>
                <Row><label>Instruction:</label></Row>
                <Row><input type="text" className='form-control' placeholder='Enter Instruction' value={editInstruction} onChange={(e)=>setEditInstruction(e.target.value)}/></Row>
                <Row><label>Video Link:</label></Row>
                <Row><input type="text" className='form-control' placeholder='Enter Video Link' value={editVideo} onChange={(e)=>setEditVideo(e.target.value)}/></Row>
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
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Ingredients for {recipe}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
            <Col>
            {selectedOptions.length > 0 && (
            <div className="flex flex-wrap items-center">
              {selectedOptions.map((option) => (
                <div
                  key={option.ingredient_id}
                  className="flex items-center bg-gray-200 rounded-full px-3 py-1 m-1"
                >
                  <span>{option.ingredient_name}</span>
                  <button
                    type="button"
                    className="ml-2 text-sm font-semibold text-gray-600"
                    onClick={() => handleOptionChange(option)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
          <input
            type="text"
            className="w-full px-4 py-3 text-md focus:outline-none"
            placeholder="Search Ingredients"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        {dropdownOpen && (
          <div className="absolute top-full left-0  max-h-60 overflow-y-scroll w-full bg-white border border-t-0 border-gray-300 rounded-b">
            {filteredOptions.map((option) => (
              <label
                key={option.ingredient_id}
                className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
                {option.ingredient_name}
              </label>
            ))}
          </div>
        )}
        <button
          type="button"
          className="absolute top-0 right-0 w-10 h-full flex items-center justify-center bg-gray-200 text-gray-600 focus:outline-none"
          onClick={toggleDropdown}
        >
          &#x25BC;
        </button>
            </Col>
        </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default Datatable