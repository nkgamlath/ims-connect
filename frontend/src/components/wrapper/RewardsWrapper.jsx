import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const navData = [
    { link: '/rewards', name: 'My rewards', icon: "bx-list-check" },
    { link: '/rewards/manage_by_me', name: 'Rewards managed by me', icon: "bxs-user-pin"  },
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
export const RewardsWrapper = ({ title, children }) => {
    return (
        <>
            <h4 className="py-3 mb-4"><span className="text-muted fw-light">Rewards/</span> {title}</h4>

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
