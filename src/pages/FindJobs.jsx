import { useState ,useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import Header from "../components/Header";
import { experience, jobTypes, REACT_APP_API_URL} from "../utils/data";
import { CustomButton, JobCard, ListBox } from "../components";

const FindJobs = () => {
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordCount, setRecordCount] = useState(0);
  const [data, setData] = useState([]);
const [filterSalary, setFilterSalary] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [filterJobTypes, setFilterJobTypes] = useState([]);
  

  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const salaryRanges = [
    { title: "₹0 - ₹5,00,000", value: "0-500000" },
    { title: "₹5,00,000 - ₹10,00,000", value: "500000-1000000" },
    { title: "₹10,00,000 - ₹20,00,000", value: "1000000-2000000" },
    { title: "₹20,00,000+", value: "2000000+" },
  ];
  const [jobs, setJobs] = useState([]);   
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchJobs = async () => {
        try {
          console.log(`${REACT_APP_API_URL}/jobs`)
          const res = await fetch(`${REACT_APP_API_URL}/jobs`); 
          if (!res.ok) throw new Error("Failed to fetch jobs");
          const data = await res.json();
          setJobs(data);
        } catch (err) {
          console.error(err);
          setErrMsg("Could not load jobs.");
        } finally {
          setLoading(false);
        }
      };
      fetchJobs();
    }, []);
  const filterJobs = (val) => {
    if (filterJobTypes?.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el != val));
    } else {
      setFilterJobTypes([...filterJobTypes, val]);
    }
  };
  let filteredJobs = [...jobs];

  if (filterJobTypes.length > 0) {
    filteredJobs = filteredJobs.filter((job) =>
      filterJobTypes.includes(job.jobType) 
    );
  }
const handleFilterSalary = (val) => {
  if (filterSalary.includes(val)) {
    // remove if already selected
    setFilterSalary(filterSalary.filter((el) => el !== val));
  } else {
    // add new selected
    setFilterSalary([...filterSalary, val]);
  }
};

if (filterSalary.length > 0) {
  filteredJobs = filteredJobs.filter((job) => {
    return filterSalary.some((range) => {
      if (range.includes("+")) {
        const min = parseInt(range.replace("+", ""));
        return job.salary >= min;
      } else {
        const [min, max] = range.split("-").map(Number);
        return job.salary >= min && job.salary <= max;
      }
    });
  });
}
if (searchQuery.trim() !== "") {
  filteredJobs = filteredJobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

if (jobLocation.trim() !== "") {
  filteredJobs = filteredJobs.filter((job) =>
    job.location.toLowerCase().includes(jobLocation.toLowerCase())
  );
}

  const sortedJobs = filteredJobs.sort((a, b) => {
  if (sort === "Newest") {
    return new Date(b.datePosted) - new Date(a.datePosted); // latest first
  }
  if (sort === "Oldest") {
    return new Date(a.datePosted) - new Date(b.datePosted); // oldest first
  }
  if (sort === "A-Z") {
    return a.jobTitle.localeCompare(b.jobTitle); // alphabetical ascending
  }
  if (sort === "Z-A") {
    return b.jobTitle.localeCompare(a.jobTitle); // alphabetical descending
  }
  return 0;
});

  return (
    <div>
      <Header
        title=''
        type='home'
        handleClick={() => {}}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setLocation={setJobLocation}
      />

      <div className='container mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#f7fdfd]'>
        <div className='hidden md:flex flex-col w-1/6 h-fit bg-white shadow-sm'>
          <p className='text-lg font-semibold text-slate-600'>Filter Search</p>

          <div className='py-2'>
            <div className='flex justify-between mb-3'>
              <p className='flex items-center gap-2 font-semibold'>
                <BiBriefcaseAlt2 />
                Job Type
              </p>

              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div className='flex flex-col gap-2'>
              {jobTypes.map((jtype, index) => (
                <div key={index} className='flex gap-2 text-sm md:text-base '>
                  <input
                    type='checkbox'
                    value={jtype}
                    className='w-4 h-4'
                    onChange={(e) => filterJobs(e.target.value)}
                  />
                  <span>{jtype}</span>
                </div>
              ))}
            </div>
          </div>



<div className='py-2 mt-4'>
  <div className='flex justify-between mb-3'>
    <p className='flex items-center gap-2 font-semibold'>
      <BsStars />
      Salary Range
    </p>

    <button>
      <MdOutlineKeyboardArrowDown />
    </button>
  </div>

  <div className='flex flex-col gap-2'>
    {salaryRanges.map((range) => (
      <div key={range.title} className='flex gap-3'>
        <input
          type='checkbox'
          value={range.value}
          className='w-4 h-4'
          onChange={(e) => handleFilterSalary(e.target.value)}
        />
        <span>{range.title}</span>
      </div>
    ))}
  </div>
</div>


        </div>

        <div className='w-full md:w-5/6 px-5 md:px-0'>
          <div className='flex items-center justify-between mb-4'>
            <p className='text-sm md:text-base'>
              Showing: <span className='font-semibold'>{sortedJobs.length}</span> Jobs
              Available
            </p>

            <div className='flex flex-col md:flex-row gap-0 md:gap-2 md:items-center'>
              <p className='text-sm md:text-base'>Sort By:</p>

              <ListBox sort={sort} setSort={setSort} />
            </div>
          </div>

          <div className='w-full flex flex-wrap gap-4'>
         {sortedJobs.map((job, index) => (
  <JobCard job={job} key={index} />
))}
          </div>

          {numPage > page && !isFetching && (
            <div className='w-full flex items-center justify-center pt-16'>
              <CustomButton
                title='Load More'
                containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
