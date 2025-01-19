import React from 'react'

const SubsTableItem = ({email,mongoId,date,onClickHandler}) => {

    const emailDate = new Date(date);

  return (
    <tr className='bg-white border-b text-left'>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
            {email? email: "no email"}
        </th>
        <td className='hidden sm:block px-6 py-4'>
            {emailDate.toDateString()}
        </td>
        <td onClick={() => onClickHandler(mongoId)} className='px-6 py-4 cursor-pointer'>
            x
        </td>

    </tr>
  )
}

export default SubsTableItem