import React , {useState, useEffect} from 'react'
import { UsersWrapper } from '../components/wrapper/UsersWrapper'
import { useAuth } from "../utils/AuthProvider";

export const UsersPage = () => {
    const [records, setRecords] = useState([]);
    const auth = useAuth();

    const loadData = async () => {

        try {

            const response = await fetch("http://localhost:3001/api/user/list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + auth.token,
                },
                body: JSON.stringify({}),
            });

            const result = await response.json();
            if (result) {
                console.log("data from fetech", result)
                setRecords(result.records)
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
            loadData();
        }, [])

    return (
         <UsersWrapper title="All" >
        <>
            {/* <h4 className="py-3 mb-4"><span className="text-muted fw-light"> Users</span></h4> */}

            {/* <!-- Basic Bootstrap Table --> */}
            <div className="card">
                <h5 className="card-header">Users</h5>
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Scope</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                        {records.map((row, i) => {
                                    return (
                                    <tr key={i}>
                                        <td>{row.first_name} {row.last_name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.scope_name}</td>
                                        <td><span className={`badge me-1 bg-label-${(row.user_type == 'admin')? 'warning': (row.user_type == 'user')? 'primary': 'info'}`}>{row.user_type}</span></td>
                                        <td><div className="dropdown">
                                                <button aria-label='Click me' type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a aria-label="dropdown action option" className="dropdown-item" href="#"
                                                    ><i className="bx bx-edit-alt me-1"></i> Edit</a
                                                    >
                                                    <a aria-label="dropdown action option" className="dropdown-item" href="#"
                                                    ><i className="bx bx-trash me-1"></i> Delete</a
                                                    >
                                                </div>
                                            </div></td>
                                    </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <!--/ Basic Bootstrap Table --> */}

        </>
        </UsersWrapper>
    )
}
