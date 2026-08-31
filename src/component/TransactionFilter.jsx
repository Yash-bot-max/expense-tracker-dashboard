import "./TransactionFilter.css"
import { FaListUl } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
const TransactionFilter = ({ setSearchValue, SearchValue, CategoryFilter, setCategoryFilter, setSort, Sort, TypeFilter, setTypeFilter,FromDate,ToDate ,setFromDate,setToDate,active}) => {


    // Clear all transaction filters and reset them to their default values.
    const handleClear = () => {
        // Clear the search input.
        setSearchValue("");

        // Reset the category filter to show all categories.
        setCategoryFilter("All");

        // Reset the transaction type filter to show all types.
        setTypeFilter("All");

        // Reset the sorting option.
        setSort("All");

        // Clear the From Date filter.
        setFromDate("");

        // Clear the To Date filter.
        setToDate("");
    };
    return (
        <div>
            <nav>
                <div className="transaction-logo">
                    <FaListUl size={18}  />
                    <h2>Transactions</h2>
                </div>
                <ul>

                    <input type="text" value={SearchValue} onChange={(e) => { setSearchValue(e.target.value) }} className="search" placeholder="Search Transaction" />

                    <select className="search" value={CategoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        <option value="All">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Bills & Utilities">Bills & Utilities</option>
                        <option value="Health">Health</option>
                        <option value="Education">Education</option>
                        <option value="Travel">Travel</option>
                        <option value="Technology">Technology</option>
                        <option value="Other">Other</option>
                    </select>

                    <select className='search' value={TypeFilter} onChange={(e) => { setTypeFilter(e.target.value) }}>
                        <option value="All">All Type</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>

                    <select className='search' value={Sort} onChange={(e) => { setSort(e.target.value) }}>
                        <option value="All">All</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="highest">Highest Amount</option>
                        <option value="lowest">Lowest Amount</option>
                    </select>

                    <button className='clear-filter-btn' onClick={handleClear}><MdOutlineReplay size={15} />Clear Filter</button>
                </ul>

            </nav>

            <section>
                <div className="date-chip">
                    <span>From Date : </span>
                    <input className="date-input" type="date" placeholder='from' value={FromDate} onChange={(e) => setFromDate(e.target.value)} />
                </div>
                <div className="date-chip">
                    <span>To Date : </span>
                    <input className="date-input" type="date" value={ToDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
                <div className='active-filter'><FaFilter />Active filter : {active}</div>
            </section>


        </div>
    )
}

export default TransactionFilter
