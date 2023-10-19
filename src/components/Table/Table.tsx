import React, { memo } from 'react';
import './Table.css';
import { TableRow } from '../../types/tableType';
import { getFromLocalStorage } from '../../utils/getFromLocalStorage';

type Props = {
  universities: TableRow[],
  handleChange: (universityName: string ) => void,
};

export const Table: React.FC<Props> = memo(({ universities, handleChange }) => {
  const savedUniversities = getFromLocalStorage();

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Country</th>
          <th>University</th>
          <th>Web Pages</th>
          <th>Domains</th>
          <th>Country Code</th>
          <th>State Province</th>
          <th>Save in my list</th>
        </tr>
      </thead>

      <tbody>
        {universities.map((university, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{university.country}</td>
            <td>{university.name}</td>
            <td>
              {university.web_pages.map((page, index) => (
                <a
                  href={page}
                  target='_blank'
                  rel='noreferrer'
                  key={index}
                >
                  {page}
                </a>
              ))}
            </td>

            <td>
              {university.domains.map((domain, index) => (
                <p key={index}>{domain}</p>
              ))}
            </td>
            <td>{university.alpha_two_code}</td>
            <td>{university['state-province'] || '-'}</td>
            <td>
                <input
                  type="checkbox"
                  checked={savedUniversities.includes(university.name)}
                  onChange={() => handleChange(university.name)}
                />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
