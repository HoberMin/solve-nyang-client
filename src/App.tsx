import { Button } from './components/ui/button';
import './index.css';

const App = () => {
  // const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className='card'>
        <Button className='rounded-full bg-blue-200'>shadcn Button</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='border text-2xl'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
