import React from 'react'
import Select from 'react-select'
import { capitalizeFirstLetter } from '../../utils'


const SortListSelect = ({ values, handleChange }) => {

  const options = values.map(value => (
    {
      value: value,
      label: capitalizeFirstLetter(value)
    }
  ))

  const colorStyles = {
    control: (base, { isFocused }) => ({
      ...base,
      backgroundColor: 'transparent',
      color: isFocused ? '#e9c46a' : '#f2e9e4',
      border: 0,
      boxShadow: 'none',
      cursor: 'pointer',

      '&:hover': {
        ...base[':hover'],
        borderColor: 'transparent',
        color: '#e9c46a'
      }
    }
    ),
    dropdownIndicator: base => ({
      ...base,
      color: 'inherit',
      '&:hover': {
        ...base[':hover'],
       color: 'inherit',
      }
    }),
    option: base => ({
      ...base,
      backgroundColor: '#264653',
      padding: 5,
      cursor: 'pointer',
      '&:hover': {
        ...base[':hover'],
        backgroundColor: '#1c323b',
      }
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#264653',
    }),
    singleValue: base => ({
      ...base,
      color: 'inherit',
    }),
    indicatorSeparator: base => ({
      ...base,
      backgroundColor: '#e9c46a'
    })
  }
  return (
    <Select
      onChange={choice => handleChange(choice)}
      styles={colorStyles}
      isSearchable={false}
      options={options}
      defaultValue={options[0]} />
  )
}

export default SortListSelect