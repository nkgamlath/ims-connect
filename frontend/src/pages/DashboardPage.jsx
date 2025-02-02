import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthProvider";

export const DashboardPage = () => {
    const auth = useAuth();
    const [topIdeas, setTopIdeas] = useState([]);
    const [myTopIdea, setMyTopIdea] = useState(null);

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
                setTopIdeas(result.records)

                try {
                    //load my top idea
                    console.log("set my top ideas", result)
                    if( result.length > 0){
                        setMyTopIdea(result[0]);
                    }
                    
                } catch (error) {
                    console.log(error)
                }
            }

        } catch (error) {
            console.error(error);
        }

        try {
            //load my top idea
            console.log("set my top ideas", topIdeas)
            if(topIdeas && topIdeas.length > 0){
                setMyTopIdea(topIdeas[0]);
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dashboardAnalitics();
        loadData();
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-lg-8 mb-4 order-0">
                    <div className="card">
                        <div className="d-flex align-items-end row">
                            <div className="col-sm-7">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">
                                        Welcome {auth.user.first_name}! 🎉
                                    </h5>
                                    <p className="mb-4">
                                        You have an innovative idea! Let's start building it together.
                                    </p>

                                    <a aria-label="view badges"
                                        href="#"
                                        className="btn btn-sm btn-outline-primary"
                                    >
                                        Submit Your Idea
                                    </a>
                                </div>
                            </div>
                            <div className="col-sm-5 text-center text-sm-left">
                                <div className="card-body pb-0 px-0 px-md-4">
                                    <img aria-label='dsahboard icon image'
                                        src="/assets/img/illustrations/man-with-laptop-light.png"
                                        height="140"
                                        alt="View Badge User"
                                        data-app-dark-img="illustrations/man-with-laptop-dark.png"
                                        data-app-light-img="illustrations/man-with-laptop-light.png"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 order-1">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                            <img aria-label='dsahboard icon image'
                                                src="/assets/img/icons/unicons/chart-success.png"
                                                alt="chart success"
                                                className="rounded"
                                            />
                                        </div>
                                        <div className="dropdown">
                                            <button aria-label='Click me'
                                                className="btn p-0"
                                                type="button"
                                                id="cardOpt3"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div
                                                className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="cardOpt3"
                                            >
                                                <a aria-label="view more" className="dropdown-item" href="#">
                                                    View More
                                                </a>
                                                <a aria-label="delete" className="dropdown-item" href="#">
                                                    Delete
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="fw-medium d-block mb-1">Global Space</span>
                                    <h3 className="card-title mb-2">0</h3>
                                    <small className="text-success fw-medium">
                                        <i className="bx bx-up-arrow-altx"></i> Idea count
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                            <img aria-label='dsahboard icon image'
                                                src="/assets/img/icons/unicons/wallet-info.png"
                                                alt="Credit Card"
                                                className="rounded"
                                            />
                                        </div>
                                        <div className="dropdown">
                                            <button aria-label='Click me'
                                                className="btn p-0"
                                                type="button"
                                                id="cardOpt6"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div
                                                className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="cardOpt6"
                                            >
                                                <a aria-label="view more" className="dropdown-item" href="#">
                                                    View More
                                                </a>
                                                <a aria-label="delete" className="dropdown-item" href="#">
                                                    View More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <span>Region</span>
                                    <h3 className="card-title text-nowrap mb-1">0</h3>
                                    <small className="text-success fw-medium">
                                        <i className="bx bx-up-arrow-altx"></i> Idea count
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                    <div className="card hvn-100">
                        <h5 className="card-header">High ranked Ideas</h5>
                        <div className="table-responsive text-nowrap">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Idea</th>
                                        <th>Submitted by</th>
                                        <th>Rank</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">

                                {topIdeas.map((row, i) => {
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
                </div>
                <div className="col-12 col-md-8 col-lg-4 order-3 order-md-2">
                    <div className="row">
                        <div className="col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                            <img aria-label='dsahboard icon image'
                                                src="/assets/img/icons/unicons/paypal.png"
                                                alt="Credit Card"
                                                className="rounded"
                                            />
                                        </div>
                                        <div className="dropdown">
                                            <button aria-label='Click me'
                                                className="btn p-0"
                                                type="button"
                                                id="cardOpt4"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div
                                                className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="cardOpt4"
                                            >
                                                <a aria-label="view more" className="dropdown-item" href="#">
                                                    View More
                                                </a>
                                                <a aria-label="delete" className="dropdown-item" href="#">
                                                    View More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="d-block mb-1">Country</span>
                                    <h3 className="card-title text-nowrap mb-2">2</h3>
                                    <small className="text-success fw-medium">
                                        <i className="bx bx-down-arrow-altx"></i> Idea count
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                            <img aria-label='dsahboard icon image'
                                                src="/assets/img/icons/unicons/cc-primary.png"
                                                alt="Credit Card"
                                                className="rounded"
                                            />
                                        </div>
                                        <div className="dropdown">
                                            <button aria-label='Click me'
                                                className="btn p-0"
                                                type="button"
                                                id="cardOpt1"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="cardOpt1">
                                                <a aria-label="view more" className="dropdown-item" href="#">
                                                    View More
                                                </a>
                                                <a aria-label="delete" className="dropdown-item" href="#">
                                                    View More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="fw-medium d-block mb-1">Office</span>
                                    <h3 className="card-title mb-2">2</h3>
                                    <small className="text-success fw-medium">
                                        <i className="bx bx-up-arrow-altx"></i> Idea count
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                                        <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                                            <div className="card-title">
                                                <h5 className="text-nowrap mb-2">Your top idea</h5>
                                                <div className="bg-label-warning rounded-pillx">
                                                    {(myTopIdea) ? myTopIdea.title : 'No idea found. It\s high time to create one.'}
                                                </div>
                                            </div>
                                            <div className="mt-sm-auto">
                                                <small className="text-success text-nowrap fw-medium">
                                                    <i className="bx bx-up-arrow-alt"></i> Vote count: 1
                                                </small>
                                                {/* <h3 className="mb-0">$84,686k</h3> */}
                                            </div>
                                        </div>
                                        {/* <div id="profileReportChart"></div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};