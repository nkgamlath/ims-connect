import React , {useState, useEffect} from 'react'
import { IdeasWrapper } from '../components/wrapper/IdeasWrapper'
import { useAuth } from "../utils/AuthProvider";

export const IdeasPage = () => {
    const [records, setRecords] = useState([]);
    const auth = useAuth();

    const loadData = async () => {

        try {

            const response = await fetch("http://localhost:3001/api/idea/list", {
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
         <IdeasWrapper title="All" >
        <>
            {/* <h4 className="py-3 mb-4"><span className="text-muted fw-light"> Ideas</span></h4> */}

            {/* <!-- Basic Bootstrap Table --> */}
            <div className="card">
                <h5 className="card-header">Ideas</h5>
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Idea</th>
                                <th>Submitted by</th>
                                <th>rank</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                        {records.map((row, i) => {
                                    return (
                                    <tr key={i}>
                                        <td>[{row.id}] {row.title}</td>
                                        <td>{row.created_by_name}</td>
                                        <td>{row.rank}</td>
                                        <td><span className="badge bg-label-primary me-1">{row.status}</span></td>
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
        </IdeasWrapper>
    )
}
