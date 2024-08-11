
import { Link } from 'react-router-dom';

function TemporaryStartPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '20px' }}>
            <h1>Temporary Start Page</h1>
            <Link to="/channelselect"><button>Channel Select Page</button></Link>
            <Link to="/login"><button>Login Page</button></Link>
            <Link to="/main"><button>Main Page</button></Link>
            <Link to="/FindAccount"><button>Find Account Page</button></Link>
            <Link to="/Loading"><button>Loading Page</button></Link>
            <Link to="/PwReset"><button>Password Reset Page</button></Link>
            <Link to="/itemstore"><button>ItemStore Page</button></Link>
            <Link to="/signup"><button>Sign Up Page</button></Link>
            <Link to="/feedlist"><button>Feed List Page</button></Link>
            <Link to="/feedcreate"><button>Feed Create Page</button></Link>
            <Link to="/schedule"><button>Schedule Page</button></Link>
            <Link to="/garden"><button>Family Garden</button></Link>
            <Link to="/myroom"><button>MyRoom Page</button></Link>
            <Link to="/payment"><button>Payment Page</button></Link>
            <Link to="/setting"><button>Setting Page</button></Link>
            <Link to="/location"><button>Location Page</button></Link>
        </div>
    )
}

export default TemporaryStartPage;