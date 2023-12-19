import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addList, dislikeListItem, likeListItem } from "../redux/reducer";

function List() {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  const [refreshButton, setRefreshButton] = useState(false);
  const listArray = useSelector((state) => state.list);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (list && list.length > 0) {
      setTotalPages(list.length / 10);
    }
  }, [list]);

  useEffect(() => {
    const newData = list.slice(page * 10, page * 10 + 10);
    console.log(newData, page);
    setFilteredList(newData);
  }, [page, list]);

  
  useEffect(()=>{
    if(listArray && listArray.length>0){
        setList(listArray);
    }
  },[listArray])

  const fetchData = async () => {
    const data = await axios.get("https://jsonplaceholder.typicode.com/posts");
    dispatch(addList(data.data));
    setRefreshButton(true);
    setTimeout(() => {
      setRefreshButton(false);
    }, 5000);
  };

  console.log(listArray,'shashank');

  return (
    <div className="App">
      <div>
        <ul>
          {filteredList &&
            filteredList.length > 0 &&
            filteredList.map((item, index) => {
              return (
                <li>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "30px",
                      alignItems:'center'
                    }}
                  >
                    <h4>{item.title}</h4>
                    <button
                      style={{
                        display: "inline-flex", // Use flex container
                        alignItems: "center", // Center vertically
                        height: "40px", // Set height
                        padding: "0 20px",
                        fontSize: "16px",
                        textAlign: "center",
                        textDecoration: "none",
                        cursor: "pointer",
                        backgroundColor: item.like ? "#4CAF50" : 'blue',
                        color: "white",
                        border: "1px solid #4CAF50",
                        borderRadius: "5px",
                        transition: "background-color 0.3s",
                      }}
                      onClick={()=>{
                        dispatch(likeListItem({listArray,id:item.id}));
                      }}
                    >
                      Like
                    </button>
                    <button
                      style={{
                        display: "inline-block",
                        padding: "10px 10px",
                        fontSize: "16px",
                        textAlign: "center",
                        textDecoration: "none",
                        height: "40px",
                        cursor: "pointer",
                        backgroundColor: item.dislike ? "#4CAF50" : 'blue',
                        color: "white",
                        border: "1px solid #4CAF50", // Green
                        borderRadius: "5px",
                        transition: "background-color 0.3s",
                      }}
                      onClick={()=>{
                        dispatch(dislikeListItem({listArray,id:item.id}));
                      }}
                    >
                      Dislike
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <button
        onClick={() => {
          if (!refreshButton) {
            fetchData();
          }
        }}
      >
        Call Api
      </button>
      {totalPages && <ul>
        {totalPages >= 1 && Array.from(Array(totalPages).keys()).map((item, index) => {
          return <button onClick={() => setPage(item)}>{item}</button>;
        })}
      </ul>}
    </div>
  );
}

export default List;
