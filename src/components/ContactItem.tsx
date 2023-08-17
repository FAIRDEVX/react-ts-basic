import { FC } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Contact } from '../reducer/contactsReducer'

const ContactItem: FC<Contact> = ({ firstName, lastName, phone}) => {
  return (
    <tr>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{phone}</td>
        <td><AiFillEdit size={18} className='icon'/></td>
        <td><AiFillDelete size={18} className='icon'/></td>
        
    </tr>
  )
}

export default ContactItem