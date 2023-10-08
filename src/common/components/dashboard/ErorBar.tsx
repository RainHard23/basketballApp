import React from 'react';

const ErorBar = () => {
    return (
        <div>
            
        </div>
    );
};

export default ErorBar;

// import React, { useState, useEffect } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { useSelector } from 'react-redux';
// import { selectAppError } from '../../../module/app/appSelectors';
// import { useActions } from '../../../api/common/hooks/useActions';
// import { appActions } from '../../../module/app/appSlice';
//
// const slideIn = keyframes`
//   0% {
//     transform: translateY(100%);
//     opacity: 0;
//   }
//   100% {
//     transform: translateY(0);
//     opacity: 1;
//   }
// `;
//
// const slideOut = keyframes`
//   0% {
//     transform: translateY(0);
//     opacity: 1;
//   }
//   100% {
//     transform: translateY(100%);
//     opacity: 0;
//   }
// `;
//
// const ErrorSnackbarContainer = styled.div`
//   position: fixed;
//   bottom: 20px;
//   left: 50%;
//   transform: translateX(-50%);
//   padding: 16px;
//   background-color: red;
//   color: white;
//   border-radius: 8px;
//   animation: ${slideIn} 0.3s ease-out forwards, ${slideOut} 0.3s 2.5s ease-out forwards;
// `;
//
// export const ErrorSnackbar = () => {
//     const error = useSelector(selectAppError);
//     const { setAppError } = useActions(appActions);
//     const [isOpen, setIsOpen] = useState(false);
//
//     useEffect(() => {
//         setIsOpen(true);
//         const timer = setTimeout(() => {
//             setIsOpen(false);
//             setAppError({ error: null });
//         }, 2500); // Закрываем через 2.5 секунды
//         return () => clearTimeout(timer);
//     }, []);
//
//     return isOpen ? <ErrorSnackbarContainer>{error}</ErrorSnackbarContainer> : null;
// };
