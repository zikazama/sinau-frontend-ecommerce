import { useDispatch, useSelector } from 'react-redux';
import slice from '../slices/slice.js';

const Counter = () => {
    const dispatch = useDispatch();
    const count = useSelector(state => state.counter.value);

    const { incremented, decremented } = slice;

    return (
        <div>
            <h1 className='text-2xl font-bold'>Counter <br />
                {count}
            </h1>
            <button className='bg-blue-500 text-white p-2 rounded-md mr-2' onClick={() => dispatch(incremented())}>Increment</button>
            <button className='bg-red-500 text-white p-2 rounded-md' onClick={() => dispatch(decremented())}>Decrement</button>
        </div>
    )
}

export default Counter;