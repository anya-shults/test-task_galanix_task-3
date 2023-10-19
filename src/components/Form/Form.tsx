import React from 'react';
import './Form.css';
import { PerPageSelector } from '../../types/perPageSelectorType';
import { useSearchParams } from 'react-router-dom';

type Props = {
  value: string,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  reset: () => void,
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  count: number,
}

export const Form: React.FC<Props> = ({
  value,
  handleChange,
  handleSubmit,
  reset,
  handleSelectChange,
  count,
}) => {
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') as PerPageSelector || '10';

  return (
    <div className="input">
      <form
        action=''
        onSubmit={handleSubmit}
        className='input__form'
      >
        <input
          name="country"
          type="text"
          className='input__field'
          placeholder='Enter country'
          value={value}
          onChange={handleChange}
          required
        />

        <select
        className='input__select'
          defaultValue={perPage}
          onChange={handleSelectChange}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="0">All</option>
        </select>

        <button
          type='submit'
          className='input__send button'
        >
          Send
        </button>

        <button
          type='reset'
          className='input__reset button'
          onClick={reset}
        >
          Reset
        </button>
        <span className='input__count'>
        {`Saved: ${count}`}
      </span>
      </form>
    </div>
  )
};
