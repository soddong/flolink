import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingPage from '../loading/Loadingpage';
import { motion, AnimatePresence } from 'framer-motion';

const UserCertPage = ({children}) => {
    
    const [isLoading, setIsloading ] =  useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 2000)); 
            }
            catch {
                console.log('error');
            }
            finally {
                setIsloading(false);
            }
        }
        // jwt 인증 처리할 자리

        fetchData();
    }
    
    ,[])

    useEffect(() => {
        if (!isLoading) {
            setShowContent(true); // 로딩이 끝나면 children을 보여주도록 설정
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