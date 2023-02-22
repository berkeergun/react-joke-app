import React,{useState} from "react";
import {
  Wrapper,
  Row,
  Header,
  Image,
  Form,
  Search,
  Button,
} from "./components/styled/index";
import axios from "axios"
import JokeItem from "./components/JokeItem";
import joker from "./images/joker.svg";
import Modal from "./components/Modal"
import useModal from "./hooks/useModal";

import { Joke, Flag, Category } from "./common/types";

// https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?blacklistFlags=nsfw&type=single,twoparts&amount=10
const BASE_URL= "https://v2.jokeapi.dev/joke"

const App = () => {
  const [search,setSearch]=useState("");
  const [error,setError]=useState(false);
  const [jokes,setJokes]=useState<Joke[]>([]);

  const [categories,setCategories]=useState<string[]>(["Programming","Miscellaneous","Dark","Pun","Spooky","Christmas"])
  const [blacklist,setBlacklist]=useState<string[]>([])
  const [jokeType,setJokeType]=useState<string[]>(["single","twopart"])

  // console.log(categories)

  const { isOpen, toggle } = useModal();

  const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setSearch(event.target.value)
  }
  const getJokes= async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const categoriesString=categories?.join(",")
    const blacklistString=blacklist?.join(",")
    const jokeTypeString=jokeType?.join(",")

    const any = `${BASE_URL}/Any?contains=${search}&blacklistFlags=${blacklistString}&type=${jokeTypeString}&amount=10`
    const notAny = `${BASE_URL}/${categoriesString}?contains=${search}&blacklistFlags=${blacklistString}&type=${jokeTypeString}&amount=10`

    const ENDPOINT = categories.length < 1 ? any : notAny ;
    const {data} = await axios.get(ENDPOINT)
    // console.log(data)

    if(data.error){
      setError(true)
      setJokes([])
    }else{
      setError(false)
      setJokes(data.jokes)
    }
    setSearch("")

  } 
  const onChangeCategories = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(!categories.includes(e.target.value)){
      let arr = [...categories, e.target.value];
      setCategories(arr)
      // console.log(arr)
    }
    else{
      let arr = categories.filter(item => item !== e.target.value )
      setCategories(arr)
    }
  }
  const onChangeBlacklist = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(!blacklist.includes(e.target.value)){
      let arr = [...blacklist, e.target.value];
      setBlacklist(arr)
      // console.log(arr)
    }
    else{
      let arr = blacklist.filter(item => item !== e.target.value )
      setBlacklist(arr)
    }
  }
  const onChangeJokeType = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(!jokeType.includes(e.target.value)){
      let arr = [...jokeType, e.target.value];
      setJokeType(arr)
      // console.log(arr)
    }
    else{
      let arr = jokeType.filter(item => item !== e.target.value )
      setJokeType(arr)
    }
  }

  const renderCategoryItem= (value:string,type:string) => {

    if(type === "categories"){
      return (
        <div style={{display:"flex",flexDirection:"row",width:"130px",border:"0px solid black"}}>
          <input type="checkbox" value={value} checked={categories.includes(value)} onChange={(e)=>onChangeCategories(e)} />
          <span className="modal-checkbox">{value}</span>
        </div>
      )
    }
    if(type === "blacklist"){
      return (
        <div style={{display:"flex",flexDirection:"row",width:"130px",border:"0px solid black"}}>
          <input type="checkbox" value={value} checked={blacklist.includes(value)} onChange={(e)=>onChangeBlacklist(e)} />
          <span className="modal-checkbox">{value}</span>
        </div>
      )
    }
    if(type === "jokeType"){
      return (
        <div style={{display:"flex",flexDirection:"row",width:"130px",border:"0px solid black"}}>
          <input type="checkbox" value={value} checked={jokeType.includes(value)} onChange={(e)=>onChangeJokeType(e)} />
          <span className="modal-checkbox">{value}</span>
        </div>
      )
    }


  }

  return (
    <div>
      <Wrapper>
        <Row>
          <Header>Joker</Header>
          <Image src={joker} alt="joker" />
        </Row>

        <Form onSubmit={getJokes}>
          <Search
            type="text"
            placeholder="Search.."
            value={search}
            onChange={handleChange}
          />
          <Button type="submit">Joke Joke</Button>
          <Button style={{marginLeft:"5px"}} type="button" onClick={toggle}>Settings</Button>
        </Form>

        {/* <Button onClick={toggle}>Settings</Button> */}
        <Modal isOpen={isOpen} toggle={toggle}>
            <div>

              <div style={{margin:"10px",padding:"10px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <h3>Categories</h3>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"5px",flexWrap:"wrap",border:"0px solid red"}}>
                  {renderCategoryItem("Programming","categories")}
                  {renderCategoryItem("Miscellaneous","categories")}
                  {renderCategoryItem("Dark","categories")}
                  {renderCategoryItem("Pun","categories")}
                  {renderCategoryItem("Spooky","categories")}
                  {renderCategoryItem("Christmas","categories")}
                  {/* <input type="checkbox" value={"Programming"} checked={categories.includes("Programming")} onChange={(e)=>onChangeCategories(e)} />
                  <span className="modal-checkbox">Programming</span>*/}
                </div>
              </div>

              <div style={{margin:"10px",padding:"10px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <h3>Blacklist</h3>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"5px",flexWrap:"wrap"}}>
                  {renderCategoryItem("nsfw","blacklist")}
                  {renderCategoryItem("religious","blacklist")}
                  {renderCategoryItem("political","blacklist")}
                  {renderCategoryItem("racist","blacklist")}
                  {renderCategoryItem("sexist","blacklist")}
                  {renderCategoryItem("explicit","blacklist")}
                  {/* <input type="checkbox" value={"nsfw"} checked={blacklist.includes("nsfw")} onChange={(e)=>onChangeBlacklist(e)} />
                  <span className="modal-checkbox">Nsfw</span>*/}
                </div>
              </div>

              <div style={{margin:"10px",padding:"10px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <h3>Joke Type</h3>
                <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",margin:"5px",flexWrap:"wrap"}}>
                  {renderCategoryItem("single","jokeType")}
                  {renderCategoryItem("twopart","jokeType")}
                  {/* <input type="checkbox" value={"single"} checked={jokeType.includes("single")} onChange={(e)=>onChangeJokeType(e)} />
                  <span className="modal-checkbox">Single</span>*/}
                </div>
              </div>

            </div>
        </Modal>

        {/* Jokes */}
        <div style={{border:"0px solid black"}}>
          {error && <p>Sorry no jokes found...</p>}
          
          {jokes.length >1 && 
          // @ts-ignore
          jokes.map(joke => <JokeItem key={joke.id} joke={joke} /> )}
        </div>

      </Wrapper>
    </div>
  );
};

export default App;
