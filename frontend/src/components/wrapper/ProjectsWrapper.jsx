import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const navData = [
    { link: '/projects', name: 'All', icon: "bx-list-check" },
    { link: '/projects/my', name: 'My Projects', icon: "bxs-user-pin"  },
    { link: '/projects/add', name: 'Create project' , icon: "bx-message-alt-add" }
];
const MenuItem = (item, index) => {
    const location = useLocation();
    const isActive = location.pathname === item.link;
    return (
        <li key={index} className="nav-item">
            <Link className={`nav-link ${isActive ? 'active' : ''}`} to={item.link} aria-label={`Go to ${item.ariaLabel}`}><i className={`bx ${item.icon}`}></i>{item.name}</Link>
        </li>
    )
};
export const ProjectsWrapper = ({ title, children }) => {
    return (
        <>
            <h4 className="py-3 mb-4"><span className="text-muted fw-light">Projects/</span> {title}</h4>

            <div className="row">
                <div className="col-md-12">
                    <ul className="nav nav-pills flex-column flex-md-row mb-3">
                        {navData.map(MenuItem)}
                    </ul>
                    {children}
                </div>
            </div>
        </>
    )
}
