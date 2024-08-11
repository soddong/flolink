import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import NewFeedForm from '../../components/feed/NewFeedForm';

const NewFeedCreatePage = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-custom-gradient p-4">
            <header className="mb-4 flex justify-center items-center relative w-full max-w-2xl">
                <button 
                    className="absolute left-4 text-xl text-black"
                    onClick={() => navigate(-1)}
                >
                    &lt;
                </button>
                <img src={logo} alt="Logo" className="h-20 mx-auto" />
            </header>
            <h1 className="text-center text-sm font-bold mb-5">Write your own diary</h1>
            <div className="w-full max-w-2xl h-3/5"> 
                <NewFeedForm />
            </div>
            
        </div>
    )
}

export default NewFeedCreatePage;