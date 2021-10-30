import React from 'react';

const PrivatePage = (props) => {
    const isLogged = !!localStorage.getItem('token');
    return (isLogged ? props.children : null);
};

export default PrivatePage;
