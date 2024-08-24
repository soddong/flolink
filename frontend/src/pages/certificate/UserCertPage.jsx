import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingPage from '../loading/Loadingpage';
import { motion, AnimatePresence } from 'framer-motion';

const UserCertPage = ({children}) => {
    
    const navigate = useNavigate();

    const [isLoading, setIsloading ] =  useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(()=> {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('ACCESS_TOKEN')?.split(' ')[1];
                if (token) {

                }
                else {

                }
            } catch (error) {
                console.log('인증 오류남 ㅅㄱ')
                navigate('/login');
            }
        }
    }
    
    ,[])

    useEffect(() => {
        if (!isLoading) {
            setShowContent(true); 
        }
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading ? (
                <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <LoadingPage />
                </motion.div>
            ) : (
                showContent && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                )
            )}
        </AnimatePresence>
    );
}

export default UserCertPage;