// vendors
import React, { useEffect, useState } from "react";
import Table from "../../components/table/table.jsx";
import { useSelector, useDispatch } from "react-redux";
import { Button, Label } from "@material-tailwind/react";
import formatDistance from "date-fns/formatDistance";
import { addDays, subDays, format } from "date-fns";

// actions


// services
import bugServices from "../../services/bug.services.js";

// components
import Modal from "../../components/modal/Modal.jsx";
import ModalHeader from "../../components/modal/ModalHeader.jsx";
import ModalFooter from "../../components/modal/ModalFooter.jsx";
import Spinner from "../../components/spinner/spinner.jsx";
import ReactDatePicker from "../../components/datepicker/datepicker.jsx";

function BugPage() {
  const dispatch = useDispatch();
  const [bugs, setBugs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState({
    startDate: subDays(new Date(), 30),
    endDate: new Date(),
  });
  const [loading, setLoading] = useState(false);

  const toggle = () => {
    setShowModal(!showModal);
  };

  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Project",
      accessor: "project.projectName",
    },
    {
      Header: "Desc",
      accessor: "description",
      Cell: (row) => {
        return row.value.slice(0, 50);
      },
      width: 150,
    },
    {
      Header: "Report Date",
      accessor: "reportDate",
      maxWidth: 120,
      Cell: (row) => {
        return (
          <p>
            <span className='block'>
              {format(new Date(row.value), "do MMM, yyyy")}
            </span>
            <span className='text-xs italic text-slate-400'>
              {formatDistance(subDays(new Date(row.value), 0), new Date(), {
                addSuffix: true,
              })}
            </span>
          </p>
        );
      },
    },
    {
      Header: "Priority",
      accessor: "priority",
      width: 100,
      headerStyle: { textAlign: "center" },
      Cell: (row) => {
        if (row.value === "High") {
          return <p className='danger mx-auto'>{row.value}</p>;
        } else if (row.value === "Medium") {
          return <p className='warning mx-auto'>{row.value}</p>;
        } else if (row.value === "Low") {
          return <p className='primary mx-auto'>{row.value}</p>;
        } else {
          return <p className='secondary mx-auto'>{row.value}</p>;
        }
      },
    },
    {
      Header: "Reported By",
      accessor: "reportedBy.username",
      width: 100,
    },
    {
      Header: "Message",
      accessor: "msg",
      width: 150,
      Cell: (row) => {
        if (!row.value) {
          return (
            <p className='text-slate-400 pointer-events-none italic text-sm'>
              Wait for Message.
            </p>
          );
        }
        return row.value;
      },
    },
    {
      Header: "Status",
      accessor: "status",
      width: 110,
      Cell: (row) => {
        if (row.value === "Resolved") {
          return <p className='success mx-auto'>{row.value}</p>;
        } else if (row.value === "Pending") {
          return <p className='warning mx-auto'>{row.value}</p>;
        } else if (row.value === "Rejected") {
          return <p className='danger mx-auto'>{row.value}</p>;
        }
        return <p className='secondary w-24 mx-auto'>{row.value}</p>;
      },
    },
  ];

  useEffect(() => {
    const { startDate, endDate } = date;
    if (startDate && endDate) {
      const Obj = {
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      };
      setLoading(true);
      bugServices
        .getFilteredBugs(Obj)
        .then((res) => {
          setBugs(res?.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [date, dispatch]);

  const getDate = (value) => {
    setDate(value);
  };
  return (
    <div className='mx-4 text-sm'>
      <h1 className='text-4xl text-slate-700 py-3'>Recent Bugs</h1>
      <div className='relative'>
        <div className='lg:absolute right-0 top-4'>
          <div className='flex gap-x-4 flex-row z-50'>
            <ReactDatePicker
              startDate={date?.startDate}
              endDate={date?.endDate}
              getDate={getDate}
            />
            <Button
              color='lightBlue'
              buttonType='filled'
              size='regular'
              rounded={false}
              block={false}
              iconOnly={false}
              ripple='light'
              onClick={toggle}
            >
              Add Bug
            </Button>
          </div>
        </div>
        {!loading && <Table columns={columns} data={bugs ?? []} pagination={true} />}
      </div>
      <div className='flex flex-row items-center justify-center py-4'>
        {loading && <Spinner />}
      </div>
    </div>
  );
}

export default BugPage;
