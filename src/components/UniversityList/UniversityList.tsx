import React, { useEffect, useRef, useState } from 'react';
import './UniversityList.css';
import { useSearchParams } from 'react-router-dom';
import { TableRow } from '../../types/tableType';
import { serchByCountry } from '../../api';
import { getSearchWith } from '../../utils/getSearchWith';
import { Table } from '../Table/Table';
import { Form } from '../Form/Form';
import { PerPageSelector } from '../../types/perPageSelectorType';
import { Loader } from '../Loader/Loader';
import { getUniversitiesNumber } from '../../api/api';
import { Pagination } from '../Pagination/Pagination';
import { setLocalStorage } from '../../utils/setLocalStorage';
import { getSavedUniversityCount } from '../../utils/getSavedUniversityCount';

export const UniversityList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const country = searchParams.get('country') || '';
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') || '1');
  const [inputValue, setInputValue] = useState(country);
  const [perPage, setPerPage] = useState<PerPageSelector>(
    searchParams.get('perPage') as PerPageSelector || '10'
  );

  const [count, setCount] = useState(getSavedUniversityCount() || 0);
  const [universitiesNumber, setUniversitiesNumber] = useState(0);
  const [table, setTable] = useState<TableRow[] | []>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);  

  const totalPages = Math.ceil(universitiesNumber / +perPage) || 0;
  const currentPerPage = useRef(perPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page.toString())
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const normalizedValue = inputValue.trim();
    const isPerPage = currentPerPage.current === '10'
      ? null 
      : currentPerPage.current === '0'
        ? 'all'
        : currentPerPage.current;
    
    const newParams = { perPage: isPerPage, page: null };
    const newValue = !normalizedValue.length
      ? getSearchWith(searchParams, { country: null, ...newParams })
      : getSearchWith(searchParams, { country: normalizedValue, ...newParams });

    setSearchParams(newValue);
    setCurrentPage('1');
    setPerPage(currentPerPage.current);
  };

  const reset = () => {
    const newParams = getSearchWith(searchParams, { country: null, perPage: null, page: null });

    currentPerPage.current = '10';
    setSearchParams(newParams);
    setTable([]);
    setInputValue('');
    setCurrentPage('1');
    setPerPage('10');
    setError('');
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    currentPerPage.current = event.target.value as PerPageSelector;
  };

  const handleCheckboxChange = (
    universityName: string
  ) => {
    setLocalStorage(universityName);
    setCount(getSavedUniversityCount());
  }

  useEffect(() => {
    if (country.length) {
      setIsLoading(true);
      getUniversitiesNumber(country)
        .then(setUniversitiesNumber);

      const offset = currentPage === '1'
        ? 1
        : +currentPage * +perPage - +perPage + 1;

      serchByCountry(country, perPage, offset)
      .then(setTable)
      .catch(() => setError('Something goes wrong'))
      .finally(() => setIsLoading(false));
    }
  }, [country, currentPage, perPage])  

  return (
    <div className='container'>
      <Form
        value={inputValue}
        handleChange={handleInputChange}
        handleSubmit={handleFormSubmit}
        reset={reset}
        handleSelectChange={handleSelectChange}
        count={count}
      />

      {isLoading && <Loader />}

      {!!error && (
        <p className="container__message container__message-error">
          Something went wrong
        </p>
      )}

      {!isLoading && !error && table.length !== 0 && (
        <>
          <div className="container__table">
            <Table
              universities={table}
              handleChange={handleCheckboxChange}
            />
          </div>
          <div className="container__pagination">
            {perPage !== '0' && (
              <Pagination
                totalPages={+totalPages}
                currentPage={+currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </>
      )}

      {!isLoading && !error && !table.length && (
        <p className='container__message container__message-empty-list'>
          Table is empty
        </p>
      )}
      <div className="container__background">
        <div className="container__background-blue"></div>
        <div className="container__background-orange"></div>
      </div>
    </div>
  );
};
