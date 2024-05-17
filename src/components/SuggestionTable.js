import React,{useState,useEffect, Fragment} from 'react'
import Table from 'react-bootstrap/Table';
const SuggestionTable = () => {

    const [data,setData]=useState([]);
    useEffect(()=>{
        getData();
    },[])
    const getData = async () => {
        const url = `http://localhost:5112/api/user/Get5`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  return (
    <Fragment>
    <Table striped bordered hover className='mt-5'>
      <thead>
        <tr>
          <th>Email</th>
          <th>Username</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length>0?data.map((item,index)=>{
            return(
                <tr key={index}>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>{item.suggestion}</td>
                </tr>
            )
            }):'Loading...'}
      </tbody>
    </Table>
    </Fragment>
  )
}

export default SuggestionTable