import SearchResults from './SearchResults';
import {useState} from 'react';
import axios  from 'axios';
export default function PatientSearchPage() {
    const [page, setPage] = useState(1);
    const [results, setResults] = useState([]);

    // Fetch results with page parameter
    const fetchResults = (pageNum) => {
        axios.get(`/api/patients?page=${pageNum}`).then(response => {
            setResults(response.data);
        });
    };

    return (
        <div>
            <SearchResults
                results={results}
                onPageChange={fetchResults}
                onViewPatient={(patient) => console.log('Viewing:', patient)}
            />
        </div>
    );
}
