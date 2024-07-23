import { useNavigate } from 'react-router-dom';

function SettingPage() {
    const navigate = useNavigate();

    return (
        <div className="setting-page">
            <button>뒤로가기</button>
            <h1>Settings</h1>
        </div>
    );
}

export default SettingPage;