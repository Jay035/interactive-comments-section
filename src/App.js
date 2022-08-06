import './App.css';
// import {Comment} from './components/comment';
import { Main } from './components/comment/Main';
import { Footer } from './Footer';

function App() {
  // const [comments, setComments] = useState(null);
  // const [isPending, setIsPending] = useState(true);

  // const handleDelete = (id) => {
  //   const newComments = comments.filter(comment => comment.id !== id);
  //   setComments(newComments);
  // };
  // useEffect(() => {
  //   fetch('http://localhost:8000/comments')
  //   .then(res => {
  //     if(!res.ok){
  //       throw Error('could not fetch the data for that resource');
  //     }
  //     return res.json()
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     setComments(data);
  //     setIsPending(false);
  //   })
  //   .catch(err => {
  //     console.log(err.message);
  //   })
  // }, []);


  return (
    <div className="App">
      {/* {isPending && <div className="container">Loading...</div>}
      {comments && <Comment comments={comments} handleDelete={handleDelete} />} */}
      <main>
        <Main />
      </main>
      <Footer />
    </div>
  );
}

export default App;
